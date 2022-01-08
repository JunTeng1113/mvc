export default function doUpdate(){
    let data = {
        "SupplierId": $("#SupplierId").val(),
        "SupplierName": $("#SupplierName").val(),
        "Contact": $("#Contact").val(),
        "Phone": $("#Phone").val(),
        "Address": $("#Address").val()
    };
    axios.post("../backend/public/index.php?action=updateSupplier", Qs.stringify(data))
    .then(res => {
        let response = res['data'];
        $("#content").html(response['message']);
    })
    .catch(err => {
        console.error(err); 
    })
}
