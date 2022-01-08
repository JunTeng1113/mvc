export default function Request() {
    const req = axios.create({
        baseURL:'http://localhost/MVC/20220103/backend',
        headers: {
            'Authorization': window.localStorage.getItem("jwtToken")
        }
    });
    return req;
}