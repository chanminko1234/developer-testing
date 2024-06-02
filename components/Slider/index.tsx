import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay, Scrollbar, A11y } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import 'swiper/css/autoplay';
import 'swiper/css/a11y';

const Index = () => {
    return (
        <div className="w-full h-full">
            <Swiper
                modules={[Navigation, Pagination, Scrollbar, Autoplay, A11y]}
                spaceBetween={30}
                slidesPerView={1}
                loop={true}
                autoplay={{ delay: 3000 }}
                navigation
                pagination={{ clickable: true }}
                scrollbar={{ draggable: true }}
            >
                {['slider1.jpeg', 'slider2.jpeg', 'slider3.jpeg'].map((image, idx) => (
                    <SwiperSlide key={idx}>
                        <div className="w-full h-64 bg-cover bg-center" style={{ backgroundImage: `url(/images/slider/${image})`, width: '100%', height: '256px' }}>
                            <div className="w-full h-full flex text-3xl items-center justify-center text-white bg-black bg-opacity-50">
                                {idx === 0 && "Thailand's Home for Real Estate"}
                                {idx === 1 && "Everything you need to know about home buying in Thailand"}
                                {idx === 2 && "Property Management in Phuket"}
                            </div>
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    );
};

export default Index;
