import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Bell, UserCircle } from "phosphor-react";

export default function Header() {
  const location = useLocation();
  const isHome = location.pathname === "/";

  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobile, setIsMobile] = useState(() =>
    typeof window !== "undefined" ? window.innerWidth < 768 : false
  );

  const [isLoggedIn] = useState(false); // 未登入
  // const [isLoggedIn] = useState(true); // 已登入
  const [userName] = useState("林友善");

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", handleResize);
    handleResize();

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (!isHome) {
      setIsScrolled(true);
      return;
    }

    let ticking = false;

    const onScroll = () => {
      if (ticking) return;
      ticking = true;

      window.requestAnimationFrame(() => {
        const triggerPoint = window.innerHeight * (2 / 3);
        setIsScrolled(window.scrollY > triggerPoint);
        ticking = false;
      });
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();

    return () => window.removeEventListener("scroll", onScroll);
  }, [isHome]);

  return (
    <header
      className={[
        "header",
        isHome ? "header--fixed header--overlay" : "header--static header--solid",
        isScrolled ? "header--scrolled" : "",
      ].join(" ")}
    >
      <div className="container">
        <div className="d-flex align-items-center justify-content-between header-height">
          <div className="header-item">
            <Link to="/" className="d-inline-block py-4 py-md-3" aria-label="回到首頁">
              <img
                src={`${import.meta.env.BASE_URL}${
                  isMobile ? "logo-full-light-sm.svg" : "logo-full-light.svg"
                }`}
                alt="時務所"
              />
            </Link>
          </div>

          <nav className="header-item">
            <ul className="d-flex list-unstyled mb-0 p-0 header-ls">
              <li>
                <Link
                  to="/postselltime"
                  className="header-link text-decoration-none p-4 py-md-3 px-md-5 fs-7 fs-md-4 fw-medium fw-md-bold"
                >
                  賣時間
                </Link>
              </li>
              <li>
                <Link
                  to="/postbuytime"
                  className="header-link text-decoration-none p-4 py-md-3 px-md-5 fs-7 fs-md-4 fw-medium fw-md-bold"
                >
                  買時間
                </Link>
              </li>
            </ul>
          </nav>

          <div className="header-item">
            {!isLoggedIn ? (
              <Link
                to="/login"
                className="header-link text-decoration-none p-4 fs-7 fw-medium fs-md-4 fw-md-bold header-ls"
              >
                {isMobile ? "登入" : "註冊 / 登入"}
              </Link>
            ) : (
              <div className="d-flex align-items-center p-2">
                <Link
                  to="/"
                  className="header-link text-decoration-none d-inline-flex align-items-center justify-content-center p-3 me-3 me-md-9"
                  aria-label="通知"
                >
                  <Bell size={isMobile ? 24 : 36} />
                </Link>

                <Link
                  to="/member"
                  className="header-link text-decoration-none d-inline-flex align-items-center justify-content-center p-3 header-ls"
                  aria-label="個人頁面"
                >
                  <UserCircle size={isMobile ? 24 : 36} />
                  <span className="ms-4 fs-4 fw-bold d-none d-md-inline">
                    {userName}
                  </span>
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}