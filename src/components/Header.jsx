// 2/7 建立基本結構

export default function Header() {
  return (
    <header className="border-bottom">
      <div className="container">
        <div className="d-flex align-items-center justify-content-between py-3">

          {/* Logo */}
          <div className="header-logo">
            <a href="/" className="text-decoration-none fw-bold">
              LOGO
            </a>
          </div>

          {/* 主導覽 */}
          <nav className="header-nav">
            <ul className="d-flex gap-4 mb-0 list-unstyled">
              <li>
                <a href="/sell-time" className="text-decoration-none">
                  賣時間
                </a>
              </li>
              <li>
                <a href="/buy-time" className="text-decoration-none">
                  買時間
                </a>
              </li>
            </ul>
          </nav>

          {/* 註冊 / 登入 */}
          <div className="header-auth">
            <a href="/login" className="text-decoration-none">
              註冊 / 登入
            </a>
          </div>

        </div>
      </div>
    </header>
  );
}