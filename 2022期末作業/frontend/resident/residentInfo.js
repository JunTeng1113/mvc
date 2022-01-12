import selectResident from "./selectResident.js";
import showInsertPage from "./showInsertPage.js";

export default function residentInfo() {
    let header = `<button class="btn btn-primary btn-sm mx-1" id='newResdient'>新增住戶</button><br>`;
    $(`#header`).html(header);

    let content = ``;
    content += `查詢住戶：<input placeholder='輸入戶號或住戶姓名' id='select' autocomplete="off">戶號規則：{棟別}{房別}-{樓別}`;
    content += `<div id='table'></div>`
    $('#content').html(content);
    
    selectResident();
    $(`#select`).keyup(function (e) { 
        selectResident($(this).val());
    });
    
    $(`#newResdient`).click(function (e) { 
        showInsertPage();
    });
}