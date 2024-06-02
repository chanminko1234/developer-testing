import React from 'react';
import Image from 'next/image';
import NoResultImage from '@/assets/images/noresult.svg';

const NoResultComponent: React.FC = () => {
    return (
        <div className="flex justify-center relative">
            <Image
                alt="no result"
                height={400}
                width={400}
                src={NoResultImage}
            />
            <p className="absolute top-40 text-white font-bold">NO RESULT !</p>
        </div>
    );
};

export default NoResultComponent;
