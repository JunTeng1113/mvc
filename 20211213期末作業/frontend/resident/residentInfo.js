export default function residentInfo() {
    axios.get('../backend/index.php?action=getUnits')
    .then(res => {
        let response = res['data'];
        switch (response['status']) {
            case 200:
                const rows = response['result'];
                let str = `<table border='1'>`;
                str += `<tr><td>住戶</td><td>人數</td><td></td></tr>`;
                rows.forEach(element => {
                    str += `<tr>`;
                    str += `<td id='id'>${element['UnitID']}</td>`;
                    str += `<td></td>`;
                    str += `<td><button>查看</button></td>`;
                    str += `</tr>`;
                });
                str += '</table>';
                $('#content').html(str);
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