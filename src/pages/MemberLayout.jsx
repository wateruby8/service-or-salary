import MemberSidebar from "../components/MemberSidebar";
import { useEffect, useState } from "react";
import { Outlet, useLocation } from "react-router-dom";

export default function MemberLayout() {
  const location = useLocation();
  const [isMobile, setIsMobile] = useState(
    typeof window !== "undefined" ? window.innerWidth < 992 : false
  );

  useEffect(() => {
    document.body.classList.add("bg-member-primary100");
    return () => document.body.classList.remove("bg-member-primary100");
  }, []);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 992);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const isInfoPage = location.pathname.endsWith("/info");

  const shouldShowSidebar = !isMobile || !isInfoPage;
  const shouldShowMain = !isMobile || isInfoPage;

  return (
    <div className="py-5">
      <div className="container">
        <div className="row g-4">
          {shouldShowSidebar && (
            <aside className="col-12 col-lg-3">
              <MemberSidebar isMobile={isMobile} />
            </aside>
          )}

          {shouldShowMain && (
            <main className="col-12 col-lg-9">
              <Outlet />
            </main>
          )}
        </div>
      </div>
    </div>
  );
}