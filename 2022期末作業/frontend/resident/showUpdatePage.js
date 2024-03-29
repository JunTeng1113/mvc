import Request from '../request.js';
import doUpdate from './doUpdate.js';

export default function showUpdatePage(unitID, resName) {
    console.log('進入更新頁面');
    const data = {
        'UnitID': unitID,
        'ResName': resName,
        'action': 'getResident'
    }
    Request().post('/public/index.php', Qs.stringify(data))
    .then(res => {
        let response = res['data'];
        console.log(response);
        switch (response['status']) {
            case 200:
                const result = response['result'][0];
                console.log(result);
                let str = `戶號：<input type="text" id="resUnitId" readonly value='${result['UnitID']}'><br>`;
                str += `姓名：<input type="text" id="resName" readonly value='${result['ResName']}'><br>`;
                str += `手機：<input type="text" id="resPhone" value='${result['Phone']}'><br>`;
                str += `<button id="doUpdate">修改</button>`;
                $('#content').html(str);
                $('#doUpdate').click(function (e) { 
                    const data = {
                        "UnitID": unitID,
                        "ResName": resName,
                        "Phone": $(`#resPhone`).val()
                    };
                    doUpdate(data);
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