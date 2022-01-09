export default function Request() {
    const req = axios.create({
        baseURL:'http://localhost/MVC/2022期末作業/backend',
        headers: {
            'Authorization': window.localStorage.getItem("jwtToken")
        }
    });
    return req;
}