// 1. 首頁
export default function Home(){
    return(
        <>
        <section id="home-hero">

        </section>
        <section className="section-py border">
            <div className="row flex-column flex-lg-row-reverse">
                <div className="col">
                    <div className="d-flex flex-column align-items-center gap-4">
                        <h2 className="h5 ">計劃趕不上變化，<br/>該怎麼靈活善用時間？</h2>
                        <p className="h6 text-neutral-900 mb-0">在意想不到的時刻，會有人需要你的專業<br/>把空閒變成金錢，個人價值翻倍！</p>
                        <button type="button" className="btn btn-neutral-900">開發我的時間</button>

                    </div>
                </div>
                <div className="col">
                    <div className="border border-primary"></div>
                </div>
            </div>
        </section>
        <section className="section-py border">
            <div className="d-flex justify-content-between mb-4">
                <h2 className="h5 text-neutral-900 mb-0">有誰需要你的時間？</h2>
                <div>
                <button type="button" className="me-3 me-lg-4"></button>
                <button type="button"></button>
                </div>
            </div>
            <div className="flex flex-nowrap">
                {/* 案件卡片 */}
                <div className="col-lg-4">
                    <div className="card" style={{maxWidth:"70%"}}>
                        <div className="card-body p-4">
                            <div className="d-flex gap-2 mb-2">
                                <span className="tag-urgent py-1 px-2 rounded-2">急件</span>
                                <span className="tag-shortterm py-1 px-2 rounded-2">短期</span>
                                <span className="tag-longterm py-1 px-2 rounded-2">長期</span>  
                            </div>
                            <div className="d-flex flex-column mb-3">
                                <h5 className="card-title">網頁切版三頁</h5>
                                <span className="mb-1">遠端</span>
                                <span>12/01 08:00</span>
                            </div>
                            <div className="d-flex gap-2 mb-2 overflow-hidden">
                                <span className="badge bg-primary-100 text-neutral-900">網頁設計</span>
                                <span className="badge bg-primary-100 text-neutral-900">上市櫃公司</span>
                                <span className="badge bg-primary-100 text-neutral-900">上市櫃公司招新夥伴中</span>
                            </div>
                            <div className="d-flex flex-column mb-4">
                                <small className="mb-1">+任務需求</small>
                                <sub>要用 Bootstrap，要交作業</sub>
                            </div>
                            <div className="">
                                <button type="button" className="btn btn-neutral-900 w-100">我想洽談</button>
                            </div>
                            
                        </div>
                    </div>

                </div>
                {/* 案件卡片結束 */}
            </div>

        </section>
        <section className="section-py border">
            <div className="">
                <h2 className="h4 text-neutral-900 text-center mb-0">在時務所買賣時間的理由</h2>
            </div>
        </section>
        <section className="section-py border">
            <div className="">
                <h2 className="h5 text-neutral-900 mb-0">受好評的時間賣家</h2>
                <div>
                <button type="button"></button>
                <button type="button"></button>
                </div>
            </div>
        </section>
        <section className="section-py border">
            <div className="d-flex flex-column flex-lg-row justify-content-center gap-4">
                <div className="d-flex flex-column align-items-center gap-5">
                    <h3 className="h1 text-neutral-900">達成案件</h3>
                    <div className="p-2 bg-secondary rounded-circle">
                        <div className="d-flex flex-column align-items-center">
                            <span className="h2 text-neutral-900">659</span>
                            <span>件</span>
                        </div>
                    </div>
                </div>
                <div className="d-flex flex-column align-items-center gap-5">
                    <h3 className="h1 text-neutral-900">被善用的時間</h3>
                    <div className="p-2 bg-secondary rounded-circle">
                        <div className="d-flex flex-column align-items-center">
                            <span className="h2 text-neutral-900">4267</span>
                            <span>小時</span>
                        </div>
                    </div>
                </div>
                <div className="d-flex flex-column align-items-center gap-5">
                    <h3 className="h1 text-neutral-900">案件滿意度</h3>
                    <div className="p-2 bg-secondary rounded-circle">
                        <div className="d-flex flex-column align-items-center">
                            <span className="h2 text-neutral-900">4.8</span>
                            <span>分</span>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        </>
    )
}