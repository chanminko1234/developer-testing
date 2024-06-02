import React from 'react';

const LoadingIndicator: React.FC = () => {
    return (
        <div className="absolute inset-0 flex justify-center items-center">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-sky-500"></div>
        </div>
    );
};

export default LoadingIndicator;
