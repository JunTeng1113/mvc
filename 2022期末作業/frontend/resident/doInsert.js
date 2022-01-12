import Request from "../request.js";
import residentInfo from "./residentInfo.js";

export default function doInsert(resName, phone, unitID) {
    let data = {
        'ResName': resName,
        'Phone': phone,
        'UnitID': unitID, 
        'action': 'newResident'
    };
    Request().post('/public/index.php', Qs.stringify(data))
    .then(res => {
        const response = res['data'];
        console.log(response);
        residentInfo();
        //新增成功
    })
    .catch(err => {
        console.error(err); 
    })

}