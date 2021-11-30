import startPage from "./startPage.js";
import cal from "./cal.js";

$(document).ready(function () {
    $("#root").html(startPage());
    $("#cal").click(function (e) { 
        const data = {
            "w1": $("#w1").val(), 
            "h1": $("#h1").val(), 
            "w2": $("#w2").val(), 
            "h2": $("#h2").val()
        }
        cal(data['w1'], data['h1'], data['w2'], data['h2']);
    });
});