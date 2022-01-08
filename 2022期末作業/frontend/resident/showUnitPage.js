import doDelete from "./doDelete.js";
import showInsertPage from "./showInsertPage.js";
import showUpdatePage from "./showUpdatePage.js";

export default function showUnitPage(unitId) {
    const data = {
        'UnitID': unitId
    }
    axios.post('../backend/index.php?action=getResidents', Qs.stringify(data))
    .then(res => {
        let response = res['data'];
        switch (response['status']) {
            case 200:
                const rows = response['result'];
                let table = `<button id='newResdient' unitid='` + unitId + `'>新增</button>`
                table += `<table border='1'>`;
                table += `<tr><td></td><td></td><td>戶號</td><td>姓名</td><td>手機</td></tr>`;
                rows.forEach(element => {
                    table += `<tr>`;
                    table += `<td><button id='update' unitid='${element['UnitID']}' resname='${element['ResName']}'>修改</button></td>`;
                    table += `<td><button id='delete' unitid='${element['UnitID']}' resname='${element['ResName']}'>刪除</button></td>`;
                    table += `<td>${element['UnitID']}</td>`;
                    table += `<td>${element['ResName']}</td>`;
                    table += `<td>${element['Phone']}</td>`;
                    table += `</tr>`;
                });
                table += '</table>';
                $('#content').html(table);

                const updatebutton = $(`button[id='update']`);
                updatebutton.click(function (e) { 
                    const unitID = $(this).attr('unitid');
                    const resName = $(this).attr('resname');
                    showUpdatePage(unitID, resName);
                    
                });

                const deletebutton = $(`button[id='delete']`);
                deletebutton.click(function (e) { 
                    const unitID = $(this).attr('unitid');
                    const resName = $(this).attr('resname');
                    doDelete(unitID, resName);
                    
                });
                
                $(`#newResdient`).click(function (e) { 
                    const unitID = $(this).attr(`unitid`);
                    showInsertPage(unitID);
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