import showUnitPage from "./showUnitPage.js";

export default function doUpdate(data){
    axios.post("../backend/index.php?action=updateResident", Qs.stringify(data))
    .then(res => {
        const response = res['data'];
        switch (response['status']) {
            case 200:
                console.log('更新成功');
                showUnitPage(data['UnitID']);
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
