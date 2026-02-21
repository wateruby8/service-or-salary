import { Link } from "react-router-dom";
import {
  InstagramLogoIcon,
  XLogoIcon,
  FacebookLogoIcon,
  EnvelopeIcon,
  ClockIcon,
  PhoneIcon
} from "@phosphor-icons/react";

const footerNav = [
  { label: "關於我們", to: "/" },
  { label: "賣家指南", to: "/" },
  { label: "買家須知", to: "/" },
  { label: "服務條款", to: "/" },
  { label: "隱私權政策", to: "/" },
];

export default function Footer() {
  return (
    <footer className="footer-desktop">
      <div className="container footer-desktop__inner">
        {/* Top */}
        <div className="row align-items-start">
          {/* Left */}
          <div className="col-lg-8">
            <div className="footer-desktop__brandRow">
              <Link to="/" className="footer-desktop__brand">
                <img
                  src="logo-full-dark.svg"
                  alt="時務所"
                  className="footer-desktop__logo"
                />
              </Link>

              <div className="footer-desktop__social">
                <a
                  href="#"
                  className="footer-desktop__socialLink"
                  aria-label="Instagram"
                >
                  <InstagramLogoIcon size={24} weight="bold" />
                </a>
                <a
                  href="#"
                  className="footer-desktop__socialLink"
                  aria-label="X"
                >
                  <XLogoIcon size={24} weight="bold" />
                </a>
                <a
                  href="#"
                  className="footer-desktop__socialLink"
                  aria-label="Facebook"
                >
                  <FacebookLogoIcon size={24} weight="bold" />
                </a>
              </div>
            </div>

            <ul className="footer-desktop__contact list-unstyled mb-0">
              <li className="footer-desktop__contactItem">
                <ClockIcon size={20} weight="regular" />
                <span>客服時間：週一至週五　10:00~19:00</span>
              </li>
              <li className="footer-desktop__contactItem">
                <EnvelopeIcon size={20} weight="regular" />
                <a
                  className="footer-desktop__contactLink"
                  href="mailto:TimeIsMoney@mail.com"
                >
                  TimeIsMoney@mail.com
                </a>
              </li>
              <li className="footer-desktop__contactItem">
                <PhoneIcon size={20} weight="regular" />
                <a
                  className="footer-desktop__contactLink"
                  href="tel:0223113731"
                >
                  02 - 2311 - 3731
                </a>
              </li>
            </ul>
          </div>

          {/* Right */}
          <div className="col-lg-4">
            <nav className="footer-desktop__nav">
              <ul className="list-unstyled mb-0">
                {footerNav.map((item) => (
                  <li key={item.label} className="footer-desktop__navItem">
                    <Link to={item.to} className="footer-desktop__navLink">
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          </div>
        </div>

        {/* Divider */}
        <hr className="footer-desktop__divider" />

        {/* Bottom */}
        <p className="footer-desktop__copyright mb-0">
          Copyright © 時務​所​ Service Or Salary​｜​此​網站​為學​習用，​不​具實​際用​途
        </p>
      </div>
    </footer>
  );
}
