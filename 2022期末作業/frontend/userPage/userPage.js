import packageInfo from "../package/packagePage.js";
import residentInfo from "../resident/residentInfo.js";
import announcementPage from "../announcement/announcementPage.js";
import {userPackagePage} from "./userPackagePage.js";
import managePage from "../managePage.js";
import { userAnnouncementPage } from "./userAnnouncementPage.js";
import Request from "../request.js";
import { getUserInfo } from "../assets/function.js";

export default async function userPage() {
    const data = await getUserInfo();
    const userUnitID = data['result'][0]['UnitID'];
    const userAccount = data['result'][0]['AccountID'];
    const userName = data['result'][0]['Name'];
    
    let admin = ``
    const response = await hasPermission();
    if (response['result'].length > 0) {
        admin = `<button class="btn btn-primary" id="manage">管理員系統</button>`;
    } 
    const startPage = `
        <div class="container">
            <div class='row m-1 justify-content-center'>
                <div class='col-3 text-start'></div>
                <div class='col-2 text-end'><button class="btn btn-outline-info">${userUnitID}</button></div>
                <div class='col-2 text-center'><button class="btn btn-outline-info">${userAccount}</button></div>
                <div class='col-2 text-start'><button class="btn btn-outline-info">${userName}</button></div>
                <div class='col-3 text-end'><button class="btn btn-outline-danger" id="logout">登出</button></div>
                <div class='btn-group m-1 d-flex justify-content-center' id="top">
                    <button class="btn btn-primary" id="announcement">公告查看</button>
                    <button class="btn btn-primary" id="" disabled>意見反應</button>
                    <button class="btn btn-primary" id="package">包裹查詢</button>
                    <button class="btn btn-primary" id="resident" disabled>住戶資訊</button>
                    ${admin}
                </div>
            </div>
            <div id="header" class="m-3 d-flex justify-content-center"></div>
            <div id="content" class="m-3"></div>
        </div>
    `;
    $('#root').html(startPage);

    $(`#announcement`).click(function (e) { 
        userAnnouncementPage();
    });

    $('#resident').click(function (e) { 
        
    });
    
    $('#package').click(function (e) { 
        userPackagePage();
    });

    $(`#manage`).click(function (e) {
        managePage();
    });
    $(`#logout`).click(function (e) { 
        if (window.localStorage) {
            window.localStorage.setItem("jwtToken", '');
        }
        window.location.reload();
    });
}
async function hasPermission() {
    try {
        const data = {
            'action': 'hasPermission'
        }
        const res = await Request().post('/public/index.php', Qs.stringify(data));
        const response = res['data'];
        console.log(response);
        return response;
    } catch (error) {
        console.log(error);
    }
}
