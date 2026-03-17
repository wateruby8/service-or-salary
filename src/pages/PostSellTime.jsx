// 3-1-2. 接案者-刊登服務賣時間
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import bootstrap5Plugin from "@fullcalendar/bootstrap5";
import twLocale from "@fullcalendar/core/locales/zh-tw";

export default function PostSellTime() {
  return (
    <div>
      <div className="d-flex justify-content-between align-items-center">
        <h3 className="border-bottom border-primary-300 border-5 mb-7">
          服務刊登
        </h3>
        <p className="text-warning-500">*為必填項目，請完整填寫</p>
      </div>
      <div className="mb-13">
        <FullCalendar
          plugins={[dayGridPlugin, bootstrap5Plugin]}
          initialView="dayGridMonth"
          themeSystem="bootstrap5"
          locale={twLocale}
        />
      </div>
      <div className="mb-13">
        <div className="mb-11">
          <h5 className="mb-4">
            服務時間<span className="required text-warning-500">*</span>
          </h5>
          <input className="me-2" type="checkbox" value="free" id="free" />
          <label className="" for="free">
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
              >
                <option value="">選擇服務分類</option>
                <option value="">居家生活</option>
                <option value="">教育訓練</option>
                <option value="">行銷企劃</option>
              </select>
            </div>
            <div className="col-12 col-md-6">
              <select
                name="subCategory"
                id="subCategory"
                className="border rounded w-100 py-4 px-5"
              >
                <option value="">選擇服務細項</option>
                <option value="">清潔服務</option>
                <option value="">搬家與回收</option>
                <option value="">家電與家居維修</option>
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
          />
        </div>

        <div className="mb-11">
          <h5 className="mb-4">
            服務費率<span className="required text-warning-500">*</span>
          </h5>
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
              <label className="" for="taipei">
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
              <label className="" for="xinbei">
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
              <label className="" for="keelung">
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
              <label className="" for="taoyuan">
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
              <label className="" for="hsinchucountry">
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
              <label className="" for="hsinchu">
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
              <label className="" for="longterm">
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
              <label className="" for="shortterm">
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
              <label className="" for="urgent">
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
          <button type="button" className="btn btn-primary-500 w-100 py-4 text-neutral">
            上傳作品集圖片
          </button>
        </div>
      </div>
      <div className="mb-13 d-flex justify-content-center">
        <button type="submit" className="btn btn-secondary-500 px-13 py-4">
          賣時間
        </button>
      </div>
    </div>
  );
}
