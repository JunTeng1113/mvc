import doDelete from "./doDelete.js";
import showInsertPage from "./showInsertPage.js";
import showUpdatePage from "./showUpdatePage.js";

export default function roleInfo() {
    axios.get('../backend/public/index.php?action=getRoles')
    .then(res => {
        let response = res['data'];
        switch (response['status']) {
            case 200:
                const rows = response['result'];
                let str = '<table>';
                str += `<tr><td>角色編號</td><td>名稱</td><td><button id='new'>新增角色</button></td></tr>`;
                rows.forEach(element => {
                    str += '<tr>';
                    str += `<td id='id'>${element['RoleId']}</td>`;
                    str += `<td>${element['RoleName']}</td>`;
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