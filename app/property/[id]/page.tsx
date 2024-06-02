import { Suspense } from 'react';
import PropertyDetail from '@/components/Property/PropertyDetail';
import React, { FC } from "react";
import DetailLoadingSkeleton from "@/components/Loading/DetailLoadingSkeleton";

type Props = {
    params: {
        id: string;
    };
};
const Property: FC<Props> = ({ params }) => {
    return (
    <div>
        <Suspense fallback={<DetailLoadingSkeleton/>}>
            <PropertyDetail propertyId={params.id}/>
        </Suspense>
    </div>
)
    ;
}
export default Property;
