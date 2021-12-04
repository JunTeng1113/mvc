import doinsert from './doInsert.js';

export default function showInsertPage() {
    let str = `戶號：<input type="text" id="packId"><br>`;
    str += `收件人：<input type="text" id="packName"><br>`;
    str += `內容：<input type="text" id="packContent"><br>`;
    str += `備註：<input type="text" id="packNote"><br>`;
    str += `<button id="doinsert">新增</button>`;
    $('#content').html(str);
    $('#doinsert').click(function (e) { 
        doinsert();
    });
}