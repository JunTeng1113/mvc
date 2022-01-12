import Request from "../request.js";
import packageInfo from "./packagePage.js";

export default function doInsert(data) {
    data['action'] = 'newPackage';
    
    Request().post('/public/index.php', Qs.stringify(data))
    .then(res => {
        const response = res['data'];
        console.log(response)
        packageInfo();
    })
    .catch(err => {
        console.error(err); 
    })

}