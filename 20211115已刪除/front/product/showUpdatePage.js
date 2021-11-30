import doUpdate from './doUpdate.js';

export default function showUpdatePage(id) {
    let data = {
        "ProdId": id
    };
    axios.post("../../backend/index.php?action=getProducts", Qs.stringify(data))
    .then(res => {
        let response = res['data'];
        switch(response['status']){
            case 200:
                const rows = response['result'];
                const row = rows[0];
                let str = `編號：<input type="text" id="ProdId" value="` + row['ProdId'] + `"><br>`;
                str += `名稱：<input type="text" id="ProdName" value="` + row['ProdName'] + `"><br>`;
                str += `成本：<input type="text" id="Cost" value="` + row['Cost'] + `"><br>`;
                str += `單價：<input type="text" id="UnitPrice" value="` + row['UnitPrice'] + `"><br>`;
                str += `數量：<input type="text" id="Qty" value="` + row['Qty'] + `"><br>`;
                str += `<button id="doUpdate">修改</button>`;
                $("#content").html(str);
                $("#doUpdate").click(function(){
                    doUpdate();
                });
                break;
            default:
                $("#content").html(response['message']);
                break;
        }
    })
    .catch(err => {
        console.error(err); 
    })          
}
