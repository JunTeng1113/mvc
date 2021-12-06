import doinsert from './doInsert.js';

export default function showInsertPage() {
    let str = `名稱：<input type="text" id="RoleName"><br>`;
    str += `<button id="doinsert">新增</button>`;
    $('#content').html(str);
    $('#doinsert').click(function (e) { 
        doinsert();
    });
}