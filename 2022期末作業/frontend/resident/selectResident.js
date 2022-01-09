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
        switch (response['status']) {
            case 200:
                const rows = response['result'];
                let table = `<table border='1'>`;
                table += `<tr><th></th><th>住戶</th><th>人數</th></tr>`;
                rows.forEach(element => {
                    table += `<tr>`;
                    table += `<td><button id='selectUnit' unitid='${element['UnitID']}'>查看</button></td>`;
                    table += `<td>${element['UnitID']}</td>`;
                    table += `<td>${element['ResNumber']}</td>`;
                    table += `</tr>`;
                });
                table += '</table>';
                $('#table').html(table);

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