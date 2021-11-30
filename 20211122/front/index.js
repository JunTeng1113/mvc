import employeeInfo from "./employeeInfo.js";
import startPage from "./startPage.js";

$(document).ready(function () {
    $('#root').html(startPage());

    $('#employee').click(function (e) { 
        employeeInfo();
    });
});