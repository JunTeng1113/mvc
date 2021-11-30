export default function cal(w1, h1, w2, h2) {
    const data = {
        "w1": w1, 
        "h1": h1, 
        "w2": w2, 
        "h2": h2
    }
    console.log(data);
    axios.post("../backend/index.php?action=TwoRectArea", Qs.stringify(data))
    .then(res => {
        const response = res['data'];
        console.log(response);
        if (response['status'] == 200) {
            const html = `
            長方形1的面積：${response['result'][0]} <br>
            長方形2的面積：${response['result'][1]}`;
            $('#content').html(html);
        }
    })
    .catch(err => {
        console.error(err); 
    })
}