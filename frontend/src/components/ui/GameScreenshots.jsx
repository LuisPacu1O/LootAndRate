import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import { Navigation } from 'swiper/modules';

export default function GameScreenshots({ screenshots }) {
  if (!screenshots || screenshots.length === 0) return null;

  return (
    <div className="bg-gray-800 p-4 sm:p-6 rounded-xl mb-6">
      <h2 className="text-xl sm:text-2xl text-blue-300 font-semibold mb-4">Capturas</h2>
      <Swiper
        navigation={true}
        modules={[Navigation]}
        spaceBetween={16}
        slidesPerView={1}
        className="rounded-xl"
      >
        {screenshots.map((shot) => (
          <SwiperSlide key={shot.id}>
            <img
              src={shot.image}
              alt="Captura"
              className="w-full max-h-72 sm:max-h-96 object-cover rounded-xl"
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
