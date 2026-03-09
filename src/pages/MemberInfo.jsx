// 3-1. 接案者-個人專頁
import { NavLink } from "react-router-dom";
import { UploadSimpleIcon } from "@phosphor-icons/react";

export default function MemberInfo() {
  return (
    <section className="member-info card border-0 rounded-4">
      <div className="card-body">
        <div className="member-info__body">
          <div className="row py-14 pe-2">
            <div className="col-12 col-lg-8 px-13">
              <div className="d-flex align-items-start justify-content-between mb-14">
                <h2 className="member-info__title m-0 fw-bold fs-4 ls-1">
                  個人資料
                </h2>
                <p className="m-0 text-warning-500 fw-medium ls-1">
                  *為必填項目，請完整填寫
                </p>
              </div>

              <form className="d-grid">
                <div className="row g-0 member-info__row32">
                  <div className="col-12 col-md-6">
                    <label className="form-label fs-5 fw-medium ls-1 mb-4">
                      接案者暱稱<span className="text-warning-500">*</span>
                    </label>
                    <input
                      className="form-control member-info__input mb-13"
                      placeholder="請輸入內容"
                    />
                  </div>
                  <div className="col-12 col-md-6">
                    <label className="form-label fs-5 fw-medium ls-1 mb-4">
                      所在地
                    </label>
                    <select className="form-select member-info__input">
                      <option>台北市</option>
                      <option>新北市</option>
                      <option>桃園市</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="form-label fs-5 fw-medium ls-1 mb-4">
                    摘要簡介<span className="text-warning-500">*</span>
                  </label>
                  <div className="position-relative">
                    <input
                      className="form-control member-info__input mb-13"
                      placeholder="請用一句話介紹你的專長或服務亮點吧！"
                      maxLength={20}
                    />
                    <span className="member-info__counter text-neutral-500 fw-medium">
                      0/20
                    </span>
                  </div>
                </div>

                <div>
                  <label className="form-label fs-5 fw-medium ls-1 mb-4">
                    服務簡介<span className="text-warning-500">*</span>
                  </label>
                  <div className="position-relative">
                    <textarea
                      className="form-control member-info__input mb-13"
                      rows={5}
                      placeholder="請描述你的服務內容、經驗與特色，讓顧客更了解你。"
                      maxLength={500}
                    />
                    <span className="member-info__counter text-neutral-500 fw-medium">
                      0/500
                    </span>
                  </div>
                </div>

                <div>
                  <label className="form-label fs-5 fw-medium ls-1 mb-4">
                    技能標籤<span className="text-warning-500">*</span>
                  </label>
                  <div className="form-control member-info__input d-flex flex-wrap gap-2 align-items-center mb-13">
                    <span className="member-info__tag">
                      攝影 <span className="member-info__tagX">×</span>
                    </span>
                    <span className="member-info__tag">
                      老屋翻修 <span className="member-info__tagX">×</span>
                    </span>
                    <span className="member-info__tag">
                      台北 <span className="member-info__tagX">×</span>
                    </span>
                  </div>
                </div>

                <div>
                  <label className="form-label fs-5 fw-medium ls-1 mb-4">
                    上傳作品
                  </label>
                  <button
                    type="button"
                    className="btn w-100 member-info__uploadBtn fw-medium ls-1"
                  >
                    <UploadSimpleIcon
                      size={18}
                      weight="bold"
                      className="me-3"
                    />
                    上傳作品集或專案
                  </button>
                </div>
              </form>
            </div>

            <div className="col-12 col-lg-4 d-flex flex-column">
              <div className="member-info__avatarCard rounded-4 text-center">
                <div className="member-info__avatarWrap mx-auto mb-9">
                  <img
                    src="public/user-photo.png"
                    alt="avatar"
                    className="member-info__avatarImg"
                  />
                </div>

                <button
                  type="button"
                  className="btn py-4 px-13 fw-bold ls-1 member-btn member-btn--save d-inline-flex align-items-center justify-content-center"
                >
                  <UploadSimpleIcon size={18} weight="bold" className="me-3" />
                  更換大頭照
                </button>
              </div>

              <div className="d-flex justify-content-end mt-auto">
                <button
                  type="button"
                  className="btn py-4 px-13 me-7 fw-medium member-btn member-btn--back"
                >
                  返回
                </button>
                <button
                  type="button"
                  className="btn py-4 px-13 fw-medium member-btn member-btn--save"
                >
                  儲存
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
