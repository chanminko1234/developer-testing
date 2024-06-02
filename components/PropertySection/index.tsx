import React from "react";
import dynamic from 'next/dynamic';
import { MdSell } from "react-icons/md";

// Dynamically import Property component
const Property = dynamic(() => import('@/components/Property/Property'));

interface PropertySectionProps {
    title: string;
    properties: any[]; // Array of property objects
    count: boolean;
}

const PropertySection: React.FC<PropertySectionProps> = ({ title, properties, count }) => {
    return (
        <div>
            <h2 className="block sm:inline-block self-start mx-1 sm:mx-10 text-xl font-extrabold
                text-sky-500 border-t-2 border-sky-300 sm:border-t-0 sm:border-b-4 ring-sky-400
                sm:border-sky-400 my-1 sm:my-5 sm:ring-2 px-4 rounded-xl sm:rounded-sm">
                <span className="flex items-center gap-2">
                    <MdSell /> {title}
                </span>
            </h2>
            <div className="grid sm:grid-cols-2 md:grid-cols-3 justify-center gap-8 lg:mx-10 mb-10">
                {count && properties.map(({ node: property }) => (
                    <Property key={property.id} property={property} />
                ))}
            </div>
        </div>
    );
};

export default PropertySection;
