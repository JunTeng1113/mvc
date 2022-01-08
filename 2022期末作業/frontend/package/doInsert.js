import packageInfo from "./package.js";

export default function doInsert() {
    let data = {
        'UnitID': $(`#packId`).val(),
        'RecipientName': $(`#packName`).val(),
        'Content': $(`#packContent`).val(),
        'Note': $(`#packNote`).val()
    };
    axios.post('../backend/index.php?action=newPackage', Qs.stringify(data))
    .then(res => {
        packageInfo();
    })
    .catch(err => {
        console.error(err); 
    })

}