import { Link } from "react-router-dom";
import { useEffect, useMemo, useRef, useState } from "react";
import CreatableSelect from "react-select/creatable";
import {
  UploadSimpleIcon,
  WarningCircleIcon,
  CaretDownIcon,
} from "@phosphor-icons/react";

export default function MemberInfo() {
  const [form, setForm] = useState({
    nickname: "",
    summary: "",
    service: "",
    city: "台北市",
    skills: ["攝影", "設計"],
  });

  const [touched, setTouched] = useState({
    nickname: false,
    summary: false,
    service: false,
    skills: false,
  });

  const [submitAttempted, setSubmitAttempted] = useState(false);

  const errors = useMemo(() => {
    const next = { nickname: "", summary: "", service: "", skills: "" };

    if (!form.nickname.trim()) next.nickname = "此欄位為必填";
    if (!form.summary.trim()) next.summary = "此欄位為必填";
    if (!form.service.trim()) next.service = "此欄位為必填";
    if (!form.skills || form.skills.length === 0) next.skills = "此欄位為必填";

    return next;
  }, [form.nickname, form.summary, form.service, form.skills]);

  const showError = (name) =>
    (touched[name] || submitAttempted) && Boolean(errors[name]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleBlur = (e) => {
    const { name } = e.target;
    if (!name) return;
    setTouched((prev) => ({ ...prev, [name]: true }));
  };

  const handleSave = () => {
    setSubmitAttempted(true);

    const hasError = Boolean(
      errors.nickname || errors.summary || errors.service || errors.skills,
    );
    if (hasError) return;

    console.log("save payload:", form);
  };

  const cityOptions = [
    "台北市",
    "新北市",
    "基隆市",
    "桃園市",
    "新竹縣",
    "新竹市",
    "苗栗縣",
    "台中市",
    "彰化縣",
    "雲林縣",
    "南投縣",
    "嘉義縣",
    "嘉義市",
    "台南市",
    "高雄市",
    "屏東縣",
    "宜蘭縣",
    "花蓮縣",
    "台東縣",
    "金門",
    "馬祖",
    "澎湖",
    "蘭嶼",
    "綠島",
    "可遠端",
  ];
  const [cityOpen, setCityOpen] = useState(false);
  const [cityFocus, setCityFocus] = useState(0);
  const cityRef = useRef(null);

  useEffect(() => {
    const onDocDown = (e) => {
      if (!cityRef.current) return;
      if (!cityRef.current.contains(e.target)) setCityOpen(false);
    };
    document.addEventListener("mousedown", onDocDown);
    return () => document.removeEventListener("mousedown", onDocDown);
  }, []);

  useEffect(() => {
    if (!cityOpen) return;
    const idx = cityOptions.indexOf(form.city);
    setCityFocus(idx === -1 ? 0 : idx);
  }, [cityOpen, form.city]);

  const commitCity = (nextCity) => {
    setForm((prev) => ({ ...prev, city: nextCity }));
    setCityOpen(false);
  };

  const onCityKeyDown = (e) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      if (!cityOpen) return setCityOpen(true);
      commitCity(cityOptions[cityFocus]);
      return;
    }

    if (e.key === "Escape") return setCityOpen(false);

    if (!cityOpen && (e.key === "ArrowDown" || e.key === "ArrowUp")) {
      setCityOpen(true);
      return;
    }

    if (e.key === "ArrowDown") {
      e.preventDefault();
      setCityFocus((i) => Math.min(cityOptions.length - 1, i + 1));
    }

    if (e.key === "ArrowUp") {
      e.preventDefault();
      setCityFocus((i) => Math.max(0, i - 1));
    }
  };

  const [skillInput, setSkillInput] = useState("");

  const skillOptions = useMemo(
    () => [
      { value: "攝影", label: "攝影" },
      { value: "老屋翻修", label: "老屋翻修" },
      { value: "台北", label: "台北" },
      { value: "剪輯", label: "剪輯" },
      { value: "設計", label: "設計" },
    ],
    [],
  );

  const skillsValue = useMemo(
    () => form.skills.map((s) => ({ value: s, label: s })),
    [form.skills],
  );

  const setSkillsFromSelect = (next) => {
    const arr = (next || []).map((o) => o.value);
    setForm((prev) => ({ ...prev, skills: arr }));
  };

  const addSkill = (input) => {
    const v = input.trim();
    if (!v) return false;

    setForm((prev) => {
      if (prev.skills.includes(v)) return prev;
      return { ...prev, skills: [...prev.skills, v] };
    });

    return true;
  };

  return (
    <div className="mt-lg-13">
      <section className="member-info card border-0 rounded-4">
        <div className="card-body">
          <div className="member-info__body">
            <div className="row py-lg-14 pe-lg-2">
              <div className="col-12 col-lg-8 px-lg-13">
                <div className="member-info__mobileAvatarCard rounded-4 text-center py-13">
                  <div className="member-info__avatarWrap mx-auto mb-9 mb-lg-6">
                    <img
                      src={`${import.meta.env.BASE_URL}memberInfo/user-photo.png`}
                      alt="avatar"
                      className="member-info__avatarImg"
                    />
                  </div>

                  <button
                    type="button"
                    className="btn fw-bold ls-1 member-btn member-btn--save d-inline-flex align-items-center justify-content-center member-info__mobileAvatarBtn"
                  >
                    <UploadSimpleIcon
                      size={18}
                      weight="bold"
                      className="me-2"
                    />
                    更換大頭照
                  </button>
                </div>

                <div className="d-flex align-items-start justify-content-between mt-13 mb-11 mb-lg-14 member-info__heading">
                  <h2 className="member-info__title m-0 fw-bold fs-4 ls-1">
                    <span className="member-info__titleText">個人資料</span>
                  </h2>
                  <p className="m-0 text-warning-500 fw-medium ls-1">
                    *為必填項目，請完整填寫
                  </p>
                </div>

                <form className="d-grid" onSubmit={(e) => e.preventDefault()}>
                  <div className="row g-0 member-info__row32">
                    <div className="col-12 col-md-6">
                      <label className="form-label fs-5 fw-medium ls-1 mb-4">
                        接案者暱稱<span className="text-warning-500">*</span>
                      </label>

                      <div
                        className={`position-relative member-info__withHint ${
                          showError("nickname") ? "is-error" : ""
                        }`}
                      >
                        <input
                          name="nickname"
                          value={form.nickname}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          className="form-control member-info__input mb-9 mb-lg-13"
                          placeholder="請輸入內容"
                        />

                        {showError("nickname") && (
                          <span className="member-info__errorHint">
                            <WarningCircleIcon size={20} weight="bold" />
                            {errors.nickname}
                          </span>
                        )}
                      </div>
                    </div>

                    <div className="col-12 col-md-6">
                      <label className="form-label fs-5 fw-medium ls-1 mb-4">
                        所在地
                      </label>

                      <div className="member-select" ref={cityRef}>
                        <button
                          type="button"
                          className="member-select__control mb-9"
                          onClick={() => setCityOpen((v) => !v)}
                          onKeyDown={onCityKeyDown}
                          aria-haspopup="listbox"
                          aria-expanded={cityOpen}
                        >
                          <span className="member-select__value">
                            {form.city}
                          </span>
                          <span
                            className={`member-select__caret ${
                              cityOpen ? "is-open" : ""
                            }`}
                          >
                            <CaretDownIcon size={18} weight="bold" />
                          </span>
                        </button>

                        {cityOpen && (
                          <ul className="member-select__menu" role="listbox">
                            {cityOptions.map((opt, idx) => {
                              const selected = opt === form.city;
                              const focused = idx === cityFocus;

                              return (
                                <li
                                  key={opt}
                                  role="option"
                                  aria-selected={selected}
                                  className={[
                                    "member-select__option",
                                    selected ? "is-selected" : "",
                                    focused ? "is-focused" : "",
                                  ].join(" ")}
                                  onMouseEnter={() => setCityFocus(idx)}
                                  onMouseDown={(e) => {
                                    e.preventDefault();
                                    commitCity(opt);
                                  }}
                                >
                                  {opt}
                                </li>
                              );
                            })}
                          </ul>
                        )}
                      </div>
                    </div>
                  </div>

                  <div>
                    <label className="form-label fs-5 fw-medium ls-1 mb-4">
                      摘要簡介<span className="text-warning-500">*</span>
                    </label>

                    <div
                      className={`position-relative member-info__withHint ${
                        showError("summary") ? "is-error" : ""
                      }`}
                    >
                      <input
                        name="summary"
                        value={form.summary}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        className="form-control member-info__input mb-9 mb-lg-13"
                        placeholder="請用一句話介紹你的專長或服務亮點吧！"
                        maxLength={20}
                      />

                      {showError("summary") ? (
                        <span className="member-info__errorHint">
                          <WarningCircleIcon size={20} weight="bold" />
                          {errors.summary}
                        </span>
                      ) : (
                        <span className="member-info__counter text-neutral-500 fw-medium">
                          {form.summary.length}/20
                        </span>
                      )}
                    </div>
                  </div>

                  <div>
                    <label className="form-label fs-5 fw-medium ls-1 mb-4">
                      服務簡介<span className="text-warning-500">*</span>
                    </label>

                    <div
                      className={`position-relative member-info__withHint ${
                        showError("service") ? "is-error" : ""
                      }`}
                    >
                      <textarea
                        name="service"
                        value={form.service}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        className="form-control member-info__input mb-9 mb-lg-13"
                        rows={5}
                        placeholder="請描述你的服務內容、經驗與特色，讓顧客更了解你。"
                        maxLength={500}
                      />

                      {showError("service") ? (
                        <span className="member-info__errorHint member-info__errorHint--textarea">
                          <WarningCircleIcon size={20} weight="bold" />
                          {errors.service}
                        </span>
                      ) : (
                        <span className="member-info__counter text-neutral-500 fw-medium">
                          {form.service.length}/500
                        </span>
                      )}
                    </div>
                  </div>

                  <div>
                    <label className="form-label fs-5 fw-medium ls-1 mb-4">
                      技能標籤<span className="text-warning-500">*</span>
                    </label>

                    <div
                      className={`position-relative member-info__withHint ${
                        showError("skills") ? "is-error" : ""
                      }`}
                    >
                      <CreatableSelect
                        isMulti
                        isClearable={false}
                        placeholder="輸入後按 Enter 新增"
                        options={skillOptions}
                        menuIsOpen={false}
                        value={skillsValue}
                        onChange={(next) => {
                          setSkillsFromSelect(next);
                          setTouched((prev) => ({ ...prev, skills: true }));
                        }}
                        classNamePrefix="memberSelect"
                        className="member-selectBox mb-9 mb-lg-13"
                        components={{
                          DropdownIndicator: null,
                          IndicatorSeparator: null,
                        }}
                        inputValue={skillInput}
                        onInputChange={(val, meta) => {
                          if (meta.action === "input-change")
                            setSkillInput(val);
                        }}
                        onKeyDown={(e) => {
                          if (e.key !== "Enter" && e.key !== "Tab") return;

                          const created = addSkill(skillInput);
                          if (!created) return;

                          e.preventDefault();
                          setSkillInput("");
                          setTouched((prev) => ({ ...prev, skills: true }));
                        }}
                        onBlur={() =>
                          setTouched((prev) => ({ ...prev, skills: true }))
                        }
                      />

                      {showError("skills") && (
                        <span className="member-info__errorHint">
                          <WarningCircleIcon size={20} weight="bold" />
                          {errors.skills}
                        </span>
                      )}
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
                        className="me-lg-3"
                      />
                      上傳作品集或專案
                    </button>

                    <div className="member-info__mobileActions">
                      <Link
                        to="/"
                        className="btn fw-medium member-btn member-btn--back"
                      >
                        返回
                      </Link>
                      <button
                        type="button"
                        className="btn fw-medium member-btn member-btn--save"
                        onClick={handleSave}
                      >
                        儲存
                      </button>
                    </div>
                  </div>
                </form>
              </div>

              <div className="col-12 col-lg-4 d-flex flex-column">
                <div className="member-info__avatarCard member-info__desktopAvatarCard rounded-4 text-center">
                  <div className="member-info__avatarWrap mx-auto mb-lg-9">
                    <img
                      src={`${import.meta.env.BASE_URL}memberInfo/user-photo.png`}
                      alt="avatar"
                      className="member-info__avatarImg"
                    />
                  </div>

                  <button
                    type="button"
                    className="btn py-lg-4 px-lg-13 fw-bold ls-1 member-btn member-btn--save d-inline-flex align-items-center justify-content-center"
                  >
                    <UploadSimpleIcon
                      size={18}
                      weight="bold"
                      className="me-lg-3"
                    />
                    更換大頭照
                  </button>
                </div>

                <div className="d-flex justify-content-end mt-auto member-info__desktopActions">
                  <Link
                    to="/"
                    className="btn py-lg-4 px-lg-13 me-lg-7 fw-medium member-btn member-btn--back"
                  >
                    返回
                  </Link>
                  <button
                    type="button"
                    className="btn py-lg-4 px-lg-13 fw-medium member-btn member-btn--save"
                    onClick={handleSave}
                  >
                    儲存
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
