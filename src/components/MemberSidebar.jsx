import { NavLink } from "react-router-dom";
import {
  UserCircleIcon,
  WarningCircleIcon,
  CheckCircleIcon,
} from "@phosphor-icons/react";

export default function MemberSidebar({ isMobile }) {
  const userName = "林友善";
  const isIdentifyVerified = true; // 暫時手動切換
  const identifyIconSize = isMobile ? 18 : 20;

  const navClass = ({ isActive }) =>
    `member-side__link member-nav-pad ${isActive ? "is-active" : ""}`;

  return (
    <div className="card border-0 shadow-sm rounded-4 my-13 mx-9">
      <div className="card-body p-4">
        <div className="member-side__switch fs-5 mx-auto mt-13 mb-9">
          <button type="button" className="member-side__switchBtn is-active">
            接案
          </button>
          <button type="button" className="member-side__switchBtn">
            委託
          </button>
        </div>

        <div className="text-center">
          <div className="member-side__avatar mx-auto mb-5">
            <img
              src="public/memberInfo/user-photo-sm.png"
              alt="avatar"
              className="member-side__avatarImg"
            />
          </div>

          <div className="d-flex justify-content-center align-items-center gap-2 mb-5">
            <UserCircleIcon size={28} />
            <span className="fs-4 fw-medium">{userName}</span>
          </div>

          <NavLink
            to="info"
            className="btn member-btn-profile fw-bold py-4 px-13 mb-9 border border-secondary-500 border-2 rounded rounded-4"
          >
            管理個人資料
          </NavLink>
        </div>

        <hr className="border-2 border-secondary-500 mb-9" />

        <nav className="d-grid fs-5 fw-bold ls-1 gap-3 mb-13">
          <NavLink to="identify" className={navClass}>
            <div className="text-center">
              <div>身份驗證</div>
              <div
                className={`d-flex justify-content-center align-items-center gap-2 mt-2 ${
                  isIdentifyVerified
                    ? "member-status-success"
                    : "text-warning-500"
                }`}
              >
                {isIdentifyVerified ? (
                  <CheckCircleIcon size={identifyIconSize} weight="bold" />
                ) : (
                  <WarningCircleIcon size={identifyIconSize} weight="bold" />
                )}

                <span className="lh-base fs-6 fs-lg-5 fw-medium">
                  {isIdentifyVerified ? "已完成" : "尚未完成"}
                </span>
              </div>
            </div>
          </NavLink>

          <NavLink to="info" className={navClass}>
            個人專頁
          </NavLink>
          <NavLink to="/postselltime" className={navClass}>
            刊登服務
          </NavLink>
          <NavLink to="record" className={navClass}>
            交易紀錄
          </NavLink>
          <NavLink to="calendar" className={navClass}>
            行事曆
          </NavLink>
          <NavLink to="favorite" className={navClass}>
            我的收藏
          </NavLink>
        </nav>
      </div>
    </div>
  );
}
