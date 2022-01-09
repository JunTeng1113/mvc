import packageInfo from "./package/package.js";
import residentInfo from "./resident/residentInfo.js";
import announcementPage from "./announcement/announcementPage.js";

export default function startPage() {
    const startPage = `
        <div class='row'>
            <div class='btn-group' id="topBar">
                <button class="btn btn-primary" id="announcement">公告管理</button>
                <button class="btn btn-primary" id="" disabled>意見反應</button>
                <button class="btn btn-primary" id="package">郵務管理</button>
                <button class="btn btn-primary" id="resident">住戶管理</button>
            </div>
        </div>
        <div class='row'>
            <div id="headerBar"></div>
        </div>
        <div class='row'>
            <div id="content"></div>
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
}