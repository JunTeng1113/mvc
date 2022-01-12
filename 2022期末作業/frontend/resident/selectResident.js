import Request from "../request.js";
import showUnitPage from "./showUnitPage.js";

export default function selectResident(filterValue='') {
    const data = {
        'FilterValue': filterValue,
        'action': 'getUnits'
    };
    Request().post('/public/index.php', Qs.stringify(data))
    .then(res => {
        let response = res['data'];
        console.log(response);
        switch (response['status']) {
            case 200:
                const rows = response['result'];
                let table = `<table class='table small table-striped table-bordered text-center' id='residentTable'>`;
                table += `<thead>`;
                table += `<tr><th></th><th>住戶</th><th>人數</th></tr>`;
                table += `</thead>`;
                table += `<tbody>`;
                rows.forEach(element => {
                    table += `<tr>`;
                    table += `<td><button id='selectUnit' unitid='${element['UnitID']}'>查看</button></td>`;
                    table += `<td>${element['UnitID']}</td>`;
                    table += `<td>${element['ResNumber']}</td>`;
                    table += `</tr>`;
                });
                table += `</tbody>`;
                table += '</table>';
                $('#table').html(table);

                $(`#residentTable`).DataTable({
                    "dom": `<'row'<'col-sm-12'tr>>
                            <"row"<"col-sm-3"><"col-sm-6 text-center"p><"col-sm-3">>`,
                    "searching": false, //搜尋功能, 預設是開啟
                    "paging": true, //分頁功能, 預設是開啟
                    "lengthMenu": [10],
                    "bLengthChange": false,
                    "info": false,
                    "ordering": false, 
                    "columnDefs": [{
                        "defaultContent": "-",
                        "targets": "_all"
                    }],
                    "language": {
                        "processing": "處理中...",
                        "loadingRecords": "載入中...",
                        "lengthMenu": "顯示 _MENU_ 項結果",
                        "zeroRecords": "沒有符合的結果",
                        "info": "顯示第 _START_ 至 _END_ 項結果，共 _TOTAL_ 項",
                        "infoEmpty": "顯示第 0 至 0 項結果，共 0 項",
                        "infoFiltered": "(從 _MAX_ 項結果中過濾)",
                        "infoPostFix": "",
                        "search": "搜尋:",
                        "paginate": {
                            "first": "第一頁",
                            "previous": "上一頁",
                            "next": "下一頁",
                            "last": "最後一頁"
                        },
                        "aria": {
                            "sortAscending": ": 升冪排列",
                            "sortDescending": ": 降冪排列"
                        }
                    }
                });
                const selectButton = $(`button[id='selectUnit']`);
                selectButton.click(function (e) { 
                    showUnitPage($(this).attr('unitid'));
                    
                });
                break;
        
            default:
                $('#content').html(response['message']);
                break;
        }
    })
    .catch(err => {
        console.error(err); 
    })
    
}