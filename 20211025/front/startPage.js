export default function startPage() {
    const startPage = `
        <button id="insert">新員工</button>
        <button id="update">修改員工資料</button>
        <button id="delete">員工離職</button>
        <button id="select">所有員工資料</button>
        <div id="content"></div>
    `;
    return startPage;
}