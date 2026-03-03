import { MapPinIcon ,HourglassIcon,CrosshairIcon,MagnifyingGlassIcon,CaretDownIcon,CaretLeftIcon,CaretRightIcon } from "@phosphor-icons/react";
// 1. 首頁
function TaskCard({}) {
    return <>
        <div className="card card-task-custom card-task-shadow border-0">
            <div className="card-body p-7 py-lg-13 px-lg-11">
                <div className="d-flex gap-3 mb-3 mb-lg-5">
                    <span className="tag-urgent py-2 px-3 py-lg-3 px-lg-5 fw-bold fs-8 fs-lg-5 rounded-1">急件</span>
                    <span className="tag-longterm py-2 px-3 py-lg-3 px-lg-5 fw-bold fs-8 fs-lg-5 rounded-1">長期</span>  
                    <span className="tag-shortterm py-2 px-3 py-lg-3 px-lg-5 fw-bold fs-8 fs-lg-5 rounded-1">短期</span>
                </div>
                <div className="d-flex flex-column mb-3 mb-lg-7">
                    <h3 className="card-title fw-bold h5 fs-lg-4 ls-2 mb-lg-5">網頁切版三頁</h3>
                    <span className="mb-2 d-inline-flex align-items-center gap-2 fs-lg-6">
                        <MapPinIcon  className="text-primary-300"/>
                        遠端
                    </span>
                    <span className="d-inline-flex align-items-center gap-2 fs-lg-6">
                        <HourglassIcon  className="text-primary-300"/>
                        12/01 08:00
                    </span>
                </div>
                <div className="d-flex gap-2 mb-4 mb-lg-5 card-tasktag-cover">
                    <span className="badge bg-primary-100 text-neutral-900 fs-lg-6">網頁設計</span>
                    <span className="badge bg-primary-100 text-neutral-900 fs-lg-6">上市櫃公司</span>
                    <span className="badge bg-primary-100 text-neutral-900 fs-lg-6">上市櫃公司招新夥伴中</span>
                </div>
                <div className="d-flex flex-column mb-5 mb-lg-7">
                    <span className="mb-2 mb-lg-3 fw-bold h6 fs-7 fs-lg-5 d-inline-flex align-items-center gap-2">
                        <CrosshairIcon  />
                        任務需求
                    </span>
                    <small className="fs-8 fs-lg-6">要用 Bootstrap，要交作業</small>
                </div>
                <div className="">
                    <button type="button" className="btn btn-secondary-500 fw-bold w-100">我想洽談</button>
                </div>
                
            </div>
        </div>
    </>
}

