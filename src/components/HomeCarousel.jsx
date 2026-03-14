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
  
  const [isBeginning, setIsBeginning] = React.useState(true);
  const [isEnd, setIsEnd] = React.useState(false);

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
                breakpoints={{
                    992: { slidesPerView: perViewMd, slidesPerGroup: 1 }
                }}
                className="task-swiper px-3 px-md-0 pb-md-16"
                >
                {
                    data.map((item)=>{
                        return <SwiperSlide key={item.id} className="custom-servicard-box-sm h-100">
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