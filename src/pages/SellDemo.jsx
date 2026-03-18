// 2-1-1. 接案者的公開資料
import { useState, useEffect } from 'react';
import { useParams } from 'react-router';
import axios from 'axios';
import { Swiper, SwiperSlide } from 'swiper/react';
import { FreeMode, Navigation, Thumbs, Pagination } from 'swiper/modules';

// 樣式引入
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/navigation';
import 'swiper/css/thumbs';
import 'swiper/css/pagination';


const weddingImages = [
    "sellDemo-imgs/America.jpg",
    "sellDemo-imgs/night.jpg",
    "sellDemo-imgs/water.png",
];
//處理serviceTime的格式
const formatServiceTime = (serviceTime) => {
  // 1. 如果是隨時諮詢
  if (serviceTime?.acceptAnytime) {
    return "聊天室諮詢";
  }

  // 2. 如果有具體時間段
  if (serviceTime?.times && serviceTime.times.length > 0) {
    return serviceTime.times.map((item, index) => {
      const start = new Date(item.startTime);
      const end = new Date(item.endTime);

      // 格式化選項：2026/04/11 08:30
      const formatDate = (date) => {
        const y = date.getFullYear();
        const m = String(date.getMonth() + 1).padStart(2, '0');
        const d = String(date.getDate()).padStart(2, '0');
        const hh = String(date.getHours()).padStart(2, '0');
        const mm = String(date.getMinutes()).padStart(2, '0');
        return `${y}/${m}/${d} ${hh}:${mm}`;
      };

      // 格式化結束時間（如果跟開始時間同天，可以只顯示時間，這裡示範完整顯示）
      return `${formatDate(start)} ~ ${formatDate(end)}`;
    }).join("、"); // 如果有多個時段用頓號隔開
  }

  return "暫無時間資訊";
};
//處理時間格式
const formatDate = (dateStr) => {
  // 如果沒有資料，回傳空字串或預設文字，避免後面的 split 壞掉
  if (!dateStr) return "載入中..."; 
  return dateStr.split('T')[0].replaceAll('-', '/');
};
export default function SellDemo(){
    const [thumbsSwiper, setThumbsSwiper] = useState(null);
    const [reviews, setReviews] = useState([]);
    // --- GET指定service ---
    const {id} = useParams();
    const apiUrl =import.meta.env.VITE_API_URL;
    const [ serviceData , setServiceData ] = useState({});
    const [ isLoading , setIsLoading ] = useState(false); //--紀錄資料是否請求成功
    useEffect(()=>{
        (async()=>{
            
            try {
                const res= await axios.get(`${apiUrl}/services/${id}?_expand=user&_expand=category&_expand=subCategory`)
                setServiceData(res.data);
                if (res.data && Object.keys(res.data).length > 0){
                    setServiceData(res.data);
                    setIsLoading(true);
                }
                console.log(res.data);
            } catch (error) {
                
            }
        })()
    },[id])
    // --- 解構提出service的屬性 ---
    const {
        serviceTitle,
        servicePrice,
        serviceLocations = [],
        serviceKeywords = [],
        serviceDetail,
        serviceTags=[],
        demoLink,
        demoImgs = [],
        serviceTime,
        creatAt,
        user = {},
        category = {},
        subCategory = {},
        userId
    } = serviceData || {};
    const { worker = {} } = user;
    //--- 標籤轉換對照表 (對應 serviceTags)
    const tagMap = {
        'sosTime': { text: '急件', className: 'tag-urgent' },
        'shortTime': { text: '短期', className: 'tag-shortterm' },
        'longTime': { text: '長期', className: 'tag-longterm' }
    };
    // --- GET指定service 結束 ---

    // --- GET指定review  ---
    const [ reviewData,setReviewData ] = useState([]);
    useEffect(()=>{
        if (!userId) return;
        (async()=>{
            try {
                const res = await axios.get(`${apiUrl}/reviews?workerId=${userId}&_expand=user`)
                console.log('re',res.data);
                setReviewData(res.data);
            } catch (error) {
                
            }
        })()
    },[userId])
    // --- GET指定review 結束 ---
    console.log('當前ID',id);
    console.log('test',apiUrl);
    
    
    if (!isLoading){
        return <p className='h1 text-center py-15'>
            載入中...
        </p>
    }
    return(<>
    <div style={{background: "#FBF7F5",}}>
        <div className="container d-flex gap-7" style={{maxWidth: "1296px", margin: "0 auto"}}>
            <div className="d-flex container row align-items-start" style={{ margin: "0 auto"}}>
                <div className="col-xl-9 order-xl-2">
                    <nav className="py-5 ms-4" aria-label="breadcrumb">
                        <ol className="breadcrumb">
                            <li className="breadcrumb-item"><a className="text-decoration-none text-neutral-500 fw-medium" href="#">我要委託</a></li>
                            <li className="breadcrumb-item"><a className="text-decoration-none text-neutral-500 fw-medium" href="#">{category.heading}</a></li>
                            <li className="breadcrumb-item"><a className="text-decoration-none text-neutral-500 fw-medium" href="#">{subCategory.name}</a></li>
                            <li className="breadcrumb-item active text-neutral-900 fw-medium" aria-current="page">{serviceTitle}</li>
                        </ol>
                    </nav>
                    <div className="d-flex flex-column gap-14 ms-4">
                        <div className="container row d-flex gap-13">
                            <div className="col-xxl-6">
                                <Swiper
                                    style={{
                                    '--swiper-navigation-color': '#fff',
                                    '--swiper-pagination-color': '#fff',
                                    borderRadius: '20px',
                                    overflow: 'hidden',
                                    }}
                                    spaceBetween={10}
                                    navigation={true}
                                    pagination={{ clickable: true }}
                                    // 確保 thumbsSwiper 存在且未銷毀
                                    thumbs={{ swiper: thumbsSwiper && !thumbsSwiper.destroyed ? thumbsSwiper : null }}
                                    modules={[FreeMode, Navigation, Thumbs, Pagination]}
                                    className="mb-5"
                                >
                                    {/* 使用 Optional Chaining 確保資料存在，若無則回傳空陣列 */}
                                    {(demoImgs || []).map((img, index) => (
                                    <SwiperSlide key={index}>
                                        <img
                                        src={img}
                                        style={{ width: '100%', height: '450px', objectFit: 'cover' }}
                                        alt={`展示圖片-${index + 1}`}
                                        />
                                    </SwiperSlide>
                                    ))}
                                </Swiper>
                                <Swiper
                                    onSwiper={setThumbsSwiper}
                                    spaceBetween={10}
                                    slidesPerView={3}
                                    freeMode={true}
                                    watchSlidesProgress={true}
                                    modules={[FreeMode, Navigation, Thumbs]}
                                    className="thumbs-swiper"
                                >
                                    {(demoImgs || []).map((img, index) => (
                                    <SwiperSlide key={index} style={{ cursor: 'pointer' }}>
                                        <img
                                        src={img}
                                        className="rounded-4 shadow-sm"
                                        style={{
                                            width: '100%',
                                            height: '120px',
                                            objectFit: 'cover',
                                            border: '2px solid transparent',
                                        }}
                                        alt={`縮圖-${index + 1}`}
                                        />
                                    </SwiperSlide>
                                    ))}
                                </Swiper>
                            </div>
                            <div className="col-xxl-5 p-9 rounded-4 shadow" style={{background: "white"}}>
                                <ul className="d-flex list-unstyled gap-3 mb-5">
                                    {serviceTags.map(tagKey => {
                                                            const tagInfo = tagMap[tagKey];
                                                            return tagInfo ? (
                                                                <span key={tagKey} className={`${tagInfo.className} pt-1 pb-1 ps-3 pe-3 rounded-pill`}>
                                                                    {tagInfo.text}
                                                                </span>
                                                            ) : null;
                                                        })}                                 
                                </ul>
                                <h3 className="text-neutral-900 mb-4">{serviceTitle}</h3>
                                <ul className="d-flex list-unstyled gap-4 flex-wrap">
                                    {
                                        serviceKeywords.map((keyword,index)=>{
                                            return (
                                                <li key={index}
                                                    className="bg-primary-100 fs-6 pt-1 pb-1 ps-3 pe-3 rounded-pill">
                                                    # {keyword}
                                                </li>
                                            )
                                        })
                                    }
                                </ul>
                                <ul className="list-unstyled">
                                    <li className="d-flex gap-5"><p className="fw-medium" style={{width: "84px"}}><img src="sellDemo-imgs/moneybag.svg" className="me-2" alt="錢袋圖示" />服務費率</p><p>$ {servicePrice.minPrice}～$ {servicePrice.maxPrice} / 件</p></li>
                                    <li className="d-flex gap-5"><p className="fw-medium" style={{width: "84px"}}><img src="sellDemo-imgs/calendar.svg" className="me-2" alt="日曆圖示" />時間</p><p>{formatServiceTime(serviceData?.serviceTime)}</p></li>
                                    <li className="d-flex gap-5"><p className="fw-medium" style={{width: "84px"}}><img src="sellDemo-imgs/map-icon.svg" className="me-2" alt="地圖圖標" />地點</p>
                                        <p>
                                            {serviceLocations.map((local,index)=>{
                                                return <span key={index}>
                                                        {local}
                                                        {index !== serviceLocations.length - 1 && "、"}
                                                        </span>
                                            })}
                                        </p>
                                    </li>
                                    <li className="d-flex gap-5"><p className="fw-medium" style={{width: "84px"}}><img src="sellDemo-imgs/briefcase.svg" className="me-2" alt="公事包圖示" />作品連結</p><a href="#">https://github.com/</a></li>
                                </ul>
                                <div>
                                    <h6 className="fw-medium mb-2">簡介</h6>
                                    <p className="mb-4"
                                        style={{whiteSpace:'pre-line'}}>
                                            {serviceDetail}
                                    ​</p>
                                    <p className="text-end">上架日期：{formatDate(creatAt)}</p>
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
                                <article style={{whiteSpace:'pre-line'}}>
                                    {worker.serviceDescription}
                                </article>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="d-flex flex-column align-items-center p-13 rounded-4 col order-xl-1 my-6 shadow" style={{background: "white"}}>
                    <h4 className="fw-bold">接案者資訊</h4>
                    <div>
                        <img src={worker.profilePictureUrl} 
                            className="rounded-circle mb-5" 
                            style={{width: "80px", height: "80px", objectFit: "cover"}} 
                            alt={worker.name}/>
                    </div>
                    <a className="fs-4 text-decoration-none text-neutral-900 mb-3" href="#">{worker.name}</a>
                    <p className="fs-6 fw-medium"><img className="me-2" src="sellDemo-imgs/map-icon.svg" alt="地圖圖標" />{worker.location}</p>
                    <ul className="d-flex list-unstyled gap-4 flex-wrap pb-9 mb-9 border-bottom border-1 border-neutral-500">
                        {
                            worker.skills.map((skill,index)=>{
                                return (
                                    <li key={index}
                                    className="bg-primary-100 fs-6 pt-1 pb-1 ps-3 pe-3 rounded-pill">
                                        # {skill}
                                    </li>
                                )
                            })
                        }
                    </ul>
                    <ul className="d-flex list-unstyled flex-column lh-1">
                        <li className="d-flex gap-7">
                            <p>身分認證</p>
                            {worker.isVerify ? (
                                <p className="text-success d-flex ailgn-items-center">
                                    <img className="me-2" src="sellDemo-imgs/passed.svg" alt="" />
                                    已通過
                                </p>
                            ) : (
                                <p className="text-danger d-flex ailgn-items-center">
                                    尚未驗證
                                </p>
                            )}
                            
                        </li>
                        <li className="d-flex gap-7"><p>成交案數</p><p>{worker.serviceCases}</p></li>
                        <li className="d-flex gap-7"><p>加入時間</p><p>{formatDate(user.createdAt)}</p></li>
                        <li className="d-flex gap-7">
                            <p>交易評價</p>
                            <p className="d-flex align-items-center">
                                {worker.serviceRate}
                                <img className="ms-2" src="sellDemo-imgs/star-fill.svg" alt="星星圖標" />
                            </p>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
        <div className="container col row justify-content-end my-14" style={{ margin: "0 auto"}}>
            <div className="col-xxl-9 px-7">
                <h3>評價</h3>
                {reviewData?.map((review)=>{
                    return (
                        <div className="mb-5" key={review.id}>
                            <div className="py-7 px-9 rounded-4 mb-5 shadow" style={{background: "white"}}>
                                <div className="d-flex justify-content-between">
                                    <div className="d-flex gap-3 mb-7">
                                        <a href="#"><img className="rounded-circle" src="sellDemo-imgs/Martin.jpg" style={{width: "64px", height: "64px", objectFit: "cover"}} alt="Martin" /></a>
                                        <div className="align-self-center">
                                            <a className="fw-medium text-decoration-none text-neutral-900 mt-0" href="#">
                                                {review.user.client.name}
                                            </a>
                                            <p className="fs-7 mb-0">桃園</p>
                                        </div>
                                    </div>
                                <div className="align-self-center d-flex gap-2">
                                    <img src="sellDemo-imgs/star-fill.svg" alt="星星" />
                                    <img src="sellDemo-imgs/star-fill.svg" alt="星星" />
                                    <img src="sellDemo-imgs/star-fill.svg" alt="星星" />
                                    <img src="sellDemo-imgs/star-fill.svg" alt="星星" />
                                    <img src="sellDemo-imgs/star-fill.svg" alt="星星" />
                                </div>
                            </div>
                            <p>{review.rev_content}​</p>
                            </div>
                        </div>
                        
                    )
                })}
                <button type="button" style={{width: "160px"}} className="btn btn-outline-secondary-500 fw-bold border-2 d-block mx-auto">顯示更多</button>
            </div>
            <div className="col-xxl-9 my-15 px-7">
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