// 2-1-1. 接案者的公開資料
import { useState, useEffect } from 'react';

export default function SellDemo(){
    return(<>
    <div style={{background: "#FBF7F5",}}>
        <div className="container d-flex gap-7" style={{maxWidth: "1296px", margin: "0 auto"}}>
            <div className="d-flex container row align-items-start" style={{ margin: "0 auto"}}>
                <div className="col-xl-9 order-xl-2">
                    <nav className="py-5" aria-label="breadcrumb">
                        <ol className="breadcrumb">
                            <li className="breadcrumb-item"><a className="text-decoration-none text-neutral-500 fw-medium" href="#">我要委託</a></li>
                            <li className="breadcrumb-item"><a className="text-decoration-none text-neutral-500 fw-medium" href="#">影音圖像</a></li>
                            <li className="breadcrumb-item"><a className="text-decoration-none text-neutral-500 fw-medium" href="#">婚紗攝影</a></li>
                            <li className="breadcrumb-item active text-neutral-900 fw-medium" aria-current="page">時尚婚紗攝影</li>
                        </ol>
                    </nav>
                    <div className="d-flex flex-column gap-14">
                        <div className="container row d-flex gap-13">
                            <div className="col-xxl-6">
                                <img src="sellDemo-imgs/night.jpg" className="rounded-4" style={{width: "100%", maxHeight: "100%"}} alt="" />
                            </div>
                            <div className="col-xxl-5 p-9 rounded-4 shadow" style={{background: "white"}}>
                                <ul className="d-flex list-unstyled gap-3 mb-5">
                                    <li className="tag-shortterm pt-1 pb-1 ps-3 pe-3 rounded-pill">短期</li>
                                    <li className="tag-longterm pt-1 pb-1 ps-3 pe-3 rounded-pill">長期</li>
                                    <li className="tag-urgent pt-1 pb-1 ps-3 pe-3 rounded-pill">急件</li>
                                </ul>
                                <h3 className="text-neutral-900 mb-4">時尚婚紗攝影</h3>
                                <ul className="d-flex list-unstyled gap-4 flex-wrap">
                                    <li className="bg-primary-100 fs-6 pt-1 pb-1 ps-3 pe-3 rounded-pill"># 婚紗攝影</li>
                                    <li className="bg-primary-100 fs-6 pt-1 pb-1 ps-3 pe-3 rounded-pill"># 圖像剪輯</li>
                                </ul>
                                <ul className="list-unstyled">
                                    <li className="d-flex gap-5"><p className="fw-medium" style={{width: "84px"}}><img src="sellDemo-imgs/moneybag.svg" className="me-2" alt="錢袋圖示" />服務費率</p><p>$ 30000～$ 50000 / 件</p></li>
                                    <li className="d-flex gap-5"><p className="fw-medium" style={{width: "84px"}}><img src="sellDemo-imgs/calendar.svg" className="me-2" alt="日曆圖示" />時間</p><p>聊天室諮詢</p></li>
                                    <li className="d-flex gap-5"><p className="fw-medium" style={{width: "84px"}}><img src="sellDemo-imgs/map-icon.svg" className="me-2" alt="地圖圖標" />地點</p><p>台北市、新北市、桃園市</p></li>
                                    <li className="d-flex gap-5"><p className="fw-medium" style={{width: "84px"}}><img src="sellDemo-imgs/briefcase.svg" className="me-2" alt="公事包圖示" />作品連結</p><a href="#">https://github.com/</a></li>
                                </ul>
                                <div>
                                    <h6 className="fw-medium mb-2">簡介</h6>
                                    <p className="mb-4">您​好，​我​是友善！​來自​有​10​年​經驗​的​攝影​團隊，​已​幫助​超過​一百對​新人，​無論​是​希臘風、​森林風、​韓系​甚至​是​特別​的​水中​婚紗，​多種​風格​都​可​供​選擇，​讓​我​們陪伴​您​記錄​下這​珍貴​的​時刻！​</p>
                                    <p className="text-end">上架日期：2024/12/12</p>
                                </div>
                                <div className="col d-flex justify-content-between">
                                    <button type="button" className="btn btn-outline-secondary-500 col-5">收藏</button>
                                    <button type="button" className="btn btn-secondary-500 col-5">諮詢</button>
                                </div>
                            </div>
                        </div>
                        <div>
                        <h3>服務描述</h3>
                            <div className="p-9 rounded-4 shadow" style={{background: "white"}}>
                                <p>◆服務​特色​​</p>
                                <p className="mb-0">【客製化​的​拍攝​體驗​】<br />
                                深度​溝通：​在​拍攝​前，​我​們會​花時​間與​你​們​深入​交流，​了解​你​們​的​愛情​故事、​個性​特點、​喜歡​的​風格​（例如：​唯​美​浪漫、​自然​清新、​復​古​時尚​等），​確保照​片​能​完​美​呈現​你​們​的​「樣子」。<br />
                                場景​建議：​ 根據​你​們​的​喜好​和​季節​特點，​提供​國內​外獨​特且​具有​意義​的​拍攝​場景​建議。​</p>
                                <p className="mb-0">【​專業且​用心​的​團隊​】​<br />
                                資​深攝​影師：​ 擁​有​10​年​婚紗​攝影經驗，​擅長​利用​自然​光線​和​環境​元素，​創造​出​電影級​質感​的​大片。​<br />
                                頂​級造型​師：​ ​提供​一​對​一​貼​身服務，​根據​禮服​和​拍攝​風格，​打造​最​適合​你​們​的​精緻​妝容與​髮型。​</p>
                                <p>【​舒適​自然​的​拍攝​引導​】<br />
                                ​我​們不​只​是​按下​快門，​更​是​你​們情緒​的​引導者。​透過​輕鬆​的​互動​和​專業​的​肢體​指導，​讓​你​們​在​鏡頭​前​感到​自在，​流露出​最​真摯、​最​自然​的​愛意。​</p>
                                <p>◆預約​流程​</p>
                                <p>1.初步​諮詢：​ 聯繫​我​們，​告知​您​的​婚期、​預算​和​偏好​風格。<br />
                                ​2.細節​討論：​ ​確定​方案​與簽訂​合約。<br />
                                3​.溝​通會議：​ 進​行​拍攝​風格、​地點、​禮服​等​深度​討論。​<br />
                                4​.愉悅​拍攝：​ 享​受​屬於​你​們​的​浪漫​拍攝日！​<br />
                                5​.​後期​製作：​ 攝​影師​與後製團隊​開始​修片​及​製作​成品。​<br />
                                6.​成品​交付：​ 交付​所有​電子​檔與實體​產品，​見證​愛情​的​成果！</p>
                                <p className="text-end mb-0">最後編輯：2024/12/12</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="d-flex flex-column align-items-center p-13 rounded-4 col order-xl-1 my-6 shadow" style={{background: "white"}}>
                    <h4 className="fw-bold">接案者資訊</h4>
                    <a href=""><img src="sellDemo-imgs/FriendlyLin.jpg" className="rounded-circle mb-5" style={{width: "80px", height: "80px", objectFit: "cover"}} alt="林友善"/></a>
                    <a className="fs-4 text-decoration-none text-neutral-900 mb-3" href="#">林友善</a>
                    <p className="fs-6 fw-medium"><img className="me-2" src="sellDemo-imgs/map-icon.svg" alt="地圖圖標" />台北</p>
                    <ul className="d-flex list-unstyled gap-4 flex-wrap pb-9 mb-9 border-bottom border-1 border-neutral-500">
                        <li className="bg-primary-100 fs-6 pt-1 pb-1 ps-3 pe-3 rounded-pill"># 攝影</li>
                        <li className="bg-primary-100 fs-6 pt-1 pb-1 ps-3 pe-3 rounded-pill"># 圖像剪輯</li>
                        <li className="bg-primary-100 fs-6 pt-1 pb-1 ps-3 pe-3 rounded-pill"># PhotoShop</li>
                        <li className="bg-primary-100 fs-6 pt-1 pb-1 ps-3 pe-3 rounded-pill"># 個人照</li>
                        <li className="bg-primary-100 fs-6 pt-1 pb-1 ps-3 pe-3 rounded-pill"># 台北</li>
                    </ul>
                    <ul className="d-flex list-unstyled flex-column lh-1">
                        <li className="d-flex gap-7"><p>身分認證</p><p className="text-success"><img className="me-2" src="sellDemo-imgs/passed.svg" alt="" />已通過</p></li>
                        <li className="d-flex gap-7"><p>成交案數</p><p>46</p></li>
                        <li className="d-flex gap-7"><p>加入時間</p><p>2024/12/6</p></li>
                        <li className="d-flex gap-7"><p>交易評價</p><p className="d-flex align-items-center">4.7<img className="ms-2" src="sellDemo-imgs/star-fill.svg" alt="星星圖標" /></p></li>
                    </ul>
                </div>
            </div>
        </div>
        <div className="container col row justify-content-end my-14" style={{ margin: "0 auto"}}>
            <div className="col-xxl-9">
                <h3>評價</h3>
                <div className="mb-5">
                    <div className="py-7 px-9 rounded-4 mb-5 shadow" style={{background: "white"}}>
                        <div className="d-flex justify-content-between">
                            <div className="d-flex gap-3 mb-7">
                                <a href="#"><img className="rounded-circle" src="sellDemo-imgs/Martin.jpg" style={{width: "64px", height: "64px", objectFit: "cover"}} alt="Martin" /></a>
                                <div className="align-self-center">
                                    <a className="fw-medium text-decoration-none text-neutral-900 mt-0" href="#">Martin</a>
                                    <p className="fs-7 mb-0">桃園</p>
                                </div>
                            </div>
                        <div className="align-self-center">● ● ● ● ●</div>
                    </div>
                    <p>因​為​另​一​半​非常​嚮往​夢幻​的​場景，​所以​我​們​選擇​了​歐式​宮廷​的​拍攝​風格。​很​感謝​團隊​在​過程​中​循序​漸進​的​引導，​雖然​第一​次​面對​這麼​大量​的​鏡頭，​可是​在​拍攝​時​不​會過於​緊繃​和​生澀，​互動​也​相當​自然，​看完成​品​覺得​非常​滿意！​</p>
                    </div>
                </div>
                <div className="py-7 px-9 rounded-4 mb-5 shadow" style={{background: "white"}}>
                    <div className="d-flex justify-content-between">
                        <div className="d-flex gap-3 mb-7">
                            <a href="#"><img className="rounded-circle" src="sellDemo-imgs/Alice.jpg" style={{width: "64px", height: "64px", objectFit: "cover"}} alt="Alice" /></a>
                            <div className="align-self-center">
                                <a className="fw-medium text-decoration-none text-neutral-900 mt-0" href="#">Alice</a>
                                <p className="fs-7 mb-0">臺北</p>
                            </div>
                        </div>
                        <div className="align-self-center">● ● ● ● ●</div>
                    </div>
                    <p>因​為​另​一​半​非常​嚮往​夢幻​的​場景，​所以​我​們​選擇​了​歐式​宮廷​的​拍攝​風格。​很​感謝​團隊​在​過程​中​循序​漸進​的​引導，​雖然​第一​次​面對​這麼​大量​的​鏡頭，​可是​在​拍攝​時​不​會過於​緊繃​和​生澀，​互動​也​相當​自然，​看完成​品​覺得​非常​滿意！​​</p>
                </div>
                <button type="button" style={{width: "160px"}} className="btn btn-outline-secondary-500 fw-bold border-2 d-block mx-auto">顯示更多</button>
            </div>
            <div className="col-xxl-9 my-15">
                <h3>此用戶還有這些服務...</h3>
                <ul className="list-unstyled row g-5">
                    <li className="col-lg-4 d-flex flex-column align-items-center">
                    <div className="p-12 rounded-4 d-flex flex-column align-items-center shadow" style={{background: "white", width: "100%"}}>
                        <img src="sellDemo-imgs/graduation.png" className="mb-7 rounded-4" style={{width: "160px", height: "160px", objectFit: "cover"}} alt="" />
                        <h5 className="mb-7 text-center">畢業照拍攝</h5>
                        <button type="button" className="btn btn-secondary-500" style={{width: "160px"}}>前往了解</button> 
                    </div>
                    </li>
                    <li className="col-lg-4 d-flex flex-column align-items-center">
                    <div className="p-12 rounded-4 d-flex flex-column align-items-center shadow" style={{background: "white", width: "100%"}}>
                        <img src="sellDemo-imgs/pregnant.png" className="mb-7 rounded-4" style={{width: "160px", height: "160px", objectFit: "cover"}} alt="" />
                        <h5 className="mb-7 text-center">孕婦寫真</h5>
                        <button type="button" className="btn btn-secondary-500" style={{width: "160px"}}>前往了解</button> 
                    </div>
                    </li>
                    <li className="col-lg-4 d-flex flex-column align-items-center">
                        <div className="p-12 rounded-4 d-flex flex-column align-items-center shadow" style={{background: "white", width: "100%"}}>
                            <img src="sellDemo-imgs/company.png" className="mb-7 rounded-4" style={{width: "160px", height: "160px", objectFit: "cover"}} alt="" />
                            <h5 className="mb-7 text-center">企業活動攝影</h5>
                            <button type="button" className="btn btn-secondary-500" style={{width: "160px"}}>前往了解</button> 
                        </div>
                    </li>
                </ul>
            </div>
        </div>
    </div>
    </>
    )
}