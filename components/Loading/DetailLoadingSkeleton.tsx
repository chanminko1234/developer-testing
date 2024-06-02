import React from 'react';

const DetailLoadingSkeleton: React.FC = () => {
    return (
        <div className="md:px-10 text-sky-700 relative py-4 animate-pulse">
            <div className="lg:flex gap-8">
                <div className="lg:w-1/2">
                    <div className="h-[300px] bg-gray-300 rounded-lg"></div>
                </div>
                <div className="lg:w-1/2 flex flex-col justify-between">
                    <div>
                        <div className="md:flex justify-between px-2 sm:px-0 my-4">
                            <div className="md:order-2 text-right">
                                <div className="font-bold text-xl text-sky-800 h-6 bg-gray-300 rounded w-24 mb-2"></div>
                            </div>
                            <h1 className="font-bold my-2 text-md">
                                <div className="h-6 bg-gray-300 rounded w-48 mb-2"></div>
                                <div className="h-6 bg-gray-300 rounded w-36"></div>
                            </h1>
                        </div>

                        <div className="mx-2 sm:mx-0 my-2">
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-2">
                                <div className="flex items-center gap-2 text-cyan-700">
                                    <div className="h-4 bg-gray-300 rounded w-10"></div>
                                    <div className="h-4 bg-gray-300 rounded w-10"></div>
                                    <div className="h-4 bg-gray-300 rounded w-20"></div>
                                    <div className="h-4 bg-gray-300 rounded w-16"></div>
                                </div>

                                <div className="flex justify-end gap-6">
                                    <div className="h-10 bg-gray-300 rounded w-24"></div>
                                </div>
                            </div>

                            <hr className="mt-5"/>

                            <section className="my-5">
                                <div>
                                    <h4 className="border-b-2 text-xl font-bold my-5">
                                        <div className="h-6 bg-gray-300 rounded w-24"></div>
                                    </h4>

                                    <div className="flex flex-col overflow-hidden">
                                        <div
                                            className="pb-8 overflow-hidden relative leading-6 text-zinc-900 whitespace-pre-line">
                                            <div className="h-4 bg-gray-300 rounded w-full mb-2"></div>
                                            <div className="h-4 bg-gray-300 rounded w-3/4 mb-2"></div>
                                            <div className="h-4 bg-gray-300 rounded w-1/2 mb-2"></div>
                                            <div className="h-4 bg-gray-300 rounded w-full mb-2"></div>
                                            <div className="h-4 bg-gray-300 rounded w-2/3 mb-2"></div>
                                        </div>
                                    </div>
                                </div>
                            </section>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DetailLoadingSkeleton;
