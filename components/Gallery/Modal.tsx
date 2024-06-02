import React from 'react';
import Image from 'next/image';

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    imageUrl: string;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, imageUrl }) => {
    if (!isOpen) return null;

    return (
        <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-75"
            onClick={onClose}
        >
            <div
                className="relative w-11/12 max-w-4xl"
                onClick={(e) => e.stopPropagation()} // Prevent closing when clicking on the image container
            >
                <div className="relative w-full h-96 sm:h-[75vh]">
                    <Image
                        src={imageUrl}
                        alt="Large view"
                        fill
                        sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, 25vw"
                        className="rounded-lg"
                    />
                </div>
            </div>
        </div>
    );
};

export default Modal;
