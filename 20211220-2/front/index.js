import startPage from './startPage.js';

$(document).ready(function () {
    $("#root").html(startPage());
    $("#login").click(function (e) { 
        const data={
            "id": $("#id").val(),
            "password": $("#password").val()
        };
        axios.post('http://localhost/test/jwt/login.php', Qs.stringify(data))
        .then(function(resp){
            let response = resp['data'];
            if(window.localStorage){ //儲存到 local storage
                window.localStorage.setItem("jwtToken", response);
            }
        })
        .catch(function(err){
            console.log(err);
        });
    });
});
