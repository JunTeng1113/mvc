import doUpdate from './doUpdate.js';

export default function showUpdatePage(id) {
    let data = {
        "RoleId": id
    };
    axios.post("../backend/public/index.php?action=getRoles", Qs.stringify(data))
    .then(res => {
        let response = res['data'];
        switch(response['status']){
            case 200:
                const rows = response['result'];
                const row = rows[0];
                let str = `編號：<input type="text" id="RoleId" value="` + row['RoleId'] + `"><br>`;
                str += `名稱：<input type="text" id="RoleName" value="` + row['RoleName'] + `"><br>`;
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
