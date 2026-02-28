import { Link, useLocation } from "react-router-dom";
import {
  InstagramLogoIcon,
  XLogoIcon,
  FacebookLogoIcon,
  EnvelopeIcon,
  ClockIcon,
  PhoneIcon,
} from "@phosphor-icons/react";

const footerNav = [
  { label: "關於我們", to: "/" },
  { label: "賣家指南", to: "/" },
  { label: "買家須知", to: "/" },
  { label: "服務條款", to: "/" },
  { label: "隱私權政策", to: "/" },
];

export default function Footer() {
  const { pathname } = useLocation();
  const isHome = pathname === "/";

  return (
    <footer
      className={`footer-desktop text-secondary-700 ${isHome ? "is-home" : "not-home"}`}
    >
      <div className="container pt-13 pt-md-9">
        <div className="row align-items-start">
          <div className="col-12 col-lg-4 order-0 order-lg-1">
            <nav className="text-center text-lg-end">
              <ul className="list-unstyled mb-11 mb-md-8">
                {footerNav.map((item) => (
                  <li
                    key={item.label}
                    className="fw-medium lh-base ls-2 mb-8 mb-md-4 mb-md-2"
                  >
                    <Link
                      to={item.to}
                      className="footer-link py-4 px-7 text-decoration-none"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          </div>

          <div className="col-12 col-lg-8 order-1 order-lg-0">
            <div className="d-flex flex-column flex-lg-row align-items-center align-items-lg-center mb-13 mb-lg-8">
              <Link
                to="/"
                className="d-inline-flex align-items-center text-decoration-none text-reset mb-7 me-lg-11 mb-lg-0"
              >
                <img
                  src="logo-full-dark.svg"
                  alt="時務所"
                  className="d-none d-lg-block"
                />
                <img
                  src="logo-full-dark-sm.svg"
                  alt="時務所"
                  className="d-block d-lg-none"
                />
              </Link>

              <div className="d-inline-flex align-items-center justify-content-center gap-9 gap-lg-5">
                <a
                  href="#"
                  className="d-inline-flex align-items-center justify-content-center text-reset text-decoration-none"
                  aria-label="Instagram"
                >
                  <InstagramLogoIcon
                    size={40}
                    weight="bold"
                    className="footer-socialLink d-block d-lg-none"
                  />
                  <InstagramLogoIcon
                    size={32}
                    weight="bold"
                    className="footer-socialLink d-none d-lg-block"
                  />
                </a>

                <a
                  href="#"
                  className="d-inline-flex align-items-center justify-content-center text-reset text-decoration-none"
                  aria-label="X"
                >
                  <XLogoIcon
                    size={40}
                    weight="bold"
                    className="footer-socialLink d-block d-lg-none"
                  />
                  <XLogoIcon
                    size={32}
                    weight="bold"
                    className="footer-socialLink d-none d-lg-block"
                  />
                </a>

                <a
                  href="#"
                  className="d-inline-flex align-items-center justify-content-center text-reset text-decoration-none"
                  aria-label="Facebook"
                >
                  <FacebookLogoIcon
                    size={40}
                    weight="bold"
                    className="footer-socialLink d-block d-lg-none"
                  />
                  <FacebookLogoIcon
                    size={32}
                    weight="bold"
                    className="footer-socialLink d-none d-lg-block"
                  />
                </a>
              </div>
            </div>

            <ul className="list-unstyled mb-0 d-flex flex-column gap-3 gap-lg-2 fw-medium lh-base ls-2 align-items-center align-items-lg-start">
              <li className="d-flex align-items-center gap-5 justify-content-center justify-content-lg-start">
                <ClockIcon size={24} weight="regular" />
                <span>客服時間：週一至週五　10:00~19:00</span>
              </li>
              <li className="d-flex align-items-center gap-5 justify-content-center justify-content-lg-start">
                <EnvelopeIcon size={24} weight="regular" />
                <a
                  className="text-decoration-none footer-link"
                  href="mailto:TimeIsMoney@mail.com"
                >
                  TimeIsMoney@mail.com
                </a>
              </li>
              <li className="d-flex align-items-center gap-5 justify-content-center justify-content-lg-start">
                <PhoneIcon size={24} weight="regular" />
                <a
                  className="text-decoration-none footer-link"
                  href="tel:0223113731"
                >
                  02 - 2311 - 3731
                </a>
              </li>
            </ul>
          </div>
        </div>

        <hr className="footer-divider mt-11 mb-9 mt-lg-7 mb-lg-7" />

        <p className="text-center text-neutral-500 fw-medium fs-lg-6 lh-base ls-2 pb-lg-9 mb-0 d-none d-md-block">
          Copyright © 時務​所​ Service Or
          Salary​｜​此​網站​為學​習用，​不​具實​際用​途
        </p>
        <p className="text-center text-neutral-500 fw-medium fs-7 lh-base ls-2 pb-9 mb-0 d-block d-md-none">
          Copyright © 時務​所​ Service Or Salary​
          <br />
          ​此​網站​為學​習用，​不​具實​際用​途
        </p>
      </div>
    </footer>
  );
}
