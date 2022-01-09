import showInsertPage from "./showInsertPage.js";
import showReceivePackagePage from "./showReceivePackagePage.js";
import showRecordPage from "./showRecordPage.js";

export default function packageInfo() {
    let headerBar = ``;
    headerBar += `<button class="btn btn-primary btn-sm" id='newPackage'>登記</button>`;
    headerBar += `<button class="btn btn-primary btn-sm" id='receivePackage'>領取</button>`;
    headerBar += `<button class="btn btn-primary btn-sm" id='showRecordPage'>紀錄</button>`;
    headerBar += `<button class="btn btn-primary btn-sm" id='newPackage'>退件</button><br>`;
    $('#headerBar').html(headerBar);
    $(`#content`).html('');

    $(`#newPackage`).click(function (e) { 
        showInsertPage();
    });
    
    $(`#receivePackage`).click(function (e) { 
        showReceivePackagePage();
    });

    $(`#showRecordPage`).click(function (e) { 
        showRecordPage();
    });
}