// 3-1-2. 接案者-刊登服務賣時間
import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
// FullCalendar React
import FullCalendar from "@fullcalendar/react";
// FullCalendar plugins
import timeGridPlugin from "@fullcalendar/timegrid"; // 週 + 日
import dayGridPlugin from "@fullcalendar/daygrid"; // 月
import listPlugin from "@fullcalendar/list"; // 待辦事項
import interactionPlugin, { Draggable } from "@fullcalendar/interaction"; // 拖拉
// FullCalendar 樣式
import bootstrap5Plugin from "@fullcalendar/bootstrap5";
// FullCalendar 語系
import twLocale from "@fullcalendar/core/locales/zh-tw";
// noUiSlider
import noUiSlider from "nouislider";
import "nouislider/dist/nouislider.css";

const API_URL = import.meta.env.VITE_API_URL;

const schema = z
  .object({
    serviceTitle: z.string().min(1, "請輸入服務名稱"),
    categoryId: z.string().min(1, "請選擇服務分類"),
    subCategoryId: z.string().min(1, "請選擇服務細項"),
    serviceDetail: z.string().min(1, "請輸入服務內容"),
    serviceLocations: z.array(z.string()).min(1, "至少選一個地區"),
    serviceTime: z.object({
      acceptAnytime: z.boolean(),
      times: z.array(
        z.object({
          id: z.string(),
          startTime: z.string(),
          endTime: z.string(),
        }),
      ),
    }),
  })
  .refine(
    (data) =>
      data.serviceTime.acceptAnytime || data.serviceTime.times.length > 0,
    {
      message: "請設定至少一個服務時間或勾選可接受聊天室預約",
      path: ["serviceTime"], // 對應 react-hook-form 的錯誤訊息位置
    },
  );

