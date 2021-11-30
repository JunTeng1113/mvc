import doinsert from './doInsert.js';

export default function showInsertPage() {
    let str = `名稱：<input type="text" id="SupplierName"><br>`;
    str += `聯絡人：<input type="text" id="Contact"><br>`;
    str += `電話：<input type="text" id="Phone"><br>`;
    str += `地址：<input type="text" id="Address"><br>`;
    str += `<button id="doinsert">新增</button>`;
    $('#content').html(str);
    $('#doinsert').click(function (e) { 
        doinsert();
    });
}