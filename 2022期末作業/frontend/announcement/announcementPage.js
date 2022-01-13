import { delay } from "../assets/function.js";
import { modal } from "../modal.js";
import Request from "../request.js";

export default function announcementPage() {
    let header = ``;
    header += `<button class="btn btn-primary btn-sm mx-1" id="addAnnouncement" data-toggle="modal" data-target="#announcementModal">新增公告</button>`;
    let content = ``;
    content += `
    <table id='announcementTable' class='table small table-striped table-bordered text-center'>
        <thead>
        </thead>
        <tbody>
        </tbody>
    </table>`;

    const modal_body = `
    <div class='card'>
        <input type="hidden" name='action'>
        <input type="hidden" name='annID'>
        <div class='row'>
            <label for="" class='col-sm-3 text-end'>公告標題</label><input type="text" name='title' class='col-sm-6' placeholder='請輸入公告標題'>
        </div>
        <div class='row'>
            <label for="" class='col-sm-3 text-end'>公告類型</label><select name="type" class='col-sm-6' id="">
                <option value="">請選擇</option>
                <option value="其他">其他</option>
                <option value="一般">一般</option>
                <option value="會議">會議</option>
                <option value="財務">財務</option>
                <option value="維修保養">維修保養</option>
                <option value="活動">活動</option>
                <option value="規約">規約</option>
                <option value="系統">系統</option>
                <option value="管理辦法">管理辦法</option>
            </select>
        </div>
        <div class='row'>
            <label for="" class='col-sm-3 text-end'>公告起日</label><br>
            <input type="date" name='startDate' class='col-sm-6'>
        </div>
        <div class='row'>
            <label for="" class='col-sm-3 text-end'>公告迄日</label><br>
            <input type="date" name='endDate' class='col-sm-6'>
        </div>
        <div class='row'>
            <label for="" class='col-sm-3 text-end'>是否置頂</label>
            <label for="s1" class='col-sm-6'><input type="checkbox" name="top" id="s1">是</label>
        </div>
        <div class='row'>
            <label for="" class='col-sm-3 text-end'>是否刊登</label>
            <label for="s2" class='col-sm-6'><input type="checkbox" name="publish" id="s2">是</label>
        </div>
        <div class='row'>
            <label for="" class='col-sm-3 text-end'>內容</label>
            <textarea name="content" class='col-sm-6' id="" rows="10" maxlength='128' style="resize: none;" placeholder='內容'></textarea>
        </div>
    </div>`;

    content += modal(`announcementModal`, `編輯公告`, modal_body);
    $(`#header`).html(header);
    $('#content').html(content);
    
    let dt = $(`#announcementTable`).DataTable({
        "dom": `<'row'<'col-sm-12'tr>>
                <"row"<"col-sm-4"><"col-sm-4 text-center"p><"col-sm-4">>`,
        "searching": false, //搜尋功能, 預設是開啟
        "paging": true, //分頁功能, 預設是開啟
        "lengthMenu": [10],
        "bLengthChange": false,
        "info": false,
        "ordering": false, 
        "columnDefs": [{
            "defaultContent": "-",
            "targets": "_all"
        }],
        "columns": [
            { "name": "AnnID", "title": "#"},
            { "name": "Title", "title": "公告標題", "width": "25%"},
            { "name": "Type", "title": "公告類型"},
            { "name": "StartDate", "title": "公告起日"},
            { "name": "EndDate", "title": "公告迄日"},
            { "name": "Publish", "title": "狀態"},
            { "name": "Clicks", "title": "人氣"},
            { "name": "Top", "title": "置頂"},
            { "name": "ReleaseTime", "title": "發佈時間"},
            { "name": "Action", "title": "操作", "width": "10%"}
        ], 
        "language": {
            "processing": "處理中...",
            "loadingRecords": "載入中...",
            "lengthMenu": "顯示 _MENU_ 項結果",
            "zeroRecords": "沒有符合的結果",
            "info": "顯示第 _START_ 至 _END_ 項結果，共 _TOTAL_ 項",
            "infoEmpty": "顯示第 0 至 0 項結果，共 0 項",
            "infoFiltered": "(從 _MAX_ 項結果中過濾)",
            "infoPostFix": "",
            "search": "搜尋:",
            "paginate": {
                "first": "第一頁",
                "previous": "上一頁",
                "next": "下一頁",
                "last": "最後一頁"
            },
            "aria": {
                "sortAscending": ": 升冪排列",
                "sortDescending": ": 降冪排列"
            }
        }
    });
    setAnnouncements(dt);
    
    $('#confirmModal').click(function (e) { 
        const data = {
            'annID': $(`input[name=annID]`).val(),
            'title': $(`input[name=title]`).val(),
            'type': $(`select[name=type]`).val(),
            'startDate': $(`input[name=startDate]`).val(),
            'endDate': $(`input[name=endDate]`).val(),
            'top': $(`input[name=top]`).is(`:checked`) ? 1 : 0,
            'publish': $(`input[name=publish]`).is(`:checked`) ? 1 : 0,
            'content': $(`textarea[name=content]`).val()
        }
        console.log('更新公告');
        if ($(`input[name=action]`).val() == 'update') {
            updateAnnouncement(data); //更新公告
        } else {
            addAnnouncement(data);
        }
        setAnnouncements(dt);
    });
    

}

