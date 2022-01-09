import Request from "./request.js";
export default function loginPage() {
    const sp = `
        帳號：<input type="text" id="id"><br>
        密碼：<input type="password" id="password"><br>
        <button id="login">登入</button>
        <div id="content"></div>
    `;
    $("#root").html(sp);
    $("#login").click(function (e) { 
        let data = {
            "id": $("#id").val(),
            "password": $("#password").val(),
            "action": "doLogin"
        };
        Request().post("/public/index.php", Qs.stringify(data))
        .then(res => {
            let response = res['data'];
            console.log(response);
            if (window.localStorage) {
                window.localStorage.setItem("jwtToken", response['token']);
            }
            window.location.reload();

        })
        .catch(err => {
            console.error(err); 
        })
    });
}