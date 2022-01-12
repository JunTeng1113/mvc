import Request from "../request.js";
async function getUnitPackages(unitID, status) {
    const data = {
        'UnitID': unitID, 
        'status': status,
        'action': 'getUnitPackages'
    };

    try {
        const res = await Request().post('/public/index.php', Qs.stringify(data))
        const response = res['data'];
        console.log(response);
        switch (response['status']) {
            case 200:
                const result = response['result'];
                return result;
        
            default:
                console.log(response);
                break;
        }
    } catch (error) {
        console.err(error);
    }
}

export {getUnitPackages}