export default function doSelect() {
    axios.get('http://localhost/mvc/20211122作業/backend/index.php?action=getProducts')
    .then(res => {
        let response = res['data'];
        switch (response['status']) {
            case 200:
                const rows = response['result'];
                let str = '<table>';
                rows.forEach(element => {
                    str += '<tr>';
                    str += `<td>${element['ProdId']}</td>`;
                    str += `<td>${element['ProdName']}</td>`;
                    str += `<td>${element['Cost']}</td>`;
                    str += `<td>${element['UnitPrice']}</td>`;
                    str += `<td>${element['Qty']}</td>`;
                    str += '</tr>';
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