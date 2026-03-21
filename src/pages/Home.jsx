// 1. 首頁
import React,{ useRef,useState,forwardRef,useEffect } from "react";
import { Link,useNavigate } from 'react-router-dom';
// import * as bootstrap from 'bootstrap';
import {Dropdown, Offcanvas} from 'bootstrap';
import { Swiper,SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import { HourglassIcon,CrosshairIcon,MagnifyingGlassIcon,CaretUpIcon,CaretDownIcon,CaretLeftIcon,CaretRightIcon,CreditCardIcon,ChatsIcon,HandHeartIcon } from "@phosphor-icons/react";
import 'swiper/css';
import axios from "axios";
import HomeCarousel from '../components/HomeCarousel';
import ServiceCard from '../components/ServiceCard';
import WorkerCard from "../components/WorkerCard";
import WorkerCardSkeleton from "../components/WorkerCardSkeleton";

function Search({ CaretDownIcon,MagnifyingGlassIcon }) {
    
    //----- 分類功能 -----
    const categories = [
    {
        "id":"cat001",
        "heading":"居家生活",
    },
    {
        "id":"cat002",
        "heading":"教育訓練",
    },
    {
        "id":"cat003",
        "heading":"行銷企劃",
    },
    {
        "id":"cat004",
        "heading":"影音圖像",
    },
    {
        "id":"cat005",
        "heading":"活動外燴",
    },
    {
        "id":"cat006",
        "heading":"財商法務",
    },
    {
        "id":"cat007",
        "heading":"健身美體",
    },
    {
        "id":"cat008",
        "heading":"營建工程",
    },
    {
        "id":"cat009",
        "heading":"資訊技術",
    },
    {
        "id":"cat010",
        "heading":"其他服務",
    },
    ];
    const subCategories= [
    {
        "id":"scat1-001",
        "heading":"清潔服務",
        "categoryId": "cat001",
        "img":"./searchMenu-imgs/menu001.png",
        "imgSm":"./searchMenu-imgs/sm/sm01.png"
    },
    {
        "id":"scat1-002",
        "heading":"搬家與回收",
        "categoryId": "cat001",
        "img":"./searchMenu-imgs/menu002.png",
        "imgSm":"./searchMenu-imgs/sm/sm02.png"
    },
    {
        "id":"scat1-003",
        "heading":"家電與家居維修",
        "categoryId": "cat001",
        "img":"./searchMenu-imgs/menu003.png",
        "imgSm":"./searchMenu-imgs/sm/sm03.png"
    },
    {
        "id":"scat1-004",
        "heading":"衛浴服務",
        "categoryId": "cat001",
        "img":"./searchMenu-imgs/menu004.png",
        "imgSm":"./searchMenu-imgs/sm/sm04.png"
    },
    {
        "id":"scat1-005",
        "heading":"廚房服務",
        "categoryId": "cat001",
        "img":"./searchMenu-imgs/menu005.png",
        "imgSm":"./searchMenu-imgs/sm/sm05.png"
    },
    {
        "id":"scat1-006",
        "heading":"家具櫥櫃",
        "categoryId": "cat001",
        "img":"./searchMenu-imgs/menu006.png",
        "imgSm":"./searchMenu-imgs/sm/sm06.png"
    },
    {
        "id":"scat1-007",
        "heading":"門窗服務",
        "categoryId": "cat001",
        "img":"./searchMenu-imgs/menu007.png",
        "imgSm":"./searchMenu-imgs/sm/sm07.png"
    },
    {
        "id":"scat1-008",
        "heading":"家事服務",
        "categoryId": "cat001",
        "img":"./searchMenu-imgs/menu008.png",
        "imgSm":"./searchMenu-imgs/sm/sm08.png"
    },
    {
        "id":"scat1-009",
        "heading":"寵物服務",
        "categoryId": "cat001",
        "img":"./searchMenu-imgs/menu009.png",
        "imgSm":"./searchMenu-imgs/sm/sm09.png"
    },
    {
        "id":"scat1-010",
        "heading":"服飾配件",
        "categoryId": "cat001",
        "img":"./searchMenu-imgs/menu010.png",
        "imgSm":"./searchMenu-imgs/sm/sm10.png"
    },
    {
        "id":"scat1-011",
        "heading":"手工製作",
        "categoryId": "cat001",
        "img":"./searchMenu-imgs/menu011.png",
        "imgSm":"./searchMenu-imgs/sm/sm11.png"
    },
    ]
    // 下拉式選單的ref
    const dropdownRef = useRef(null); // 指向下拉選單的按鈕或容器
    const bsDropdown = useRef(null); // 儲存 Bootstrap 實例
    // 建立一個 Ref 來存取 Offcanvas 的 HTML 元素
    const offcanvasRef = useRef(null);
    const bsOffcanvas = useRef(null);

    useEffect(() => {

        // 初始化 Bootstrap Dropdown & Offcanvas 實例
        if (dropdownRef.current) {
        bsDropdown.current = new Dropdown(dropdownRef.current);
        }
        if (offcanvasRef.current) {
        bsOffcanvas.current = new Offcanvas(offcanvasRef.current);
        }

        // 清理機制：元件卸載時銷毀實例，避免記憶體洩漏
        return () => {
        if (bsDropdown.current) {
            bsDropdown.current.dispose();
        }
        if (bsOffcanvas.current) {
            bsOffcanvas.current.dispose();
            }
        };
    }, []);

    const [category, setCategory] = useState(null);
    const [activeMainId, setActiveMainId] = useState(categories[0].id);// 暫存選中的主類別
    const [viewStep, setViewStep] = useState(1); //Offcanvas切換 1: 主類別, 2: 副類別
    
    // ---- 根據暫存的 activeMainId 篩選出對應的副類別
    const filteredSubCategories = subCategories.filter(
        (sub) => sub.categoryId === activeMainId
    );
    // ---- Offcanvas 返回主類別
    const handleBackStep = () => {
        setViewStep(1);
    };
    // ---- Offcanvas 開啟時重置
    const handleOpenOffcanvas = () => {
        setViewStep(1); // 確保每次點開都回到第一步
        // --確保開啟時 activeMainId 至少是第一個，或是維持上次狀態
        if (!activeMainId) setActiveMainId(categories[0].id);
        bsOffcanvas.current.show();
    };
    // --- 統一處理最終選定邏輯 ---
    const handleFinalSelection = (subHeading) => {
        // 1. 更新搜尋欄按鈕文字
        setCategory(subHeading);

        // 2. 關閉所有選單實例
        if (bsDropdown.current) bsDropdown.current.hide();
        if (bsOffcanvas.current) bsOffcanvas.current.hide();

        // 3. 延遲重置 Offcanvas 狀態（避免關閉動畫時看到畫面切換）
        setTimeout(() => {
            setViewStep(1);
            setActiveMainId(categories[0].id);
        }, 300);
    };
    // --- 搜尋欄功能 ---
    const navigate = useNavigate();
    const [keyword, setKeyword] = useState(""); // 管理輸入框內容
    const handleSearchSubmit = (e) => {
        e.preventDefault(); 
            // 導向 selllist，並透過 state 或 search 帶入資料
            // 這裡示範用 search query string 的方式 (例如: /selllist?cat=清潔&q=客廳)
        const params = new URLSearchParams();

        // 如果有選分類（這裡建議傳 id，比較精確）
        //只有當 category 有值（代表使用者真的選了一個分類）時，才帶入分類 ID
        if (category && activeMainId) {
            params.append("categoryId", activeMainId);
            // 如果你想精確搜尋副類別標題
            params.append("subCategory", category); 
        }
        // 如果有輸入關鍵字，使用 json-server 的全文檢索 q
        if (keyword) params.append("q", keyword);

        navigate(`/selllist?${params.toString()}`);
    };
  return (
    <div className="px-11 px-md-0">
      <form className="search-bar-container bg-neutral rounded-3 p-2 p-md-5"
        onSubmit={handleSearchSubmit}>
        <div className="d-flex align-items-center justify-content-between">
          {/* Dropdown 容器 */}
          <div className="dropdown">
            {/* MD 版：下拉按鈕 */}
            <button
              className="dropdown-toggle
                btn task-select 
                d-none d-md-flex align-items-center gap-5 
                fw-medium fs-4 
                ps-9 pe-7 border-0"
              type="button"
              data-bs-toggle="dropdown" // 關鍵：Bootstrap JS 會找這個
              aria-expanded="false"
              ref={dropdownRef}
            >
              {category || "選擇案件分類"}
              <CaretDownIcon size={36} className="ms-1" />
            </button>
            <div className="dropdown-menu p-13">
                <div className="container" style={{width:'80vw'}}>
                    <div className="row">
                        <div className="col-2">
                            {/* MD 下拉清單：主分類 */}
                            {categories.map((cat)=>{
                                return (
                                <button type="button"
                                    key={cat.id} 
                                    className={`custom-home-select-itemA 
                                                ${activeMainId === cat.id ? 'active' : ''}`}
                                    onClick={(e) => {
                                        setActiveMainId(cat.id)
                                        e.stopPropagation(); // 關鍵：阻止事件向上冒泡到 Dropdown 觸發關閉
                                    }}
                                >
                                    {cat.heading}
                                </button>
                                )
                            })}
                        </div>
                        <div className="col-10 sub-category-divider">
                            <div className="row gy-4 ps-10">
                            {/* MD 下拉清單：副分類，篩選對應catID的副分類 */}
                            {subCategories
                                .filter(subCat =>subCat.categoryId === activeMainId)
                                .map((subCat)=>{
                                    return (
                                    <div className="col-3" key={subCat.id}>
                                        <button type="button" 
                                            className="custom-home-select-itemB"
                                            onClick={()=>{  //- 點擊副類別後更新按鈕文字並關閉選單
                                                handleFinalSelection(subCat.heading)
                                            }}
                                        >
                                            <div className="position-relative">
                                                <img src={subCat.img} alt={subCat.heading}
                                                className="object-fit-cover w-100" />
                                                <span className="position-absolute start-0 bottom-0
                                                p-5">
                                                    {subCat.heading}
                                                </span>
                                            </div>
                                        </button>
                                    </div> 
                                    )})}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* MD 版：下拉清單結束 */}
            </div>
            {/* 行動版：觸發 Offcanvas 按鈕 */}
            <button
              className="btn task-select 
              fw-medium text-neutral-900 fs-7
              d-flex d-md-none align-items-center gap-3 
              ps-3 pe-4 border-0 text-nowrap"
              type="button"
                onClick={handleOpenOffcanvas}
            >
                <span className={ (category || "案件分類").length > 5 ? 
                    "text-fade-mask" 
                    : "text-nowrap" }>
                    {category || "案件分類"}
                </span>
                <CaretDownIcon size={16} className="ms-1 flex-shrink-0" />
            </button>

          <div className="search-divider mx-2 mx-md-0"></div>

          <input
            type="search"
            className="form-control bg-neutral border-0 p-0 ps-4 ps-md-7 fw-medium fs-7 fs-md-4 shadow-none"
            placeholder="搜尋關鍵字"
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}/>

          <button
            className="btn btn-primary-filled rounded-3 p-3 p-md-6 d-flex justify-content-center align-items-center border-0"
            type="submit"
          >
            <MagnifyingGlassIcon size={24} className="text-white" />
          </button>
        </div>
      </form>

      {/* --- 行動版 Offcanvas --- */}
      <div 
        className="offcanvas offcanvas-bottom custom-home-offcanvas p-11 " 
        tabIndex="-1" 
        ref={offcanvasRef}
      >
        {/* --- 行動版 Offcanvas內容 --- */}
        <div className="mb-7">
          <h5 className="h4 m-0 fw-bold text-center ls-2 text-primary-300">
            {viewStep === 1 ? '選擇類別' : '選擇服務'}
          </h5>
        </div>
        <div className="offcanvas-body">
            {
                viewStep === 1 ? (<> 
                    {/* --- Offcanvas 主分類 --- */}
                    <div className="row mb-7">
                        {categories.map((cat)=>{
                            return (
                                <div className="col-6" key={cat.id}>
                                    <button type="button"
                                        className={`custom-home-select-itemA
                                            ${activeMainId === cat.id ? 'active' : ''}`
                                        }
                                        onClick={() => setActiveMainId(cat.id)}
                                    >
                                        {cat.heading}
                                    </button>
                                </div>
                            )
                        })}
                    </div>               
                    <button type="button"
                        className={`btn btn-secondary-filled fw-bold w-100 py-4
                            ${!activeMainId ? 'opacity-70'
                                : ''
                            }`}
                        disabled={!activeMainId}
                        onClick={()=>setViewStep(2)}
                    >
                        下一步：選擇服務
                    </button>
                </>
                ) : (<>
                    {/* --- Offcanvas 副分類 --- */}
                    <div className="row gx-2 gy-3 mb-11">
                        {filteredSubCategories.map((subCat) => (
                            <div className="col-6" key={subCat.id}>
                                <button
                                    type="button"
                                    className=" 
                                        custom-home-select-itemB
                                        position-relative
                                        d-flex justify-content-end"
                                    onClick={() => handleFinalSelection(subCat.heading)}
                                >
                                    <img 
                                        src={subCat.imgSm} 
                                        alt={subCat.heading} 
                                        className="img-fluid" />
                                    <span className="position-absolute top-50 start-0 translate-middle-y ps-4">
                                        {subCat.heading}
                                    </span>
                                </button>
                            </div>
                        ))}
                    </div>
                    <button type="button"
                        className="btn btn-secondary-outline border-2 
                            w-100 py-4"
                        onClick={handleBackStep}>
                            <span className="d-flex align-items-center justify-content-center fw-bold">
                            <CaretLeftIcon size={24} weight="bold" className="me-1" />
                            重新選擇類別
                            </span>
                    </button>
                </>
                )
            }
        </div>
      </div>
        {/* --- 行動版 Offcanvas結束 --- */}
    </div>
  );
}

