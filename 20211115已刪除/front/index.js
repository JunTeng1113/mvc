import employeeInfo from "./employeeInfo.js";
import productInfo from "./product/productInfo.js";
import startPage from "./startPage.js";

$(document).ready(function () {
    $('#root').html(startPage());

    $('#employee').click(function (e) { 
        employeeInfo();
    });

    $('#product').click(function (e) { 
        productInfo();
    });
});