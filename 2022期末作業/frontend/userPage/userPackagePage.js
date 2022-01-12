import { getUnitPackages } from "../package/getPackage.js";

function userPackagePage() {
    let header = ``;
    header += `<button class="btn btn-primary btn-sm mx-1" id='package1'>未領取</button>`;
    header += `<button class="btn btn-primary btn-sm mx-1" id='package2'>已領取</button>`;
    header += ``;
    $('#header').html(header);
    $(`#content`).html('');

    $(`#package1`).click(function (e) { 
        showUnitPackages('B3-11', '0');
    });

    $(`#package2`).click(function (e) { 
        showUnitPackages('B3-11', '1');
    });
}
export {userPackagePage}


async function showUnitPackages(UnitID, status='all') {
    let str = ``;
    str += `<div id='table'></div>`;
    $(`#content`).html(str);
    console.log($(`#content`));
    const data = {
        "action": "getUnitPackages"
    };
    const result = await getUnitPackages(UnitID, status);
    
    let table;
    table = `<table border='1' id='packageTable' class='table table-striped table-bordered table-responsive'>`;
    table += `<thead>`;
    table += `<tr>
                <th class="text-center">編號</th>
                <th class="text-center">領取時間</th>
                <th class="text-center">收件人</th>
                <th class="text-center">包裹類型</th>
                <th class="text-center">內容</th>
                <th class="text-center">登記時間</th>
            </tr>`;
    table += `</thead>`;
    table += `<tbody>`;
    result.forEach(element => {
        const date = isNaN(Date.parse(element['ConfirmTime'])) ? '未領取' : (new Date(Date.parse(element['ConfirmTime']))).format("yyyy-MM-dd hh:mm");
        table += `<tr>`;
        table += `<th class="text-center">${element['PackageID']}</th>`;
        table += `<td class="text-center">${date}</td>`;
        table += `<td class="text-center">${element['RecipientName']}</td>`;
        table += `<td class="text-center">${element['Type']}</td>`;
        table += `<td class="text-center">${element['Note']}</td>`;
        table += `<td class="text-center">${element['ArriveTime']}</td>`;
        table += `</tr>`;
    });
    table += `</tbody>`;
    table += '</table>';
    $('#table').html(table);

    $(`#packageTable`).DataTable({
        "dom": `<'row'<'col-sm-12 col-md-6'l><'col-sm-12 col-md-6'f>>
                <'row'<'col-sm-12'tr>>
                <'row'<'col-sm-12 col-md-7'p>>`,
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
}