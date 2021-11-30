import doSelect from "./doSelect.js";
import showInsertPage from "./showInsertPage.js";
import { showDeleteList, showUpdateList } from "./showList.js";
import startPage from "./startPage.js";

$(document).ready(function () {
    $('#root').html(startPage);

    $('#insert').click(function (e) { 
        showInsertPage();
    });

    $('#update').click(function (e) { 
        showUpdateList();
    });

    $('#delete').click(function (e) { 
        showDeleteList();
    });

    $('#select').click(function (e) { 
        doSelect();
    });
});