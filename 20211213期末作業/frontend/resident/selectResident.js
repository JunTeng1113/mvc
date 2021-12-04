import showUnitPage from "./showUnitPage.js";

export default function selectResident(filterValue='') {
    const data = {
        'FilterValue': filterValue
    };
    axios.post('../backend/index.php?action=getUnits', Qs.stringify(data))
    .then(res => {
        let response = res['data'];
        switch (response['status']) {
            case 200:
                const rows = response['result'];
                let table = `<table border='1'>`;
                table += `<tr><td></td><td>住戶</td><td>人數</td></tr>`;
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