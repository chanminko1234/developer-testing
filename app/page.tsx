'use client'

import React, { useEffect, useState, Suspense, lazy } from "react";
import { useQuery } from '@apollo/client';
import GET_PROPERTIES from "@/lib/queries/getProperties";
import Error from "@/components/Error";
import Slider from '@/components/Slider';
import LoadingSkeleton from "@/components/Loading/LoadingSkeleton";

const PropertySection = lazy(() => import('@/components/PropertySection'));
const NoDataComponent = lazy(() => import('@/components/NoData/NoDataComponent'));

const Home = () => {
    const { data: buyData, loading: buyLoading, error: buyError } = useQuery(GET_PROPERTIES, {
        variables: { after: null, first: 6, status: 'BUY' },
    });

    const { data: rentData, loading: rentLoading, error: rentError } = useQuery(GET_PROPERTIES, {
        variables: { after: null, first: 6, status: 'RENT' },
    });

    const { data: saleData, loading: saleLoading, error: saleError } = useQuery(GET_PROPERTIES, {
        variables: { after: null, first: 6, status: 'SALE' },
    });

    const [count, setCount] = useState(false);

    useEffect(() => {
        if (!localStorage.fav) {
            localStorage.setItem("fav", "");
        }
        setCount(true);
    }, []);

    if (buyLoading || rentLoading || saleLoading) return <LoadingSkeleton />;
    if (buyError || rentError || saleError) return <Error error={buyError || rentError || saleError} />;
    if (!buyData || !rentData || !saleData) return <NoDataComponent />;

    return (
        <>
            <Slider />
            <div className="mx-auto px-4">
                <Suspense fallback={<LoadingSkeleton />}>
                    <PropertySection title="For Buy" properties={buyData.properties.edges} count={count} />
                    <PropertySection title="For Rent" properties={rentData.properties.edges} count={count} />
                    <PropertySection title="For Sale" properties={saleData.properties.edges} count={count} />
                </Suspense>
            </div>
        </>
    );
};

export default Home;
