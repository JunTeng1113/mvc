export default function doUpdate(){
    let data = {
        "RoleId": $("#RoleId").val(),
        "RoleName": $("#RoleName").val()
    };
    axios.post("http://localhost/mvc/20211122作業/backend/index.php?action=updateRole", Qs.stringify(data))
    .then(res => {
        let response = res['data'];
        $("#content").html(response['message']);
    })
    .catch(err => {
        console.error(err); 
    })
}
