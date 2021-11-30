export default function doUpdate(){
    let data = {
        "id": $("#id").val(),
        "password": $("#password").val(),
        "email": $("#email").val(),
        "phone": $("#phone").val()
    };
    axios.post("../backend/index.php?action=updateUser", Qs.stringify(data))
    .then(res => {
        let response = res['data'];
        $("#content").html(response['message']);
    })
    .catch(err => {
        console.error(err); 
    })
}
