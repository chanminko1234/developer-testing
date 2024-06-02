'use client'

import {
    MdGrid4X4,
    MdKingBed,
    MdOutlineBathtub,
} from "react-icons/md";
import React, { useState } from 'react';
import { useQuery } from "@apollo/client";
import GET_PROPERTY from '@/lib/queries/getProperty';
import Fav from "@/components/Fav";
import useDB from "@/components/Fav/useDB";
import LoadingSpinner from "@/components/Loading/LoadingSpinner";
import ErrorComponent from '@/components/Error';
import Gallery from "@/components/Gallery";
import NoDataComponent from "@/components/NoData/NoDataComponent";

interface PropertyProps {
    propertyId: string;
}

const Property: React.FC<PropertyProps> = ({ propertyId }) => {

    const { data, loading, error } = useQuery(GET_PROPERTY, {
        variables: { id: parseInt(propertyId, 10) },
    });

    const property = data?.property;

    const { addFav } = useDB();
    const [update, setUpdate] = useState<number>(0);

    if (loading) return <LoadingSpinner />;
    if (error) return <ErrorComponent error={error} />;
    if (!data) return <NoDataComponent />;

    return (
        <div className="md:px-10 text-sky-700 relative py-4">
            <div className="lg:flex gap-8">
                <div className="lg:w-1/2">
                    <Gallery images={property.images} />
                </div>
                <div className="lg:w-1/2 flex flex-col justify-between">
                    <div>
                        <div className="md:flex justify-between px-2 sm:px-0 my-4">
                            <div className="md:order-2 text-right">
                                <div className="font-bold text-xl text-sky-800">
                                    ฿ {Math.round(Number(property.price)).toLocaleString('en-US')}
                                </div>
                            </div>
                            <h1 className="font-bold my-2 text-md">
                                <p className={'text-xl'}>{property.project_name}</p>
                                {property.title}
                            </h1>
                        </div>

                        {/* === ROOMS AND DETAILS */}
                        <div className="mx-2 sm:mx-0 my-2">
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-2">
                                <div className="flex items-center gap-2 text-cyan-700">
                                    <b>{property.bedroom_count}</b>
                                    <MdKingBed />
                                    | <b>{property.bathroom_count}</b>
                                    <MdOutlineBathtub />
                                    | <b>{Number(property.area).toFixed(2)} SqM</b>
                                    <MdGrid4X4 />
                                    | <b>For {property.status.charAt(0) + property.status.slice(1).toLowerCase()}</b>
                                </div>

                                {/* --- SHARE/CLIP AND OTHERS */}
                                <div className="flex justify-end gap-6">
                                    <div
                                        onClick={() => {
                                            addFav(property.id);
                                            setUpdate(prev => prev + 1);
                                        }}
                                        className={`cursor-pointer text-white flex items-center gap-1 ring-2 px-2 py-1 rounded-sm ${
                                            global.localStorage?.fav &&
                                            JSON.parse(localStorage.fav).includes(property.id)
                                                ? "bg-red-500 hover:bg-red-600"
                                                : "bg-sky-500 hover:bg-sky-700"
                                        }`}
                                    >
                                        <Fav noBorder />
                                        {global.localStorage?.fav &&
                                        JSON.parse(localStorage.fav).includes(property.id)
                                            ? "Saved"
                                            : "Save"}
                                    </div>
                                </div>
                            </div>

                            <hr className="mt-5" />

                            <section className="my-5">
                                <div>
                                    <h4 className="border-b-2 text-xl font-bold my-5">
                                        Description
                                    </h4>

                                    <div className="flex flex-col overflow-hidden">
                                        <div
                                            className={`pb-8 overflow-hidden relative leading-6 text-zinc-900 whitespace-pre-line`}
                                        >
                                            { property.description }
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

export default Property;
