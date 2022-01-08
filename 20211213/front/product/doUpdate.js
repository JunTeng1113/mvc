export default function doUpdate(){
    let data = {
        "ProdId": $("#ProdId").val(),
        "ProdName": $("#ProdName").val(),
        "Cost": $("#Cost").val(),
        "UnitPrice": $("#UnitPrice").val(),
        "Qty": $("#Qty").val()
    };
    axios.post('../backend/public/index.php?action=updateProduct', Qs.stringify(data))
    .then(res => {
        let response = res['data'];
        $("#content").html(response['message']);
    })
    .catch(err => {
        console.error(err); 
    })
}
