export default function doInsert() {
    let data = {
        "RoleId": $("#RoleId").val(),
        "RoleName": $("#RoleName").val()
    };
    axios.post('http://localhost/mvc/20211122作業/backend/index.php?action=newRole', Qs.stringify(data))
    .then(res => {
        let response = res['data'];
        $('#content').html(response['message']);
    })
    .catch(err => {
        console.error(err); 
    })

}