export default function PostSellTime() {
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    control,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      serviceTitle: "",
      categoryId: "",
      subCategoryId: "",
      serviceDetail: "",
      serviceLocations: [],
      serviceTags: [],
      minPrice: 100,
      maxPrice: 10000,
      serviceTime: { acceptAnytime: false, times: [] },
      serviceKeywords: "",
      demoLink: "",
    },
  });

  const [categories, setCategories] = useState([]);
  const [subCategories, setSubCategories] = useState([]);
  const [loadingSub, setLoadingSub] = useState(false);
  const [showDraggable, setShowDraggable] = useState(false);

  const sliderRef = useRef(null);
  const dragRef = useRef(null);

  const categoryId = watch("categoryId");
  const serviceTime = watch("serviceTime");

  /** 初始化拖拉事件 */
  useEffect(() => {
    if (!showDraggable || !dragRef.current) return;

    const draggable = new Draggable(dragRef.current, {
      itemSelector: ".fc-event",
      eventData: (eventEl) => {
        const data = JSON.parse(eventEl.getAttribute("data-event"));
        return { title: data.title, duration: data.duration };
      },
    });

    return () => draggable.destroy();
  }, [showDraggable]);

  /** 取得分類 */
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await fetch(`${API_URL}/categories`);
        const data = await res.json();
        setCategories(data || []);
      } catch (err) {
        console.error("分類載入失敗", err);
      }
    };
    fetchCategories();
  }, []);

  /** 取得子分類 */
  useEffect(() => {
    if (!categoryId) {
      setSubCategories([]);
      setValue("subCategoryId", "");
      return;
    }

    const fetchSub = async () => {
      setLoadingSub(true);
      try {
        const res = await fetch(
          `${API_URL}/categories/${categoryId}/subcategories`,
        );
        const data = await res.json();
        setSubCategories(data);
      } catch (err) {
        console.error("子分類載入失敗", err);
      } finally {
        setLoadingSub(false);
      }
    };

    fetchSub();
  }, [categoryId, setValue]);

  /** 初始化價格 slider */
  useEffect(() => {
    if (!sliderRef.current) return;

    const slider = noUiSlider.create(sliderRef.current, {
      start: [watch("minPrice") || 100, watch("maxPrice") || 1000],
      connect: true,
      step: 100,
      range: {
        min: 0,
        max: 99999,
      },
    });

    slider.on("update", (values) => {
      setValue("minPrice", Math.round(values[0]));
      setValue("maxPrice", Math.round(values[1]));
    });

    return () => slider.destroy();
  }, [setValue]);

  useEffect(() => {
    if (!sliderRef.current?.noUiSlider) return;

    let min = Number(watch("minPrice")) || 0;
    let max = Number(watch("maxPrice")) || 0;

    if (min > max) {
      max = min;
      setValue("maxPrice", max);
    }

    sliderRef.current.noUiSlider.set([min, max]);
  }, [watch("minPrice"), watch("maxPrice"), setValue]);

  /** FullCalendar eventClick */
  const handleEventClick = (info) => {
    if (info.jsEvent.target.classList.contains("fc-delete-btn")) {
      info.event.remove();
      const updatedTimes = serviceTime.times.filter(
        (t) => t.id !== info.event.id,
      );
      setValue("serviceTime", { ...serviceTime, times: updatedTimes });
    }
  };

  /** FullCalendar eventReceive（拖拉事件新增） */
  const handleEventReceive = (info) => {
    const id = crypto.randomUUID();
    const start = info.event.start || new Date();
    const end = new Date(start.getTime() + 60 * 60 * 1000);

    info.event.setStart(start);
    info.event.setEnd(end);
    info.event.setProp("id", id);

    const newTimes = [
      ...serviceTime.times,
      { id, startTime: start.toISOString(), endTime: end.toISOString() },
    ];
    setValue("serviceTime", { ...serviceTime, times: newTimes });
  };

  /** 點擊日期 */
  const handleDateClick = (info) => {
    const id = crypto.randomUUID();
    const newTimes = [
      ...serviceTime.times,
      { id, startTime: info.dateStr, endTime: info.dateStr },
    ];
    setValue("serviceTime", { ...serviceTime, times: newTimes });
  };

  /** checkbox 變更 */
  const handleCheckbox = (name, value, checked) => {
    const arr = watch(name) || [];
    const updated = checked ? [...arr, value] : arr.filter((v) => v !== value);
    setValue(name, updated);
  };

  /** 表單提交 */
  const onSubmit = async (data) => {
    try {
      const dataToSend = {
        ...data,
        minPrice: watch("minPrice"),
        maxPrice: watch("maxPrice"),
        serviceTags: watch("serviceTags"),
        serviceKeywords: watch("serviceKeywords"),
        serviceTime: watch("serviceTime"),
        demoLink: data.demoLink,
      };

      const res = await fetch(`${API_URL}/services`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(dataToSend),
      });

      if (!res.ok) throw new Error("上傳失敗");

      const result = await res.json();
      alert("服務刊登成功！");
      reset();
    } catch (err) {
      console.error(err);
      alert("上傳失敗，請稍後再試");
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="container">
      <div className="d-flex justify-content-between align-items-center mt-13">
        <h3 className="member-info__titleText mb-7 ">服務刊登</h3>
        <p className="text-warning-500">*為必填項目，請完整填寫</p>
      </div>
      <div className="mb-13 my-calendar">
        <FullCalendar
          plugins={[
            timeGridPlugin,
            dayGridPlugin,
            listPlugin,
            interactionPlugin,
            bootstrap5Plugin,
          ]}
          initialView="timeGridWeek"
          themeSystem="bootstrap5"
          locale={twLocale}
          // 標題列擺設順序
          headerToolbar={{
            left: "prev,next",
            center: "title",
            right: "dayGridMonth,timeGridWeek,timeGridDay,listWeek",
          }}
          // 自訂按鈕名稱
          buttonText={{
            prev: "<",
            next: ">",
            month: "月",
            week: "週",
            day: "日",
            listWeek: "待辦事項",
          }}
          droppable={true}
          editable={true}
          selectable={true}
          eventReceive={handleEventReceive}
          dateClick={handleDateClick}
          eventClick={handleEventClick}
        />
      </div>
      <div className="mb-13">
        <div className="mb-11">
          <h5 className="mb-4">
            服務時間<span className="required text-warning-500">*</span>
          </h5>
          <input
            className="me-2"
            type="checkbox"
            value="free"
            id="free"
            checked={serviceTime.acceptAnytime}
            onChange={(e) =>
              setValue("serviceTime", {
                ...serviceTime,
                acceptAnytime: e.target.checked,
              })
            }
          />
          <label className="mb-4" htmlFor="free">
            可接受聊天室預約其他時間
          </label>
          {!showDraggable && (
            <button
              type="button"
              className="btn btn-secondary-500 mb-3 d-block"
              onClick={() => setShowDraggable(true)}
            >
              + 新增服務時間
            </button>
          )}

          {showDraggable && (
            <div
              ref={dragRef}
              id="external-events"
              style={{
                padding: "10px",
              }}
            >
              {serviceTime.times.map((t, index) => {
                const start = new Date(t.startTime);
                const end = new Date(t.endTime);

                const format = (d) =>
                  `${d.getFullYear()}/${(d.getMonth() + 1)
                    .toString()
                    .padStart(2, "0")}/${d
                    .getDate()
                    .toString()
                    .padStart(2, "0")} ${d
                    .getHours()
                    .toString()
                    .padStart(2, "0")}:${d
                    .getMinutes()
                    .toString()
                    .padStart(2, "0")}`;

                return (
                  <p key={t.id} className="text-sm mb-1">
                    時段 {index + 1}: {format(start)} 至 {format(end)}
                  </p>
                );
              })}

              <div
                className="fc-event bg-primary-300"
                data-event='{"title":"時段一","duration":3600}'
                style={{
                  width: "200px",
                  borderRadius: "5px",
                  margin: "10px 0",
                  padding: "10px",
                  color: "primary-300",
                  cursor: "grab",
                  textAlign: "center",
                }}
              >
                拖拉我至行事曆建立時段
              </div>
            </div>
          )}

          {errors.serviceTime && (
            <p className="text-danger mt-2">{errors.serviceTime.message}</p>
          )}
        </div>

        <div className="mb-11">
          <h5 className="mb-4">
            服務種類<span className="required text-warning-500">*</span>
          </h5>
          <div className="row">
            <div className="col-12 col-md-6 mb-3">
              <select
                {...register("categoryId", {
                  onChange: (e) => {
                    setValue("subCategoryId", "");
                  },
                })}
                className="border rounded w-100 py-4 px-5"
              >
                <option value="">
                  {categories.length === 0 ? "載入中..." : "選擇服務分類"}
                </option>
                {categories.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.heading}
                  </option>
                ))}
              </select>
              {errors.categoryId && (
                <p className="text-danger">{errors.categoryId.message}</p>
              )}
            </div>
            <div className="col-12 col-md-6">
              <select
                {...register("subCategoryId")}
                id="subCategoryId"
                className="border rounded w-100 py-4 px-5"
                disabled={!categoryId || loadingSub}
              >
                <option value="">
                  {loadingSub ? "載入中..." : "選擇服務細項"}
                </option>

                {subCategories.map((sub) => (
                  <option key={sub.id} value={sub.id}>
                    {sub.name}
                  </option>
                ))}
              </select>
              {errors.subCategoryId && (
                <p className="text-danger">{errors.subCategoryId.message}</p>
              )}
            </div>
          </div>
        </div>

        <div className="mb-11">
          <h5 className="mb-4">
            服務名稱<span className="required text-warning-500">*</span>
          </h5>

          <input
            {...register("serviceTitle")}
            placeholder="例：老屋翻新專做台北市｜換新屋團隊"
            className="py-4 ps-5 w-100 border rounded"
          />
          {errors.serviceTitle && (
            <p className="text-danger">{errors.serviceTitle.message}</p>
          )}
        </div>

        <div className="mb-11">
          <h5 className="mb-4">
            服務費率<span className="required text-warning-500">*</span>
          </h5>
          <div className="mb-5 price-slider" ref={sliderRef}></div>

          <div className="d-flex justify-content-between style={{ maxWidth: 360 }}">
            <div
              className="d-flex align-items-center gap-2 price-box"
              style={{ minWidth: 150, gap: "6px" }}
            >
              <span>下限</span>
              <span>NT$</span>
              <input
                type="text"
                className="form-control text-end"
                style={{ width: 80 }}
                value={watch("minPrice")}
                onChange={(e) => {
                  const raw = e.target.value.replace(/[^0-9]/g, "");
                  let val = Number(raw || 0);
                  if (val > watch("maxPrice")) val = watch("maxPrice");
                  setValue("minPrice", val);
                  sliderRef.current.noUiSlider.set([val, null]);
                }}
              />
            </div>

            <div
              className="d-flex align-items-center price-box"
              style={{ minWidth: 150, gap: "6px" }}
            >
              <span>上限</span>
              <span>NT$</span>
              <input
                type="text"
                className="form-control text-end"
                style={{ width: 80 }}
                value={watch("maxPrice")}
                onChange={(e) => {
                  const raw = e.target.value.replace(/[^0-9]/g, "");
                  let val = Number(raw || 0);
                  if (val < watch("minPrice")) val = watch("minPrice");
                  setValue("maxPrice", val);
                  sliderRef.current.noUiSlider.set([null, val]);
                }}
              />
            </div>
          </div>
        </div>

        <div className="mb-11 row">
          <h5 className="mb-4">
            服務地區（可複選）
            <span className="required text-warning-500">*</span>
          </h5>
          {[
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
            "金　門",
            "馬　祖",
            "澎　湖",
            "蘭　嶼",
            "綠　島",
            "可遠端",
          ].map((city, index) => {
            const inputId = `location-${index}`;
            const checked = watch("serviceLocations")?.includes(city) || false;

            return (
              <div key={city} className="col-4">
                <input
                  type="checkbox"
                  className="me-5"
                  id={inputId}
                  checked={checked}
                  onChange={(e) =>
                    handleCheckbox("serviceLocations", city, e.target.checked)
                  }
                />
                <label htmlFor={inputId}>{city}</label>
              </div>
            );
          })}
          {errors.serviceLocations && (
            <p className="text-danger">{errors.serviceLocations.message}</p>
          )}
        </div>

        <div className="mb-11">
          <h5 className="mb-4">服務關鍵字</h5>
          <input
            {...register("serviceKeywords")}
            className="py-4 ps-5 w-100 border rounded"
            placeholder="例：#老屋翻新 #台北"
          />
        </div>

        <div className="mb-11">
          <h5 className="mb-4">特殊服務（可複選）</h5>
          <div className="row">
            {[
              { label: "長期配合", value: "longterm" },
              { label: "短期配合", value: "shortterm" },
              { label: "急件服務", value: "urgent" },
            ].map((item) => (
              <div key={item.value} className="col-4">
                <input
                  type="checkbox"
                  className="me-2"
                  id={item.value}
                  onChange={(e) =>
                    handleCheckbox("serviceTags", item.value, e.target.checked)
                  }
                />
                <label htmlFor={item.value}>{item.label}</label>
              </div>
            ))}
          </div>
        </div>

        <div className="mb-11">
          <h5 className="mb-4">
            服務內容<span className="required text-warning-500">*</span>
          </h5>
          <textarea
            {...register("serviceDetail")}
            className="py-4 ps-5 w-100 border rounded"
            rows={8}
            placeholder="請描述你的服務內容、經驗與特色，讓顧客更了解你。"
          />
          {errors.serviceDetail && (
            <p className="text-danger">{errors.serviceDetail.message}</p>
          )}
        </div>

        <div className="mb-11">
          <h5 className="mb-4">相關連結</h5>
          <input
            {...register("demoLink")}
            className="py-4 ps-5 w-100 border rounded"
            placeholder="例：您的作品集網址"
          />
        </div>

        {/* <div>
          <h5 className="mb-4">作品紀錄</h5>
          <button
            type="button"
            className="btn btn-primary-500 w-100 py-4 text-neutral"
          >
            上傳作品集圖片
          </button>
        </div> */}
      </div>
      <div className="mb-13 d-flex justify-content-center">
        <button type="submit" className="btn btn-secondary-500 px-13 py-4">
          賣時間
        </button>
      </div>
    </form>
  );
}
