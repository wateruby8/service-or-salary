import { NavLink } from "react-router-dom";

export default function Footer() {
  return (
    <>
      <NavLink to="/about"> 關於我們 </NavLink>
      <NavLink to="/sellguide"> 賣家指南 </NavLink>
      <NavLink to="/buyguide"> 買家須知 </NavLink>
      <NavLink to="/servicerule"> 服務條款 </NavLink>
      <NavLink to="/policy"> 隱私政策 </NavLink>
    </>
  );
}
