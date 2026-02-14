import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobile, setIsMobile] = useState(() =>
    typeof window !== "undefined" ? window.innerWidth < 768 : false
  );

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);

    window.addEventListener("resize", handleResize);
    handleResize();

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
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
  }, []);

  return (
    <header
      className={`header header--sticky ${isScrolled ? "header--scrolled" : ""}`}
    >
      <div className="container">
        <div className="d-flex align-items-center justify-content-between header-height">
          {/* Logo */}
          <div className="header-item">
            <Link to="/" className="d-inline-block">
              <img
                src={`${import.meta.env.BASE_URL}${
                  isMobile ? "logo-full-light-sm.svg" : "logo-full-light.svg"
                }`}
                alt="時務所"
              />
            </Link>
          </div>

          {/* 主導覽 */}
          <nav className="header-item">
            <ul className="d-flex list-unstyled mb-0 header-nav-text">
              <li>
                <Link to="/" className="header-link text-decoration-none">
                  賣時間
                </Link>
              </li>
              <li>
                <Link to="/" className="header-link text-decoration-none">
                  買時間
                </Link>
              </li>
            </ul>
          </nav>

          {/* 登入 */}
          <div className="header-item header-auth-text">
            <Link to="/" className="header-link text-decoration-none">
              {isMobile ? "登入" : "註冊 / 登入"}
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}