import doUpdate from './doUpdate.js';

export default function showUpdatePage(id) {
    let data = {
        "SupplierId": id
    };
    axios.post("../backend/index.php?action=getSuppliers", Qs.stringify(data))
    .then(res => {
        let response = res['data'];
        switch(response['status']){
            case 200:
                const rows = response['result'];
                const row = rows[0];
                let str = `供應商編號：<input type="text" id="SupplierId" value="` + row['SupplierId'] + `"><br>`;
                str += `名稱：<input type="text" id="SupplierName" value="` + row['SupplierName'] + `"><br>`;
                str += `聯絡人：<input type="text" id="Contact" value="` + row['Contact'] + `"><br>`;
                str += `電話：<input type="text" id="Phone" value="` + row['Phone'] + `"><br>`;
                str += `地址：<input type="text" id="Address" value="` + row['Address'] + `"><br>`;
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
