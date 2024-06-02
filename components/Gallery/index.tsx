import React, { useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Thumbs, Navigation, Pagination, Scrollbar, A11y } from 'swiper/modules';
import 'swiper/swiper-bundle.css';
import Image from 'next/image';
import Modal from './Modal';
import LoadingIndicator from '@/components/Loading/LoadingIndicator';

interface GalleryProps {
    images: { url: string; }[];
}

const Gallery: React.FC<GalleryProps> = ({ images }) => {
    const [mainImagesLoading, setMainImagesLoading] = useState<boolean[]>(new Array(images.length).fill(true));
    const [thumbsImagesLoading, setThumbsImagesLoading] = useState<boolean[]>(new Array(images.length).fill(true));
    const [thumbsSwiper, setThumbsSwiper] = useState<any>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalImageUrl, setModalImageUrl] = useState('');

    const handleImageClick = (url: string) => {
        setModalImageUrl(url);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    const handleImageLoad = (index: number, type: string) => {
        const setLoadingState = type === 'main' ? setMainImagesLoading : setThumbsImagesLoading;
        setLoadingState((prevLoading) => {
            const updatedLoading = [...prevLoading];
            updatedLoading[index] = false;
            return updatedLoading;
        });
    };

    return (
        <div className="w-full">
            <Swiper
                modules={[Thumbs, Navigation, Pagination, Scrollbar, A11y]}
                spaceBetween={10}
                navigation
                pagination={{ clickable: true }}
                scrollbar={{ draggable: true }}
                thumbs={{ swiper: thumbsSwiper }}
                loop={true}
                className="mb-4"
            >
                {images.map((image, index) => (
                    <SwiperSlide key={index}>
                        <div
                            className="relative w-full h-64 sm:h-96 cursor-pointer"
                            onClick={() => handleImageClick(image.url)}
                        >
                            {mainImagesLoading[index] && <LoadingIndicator />}
                            <Image
                                src={image.url}
                                alt="gallery"
                                fill
                                sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, 33vw"
                                style={{ objectFit: 'cover' }}
                                className="rounded-lg"
                                loading="lazy"
                                onLoad={() => handleImageLoad(index, 'main')}
                            />
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>
            <Swiper
                onSwiper={(swiper) => setThumbsSwiper(swiper)}
                spaceBetween={10}
                slidesPerView={4}
                watchSlidesProgress
                loop={true}
                className="cursor-pointer"
            >
                {images.map((image, index) => (
                    <SwiperSlide key={index}>
                        <div className="relative w-full h-16 sm:h-24">
                            {thumbsImagesLoading[index] && <LoadingIndicator />}
                            <Image
                                src={image.url}
                                alt="gallery"
                                fill
                                sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, 25vw"
                                style={{ objectFit: 'cover' }}
                                className="rounded-lg"
                                loading="lazy"
                                onLoad={() => handleImageLoad(index, 'thumbs')}
                            />
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>

            <Modal isOpen={isModalOpen} onClose={closeModal} imageUrl={modalImageUrl} />
        </div>
    );
};

export default Gallery;
