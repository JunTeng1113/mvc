export default function startPage() {
    const startPage = `
        長方形：寬：<input type="text" id="w">高：<input type="text" id="h"><br>
        圓：半徑：<input type="text" id="r">倍率：<input type="text" id="m"><br>
        <button id="cal">計算</button>
        <div id="content"></div>
    `;
    return startPage;
}