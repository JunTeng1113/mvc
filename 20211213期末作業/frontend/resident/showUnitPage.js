export default function showUnitPage(unitId) {
    const data = {
        'UnitID': unitId
    }
    axios.post('../backend/index.php?action=getResidents', Qs.stringify(data))
    .then(res => {
        let response = res['data'];
        switch (response['status']) {
            case 200:
                const rows = response['result'];
                let table = `<table border='1'>`;
                table += `<tr><td></td><td></td><td>戶號</td><td>姓名</td><td>手機</td></tr>`;
                rows.forEach(element => {
                    table += `<tr>`;
                    table += `<td><button id='update'>修改</button></td>`;
                    table += `<td><button id='delete'>刪除</button></td>`;
                    table += `<td>${element['UnitID']}</td>`;
                    table += `<td>${element['ResName']}</td>`;
                    table += `<td>${element['Phone']}</td>`;
                    table += `</tr>`;
                });
                table += '</table>';
                $('#content').html(table);

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