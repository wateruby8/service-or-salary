// 3-1-2. 接案者-刊登服務賣時間
import { useState, useEffect, useRef } from "react";

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

export default function PostSellTime() {
  const [formData, setFormData] = useState({
    userId: "u-002",
    serviceTime: {
      acceptAnytime: false,
      times: [],
    },
    category: "",
    subCategory: "",
    serviceTitle: "",
    servicePrice: {
      currency: "TWD",
      minPrice: "",
      maxPrice: "",
    },
    serviceLocations: [],
    serviceKeywords: "",
    serviceTags: [],
    serviceDetail: "",
    demoLink: "",
    demoImgs: [],
  });
const API_URL = import.meta.env.VITE_API_URL;
  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handlePriceChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      servicePrice: {
        ...prev.servicePrice,
        [name]: value,
      },
    }));
  };

  const handleCheckbox = (e) => {
    const { name, value, checked } = e.target;

    setFormData((prev) => {
      const list = prev[name];

      return {
        ...prev,
        [name]: checked ? [...list, value] : list.filter((i) => i !== value),
      };
    });
  };

  const handleAnytime = (e) => {
    const checked = e.target.checked;

    setFormData((prev) => ({
      ...prev,
      serviceTime: {
        ...prev.serviceTime,
        acceptAnytime: checked,
      },
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      ...formData,
      creatAt: new Date().toISOString(),

      serviceKeywords: formData.serviceKeywords
        .split(" ")
        .map((k) => k.replace("#", "")),

      servicePrice: {
        ...formData.servicePrice,
        minPrice: Number(formData.servicePrice.minPrice),
        maxPrice: Number(formData.servicePrice.maxPrice),
      },
    };

    try {
      const res = await fetch(`${API_URL}/services`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      console.log(data);
      alert("成功");
    } catch (err) {
      console.error(err);
      alert("失敗");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="container">
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
        />
      </div>
      <div className="mb-13">
        <div className="mb-11">
          <h5 className="mb-4">
            服務時間<span className="required text-warning-500">*</span>
          </h5>
          <input className="me-2" type="checkbox" value="free" id="free" />
          <label className="" htmlFor="free">
            可接受聊天室預約其他時間
          </label>
        </div>

        <div className="mb-11">
          <h5 className="mb-4">
            服務種類<span className="required text-warning-500">*</span>
          </h5>
          <div className="row">
            <div className="col-12 col-md-6 mb-3">
              <select
                name="category"
                id="category"
                className="border rounded w-100 py-4 px-5"
                onChange={handleChange}
              >
                <option value="">選擇服務分類</option>
                <option value="居家生活">居家生活</option>
                <option value="教育訓練">教育訓練</option>
                <option value="行銷企劃">行銷企劃</option>
              </select>
            </div>
            <div className="col-12 col-md-6">
              <select
                name="subCategory"
                id="subCategory"
                className="border rounded w-100 py-4 px-5"
                onChange={handleChange}
              >
                <option value="">選擇服務細項</option>
                <option value="清潔服務">清潔服務</option>
                <option value="搬家與回收">搬家與回收</option>
                <option value="家電與家居維修">家電與家居維修</option>
              </select>
            </div>
          </div>
        </div>

        <div className="mb-11">
          <h5 className="mb-4">
            服務名稱<span className="required text-warning-500">*</span>
          </h5>
          <input
            type="text"
            className="py-4 ps-5 w-100 border rounded"
            placeholder="例：老屋翻新專做台北市｜換新屋團隊"
            onChange={handleChange}
          />
        </div>

        <div className="mb-11">
          <h5 className="mb-4">
            服務費率<span className="required text-warning-500">*</span>
          </h5>
          <input
            name="minPrice"
            placeholder="最低價"
            onChange={handlePriceChange}
          />
          <input
            name="maxPrice"
            placeholder="最高價"
            onChange={handlePriceChange}
          />
        </div>

        <div className="mb-11">
          <h5 className="mb-4">
            服務地區（可複選）
            <span className="required text-warning-500">*</span>
          </h5>
          <div className="row">
            <div className="col-4">
              <input
                className="me-2"
                type="checkbox"
                value="taipei"
                id="taipei"
              />
              <label className="" htmlFor="taipei">
                台北市
              </label>
            </div>
            <div className="col-4">
              <input
                className="me-2"
                type="checkbox"
                value="xinbei"
                id="xinbei"
              />
              <label className="" htmlFor="xinbei">
                新北市
              </label>
            </div>
            <div className="col-4">
              <input
                className="me-2"
                type="checkbox"
                value="keelung"
                id="keelung"
              />
              <label className="" htmlFor="keelung">
                基隆市
              </label>
            </div>
            <div className="col-4">
              <input
                className="me-2 "
                type="checkbox"
                value="taoyuan"
                id="taoyuan"
              />
              <label className="" htmlFor="taoyuan">
                桃園市
              </label>
            </div>
            <div className="col-4">
              <input
                className="me-2"
                type="checkbox"
                value="hsinchucountry"
                id="hsinchucountry"
              />
              <label className="" htmlFor="hsinchucountry">
                新竹縣
              </label>
            </div>
            <div className="col-4">
              <input
                className="me-2"
                type="checkbox"
                value="hsinchu"
                id="hsinchu"
              />
              <label className="" htmlFor="hsinchu">
                新竹市
              </label>
            </div>
          </div>
        </div>

        <div className="mb-11">
          <h5 className="mb-4">服務關鍵字</h5>
          <input
            type="text"
            className="py-4 ps-5 w-100 border rounded"
            placeholder="例：#老屋翻新 #台北"
          />
        </div>

        <div className="mb-11">
          <h5 className="mb-4">特殊服務（可複選）</h5>
          <div className="row">
            <div className="col-4">
              <input
                className="me-2"
                type="checkbox"
                value="longterm"
                id="longterm"
              />
              <label className="" htmlFor="longterm">
                長期配合
              </label>
            </div>
            <div className="col-4">
              <input
                className="me-2"
                type="checkbox"
                value="shortterm"
                id="shortterm"
              />
              <label className="" htmlFor="shortterm">
                短期配合
              </label>
            </div>
            <div className="col-4">
              <input
                className="me-2"
                type="checkbox"
                value="urgent"
                id="urgent"
              />
              <label className="" htmlFor="urgent">
                急件服務
              </label>
            </div>
          </div>
        </div>

        <div className="mb-11">
          <h5 className="mb-4">
            服務內容<span className="required text-warning-500">*</span>
          </h5>
          <input
            type="text"
            className="py-4 ps-5 w-100 border rounded"
            placeholder="請描述你的服務內容、經驗與特色，讓顧客更了解你。"
          />
        </div>

        <div className="mb-11">
          <h5 className="mb-4">相關連結</h5>
          <input
            type="text"
            className="py-4 ps-5 w-100 border rounded"
            placeholder="例：您的作品集網址"
          />
        </div>

        <div>
          <h5 className="mb-4">作品紀錄</h5>
          <button
            type="button"
            className="btn btn-primary-500 w-100 py-4 text-neutral"
          >
            上傳作品集圖片
          </button>
        </div>
      </div>
      <div className="mb-13 d-flex justify-content-center">
        <button type="submit" className="btn btn-secondary-500 px-13 py-4">
          賣時間
        </button>
      </div>
    </form>
  );
}
