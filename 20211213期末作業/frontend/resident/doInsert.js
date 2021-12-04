import residentInfo from "./residentInfo.js";

export default function doInsert() {
    let data = {
        'ResName': $(`#resName`).val(),
        'Phone': $(`#resPhone`).val(),
        'UnitID': $(`#resUnitId`).val()
    };
    axios.post('../backend/index.php?action=newResident', Qs.stringify(data))
    .then(res => {
        residentInfo();
    })
    .catch(err => {
        console.error(err); 
    })

}