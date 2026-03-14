import { MapPinIcon ,HourglassIcon,CrosshairIcon } from "@phosphor-icons/react";
export default function ServiceCard({data}) {
    // 1. 解構資料結構
    const {
        serviceTitle,
        serviceLocations,
        serviceTime,
        serviceKeywords,
        serviceTags,
        serviceDetail,
        servicePrice
    } = data;
    // --- 組件內部的地點顯示邏輯 ---
    const processLocations = (locations = []) => {
        if (locations.length === 0) return "地點另議";

        // 1. 排序：如果有「遠端」，將其排到最前面
        const sorted = [...locations].sort((a, b) => {
            if (a === "遠端") return -1;
            if (b === "遠端") return 1;
            return 0;
        });

        // 2. 判斷顯示邏輯
        const maxVisible = 2; // 最多顯示兩個
        const visibleLocations = sorted.slice(0, maxVisible);
        const hasMore = sorted.length > maxVisible;

        // 3. 組合文字
        let locationText = visibleLocations.join('、');
        if (hasMore) {
            locationText += " (更多地區)";
        }

        return locationText;
    };

        // 在元件中使用
    const finalLocationText = processLocations(serviceLocations);



    // 處理時間顯示邏輯 (取第一筆時間作為代表)
    const formatTime = (isoString) => {
        const date = new Date(isoString);
        // 格式化為：2026/01/11 08:00 (可根據需求決定是否保留 0)
        return date.toLocaleDateString('zh-TW', {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
            hour: '2-digit',
            minute: '2-digit',
            hour12: false
        }).replace(/-/g, '/');
    };

    // --- 組件內部的顯示邏輯 ---
    let timeDisplayParts = [];

    // 1. 處理「可討論」
    if (serviceTime.acceptAnytime) {
        timeDisplayParts.push("可討論");
    }

    // 2. 處理「具體時間」與「更多時段」
    if (serviceTime.times && serviceTime.times.length > 0) {
        const firstTime = formatTime(serviceTime.times[0].startTime);
        
        if (serviceTime.times.length > 1) {
            // 如果有多筆時間
            timeDisplayParts.push(`${firstTime} (更多時段)`);
        } else {
            // 如果只有一筆時間
            timeDisplayParts.push(firstTime);
        }
    }

// 3. 最終合併顯示（如果兩者都有，用「、」或空格區隔）
const finalTimeText = timeDisplayParts.join('、');
    // 3. 標籤轉換對照表 (對應 serviceTags)
    const tagMap = {
        'sosTime': { text: '急件', className: 'tag-urgent' },
        'shortTime': { text: '短期', className: 'tag-shortterm' },
        'longTime': { text: '長期', className: 'tag-longterm' }
    };

    return <>
    <div className="card h-100 
        custom-servicard-icon
        custom-servicard-deco
        ">
        <div className="card-body 
            d-flex flex-column
            p-7 py-lg-13 px-lg-11">
            <div className="d-flex gap-3 mb-3 mb-lg-5">
                {serviceTags.map(tagKey => {
                        const tagInfo = tagMap[tagKey];
                        return tagInfo ? (
                            <span key={tagKey} className={`${tagInfo.className} py-2 px-3 py-lg-3 px-lg-5 fw-bold fs-8 fs-lg-5 rounded-1`}>
                                {tagInfo.text}
                            </span>
                        ) : null;
                    })}
            </div>
            <div className="d-flex flex-column mb-3 mb-lg-7">
                <h3 className="card-title text-line-clamp-1 fw-bold h5 fs-lg-4 ls-2 mb-lg-5">{data.serviceTitle}</h3>
                <span className="mb-2 d-inline-flex align-items-center gap-2 fs-lg-6">
                    <MapPinIcon  className="text-primary-300"/>
                    {finalLocationText}
                </span>
                <span className="d-inline-flex align-items-center gap-2 fs-lg-6">
                    <HourglassIcon  className="text-primary-300"/>
                    {finalTimeText || "時間另議"}
                </span>
            </div>
            <div className="d-flex gap-2 mb-4 mb-lg-5
                custom-servicard-tasktag-cover">
                {serviceKeywords.map((keyword, index) => (
                        <span key={index} className="badge bg-primary-100 text-neutral-900 fs-lg-6">
                            {keyword}
                        </span>
                    ))}
            </div>
            <div className="d-flex flex-column mb-5 mb-lg-7">
                <span className="mb-2 mb-lg-3 fw-bold h6 fs-7 fs-lg-5 d-inline-flex align-items-center gap-2">
                    <CrosshairIcon  />
                    任務需求
                </span>
                <small className="fs-8 fs-lg-6 text-line-clamp-1 flex-grow-1">
                    {serviceDetail}
                </small>
            </div>
            <div className="">
                <button type="button" className="btn btn-secondary-filled fw-bold w-100 mt-auto">我想洽談</button>
            </div>
            
        </div>
    </div>
    </>
}