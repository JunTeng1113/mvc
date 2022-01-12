import Request from "../request.js";

export default function showRecordPage() {
    let str = ``;
    str += `<div id='table'></div>`;
    $(`#content`).html(str);
    const data = {
        "action": "getRecords"
    };
    
    Request().post('/public/index.php', Qs.stringify(data))
    .then(res => {
        let response = res['data'];
        console.log(response);
        switch (response['status']) {
            case 200:
                const rows = response['result'];
                let table;
                table = `<table border='1' class='table small table-striped table-bordered text-center' id='packageTable'>`;
                table += `<thead>`;
                table += `<tr><th>編號</th><th>領取時間</th><th>戶別</th><th>收件人</th><th>包裹類型</th><th>內容</th><th>登記時間</th></tr>`;
                table += `</thead>`;
                table += `<tbody>`;
                rows.forEach(element => {
                    table += `<tr>`;
                    table += `<th>${element['PackageID']}</th>`;
                    table += `<td>${element['ConfirmTime']}</td>`;
                    table += `<td>${element['UnitID']}</td>`;
                    table += `<td>${element['RecipientName']}</td>`;
                    table += `<td>${element['Type']}</td>`;
                    table += `<td>${element['Note']}</td>`;
                    table += `<td>${element['ArriveTime']}</td>`;
                    table += `</tr>`;
                });
                table += `</tbody>`;
                table += '</table>';
                $('#table').html(table);
                $(`#packageTable`).DataTable({
                    "dom": `<'row'<'col-sm-12'tr>>
                            <"row"<"col-sm-4"><"col-sm-4 text-center"p><"col-sm-4">>`,
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
                $(`input[name='package']`).click(function (e) { 

                });
                break;
        
            default:
                $('#table').html(response['message']);
                break;
        }
    })
    .catch(err => {
        console.error(err); 
    })
    
}