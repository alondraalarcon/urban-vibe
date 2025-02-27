"use client";

import { useParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import {
  HeartIcon,
  ChevronRightIcon,
  ChevronLeftIcon,
} from "@heroicons/react/24/outline";
import { Navigation, Pagination, Scrollbar, EffectFade } from "swiper/modules";

import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import "swiper/css/effect-fade";
import { useAppContext } from "@/app/context/AppContext";

export default function ProductDetail() {
  const params = useParams();
  const [detail, setDetail] = useState<any>();
  const [loading, setLoading] = useState(true);
  const navigationPrevRef = useRef(null);
  const navigationNextRef = useRef(null);

  const { cartCount, addToCart } = useAppContext();
  useEffect(() => {
    getProductDetails();
  }, []);

  const getProductDetails = async () => {
    const response = await fetch(
      "https://api.escuelajs.co/api/v1/products/" + params.id
    );
    const data = await response.json();
    if (data) {
      setLoading(false);
    }
    setDetail(data);
  };

  return (
    <div className="flex flex-col gap-4 p-8 md:p-10 border-t">
      {loading ? (
        <div className="w-64 h-10 bg-gray-200 animate-pulse rounded-xl"></div>
      ) : (
        <div className="flex flex-row gap-2 text-sm">
          <span>All Products</span>
          <span>
            <ChevronRightIcon className="size-4" />
          </span>
          <span>{detail?.category?.name}</span>
          <span>
            <ChevronRightIcon className="size-4" />
          </span>
          <span className="text-gray-900">{detail?.title}</span>
        </div>
      )}

      <div className="grid md:grid-cols-2 gap-10 mt-10 max-h-screen">
        {loading ? (
          <div className="w-auto h-100 bg-gray-200 animate-pulse rounded-xl"></div>
        ) : (
          <div className="relative">
            <Swiper
              modules={[Scrollbar, Navigation, Pagination, EffectFade]}
              effect="fade"
              spaceBetween={50}
              slidesPerView={31}
              navigation={{
                prevEl: navigationPrevRef.current,
                nextEl: navigationNextRef.current,
              }}
              onBeforeInit={(swiper: any) => {
                swiper.params.navigation.prevEl = navigationPrevRef.current;
                swiper.params.navigation.nextEl = navigationNextRef.current;
              }}
              scrollbar={{ draggable: true }}
              className="!w-80 md:!w-full"
            >
              {detail?.images.map((value: string, key: number) => (
                <SwiperSlide key={key} className="!w-80 md:!w-full">
                  <img
                    src={value}
                    className="object-fill rounded-xl md:h-screen h-80"
                  />
                </SwiperSlide>
              ))}
              <div className="flex flex-row justify-between w-screen">
                <div
                  ref={navigationPrevRef}
                  className="absolute left-4 top-1/2 z-50 text-white font-bold cursor-pointer hover:text-gray-900"
                >
                  <ChevronLeftIcon className="size-7" />
                </div>
                <div
                  ref={navigationNextRef}
                  className="absolute right-4 top-1/2 z-50 text-white font-bold cursor-pointer hover:text-gray-900"
                >
                  <ChevronRightIcon className="size-7" />
                </div>
              </div>
            </Swiper>
          </div>
        )}
        {loading ? (
          <div className="flex flex-col gap-6">
            <div className="w-auto h-10 bg-gray-200 animate-pulse rounded-xl"></div>
            <div className="w-10 h-10 bg-gray-200 animate-pulse rounded-xl"></div>
            <div className="w-auto h-10 bg-gray-200 animate-pulse rounded-xl"></div>
            <div className="w-64 h-10 bg-gray-200 animate-pulse rounded-xl"></div>
          </div>
        ) : (
          <div className="flex flex-col gap-6 w-80 md:w-full">
            <span className="font-semibold text-3xl">{detail?.title}</span>
            <span className="text-2xl">${detail?.price}</span>
            <span className="text-base">{detail?.description}</span>
            <div className="flex flex-row gap-8 items-center">
              <button
                type="button"
                className="p-2 bg-gray-900 text-white w-64 h-12 rounded-lg hover:bg-gray-700"
                onClick={() => addToCart(detail)}
              >
                Add to Cart
              </button>
              <HeartIcon className="size-6 text-gray-900 cursor-pointer" />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
