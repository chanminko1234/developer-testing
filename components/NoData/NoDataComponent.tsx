import React from 'react';

const NoDataComponent: React.FC = () => {
    return (
        <div className="flex justify-center items-center h-screen">
            <p className="text-lg text-gray-600">No data available</p>
        </div>
    );
};

export default NoDataComponent;
