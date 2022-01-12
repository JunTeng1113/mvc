import { modal } from '../modal.js';
import Request from '../request.js';
import doinsert from './doInsert.js';
import selectPackage from './selectPackage.js';

export default function showReceivePackagePage() {
    let content = ``;
    content += `查詢包裹：<button id="unitID" data-toggle="modal" data-target="#unitModal">選擇戶別</button>`;
    content += `<button id='confirm'>確認領取</button>`;
    content += `<div class='table' id='table'></div>`;
    
    const modal_body = `
    <table border="1" class="table table-bordered">
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
    $(`#content`).html(content);

    setBuildings();
    $(`#confirmModal`).click(function (e) { 
        const unitID = $(`input[name='unit']:checked`).val();
        $(`#unitID`).val(unitID);
        $(`#unitID`).text(unitID);
        selectPackage($(`#unitID`).val());
    });

    // selectPackage();
    // $(`#select`).keyup(function (e) { 
    //     selectPackage($(this).val());
    // });

    $(`#confirm`).click(function (e) { 
        $(`input[name='package']:checked`).each(function (index, element) {
            const data = {
                'PackageID': $(element).val(),
                'action': 'confirmPackage'
            }
            Request().post('/public/index.php', Qs.stringify(data))
            .then(res => {
                const response = res['data'];
                console.log(response);
                const search = $(`#unitID`).val();
                selectPackage(search);
            })
            .catch(err => {
                console.error(err); 
            })
        });
    });

    $('#doinsert').click(function (e) { 
        doinsert();
    });
}




function setBuildings() {
    const data = {
        'action': 'getBuildings'
    }
    Request().post("/public/index.php", Qs.stringify(data))
    .then(res => {
        const response = res['data'];
        console.log(response);
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
        console.log(response);
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
        console.log(response);
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