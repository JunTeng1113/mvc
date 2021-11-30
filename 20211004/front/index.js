import startPage from "./startPage.js";
import cal from "./cal.js";

$(document).ready(function () {
    $("#root").html(startPage());
    $("#cal").click(function (e) { 
        const data = {
            "w": $("#w").val(), 
            "h": $("#h").val(), 
            "r": $("#r").val(), 
            "m": $("#m").val()
        }
        cal(data['w'], data['h'], data['r'], data['m']);
    });
});