export default function Home(){
    return(
        <>
        <section id="homeHero" className="home-hero"
        >
            <div className="container">
                <div className="row">
                    <div className="col-md-9">
                        <h1 className="home-hero-title text-neutral text-center text-md-start mb-5 mb-md-9">
                            時間交易，價值的雙向奔赴
                        </h1>
                        <div className="px-11 px-md-0">
                            <form 
                            className="bg-primary-100 rounded-3 p-2 p-md-5">
                                <div className="d-flex justify-content-between">
                                    {/* 下拉按鈕 */}
                                    <button 
                                    className="btn btn-primary-100 
                                    dropdown-toggle
                                    ps-3 pe-6 ps-md-9 pe-md-7
                                    d-flex align-items-center gap-3 gap-md-5
                                    fw-medium text-neutral-900 
                                    fs-7 fs-md-4" 
                                    type="button">
                                        案件分類 
                                        <CaretDownIcon size={16} className="ms-1" />
                                    </button>
                                    <div className="search-divider"></div>
                                    <input 
                                        type="search" 
                                        className="form-control bg-primary-100 border-0 p-0 ps-6 ps-md-7
                                        fw-medium fs-7 fs-md-4" 
                                        placeholder="搜尋關鍵字" 
                                    />
                                    
                                    <button 
                                        className="btn btn-primary-500 rounded-3 p-3 p-md-6 m-0 
                                        d-flex justify-content-center align-items-center" 
                                        type="submit">
                                        <MagnifyingGlassIcon  className="search-icon"/>
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </section>
        <section className=" section-py ">
            <div className="container bg-primary-100 home-rounded pt-16 pt-md-0">
                <div className="row gap-10 gap-md-0 flex-column flex-md-row-reverse "
                    >
                    <div className="col home-s1-bg-md-end">
                        <div className=" h-100 d-md-flex align-items-md-center">

                        <div className=" d-flex flex-column align-items-center
                           align-items-md-start 
                           gap-7">
                            <h2 className="h5 fs-md-2 fw-bold text-center text-md-start m-0 ls-2">
                                計劃趕不上變化，<br/>
                                該怎麼靈活善用時間？
                            </h2>
                            <p className="h6 fs-md-5 text-neutral-900 text-center text-md-start mb-0">
                                在意想不到的時刻，會有人需要你的專業<br/>
                                把空閒變成金錢，個人價值翻倍！
                            </p>
                            <button type="button" className="btn btn-secondary-500 rounded-4 fs-md-4 ls-2 py-4 px-13 py-md-5 px-md-16">開發我的時間</button>

                        </div>
                        </div>
                    </div>
                    <div className="col">
                        <div className="home-s1-bg">

                        </div>
                        {/* <div className="border border-primary"></div> */}
                    </div>
                </div>
            </div>
        </section>
        <section className="home-s2-bg-start home-s2-bg-end pt-16 pb-15 section-py">
            <div className="">
                <div className="container mb-12">
                    <div className="d-flex justify-content-between">
                        <h2 className="h5 fs-md-1 fw-bold text-neutral-900 ls-2 mb-0 ls-md-4">有誰需要你的時間？</h2>
                        <div className="d-flex gap-6 gap-md-7">
                            <button type="button" disabled
                                className="btn btn-secondary-500 rounded-4
                                d-flex align-items-center p-3 p-md-4">
                                <CaretLeftIcon size={24} weight="bold" className="text-neutral"/>
                            </button>
                            <button type="button"
                                className="btn btn-secondary-500 rounded-4
                                d-flex align-items-center p-3 p-md-4">
                                <CaretRightIcon size={24} weight="bold"
                                className="text-neutral"/>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <div className="container ">
                <div className="row flex-nowrap overflow-x-auto shadow-container-spacer">
                    {/* 案件卡片 */}
                    <div className="col col-lg-4 z-3">
                        <div className="card card-task-custom card-task-shadow">
                            <div className="card-body p-7 py-lg-13 px-lg-11">
                                <div className="d-flex gap-3 mb-3 mb-lg-5">
                                    <span className="tag-urgent py-2 px-3 py-lg-3 px-lg-5 fw-bold fs-8 fs-lg-5 rounded-1">急件</span>
                                    <span className="tag-longterm py-2 px-3 py-lg-3 px-lg-5 fw-bold fs-8 fs-lg-5 rounded-1">長期</span>  
                                    <span className="tag-shortterm py-2 px-3 py-lg-3 px-lg-5 fw-bold fs-8 fs-lg-5 rounded-1">短期</span>
                                </div>
                                <div className="d-flex flex-column mb-3 mb-lg-7">
                                    <h3 className="card-title fw-bold h5 fs-lg-4 ls-2 mb-lg-5">網頁切版三頁</h3>
                                    <span className="mb-2 d-inline-flex align-items-center gap-2 fs-lg-6">
                                        <MapPinIcon  className="text-primary-300"/>
                                        遠端
                                    </span>
                                    <span className="d-inline-flex align-items-center gap-2 fs-lg-6">
                                        <HourglassIcon  className="text-primary-300"/>
                                        12/01 08:00
                                    </span>
                                </div>
                                <div className="d-flex gap-2 mb-4 mb-lg-5 card-tasktag-cover">
                                    <span className="badge bg-primary-100 text-neutral-900 fs-lg-6">網頁設計</span>
                                    <span className="badge bg-primary-100 text-neutral-900 fs-lg-6">上市櫃公司</span>
                                    <span className="badge bg-primary-100 text-neutral-900 fs-lg-6">上市櫃公司招新夥伴中</span>
                                </div>
                                <div className="d-flex flex-column mb-5 mb-lg-7">
                                    <span className="mb-2 mb-lg-3 fw-bold h6 fs-7 fs-lg-5 d-inline-flex align-items-center gap-2">
                                        <CrosshairIcon  />
                                        任務需求
                                    </span>
                                    <small className="fs-8 fs-lg-6">要用 Bootstrap，要交作業</small>
                                </div>
                                <div className="">
                                    <button type="button" className="btn btn-secondary-500 fw-bold w-100">我想洽談</button>
                                </div>
                                
                            </div>
                        </div>
                        
                    </div>
                    <div className="col col-lg-4 z-3">
                        <TaskCard  />
                    </div>
                    <div className="col col-lg-4">
                        <TaskCard  />
                    </div>
                    <div className="col col-lg-4">
                        <TaskCard  />
                    </div>
                    <div className="col col-lg-4">
                        <TaskCard  />
                    </div>
                    <div className="col col-lg-4">
                        <TaskCard  />
                    </div>
                    {/* 案件卡片結束 */}
                </div>

            </div>

        </section>
        <section className="container border">
            <div className="">
                <h2 className="h4 text-neutral-900 text-center mb-0">在時務所買賣時間的理由</h2>
            </div>
        </section>
        <section className="container border">
            <div className="">
                <h2 className="h5 text-neutral-900 mb-0">受好評的時間賣家</h2>
                <div>
                <button type="button"></button>
                <button type="button"></button>
                </div>
            </div>
        </section>
        <section className="container border">
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