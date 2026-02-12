import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);

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

  // 背景目前有底色 記得到時改成透明的
  return (
    <header
      className={`header header--sticky ${isScrolled ? "header--scrolled" : ""}`}
    >
      <div className="container">
        <div className="d-flex align-items-center justify-content-between header-height">
          {/* Logo */}
          <div>
            <Link to="/" className="d-inline-block">
              <img
                src={`${import.meta.env.BASE_URL}logo_light_01.svg`}
                alt="時務所"
                style={{ height: "40px" }}
              />
            </Link>
          </div>

          {/* 主導覽 */}
          <nav>
            <ul className="d-flex fs-4 ls-2 fw-bold mb-0 list-unstyled">
              <li>
                <a href="/" className="header-link me-5 text-decoration-none">
                  賣時間
                </a>
              </li>
              <li>
                <a href="/" className="header-link text-decoration-none">
                  買時間
                </a>
              </li>
            </ul>
          </nav>

          {/* 註冊 / 登入 */}
          <div className="fs-4 ls-2">
            <a href="/" className="header-link text-decoration-none">
              註冊 / 登入
            </a>
          </div>
        </div>
      </div>
    </header>
  );
}