import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { MdGrid4X4, MdKingBed, MdOutlineBathtub } from 'react-icons/md';
import DefaultImage from '../../assets/images/house.webp';
import useDB from '../Fav/useDB';
import LoadingIndicator from '@/components/Loading/LoadingIndicator';

interface PropertyProps {
    property: {
        id: number;
        project_name: string;
        title: string;
        price: number;
        bedroom_count: number;
        bathroom_count: number;
        area: number;
        description: string;
        status: 'BUY' | 'SALE' | 'RENT';
        images: { url: string }[];
    };
    formSearch?: boolean;
}

const Property: React.FC<PropertyProps> = ({ property, formSearch }) => {
    const [loading, setLoading] = useState(true);
    const { addFav } = useDB();
    const {
        id,
        project_name,
        title,
        price,
        bedroom_count,
        bathroom_count,
        area,
        status,
        images,
    } = property;

    const coverPhoto = images.length > 0 ? images[0].url : DefaultImage;

    const handleImageLoad = () => {
        setLoading(false);
    };

    const onFavClick = async (id: number) => {
        await addFav(id);
    };

    return (
        <div className="rounded-xl group shadow-md hover:shadow-xl hover:shadow-sky-200 shadow-sky-200 transition-shadow overflow-hidden relative drop-shadow-2xl">
            {loading && <LoadingIndicator />}
            <div className="rounded-t-lg box-border mt-[3px] mr-[3px] ml-[3px] overflow-hidden">
                <Image
                    src={coverPhoto}
                    width={200}
                    height={200}
                    alt="Property image"
                    className="w-full h-full cursor-text min-w-full group-hover:scale-125
                    transition-transform sm:rounded-sm duration-1000 object-cover"
                    loading="lazy"
                    onLoad={handleImageLoad}
                />
                <svg
                    className={`transition duration-300 right-4 bottom-[100px] text-gray-300 absolute h-10 w-10 cursor-pointer hover:stroke-red-600 ${
                        global.localStorage.fav &&
                        JSON.parse(localStorage.fav).some((id: number) => id === property.id)
                            ? 'fill-red-600'
                            : 'fill-transparent'
                    }`}
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                    onClick={() => onFavClick(id)}
                >
                    <path d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
            </div>

            <Link href={`/${formSearch ? 'searched' : 'property'}/${id}`} passHref>
                <div className="cursor-pointer px-2 py-1 text-sm bg-zinc-100">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2 text-zinc-700">
                            <div className="font-bold text-xl">
                                ฿<span className="ml-2 text-sky-800">{Math.round(Number(price)).toLocaleString('en-US')}</span>
                            </div>
                        </div>
                    </div>
                    <div>
                        <div className="flex gap-3 items-center text-cyan-700">
                            <b>{bedroom_count}</b>
                            <span title="Bed">
                                <MdKingBed />
                            </span>
                            |
                            <b>{bathroom_count}</b>
                            <span title="Bathtub">
                                <MdOutlineBathtub />
                            </span>
                            |
                            <b>{Number(area).toFixed(2)} SqM</b>
                            <span title="Area">
                                <MdGrid4X4 />
                            </span>
                            |
                            <b>For {status.charAt(0) + status.slice(1).toLowerCase()}</b>
                        </div>
                    </div>
                    <div className="text-zinc-700 text-sm my-1 whitespace-nowrap overflow-hidden">
                        <div className="lg:hidden">
                            <div>{project_name.length > 30 ? `${project_name.substring(0, 30)}...` : project_name}</div>
                            {title.length > 30 ? `${title.substring(0, 30)}...` : title}
                        </div>
                        <div className="hidden lg:block">
                            <div className="text-lg">
                                {project_name.length > 40 ? `${project_name.substring(0, 40)}...` : project_name}
                            </div>
                            {title.length > 40 ? `${title.substring(0, 40)}...` : title}
                        </div>
                    </div>
                </div>
            </Link>
        </div>
    );
};

export default Property;
