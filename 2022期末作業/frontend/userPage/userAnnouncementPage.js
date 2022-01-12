import { getAnnouncement, getAnnouncements } from "../announcement/announcementPage.js";
import { delay } from "../assets/function.js";
import { modal } from "../modal.js";

function userAnnouncementPage() {
    let header = ``;
    header += ``;
    $('#header').html(header);
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
            <label for="" class='col-sm-3 text-end'>公告標題</label><span class='col-sm-8 small' name='title'></span>
        </div>
        <div class='row'>
            <label for="" class='col-sm-3 text-end'>公告類型</label><span class='col-sm-8 small' name='type'></span>
        </div>
        <div class='row'>
            <label for="" class='col-sm-3 text-end'>公告日</label><span class='col-sm-8 small' name='startDate'></span>
        </div>
        <div class='row'>
            <label for="" class='col-sm-3 text-end'>內容</label>
            <div class='col-sm-8 small' name='content'></div>
        </div>
    </div>`;
    content += modal(`announcementModal`, `公告內容`, modal_body);
    $(`#content`).html(content);
    $(document).on('click', `a[name='showContent']`, async function (e) { 
        const data = {
            'AnnID': $(this).attr('id')
        };
        const result = await getAnnouncement(data);
        const content = result['Content'].replace(/(\r\n|\n|\r)/gm, "<br>");
        $(`span[name='title']`).text(result['Title']);
        $(`span[name='type']`).text(result['Type']);
        $(`span[name='startDate']`).text(result['StartDate']);
        $(`div[name='content']`).html(content);
        $(`#announcementModal`).modal('show');
    });
    

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
            { "name": "Top", "title": "置頂", "width": "10%"},
            { "name": "AnnID", "title": "#", "width": "10%"},
            { "name": "Title", "title": "公告標題", "width": "25%"},
            { "name": "Type", "title": "公告類型"},
            { "name": "Clicks", "title": "點閱次數", "width": "10%"},
            { "name": "StartDate", "title": "公告日"}
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
}
async function setAnnouncements(table) {
    table.clear().draw();
    await delay(0.05);
    const result = await getAnnouncements();
    result.forEach(row => {
        table.row.add([
            (parseInt(row['Top'])==1 ? '✓' : ''), 
            row['AnnID'], 
            `<a href='#' name='showContent' id='${row['AnnID']}'>${row['Title']}</a>`, 
            row['Type'], 
            row['Clicks'], 
            row['StartDate']
        ]).draw();
    });
}



export {userAnnouncementPage}
