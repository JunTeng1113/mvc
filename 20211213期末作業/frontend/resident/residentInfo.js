import selectResident from "./selectResident.js";
import showInsertPage from "./showInsertPage.js";

export default function residentInfo() {
    let str = `<button id='newResdient'>新增住戶</button><br>`
    str += `查詢住戶：<input placeholder='輸入戶號或住戶姓名' id='select'>`;
    str += `<div id='table'></div>`
    $('#content').html(str);
    selectResident();
    $(`#select`).keyup(function (e) { 
        selectResident($(this).val());
    });
    
    $(`#newResdient`).click(function (e) { 
        showInsertPage();
    });
}