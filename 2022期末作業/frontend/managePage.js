import packageInfo from "./package/packagePage.js";
import residentInfo from "./resident/residentInfo.js";
import announcementPage from "./announcement/announcementPage.js";
import userPage from "./userPage/userPage.js";
import { getUserInfo } from "./assets/function.js";

export default async function managePage() {
    const data = await getUserInfo();
    const userUnitID = data['result'][0]['UnitID'];
    const userAccount = data['result'][0]['AccountID'];
    const userName = data['result'][0]['Name'];

    const startPage = `
        <div class="container">
            <div class='row m-1 justify-content-center'>
                <div class='col-3 text-start'></div>
                <div class='col-2 text-end'><button class="btn btn-outline-info">${userUnitID}</button></div>
                <div class='col-2 text-center'><button class="btn btn-outline-info">${userAccount}</button></div>
                <div class='col-2 text-start'><button class="btn btn-outline-info">${userName}</button></div>
                <div class='col-3 text-end'><button class="btn btn-outline-danger" id="logout">登出</button></div>
                <div class='btn-group m-1 d-flex justify-content-center' id="top">
                    <button class="btn btn-primary" id="announcement">公告管理</button>
                    <button class="btn btn-primary" id="" disabled>意見反應</button>
                    <button class="btn btn-primary" id="package">郵務管理</button>
                    <button class="btn btn-primary" id="resident">住戶管理</button>
                    <button class="btn btn-primary" id="user">使用者系統</button>
                </div>
            </div>
            <div class='row d-flex justify-content-center'>
                <div id="header" class="m-3 d-flex justify-content-center"></div>
            </div>
            <div class='row'>
                <div id="content"></div>
            </div>
        </div>
    `;
    
    $('#root').html(startPage);

    $(`#announcement`).click(function (e) { 
        announcementPage();
    });

    $('#resident').click(function (e) { 
        residentInfo();
    });
    
    $('#package').click(function (e) { 
        packageInfo();
    });
    $('#user').click(function (e) { 
        userPage();
    });
    $(`#logout`).click(function (e) { 
        if (window.localStorage) {
            window.localStorage.setItem("jwtToken", '');
        }
        window.location.reload();
    });
}