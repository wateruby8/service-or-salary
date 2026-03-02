// 3-1-2. 接案者-刊登服務賣時間
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import bootstrap5Plugin from "@fullcalendar/bootstrap5";
import twLocale from "@fullcalendar/core/locales/zh-tw";


export default function PostSellTime() {
  return (
    <div>
      <FullCalendar
        plugins={[dayGridPlugin, bootstrap5Plugin]}
        initialView="dayGridMonth"
        themeSystem="bootstrap5"
        locale={twLocale}
      />
    </div>
  );
}