async function addAnnouncement(data) {
    data['action'] = `addAnnouncement`;
    return await Request().post('/public/index.php', Qs.stringify(data))
    .then(res => {
        const response = res['data'];
        console.log(response);
        switch (response) {
            case 200:
                return true;
        
            default:
                return false;
        }
    })
    .catch(err => {
        console.error(err); 
    })
    
}

async function updateAnnouncement(data) {
    data['action'] = `updateAnnouncement`;
    return await Request().post('/public/index.php', Qs.stringify(data))
    .then(res => {
        const response = res['data'];
        console.log(response);
        switch (response) {
            case 200:
                return true;
        
            default:
                return false;
        }
    })
    .catch(err => {
        console.error(err); 
    })
    
}

export async function getAnnouncements() {
    const data = {
        'action': 'getAnnouncements'
    }
    try {
        const res = await Request().post('/public/index.php', Qs.stringify(data))
        const response = res['data'];
        console.log(response);
        const result = response['result'];
        return result;
    } catch (error) {
        console.error(err); 
    }
}

export async function setAnnouncements(table) {
    table.clear().draw();
    await delay(0.05);
    const result = await getAnnouncements();
    result.forEach(row => {
        // {
        //     "AnnID":       row['AnnID'],
        //     "Title":       row['Title'],
        //     "Type":       row['Type'],
        //     "StartDate":       row['StartDate'],
        //     "EndDate":       row['EndDate'],
        //     "Publish":       row['Publish'],
        //     "Clicks":       row['Clicks'],
        //     "Top":       row['Top'],
        //     "ReleaseTime":       row['ReleaseTime'],
        //     "Action":       '123'
        // }
        const action = `
        <button name="edit" value="${row['AnnID']}" data-toggle="modal" data-target="#announcementModal">
            <i class="fas fa-edit"></i>
        </button>
        <button name="delete" value="${row['AnnID']}">
            <i class="fas fa-trash-alt"></i>
        </button>`;
        table.row.add([row['AnnID'], 
            row['Title'], 
            row['Type'], 
            row['StartDate'], 
            row['EndDate'], 
            (parseInt(row['Publish'])==1 ? `<span class='text-success'>刊登中</span>` : `<span class='text-secondary'>未刊登</span>`), 
            row['Clicks'], 
            (parseInt(row['Top'])==1 ? '✓' : ''), 
            row['ReleaseTime'], 
            action]).draw();
    });

    $('button[name="edit"]').click(async function (e) { 
        const data = {
            'AnnID': $(this).val()
            
        }
        const result = await getAnnouncement(data);
        $(`input[name=annID]`).val($(this).val());
        $(`input[name=action]`).val('update');
        $(`input[name=title]`).val(result['Title']);
        $(`select[name=type]`).val(result['Type']);
        $(`input[name=startDate]`).val(result['StartDate']);
        $(`input[name=endDate]`).val(result['EndDate']);
        $(`input[name=top]`).prop('checked', parseInt(result['Top']) == 1 ? true : false);
        $(`input[name=publish]`).prop('checked', parseInt(result['Publish']) == 1 ? true : false);
        $(`textarea[name=content]`).val(result['Content']);

    });
    $('button[name="delete"]').click(function (e) { 
        const data = {
            'AnnID': $(this).val()
        };
        removeAnnouncement(data);
        setAnnouncements(table);
    });
}

async function removeAnnouncement(data) {
    data['action'] = 'removeAnnouncement';
    try {
        const res = await Request().post('/public/index.php', Qs.stringify(data));
        const response = res['data'];
        console.log(response);
    } catch (error) {
        console.error(err); 
    }
}

export async function getAnnouncement(data) {
    data['action'] = 'getAnnouncement';
    try {
        const res = await Request().post('/public/index.php', Qs.stringify(data));
        const response = res['data'];
        console.log(response);
        const result = response['result'][0];
        return result;
    } catch (error) {
        console.error(error); 
    }
}

