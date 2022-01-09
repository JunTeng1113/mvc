
import { modal } from '../modal.js';
import Request from '../request.js';
import doinsert from './doInsert.js';
import selectPackage from './selectPackage.js';

export default function showInsertPage() {
    let content = ``;
    let table = ``;
    table += `<table border='1'>`;
    table += `
        <tr>
            <th>編號</th>
            <th>信件包裹類型</th>
            <th>戶別</th>
            <th>收件人</th>
            <th>備註</th>
            <th>操作</th>
        </tr>`;
    table += `
        <tr>
            <td><input type="text" id="id" disabled></td>
            <td><select name="type" id="type">
                    <option value="">請選擇</option>
                    <option value="一般掛號">一般掛號</option>
                    <option value="包裹">包裹</option>
                    <option value="其它">其它</option>
                    <option value="信用卡">信用卡</option>
                    <option value="法院">法院</option>
                    <option value="稅單">稅單</option>
                    <option value="公家機關">公家機關</option>
                </select>
            </td>
            <td><button id="unitID" data-toggle="modal" data-target="#unitModal">選擇戶別</button></td>
            <td><input type="text" id="recipientA"><br>
                <select name="recipient" id="recipientB">
                    <option value="">請選擇收件人</option>
                </select>
            </td>
            <td><input type="text" id="packNote"></td>
            <td><button id="doinsert">新增</button></td>
        </tr>`;
    table += `</table>`;
    content += table;
    
    const modal_body = `
    <table border="1" class="table">
        <tr>
            <th>棟別</th>
            <th>樓層</th>
            <th>戶別</th>
        </tr>
        <tr>
            <td id="buildings"></td>
            <td id="floor"></td>
            <td id="unit"></td>
        </tr>
    </table>`;

    content += modal(`unitModal`, `選擇住戶`, modal_body);


    $('#content').html(content);


    setPackageID();
    setBuildings();
    $(`#confirmModal`).click(function (e) { 
        const unitID = $(`input[name='unit']:checked`).val();
        $(`#unitID`).val(unitID);
        $(`#unitID`).text(unitID);
        
        getResidents(unitID);
    });

    $(`#recipientB`).click(function (e) { 
        const data = $(this).val();
        if (data != '') {
            $(`#recipientA`).val(data);
            // $(`#recipientA`).attr('readonly', '');
            $(`#recipientA`).attr('disabled', '');
        } else {
            $(`#recipientA`).val('');
            // $(`#recipientA`).removeAttr('readonly');
            $(`#recipientA`).removeAttr('disabled');
        }
    });
    $('#doinsert').click(function (e) { 
        const data = {
            'UnitID': $(`#unitID`).val(),
            'RecipientName': $(`#recipientA`).val(),
            'Type': $(`#type`).val(),
            'Note': $(`#packNote`).val()
        };
        doinsert(data);
    });
}


function getResidents(unitID) {
    const data = {
        'UnitID': unitID,
        "action": "getResidents"
    };
    
    Request().post('/public/index.php', Qs.stringify(data))
    .then(res => {
        let response = res['data'];
        switch (response['status']) {
            case 200:
                const response = res['data'];
                const rows = response['result'];
                let list = ``;
                list += ` <option value="">請選擇收件人</option>`;
                $(rows).each(function (index, element) {
                    list += `<option value="${element['ResName']}">${element['ResName']}</option>`;
                });
                $(`#recipientB`).html(list);
                break;
        
            default:
                $('#table').html(response['message']);
                break;
        }
    })
    .catch(err => {
        console.error(err); 
    })
}

function setPackageID() {
    const data = {
        'action': 'getAUTO_INCREMENT'
    }
    
    Request().post('/public/index.php', Qs.stringify(data))
    .then(res => {
        const response = res['data'];
        const ai = response['result'][0]['ai'];
        $(`#id`).val(ai);
    })
    .catch(err => {
        console.error(err); 
    })
}

function setBuildings() {
    const data = {
        'action': 'getBuildings'
    }
    Request().post("/public/index.php", Qs.stringify(data))
    .then(res => {
        const response = res['data'];
        const rows = response['result'];
        let list = ``;
        $(rows).each(function (index, element) {
            list += `
                <label for="b${index}" class="label">
                    <div>
                        <input type="radio" id="b${index}" name="building" value="${element['building']}">${element['building']}
                    </div>
                </label>`;
        });
        $(`#buildings`).html(list);
        
        $(`input[name='building']`).click(function (e) { 
            const building = $(this).val();
            setFloor(building);
            $(`#unit`).html('');
        });
    })
    .catch(err => {
        console.error(err); 
    })
}

function setFloor(building) {
    const data = {
        'Building': building,
        'action': 'getFloor'
    }

    Request().post("/public/index.php", Qs.stringify(data))
    .then(res => {
        const response = res['data'];
        const rows = response['result'];
        let list = ``;
        $(rows).each(function (index, element) {
            list += `
                <label for="f${index}" class="label">
                    <div>
                        <input type="radio" id="f${index}" name="floor" value="${element['floor']}">${element['floor']}
                    </div>
                </label>`;
        });
        $(`#floor`).html(list);

        $(`input[name='floor']`).click(function (e) { 
            const floor = $(this).val();
            setUnits(building, floor);
        });


    })
    .catch(err => {
        console.error(err); 
    })
    
}

function setUnits(building, floor) {
    const data = {
        'Building': building,
        'Floor': floor,
        'action': 'getUnits'
    }
    Request().post("/public/index.php", Qs.stringify(data))
    .then(res => {
        const response = res['data'];
        const rows = response['result'];
        let list = ``;
        $(rows).each(function (index, element) {
            list += `
                <label for="u${index}" class="label">
                    <div>
                        <input type="radio" id="u${index}" name="unit" value="${element['unitid']}">${element['unitid']}
                    </div>
                </label>`;
        });
        $(`#unit`).html(list);
    })
    .catch(err => {
        console.error(err); 
    })
}