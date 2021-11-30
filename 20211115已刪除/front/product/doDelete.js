export default function doDelete(id){
    let data = {
        "ProdId": id
    };
    axios.post("../../backend/index.php?action=removeProduct",Qs.stringify(data))
    .then(res => {
        let response = res['data'];
        $("#content").html(response['message']);
    })
    .catch(err => {
        console.error(err); 
    })          
}
