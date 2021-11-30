export default function cal(w, h, r, m) {
    const data = {
        "w": w, 
        "h": h, 
        "r": r, 
        "m": m
    }
    console.log(data);
    axios.post("../backend/main.php", Qs.stringify(data))
    .then(res => {
        let response = res['data'];
        let content = 
        `長方形：長： ${response['rectHeight']} 寬： ${response['rectWidth']}<br>
         　　　　面積：${response['rectArea']} 邊長：${response['rectLength']}<br>
         　　圓：半徑： ${response['roundRadius']} 倍率： ${response['roundM']}<br>
         　　　　面積：${response['roundArea']} 周長：${response['roundCircumference']}<br>`;
        $("#content").html(content);
    })
    .catch(err => {
        console.error(err); 
    })
}