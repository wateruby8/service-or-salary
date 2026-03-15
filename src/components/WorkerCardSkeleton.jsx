// components/WorkerCardSkeleton.jsx
import Skeleton from 'react-loading-skeleton';

export default function WorkerCardSkeleton({ baseColor, highlightColor }) {
  return (
    <div className="card h-100 custom-servicard-deco border-0 shadow-sm">
      {/* 圖片區：使用插件內建的圓角與高度 */}
      {/* <div className="ratio ratio-4x3 card-img-top overflow-hidden">
        <Skeleton height="100%" borderRadius="12" />
      </div> */}

      <div className="card-body d-flex flex-column pt-5 pb-7 px-7">
        {/* 標題：可以自定義寬度 */}
        <p className="h5 mb-3">
          <Skeleton width="70%"
            baseColor={baseColor} 
            highlightColor={highlightColor} />
        </p>

        {/* 評分與件數 */}
        <div className="mb-5">
          <Skeleton width="30%" height={20} className="mb-2"
            baseColor={baseColor} 
            highlightColor={highlightColor} />
          <br />
          <Skeleton width="50%" height={20}
            baseColor={baseColor} 
            highlightColor={highlightColor} />
        </div>

        {/* 自我介紹：模擬兩行文字 */}
        <div className="mb-5 mb-md-7 flex-grow-1">
          <Skeleton width="40%" height={24} className="mb-2"
            baseColor={baseColor} 
            highlightColor={highlightColor} />
          <Skeleton count={2} 
            baseColor={baseColor} 
            highlightColor={highlightColor}/> {/* count 屬性可以直接生成多行 */}
        </div>

        {/* 按鈕佔位 */}
        <div className="mt-auto">
          <Skeleton height={50} borderRadius={8} 
            baseColor={baseColor} 
            highlightColor={highlightColor}/>
        </div>
      </div>
    </div>
  );
}