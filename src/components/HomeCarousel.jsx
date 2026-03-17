import React, { useRef, useState, useEffect,forwardRef } from 'react';
import { Navigation } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

const IconButton = forwardRef(function IconButton(props, ref) {
  const { icon: Icon, isDisabled = false, onClick } = props;
  return (
    <button
      type="button"
      ref={ref}
      disabled={isDisabled}
      onClick={onClick}
      className={`btn btn-secondary-filled rounded-4 d-flex align-items-center p-3 p-md-4 ${
        isDisabled ? 'opacity-50' : ''
      }`}
    >
      <Icon size={24} weight="bold" className="text-neutral" />
    </button>
  );
});

IconButton.displayName = "IconButton";

export default function HomeCarousel({ 
    data = [],Card,
    title,
    perViewMd,
    CaretLeftIcon, CaretRightIcon 
}) {
  const prevRef = React.useRef(null);
  const nextRef = React.useRef(null);
  const swiperRef = React.useRef(null);
  
  const [isBeginning, setIsBeginning] = React.useState(true);
  const [isEnd, setIsEnd] = React.useState(false);

  // 動態調整卡片高度以保持一致
  useEffect(() => {
    const adjustCardHeights = () => {
      if (swiperRef.current) {
        const slides = swiperRef.current.querySelectorAll('.swiper-slide');
        let maxHeight = 0;
        
        // 找到最高的高度
        slides.forEach(slide => {
          const card = slide.querySelector('.card');
          if (card) {
            card.style.height = 'auto'; // 重置高度
            const height = card.offsetHeight;
            maxHeight = Math.max(maxHeight, height);
          }
        });
        
        // 設置所有卡片為相同高度
        slides.forEach(slide => {
          const card = slide.querySelector('.card');
          if (card) {
            card.style.height = `${maxHeight}px`;
          }
        });
      }
    };

    // 延遲執行以確保DOM已渲染
    const timeoutId = setTimeout(adjustCardHeights, 100);
    
    // 窗口大小改變時重新調整
    window.addEventListener('resize', adjustCardHeights);
    
    return () => {
      clearTimeout(timeoutId);
      window.removeEventListener('resize', adjustCardHeights);
    };
  }, [data]);
    if (!data || data.length === 0) {
        return null; // 或者回傳一個 Skeleton 骨架屏
    }
  return (
    <>
      <div className="container mb-12">
        <div className="d-flex justify-content-between align-items-center">
          <h2 className="h5 fs-md-1 fw-bold text-neutral-900 ls-2 mb-0 ls-md-4">
            {title}
          </h2>
          <div className="d-flex gap-6 gap-md-7">
            {/* 應用 Icon 元件 */}
            <IconButton 
              ref={prevRef} 
              icon={CaretLeftIcon} 
              isDisabled={isBeginning} 
            />
            <IconButton 
              ref={nextRef} 
              icon={CaretRightIcon} 
              isDisabled={isEnd} 
            />
          </div>
        </div>
      </div>
        <div className="overflow-hidden">
            <div className="container px-0 px-md-3">
                <Swiper
                    ref={swiperRef}
                    modules={[Navigation]}
                    spaceBetween={24}
                    slidesPerView={'auto'}
                    centeredSlides={false}
                    navigation={{
                        prevEl: prevRef.current,
                        nextEl: nextRef.current,
                    }}
                    onBeforeInit={function(swiper) {
                        // 初始化時手動指定導航元素
                        swiper.params.navigation.prevEl = prevRef.current;
                        swiper.params.navigation.nextEl = nextRef.current;
                    }}
                    onSlideChange={function(swiper) {
                        setIsBeginning(swiper.isBeginning);
                        setIsEnd(swiper.isEnd);
                    }}
                    autoHeight={true}
                    breakpoints={{
                        992: { slidesPerView: perViewMd,
                                slidesPerGroup: 1 }
                    }}
                    className="task-swiper px-3 px-md-0 pb-md-16"
                >
                {
                    data?.map((item)=>{
                        return <SwiperSlide key={item.id} className="custom-servicard-box-sm">
                            <Card data={item} />
                        </SwiperSlide>
                    })
                }
                </Swiper>
            </div>
        </div>
    </>
  );
}