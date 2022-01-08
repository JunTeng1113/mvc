import residentInfo from "./residentInfo.js";

export default function doInsert(resName, phone, unitID) {
    let data = {
        'ResName': resName,
        'Phone': phone,
        'UnitID': unitID
    };
    axios.post('../backend/index.php?action=newResident', Qs.stringify(data))
    .then(res => {
        residentInfo();
        //新增成功
    })
    .catch(err => {
        console.error(err); 
    })

}