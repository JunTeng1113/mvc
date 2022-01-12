import managePage from './managePage.js';
import Request from './request.js';
import loginPage from './loginPage.js';
import userPage from './userPage/userPage.js';

$(document).ready(function () {
    if(window.localStorage){
        Request().get("public/index.php")
        .then(function(resp){
            const response = resp['data'];
            console.log(response);
            if(response['status'] == 200){
                //儲存到 local storage
                window.localStorage.setItem("jwtToken", response['token']);
                userPage();
                // managePage();
            }
            else{
                loginPage();
                console.log(response);
            }
        })
        .catch(function(err){
            console.log(err);
        });
    }
});
