import { ThumbsUpIcon,SealCheckIcon,StarIcon,HeartIcon } from "@phosphor-icons/react";

export default function WorkerCard({ data }) {
    // 1. 解構資料：從 data 中取出 worker 物件，並設定預設值防錯
    const { worker = {} } = data;
    const {
        name = "未知人才",
        serviceRate = 0,
        serviceCases = 0,
        summary = "尚無自我介紹",
        profilePictureUrl = "./homepage-imgs/worker-default.png", // 預設圖片
    } = worker;
    return (
        <div className="card h-100
            custom-servicard-deco
            position-relative">
            <HeartIcon size={40} weight="bold" 
                className="text-neutral position-absolute end-0 m-5"/>    
            <img src="./homepage-imgs/worker01.png" alt="" 
            className="card-img-top" />
            <div className="card-body d-flex flex-column pt-5 pb-7 px-7">
                <p className="h5 fs-md-4 fw-bold ls-2 mb-3 text-line-clamp-1">
                    {name}
                </p>
                <div className="mb-5">
                    <h6 className="fs-7 fs-md-6 mb-2
                        d-flex align-items-center">
                        <ThumbsUpIcon className="me-2 me-md-3"/>
                        {serviceRate.toFixed(1)}
                    </h6>
                    <h6 className="fs-7 fs-md-6 mb-0
                        d-flex align-items-center">
                        <SealCheckIcon className="me-2 me-md-3" />
                        已達成：{serviceCases}
                    </h6>
                </div>
                <div className="mb-5 mb-md-7 flex-grow-1">
                    <h6 className="fs-7 fs-md-5 mb-2
                        d-flex align-items-center">
                        <StarIcon className="me-2 me-md-3" weight="bold" />
                        自我介紹
                    </h6>
                    <span className="fs-8 fs-md-6 text-line-clamp-2">
                        {summary}
                    </span>
                </div>
                <div className="mt-auto">
                    <a href="" className="btn btn-secondary-filled 
                   py-4 py-md-5 w-100">
                        我想洽談
                    </a>
                </div>
            </div>
        </div>
    )
}