//轉頁面後，頁面能從頂部開始瀏覽
//在Link裡加上State屬性
//state={{ backTop: true }} - 目前僅首頁卡片元件使用
import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export default function ScrollToTop() {
  const { pathname, state } = useLocation();

  useEffect(() => {
    // 只有當 state 帶有 fromHome 標記時，才執行捲動到頂部
    if (state?.backTop) {
      window.scrollTo(0, 0);
      
      // 選項：清除 state 標記，避免使用者點擊「重新整理」時頁面又跳回頂部
      window.history.replaceState({}, document.title);
    }
  }, [pathname, state]);

  return null;
}