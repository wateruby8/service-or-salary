import MemberSidebar from "../components/MemberSidebar";
import { useEffect } from "react";
import { NavLink, Outlet } from "react-router-dom";

export default function MemberLayout() {
  useEffect(() => {
    document.body.classList.add("bg-member-primary100");
    return () => document.body.classList.remove("bg-member-primary100");
  }, []);

  return (
    <div className="py-5">
      <div className="container">
        <div className="row g-4">
          <aside className="col-12 col-lg-3">
            <MemberSidebar />
          </aside>

          <main className="col-12 col-lg-9">
            <Outlet />
          </main>
        </div>
      </div>
    </div>
  );
}