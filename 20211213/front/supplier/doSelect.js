export default function doSelect() {
    axios.get('../backend/public/index.php?action=getSuppliers')
    .then(res => {
        let response = res['data'];
        switch (response['status']) {
            case 200:
                const rows = response['result'];
                let str = '<table>';
                rows.forEach(element => {
                    str += '<tr>';
                    str += `<td>${element['SupplierId']}</td>`;
                    str += `<td>${element['SupplierName']}</td>`;
                    str += `<td>${element['Contact']}</td>`;
                    str += `<td>${element['Phone']}</td>`;
                    str += `<td>${element['Address']}</td>`;
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