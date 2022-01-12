import showInsertPage from "./showInsertPage.js";
import showReceivePackagePage from "./showReceivePackagePage.js";
import showRecordPage from "./showRecordPage.js";

export default function packageInfo() {
    let header = ``;
    header += `<button class="btn btn-primary btn-sm mx-1" id='newPackage'>登記</button>`;
    header += `<button class="btn btn-primary btn-sm mx-1" id='receivePackage'>領取</button>`;
    header += `<button class="btn btn-primary btn-sm mx-1" id='showRecordPage'>紀錄</button>`;
    header += `<button class="btn btn-primary btn-sm mx-1" id='newPackage' disabled>退件</button><br>`;
    $('#header').html(header);
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