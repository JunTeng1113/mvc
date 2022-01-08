import selectPackage from "./selectPackage.js";
import showInsertPage from "./showInsertPage.js";

export default function packageInfo() {
    let str = `<button id='newPackage'>新增包裹</button><br>`
    str += `查詢包裹：<input placeholder='輸入戶號或收件人' id='select' autocomplete="off">`;
    str += `<div id='table'></div>`
    $('#content').html(str);

    selectPackage();
    $(`#select`).keyup(function (e) { 
        selectPackage($(this).val());
    });

    $(`#newPackage`).click(function (e) { 
        showInsertPage();
    });
}