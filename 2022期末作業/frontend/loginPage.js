import { modal } from "./modal.js";
import Request from "./request.js";
export default function loginPage() {
    let content = `
        帳號：<input type="text" id="id"><br>
        密碼：<input type="password" id="password"><br>
        <button id="login">登入</button>
        <button id="register" data-toggle="modal" data-target="#registerModal">註冊</button>
        <div id="content"></div>
    `;




    const modal_body = `
    <div class='card py-3'>
        <div class='row m-2'>
            <label for="" class='col-sm-3 text-end'>帳號</label><input type="text" name='account' class='col-sm-6' placeholder='請輸入帳號'>
        </div>
        <div class='row m-2'>
            <label for="" class='col-sm-3 text-end'>密碼</label><input type="password" name='password' class='col-sm-6' placeholder='請輸入密碼'>
        </div>
        <div class='row m-2'>
            <label for="" class='col-sm-3 text-end'>手機號碼</label><input type="text" name='phone' class='col-sm-6' placeholder='請輸入手機號碼'>
        </div>
        <div class='row m-2' hidden>
            <label for="" class='col-sm-3 text-end'>驗證碼</label><input type="password" name='password' class='col-sm-3' placeholder='請輸入驗證碼'><button class='col-sm-3'>發送驗證碼</button>
        </div>
    </div>`;
    
    content += modal(`registerModal`, `註冊帳號`, modal_body);

    $("#root").html(content);

    $(`#confirmModal`).click(function (e) { 
        const data = {
            'AccountID': $(`input[name='account']`).val(),
            'Password': $(`input[name='password']`).val(),
            'Phone': $(`input[name='phone']`).val()
        };
        register(data);
    });





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
            const result = response['result'];
            if (result.length > 0) {
                if (window.localStorage) {
                    window.localStorage.setItem("jwtToken", response['token']);
                }
            }
            window.location.reload();

        })
        .catch(err => {
            console.error(err); 
        })
    });
}
async function register(data) {
    const response = await getResidentPhone(data);
    const result = response['result'][0];

    const newData = {
        'UnitID': result['UnitID'],
        'AccountID': data['AccountID'],
        'Password': data['Password'],
        'Phone': data['Phone']
    }
    await registerUser(newData);
    // await addUserRole(newData); 查不到UserID
}

async function getResidentPhone(data) {
    data['action'] = "getResidentPhone";
    try {
        const res = await Request().post("/public/index.php", Qs.stringify(data));
        const response = res['data'];
        console.log(response);
        return response;
    } catch (error) {
        console.error(error);;
    }
}

async function registerUser(data) {
    data['action'] = "registerUser";
    try {
        const res = await Request().post("/public/index.php", Qs.stringify(data));
        const response = res['data'];
        console.log(response);
        return response;
    } catch (error) {
        console.error(error);;
    }
}


async function addUserRole(data) {
    data['action'] = "addUserRole";
    try {
        const res = await Request().post("/public/index.php", Qs.stringify(data));
        const response = res['data'];
        console.log(response);
        return response;
    } catch (error) {
        console.error(error);;
    }
}