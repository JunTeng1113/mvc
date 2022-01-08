export default function doInsert() {
    let data = {
        "SupplierName": $("#SupplierName").val(),
        "Contact": $("#Contact").val(),
        "Phone": $("#Phone").val(),
        "Address": $("#Address").val()
    };
    axios.post('../backend/public/index.php?action=newSupplier', Qs.stringify(data))
    .then(res => {
        let response = res['data'];
        $('#content').html(response['message']);
    })
    .catch(err => {
        console.error(err); 
    })

}