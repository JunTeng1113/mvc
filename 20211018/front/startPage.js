export default function startPage() {
    const startPage = `
        長方形1：寬：<input type="text" id="w1">高：<input type="text" id="h1"><br>
        長方形2：寬：<input type="text" id="w2">高：<input type="text" id="h2"><br>
        <button id="cal">計算</button>
        <div id="content"></div>
    `;
    return startPage;
}