import doDelete from "./doDelete.js";
import showInsertPage from "./showInsertPage.js";
import showUpdatePage from "./showUpdatePage.js";

export default function employeeInfo() {
    axios.get('http://localhost/mvc/20211122作業/backend/index.php?action=getProducts')
    .then(res => {
        let response = res['data'];
        switch (response['status']) {
            case 200:
                const rows = response['result'];
                let str = '<table>';
                str += `<tr><td>產品編號</td><td>名稱</td><td>成本</td><td>售價</td><td>數量</td><td><button id='new'>新增產品</button></td></tr>`;
                rows.forEach(element => {
                    str += '<tr>';
                    str += `<td id='id'>${element['ProdId']}</td>`;
                    str += `<td>${element['ProdName']}</td>`;
                    str += `<td>${element['Cost']}</td>`;
                    str += `<td>${element['UnitPrice']}</td>`;
                    str += `<td>${element['Qty']}</td>`
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