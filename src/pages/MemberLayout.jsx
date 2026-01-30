import { NavLink, Outlet } from "react-router-dom";

export default function MemberLayout() {
  return (
    <div>
      <NavLink to="identify"> 身分驗證 </NavLink>
      <NavLink to="info"> 個人專頁 </NavLink>
      <NavLink to="/postselltime"> 刊登服務 </NavLink>
      <NavLink to="record"> 交易紀錄 </NavLink>
      <NavLink to="calendar"> 行事曆 </NavLink>
      <NavLink to="favorite"> 我的收藏 </NavLink>

      <Outlet />
    </div>
  );
}
