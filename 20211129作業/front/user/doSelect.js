export default function doSelect() {
    axios.get('../backend/index.php?action=getUsers')
    .then(res => {
        let response = res['data'];
        switch (response['status']) {
            case 200:
                const rows = response['result'];
                let str = '<table>';
                rows.forEach(element => {
                    str += '<tr>';
                    str += `<td>${element['id']}</td>`;
                    str += `<td>${element['password']}</td>`;
                    str += `<td>${element['email']}</td>`;
                    str += `<td>${element['phone']}</td>`;
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