import { Link } from "react-router-dom";
import { MapPinIcon, HourglassIcon, CrosshairIcon } from "@phosphor-icons/react";

export default function ServiceCardLg({ data }) {
    const {
        id,
        serviceTitle,
        serviceLocations,
        serviceTime,
        serviceKeywords,
        serviceTags,
        serviceDetail,
    } = data;

    // --- 1. 地點顯示邏輯 (最多5筆) ---
    const processLocations = (locations = []) => {
        if (locations.length === 0) return "地點另議";
        const sorted = [...locations].sort((a, b) => (a === "遠端" ? -1 : b === "遠端" ? 1 : 0));
        
        const maxVisible = 5;
        const visibleLocations = sorted.slice(0, maxVisible);
        const hasMore = sorted.length > maxVisible;

        let locationText = visibleLocations.join('、');
        return hasMore ? `${locationText} (更多地區)` : locationText;
    };

    // --- 2. 時間格式化工具 (MM/DD HH:mm) ---
    const formatTimeRange = (start, end) => {
        const f = (dateStr) => {
            const d = new Date(dateStr);
            return d.toLocaleDateString('zh-TW', {
                month: '2-digit',
                day: '2-digit',
                hour: '2-digit',
                minute: '2-digit',
                hour12: false
            }).replace(/-/g, '/');
        };
        return `${f(start)} ~ ${f(end)}`;
    };

    // --- 3. 處理時間顯示陣列 ---
    const getTimeDisplayArray = () => {
        let displayList = [];
        if (serviceTime?.acceptAnytime) displayList.push("可討論");

        if (serviceTime.times && serviceTime.times.length > 0) {
            // 最多取 3 筆
            const maxTimes = 3;
            const visibleTimes = serviceTime.times.slice(0, maxTimes);
            
            visibleTimes.forEach(t => {
                displayList.push(formatTimeRange(t.startTime, t.endTime));
            });

            if (serviceTime.times.length > maxTimes) {
                displayList.push("(更多時段...)");
            }
        }
        return displayList;
    };

    const timeLines = getTimeDisplayArray();
    const finalLocationText = processLocations(serviceLocations);

    const tagMap = {
        'sosTime': { text: '急件', className: 'tag-urgent' },
        'shortTime': { text: '短期', className: 'tag-shortterm' },
        'longTime': { text: '長期', className: 'tag-longterm' }
    };

    return (
        <div className="card custom-servicard-icon custom-servicard-deco">
            <div className="card-body d-flex flex-column p-7 py-lg-13 px-lg-11">
                {/* 標籤區 */}
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

                {/* 標題與基本資訊 */}
                <div className="d-flex flex-column mb-3 mb-lg-7">
                    <h3 className="card-title text-line-clamp-1 fw-bold h5 fs-lg-4 ls-2 mb-lg-5">{serviceTitle}</h3>
                    
                    {/* 地點 */}
                    <div className="mb-2 d-inline-flex align-items-start gap-2 fs-lg-6">
                        <MapPinIcon size={20} className="text-primary-300 mt-1 flex-shrink-0" />
                        <span>{finalLocationText}</span>
                    </div>

                    {/* 時間 (支援多行顯示) */}
                    <div className="d-inline-flex align-items-start gap-2 fs-lg-6">
                        <HourglassIcon size={20} className="text-primary-300 mt-1 flex-shrink-0" />
                        <div className="d-flex flex-column">
                            {timeLines.length > 0 ? (
                                timeLines.map((line, idx) => (
                                    <span key={idx} className="lh-base">{line}</span>
                                ))
                            ) : (
                                <span>時間另議</span>
                            )}
                        </div>
                    </div>
                </div>

                {/* 關鍵字 */}
                <div className="d-flex gap-2 mb-4 mb-lg-5 custom-servicard-tasktag-cover flex-wrap">
                    {serviceKeywords.map((keyword, index) => (
                        <span key={index} className="badge bg-primary-100 text-neutral-900 fs-lg-6">
                            {keyword}
                        </span>
                    ))}
                </div>

                {/* 任務需求 */}
                <div className="d-flex flex-column mb-5 mb-lg-7">
                    <span className="mb-2 mb-lg-3 fw-bold h6 fs-7 fs-lg-5 d-inline-flex align-items-center gap-2">
                        <CrosshairIcon size={20} />
                        任務需求
                    </span>
                    <small className="fs-8 fs-lg-6 text-line-clamp-2 flex-grow-1">
                        {serviceDetail}
                    </small>
                </div>

                {/* 按鈕 */}
                <div className="mt-auto">
                    <Link to={`/buydemo/${id}`} 
                    state={{ backTop: true }}
                    className="btn btn-secondary-filled fw-bold w-100 mt-auto">
                        我想洽談
                    </Link>
                </div>
            </div>
        </div>
    );
}