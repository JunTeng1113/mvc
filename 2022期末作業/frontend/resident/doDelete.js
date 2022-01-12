
import Request from "../request.js";
import showUnitPage from "./showUnitPage.js";

export default function doDelete(unitID, resName) {
    let data = {
        'UnitID': unitID,
        'ResName': resName,
        'action': 'removeResident'
    };
    Request().post('/public/index.php', Qs.stringify(data))
    .then(res => {
        const response = res['data'];
        console.log(response);
        showUnitPage(unitID);
        //刪除成功
    })
    .catch(err => {
        console.error(err); 
    })

}