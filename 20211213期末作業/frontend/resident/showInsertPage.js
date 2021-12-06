import doinsert from './doInsert.js';

export default function showInsertPage() {
    let str = `戶號：<input type="text" id="resUnitId"><br>`;
    str += `姓名：<input type="text" id="resName"><br>`;
    str += `手機：<input type="text" id="resPhone"><br>`;
    str += `<button id="doinsert">新增</button>`;
    $('#content').html(str);
    $('#doinsert').click(function (e) { 
        const resName = $(`#resName`).val();
        const phone = $(`#resPhone`).val();
        const unitID = $(`#resUnitId`).val();
        doinsert(resName, phone, unitID);
    });
}