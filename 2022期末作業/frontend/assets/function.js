import Request from "../request.js";

export function delay(n){
    return new Promise(function(resolve){
        setTimeout(resolve,n*1000);
    });
}



export async function getUserInfo() {
    try {
        const data = {
            'action': 'getUserInfo'
        }
        const res = await Request().post('/public/index.php', Qs.stringify(data));
        const response = res['data'];
        console.log(response);
        return response;
    } catch (error) {
        console.log(error);
    }
}