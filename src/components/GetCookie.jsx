//用來讀取cookie資料

export default function GetCookie(name) {
    const reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");
    const arr = document.cookie.match(reg);
    if (arr) {
        // 使用 decodeURIComponent 取代 unescape，處理 URL 編碼更安全
        return decodeURIComponent(arr[2]);
    }
    return null;
}