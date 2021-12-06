
import showUnitPage from "./showUnitPage.js";

export default function doDelete(unitID, resName) {
    let data = {
        'UnitID': unitID,
        'ResName': resName
    };
    axios.post('../backend/index.php?action=removeResident', Qs.stringify(data))
    .then(res => {
        showUnitPage(unitID);
        //刪除成功
    })
    .catch(err => {
        console.error(err); 
    })

}