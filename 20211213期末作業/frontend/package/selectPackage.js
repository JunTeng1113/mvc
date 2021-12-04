export default function selectPackage(filterValue='') {
    const data = {
        'FilterValue': filterValue
    };
    axios.post('../backend/index.php?action=getPackages', Qs.stringify(data))
    .then(res => {
        let response = res['data'];
        switch (response['status']) {
            case 200:
                const rows = response['result'];
                let table;
                table = `<table border='1'>`;
                table += `<tr><td>送達時間</td><td>戶號</td><td>收件人</td><td>內容</td><td>備註</td><td>領取時間</td><td></td?</tr>`;
                rows.forEach(element => {
                    table += `<tr>`;
                    table += `<td>${element['ArriveTime']}</td>`;
                    table += `<td>${element['UnitID']}</td>`;
                    table += `<td>${element['RecipientName']}</td>`;
                    table += `<td>${element['Content']}</td>`;
                    table += `<td>${element['Note']}</td>`;
                    table += `<td>${element['ConfirmTime']}</td>`;
                    table += `<td><button>查看</button></td>`;
                    table += `</tr>`;
                });
                table += '</table>';
                $('#table').html(table);
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