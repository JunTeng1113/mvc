export default function startPage(){
    const sp = `
        <button id="employee">員工資料</button>
        <button id="product">產品資料</button>
        <button id="order">訂單資料</button>
        <div id="content"></div>
    `;
    $("#root").html(sp);
    $("#employee").click(function (e) { 
        e.preventDefault();
        
    });
    $("#product").click(function (e) { 
        e.preventDefault();
        
    });
    $("#order").click(function (e) { 
        e.preventDefault();
        
    });
    // 省略
}
