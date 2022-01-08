export default function doDelete(id){
    let data = {
        "SupplierId": id
    };
    axios.post("../backend/public/index.php?action=removeSupplier",Qs.stringify(data))
    .then(res => {
        let response = res['data'];
        $("#content").html(response['message']);
    })
    .catch(err => {
        console.error(err); 
    })          
}
