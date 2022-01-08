import doDelete from "./doDelete.js";
import showInsertPage from "./showInsertPage.js";
import showUpdatePage from "./showUpdatePage.js";

export default function supplierInfo() {
    axios.get('../backend/public/index.php?action=getSuppliers')
    .then(res => {
        let response = res['data'];
        switch (response['status']) {
            case 200:
                const rows = response['result'];
                let str = '<table>';
                str += `<tr><td>供應商編號</td><td>名稱</td><td>聯絡人</td><td>電話</td><td>地址</td><td><button id='new'>新增使用者</button></td></tr>`;
                rows.forEach(element => {
                    console.log(element);
                    str += '<tr>';
                    str += `<td id='id'>${element['SupplierId']}</td>`;
                    str += `<td>${element['SupplierName']}</td>`;
                    str += `<td>${element['Contact']}</td>`;
                    str += `<td>${element['Phone']}</td>`;
                    str += `<td>${element['Address']}</td>`;
                    str += `<td><button id='update'>修改</button></td>`;
                    str += `<td><button id='delete'>刪除</button></td>`;
                    str += '</tr>';
                });
                str += '</table>';
                $('#content').html(str);
                $('#new').click(function (e) {
                    showInsertPage();
                });
                const updateButtons = $(`button[id='update']`);
                const deleteButtons = $(`button[id='delete']`);
                const ids = $(`td[id='id']`);
                updateButtons.click(function (e) { 
                    const idx = updateButtons.index($(this));
                    showUpdatePage(ids[idx].innerText);
                });

                deleteButtons.click(function (e) { 
                    const idx = deleteButtons.index($(this));
                    doDelete(ids[idx].innerText);
                });
                break;
        
            default:
                $('#content').html(response['message']);
                break;
        }
    })
    .catch(err => {
        console.error(err); 
    })
}