export default function doInsert() {
    let data = {
        "ProdId": $("#ProdId").val(),
        "ProdName": $("#ProdName").val(),
        "Cost": $("#Cost").val(),
        "UnitPrice": $("#UnitPrice").val(), 
        "Qty": $("#Qty").val()
    };
    axios.post('http://localhost/mvc/20211122作業/backend/index.php?action=newProduct', Qs.stringify(data))
    .then(res => {
        let response = res['data'];
        $('#content').html(response['message']);
    })
    .catch(err => {
        console.error(err); 
    })

}