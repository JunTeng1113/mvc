import employeeInfo from "./user/employeeInfo.js";
import productInfo from "./product/productInfo.js";
import roleInfo from "./role/roleInfo.js";
import supplierInfo from "./supplier/supplierInfo.js";
import startPage from "./startPage.js";

$(document).ready(function () {
    $('#root').html(startPage());

    $('#employee').click(function (e) { 
        employeeInfo();
    });

    $('#product').click(function (e) { 
        productInfo();
    });

    $('#role').click(function (e) { 
        roleInfo();
    });

    $('#supplier').click(function (e) { 
        supplierInfo();
    });
});