import doinsert from './doInsert.js';

export default function showInsertPage() {
    let str = `編號：<input type="text" id="ProdId"><br>`;
    str += `名稱：<input type="text" id="ProdName"><br>`;
    str += `成本：<input type="text" id="Cost"><br>`;
    str += `單價：<input type="text" id="UnitPrice"><br>`;
    str += `數量：<input type="text" id="Qty"><br>`;
    str += `<button id="doinsert">新增</button>`;
    $('#content').html(str);
    $('#doinsert').click(function (e) { 
        doinsert();
    });
}