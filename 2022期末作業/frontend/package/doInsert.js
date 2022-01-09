import Request from "../request.js";
import packageInfo from "./package.js";

export default function doInsert(data) {
    data['action'] = 'newPackage';
    
    Request().post('/public/index.php', Qs.stringify(data))
    .then(res => {
        packageInfo();
    })
    .catch(err => {
        console.error(err); 
    })

}