import { modal } from "../modal.js";

export default function announcementPage() {
    let header = ``;
    let content = ``;
    content += `<div class='container'>`;
    content += `<button class="btn btn-primary btn-sm" id="addAnnouncement" data-toggle="modal" data-target="#announcementModal">新增公告</button>`;
    content += `
    <table id='announcementTable'>
        <thead>
            <tr>
                <th>#</th>
                <th>公告標題</th>
                <th>公告類型</th>
                <th>公告起日</th>
                <th>公告迄日</th>
                <th>狀態</th>
                <th>人氣</th>
                <th>置頂</th>
                <th>建立時間</th>
                <th>操作</th>
            </tr>
        </thead>
        <tbody>
        </tbody>
    </table>`;
    content += `</div>`;

    const modal_body = `
    <div class='card'>
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
            <label for="s1" class='col-sm-6'><input type="checkbox" name="top" id="s1" value="1">是</label>
        </div>
        <div class='row'>
            <label for="" class='col-sm-3 text-end'>是否刊登</label>
            <label for="s2" class='col-sm-6'><input type="checkbox" name="publish" id="s2" value="1">是</label>
        </div>
        <div class='row'>
            <label for="" class='col-sm-3 text-end'>內容</label>
            <textarea name="content" class='col-sm-6' id="" rows="10" maxlength='128' style="resize: none;" placeholder='內容'></textarea>
        </div>
    </div>`;

    content += modal(`announcementModal`, `新增公告`, modal_body);
    $(`#headerBar`).html(header);
    $('#content').html(content);

    $(`#announcementTable`).DataTable({
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
    }});

    $('#confirmModal').click(function (e) { 
        const data = {
            'title': $(`input[name=title]`).val(),
            'type': $(`select[name=type]`).val(),
            'startDate': $(`input[name=startDate]`).val(),
            'endDate': $(`input[name=endDate]`).val(),
            'top': $(`input[name=top]`).val(),
            'publish': $(`input[name=publish]`).val(),
            'content': $(`textarea[name=content]`).val()
        }
        console.log(data);
    });
    

}