export default function Home(){
    

    const sec3Data = [
        {
            title: '金流明確' ,
            icon:  <CreditCardIcon size={48} className="text-primary-300"/>,
            content: '線上撥款，保障彼此的權益，帳務紀錄有條理。',
            img:'./homepage-imgs/05sec3-1.png'
        },
        {
            title: '聊好再啟動' ,
            icon:  <ChatsIcon size={48} className="text-primary-300"/>,
            content: '即時交流，達成共識再交易。',
            img:'./homepage-imgs/06sec3-2.png'
        },
        {
            title: '時刻守護' ,
            icon:  <HandHeartIcon size={48} className="text-primary-300"/>,
            content: '平台團隊線上陪伴你的案件進程，即時支援你的疑難雜症。',
            img:'./homepage-imgs/07sec3-3.png'
        },
    ];
    const navigate = useNavigate();
    //頁尾的"回到網頁上層功能"
    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth', // 平滑滾動
        });
    };
    //API串接
    const [isLoading, setIsLoading] = useState(true);
    const apiUrl =import.meta.env.VITE_API_URL;
    const [taskData,setTaskData ]=useState([]);
    const [ workerData,setWorkerData ] = useState([]);
    useEffect(()=>{
        //合併兩個資料的請求
        const fetchData = async()=>{
            try {
                setIsLoading(true);
                const [ taskRes, workerRes ] = await Promise.all([
                        axios.get(`${apiUrl}/tasks?_limit=6`),
                        axios.get(`${apiUrl}/users?worker.serviceRate_gte=4.5&_limit=6`)
                    ]);
                setTaskData(taskRes.data);
                setWorkerData(workerRes.data);
            } catch (error) {
                
            } finally {
                // 資料回來後，延遲 1 秒關閉（為了看到漂亮的 Skeleton）
                setIsLoading(false);
            }
        }
        fetchData();
    },[apiUrl])

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
                        <Search
                        CaretDownIcon={CaretDownIcon}
                        MagnifyingGlassIcon={MagnifyingGlassIcon}
                        />
                    </div>
                </div>
            </div>
        </section>
        <section className="section-py">
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
                            <Link to="/postselltime"
                                state={{ backTop: true }}
                                className="btn btn-secondary-filled rounded-4   fs-md-4 ls-2 py-4 px-13 py-md-5 px-md-16"
                            >開發我的時間</Link>

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
        <section className="home-s2-bg-start home-s2-bg-end pt-16 pb-15 home-s2-py ">
            {
                isLoading ? (
                    <div className="container">
                        <div className="row">
                            {
                                Array(3).fill(0).map((_, i) => (
                                    <div className="col-12 col-md-4" key={i}>
                                        <WorkerCardSkeleton
                                            baseColor="#ffe1d2"
                                            highlightColor="#fff3ed" />
                                    </div>
                                ))
                            }
                        </div>
                    </div>
                ) : (
                    <HomeCarousel 
                        data={taskData}
                        Card={ServiceCard}
                        title="有誰需要你的時間？"
                        perViewMd="3"
                        CaretLeftIcon={CaretLeftIcon}
                        CaretRightIcon={CaretRightIcon}/>
                )
            }
            
        </section>
        <section className="container py-16 section-py">
            <div className="mb-9 mb-md-16 pb-md-9">
                <h2 className="h4 fs-md-1 text-neutral-900 fw-bold ls-2 text-center mb-0">在時務所買賣時間的理由</h2>
            </div>
            <div className="row gy-4">
                {
                    sec3Data.map(item =>{   return (
                        <div className="col-md-4" key={item.title}>
                            <div className="card h-100 rounded-4 border-0"
                            style={{boxShadow:"8px 8px 20px rgba(0, 0, 0, 0.04)"}}>
                                <div className="card-img d-flex justify-content-center">
                                    <img className="object-fit-cover w-100 rounded-top-4"
                                    src={item.img} alt="" />
                                </div>
                                <div className="card-body d-flex flex-column align-items-center px-9 pt-7 pb-9">
                                    <div className="mb-3">
                                        {item.icon}
                                    </div>
                                    <div className="h5 fw-bold ls-2 text-center mb-5">
                                        {item.title}
                                    </div>
                                    <p className="ls-2 mb-0">
                                        {item.content}
                                    </p>
                                </div>
                            </div>
                        </div>
                    )
                    })
                }
            </div>
        </section>
        <section className="bg-primary-100 sec4-rounded section-py pb-16 mb-3 mb-md-0 overflow-hidden">
            <div className="container">
                <div className="row">
                    {/* 左側：標題與裝飾圖 (col-5) */}
                    <div className="col-md-5 mb-16 mb-md-0">
                        <div className="d-flex flex-column justify-content-center align-items-center mx-12 mx-md-0 mb-md-0 sec3-block-start h-100">
                        <img
                            src="./homepage-imgs/09sec4-3.png"
                            alt="裝飾圖"
                            className="img-fluid mb-7 mb-md-13"
                        />
                        <p className="fs-md-4 fw-bold mb-9">在理想的時間，得到專業服務。</p>
                        <Link to="/buylist"
                            state={{ fromHome: true }} 
                            className="btn btn-primary-filled text-neutral fw-bold fs-md-4 px-13 py-4 px-md-16 py-md-5"
                            >
                            找尋專業助手
                        </Link>
                        </div>
                    </div>

                    {/* 右側：標題與輪播區 (col-7) */}
                    <div className="col-md-7">
                        {isLoading ? (
                            /* 1. 移除多餘大括號，2. 加上 row 容器確保佈局一致 */
                            <div className="row g-6">
                                {Array(2).fill(0).map((_, i) => (
                                    <div className="col-12 col-md-6" key={i}>
                                        <WorkerCardSkeleton
                                            baseColor="#ffe1d2"
                                            highlightColor="#fff3ed"
                                        />
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <HomeCarousel 
                                data={workerData}
                                Card={WorkerCard}
                                title="受好評的時間賣家"
                                perViewMd={2} // 注意：數值建議直接傳數字
                                CaretLeftIcon={CaretLeftIcon}
                                CaretRightIcon={CaretRightIcon}
                            />
                        )}
                        
                    </div>
                </div>
            </div>
        </section>
        <section className="container section-py py-16 position-relative">
            <div className="row">
                <div className="col-md-4">
                    <div className="d-flex flex-column align-items-center gap-5">
                        <h3 className="text-neutral-900 fw-bold ls-2">達成案件</h3>
                        <div className="home-s5-bgimg-1 home-s5-bgimg-cover shadow">
                            <div className="d-flex flex-column align-items-center">
                                <span className="display-2 text-primary-100 fw-bold">
                                    659
                                </span>
                                <span className="display-6 text-neutral fw-bold ls-2">
                                    件
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-md-4">
                    <div className="d-flex flex-column align-items-center gap-5">
                        <h3 className="text-neutral-900 fw-bold ls-2">被善用的時間</h3>
                        <div className="home-s5-bgimg-2 home-s5-bgimg-cover shadow">
                            <div className="d-flex flex-column align-items-center">
                                <span className="display-2 text-primary-100 fw-bold">
                                    4267
                                </span>
                                <span className="display-6 text-neutral fw-bold ls-2">
                                    小時
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-md-4">
                    <div className="d-flex flex-column align-items-center gap-5">
                        <h3 className="text-neutral-900 fw-bold ls-2">案件滿意度</h3>
                        <div className="home-s5-bgimg-3 home-s5-bgimg-cover shadow">
                            <div className="d-flex flex-column align-items-center">
                                <span className="display-2 text-primary-100 fw-bold">
                                    4.8
                                </span>
                                <span className="display-6 text-neutral fw-bold ls-2">
                                    分
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="d-flex justify-content-center home-s5-btn-mt"
             >
                <Link to="/postselltime" 
                    state={{ fromHome: true }}
                    className="btn btn-primary-filled
                    h5 fs-md-4 ls-2
                    py-4 px-13 py-md-5 px-md-16"
                    
                >
                    成為時間賣家
                </Link>
            </div>
            <div className="position-absolute bottom-0 start-50 translate-middle-x">
                <button 
                    type="button" 
                    className="btn btn-secondary-filled 
                        py-4 px-6 px-md-7
                        rounded-0 rounded-top"
                    onClick={scrollToTop}>
                    <span className="h5 ls-1">
                        <CaretUpIcon size={24} weight="bold" className="me-3"/>
                        TOP
                    </span>
                </button>
            </div>
        </section>

        </>
    )
}