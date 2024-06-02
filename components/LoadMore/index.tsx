import React from 'react';
import LoadMoreLoading from "@/components/Loading/LoadMoreLoading";

interface LoadMoreProps {
    onClick: () => void;
    isLoading: boolean;
}

const LoadMore: React.FC<LoadMoreProps> = ({ onClick, isLoading }) => {
    return (
        <div className="flex justify-center mb-8">
            <button
                onClick={onClick}
                className="bg-sky-500 hover:bg-sky-600 text-white font-bold py-2 px-4 rounded flex items-center"
                disabled={isLoading}
            >
                {isLoading ? (
                    <LoadMoreLoading />
                ) : (
                    "Load More"
                )}
            </button>
        </div>
    );
};

export default LoadMore;
