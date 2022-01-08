export default function doSelect() {
    axios.get('../backend/public/index.php?action=getRoles')
    .then(res => {
        let response = res['data'];
        switch (response['status']) {
            case 200:
                const rows = response['result'];
                let str = '<table>';
                rows.forEach(element => {
                    str += '<tr>';
                    str += `<td>${element['RoleId']}</td>`;
                    str += `<td>${element['RoleName']}</td>`;
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