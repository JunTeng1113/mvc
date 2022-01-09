import Request from "../request.js";

export default function selectPackage(filterValue='') {
    const data = {
        'FilterValue': filterValue,
        "action": "getPackages"
    };
    
    Request().post('/public/index.php', Qs.stringify(data))
    .then(res => {
        let response = res['data'];
        switch (response['status']) {
            case 200:
                const rows = response['result'];
                let table;
                table = `<table border='1' id='packageTable'>`;
                table += `<thead>`;
                table += `<tr><th></th><th>編號</th><th>登記時間</th><th>戶別</th><th>收件人</th><th>包裹類型</th><th>內容</th><th>領取時間</th></tr>`;
                table += `</thead>`;
                table += `<tbody>`;
                rows.forEach(element => {
                    table += `<tr>`;
                    table += `<th><input type="checkbox" name="package" value="${element['PackageID']}"></th>`;
                    table += `<th>${element['PackageID']}</th>`;
                    table += `<td>${element['ArriveTime']}</td>`;
                    table += `<td>${element['UnitID']}</td>`;
                    table += `<td>${element['RecipientName']}</td>`;
                    table += `<td>${element['Type']}</td>`;
                    table += `<td>${element['Note']}</td>`;
                    table += `<td>${element['ConfirmTime']}</td>`;
                    table += `</tr>`;
                });
                table += `</tbody>`;
                table += '</table>';
                $('#table').html(table);
                $(`#packageTable`).DataTable();
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