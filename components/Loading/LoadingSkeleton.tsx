import React from 'react';

const LoadingSkeleton: React.FC = () => {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-4">
            {[...Array(8)].map((_, index) => (
                <div key={index}
                     className="rounded-xl shadow-md transition-shadow overflow-hidden relative animate-pulse bg-gray-100">
                    <div className="h-[200px] sm:h-[260px] bg-gray-300"></div>
                    <div className="p-4 bg-zinc-100">
                        <div className="h-6 bg-gray-300 mb-2"></div>
                        <div className="flex gap-3 items-center text-cyan-700">
                            <div className="h-4 bg-gray-300 w-12"></div>
                            <div className="h-4 bg-gray-300 w-12"></div>
                            <div className="h-4 bg-gray-300 w-20"></div>
                            <div className="h-4 bg-gray-300 w-16"></div>
                        </div>
                        <div className="text-zinc-700 text-sm my-1">
                            <div className="lg:hidden">
                                <div className="h-4 bg-gray-300 w-3/4 mb-1"></div>
                                <div className="h-4 bg-gray-300 w-1/2"></div>
                            </div>
                            <div className="hidden lg:block">
                                <div className="h-4 bg-gray-300 w-4/5 mb-1"></div>
                                <div className="h-4 bg-gray-300 w-3/4"></div>
                            </div>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default LoadingSkeleton;
