import residentInfo from "./resident/residentInfo.js";
import startPage from "./startPage.js";

$(document).ready(function () {
    $('#root').html(startPage());

    $('#resident').click(function (e) { 
        residentInfo();
    });
});