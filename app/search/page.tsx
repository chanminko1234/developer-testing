'use client';

import React, {FC, Suspense, useEffect, useState} from "react";
import { useQuery } from '@apollo/client';
import { MdFilterList, MdSell } from "react-icons/md";
import GET_PROPERTIES from "@/lib/queries/getProperties";
import LoadMore from "@/components/LoadMore";
import Error from '@/components/Error';
import { SearchFilters } from "@/components/Search/SearchFilters";
import PropertySection from "@/components/PropertySection";
import NoResultComponent from "@/components/NoData/NoResultComponent";
import NoDataComponent from "@/components/NoData/NoDataComponent";
import LoadingSkeleton from "@/components/Loading/LoadingSkeleton";

interface Props {
    searchParams: {
        keyword: string;
        purpose: string;
        minPrice: string;
        maxPrice: string;
        areaMax: string;
        roomsMin: string;
        bathsMin: string;
    };
};

const Search: FC<Props> = ({ searchParams }) => {
    const { keyword, purpose, minPrice, maxPrice, areaMax, roomsMin, bathsMin } = searchParams;

    const queryVariables = {
        after: null,
        first: 12,
        status: purpose && purpose !== "undefined" ? purpose.toUpperCase() : null,
        keyword: keyword || undefined,
        minPrice: minPrice ? parseInt(minPrice, 10) : undefined,
        maxPrice: maxPrice ? parseInt(maxPrice, 10) : undefined,
        areaMax: areaMax ? parseInt(areaMax, 10) : undefined,
        roomsMin: roomsMin ? parseInt(roomsMin, 10) : undefined,
        bathsMin: bathsMin ? parseInt(bathsMin, 10) : undefined,
    };

    const { data, loading, error, fetchMore } = useQuery(GET_PROPERTIES, {
        variables: queryVariables,
    });

    const [searchFilters, setSearchFilters] = useState(true);
    const [count, setCount] = useState(false);
    const [loadingMore, setLoadingMore] = useState(false);
    const [hasNextPage, setHasNextPage] = useState(false); // Add state to track if there are more items to load

    useEffect(() => {
        if (!localStorage.fav) {
            localStorage.setItem("fav", "");
        }
        setCount(true);
    }, []);

    useEffect(() => {
        if (data) {
            setHasNextPage(data.properties.pageInfo.hasNextPage); // Update hasNextPage state when data changes
        }
    }, [data]);

    const loadMore = () => {
        if (data?.properties.pageInfo.hasNextPage) {
            setLoadingMore(true);
            fetchMore({
                variables: { after: data.properties.pageInfo.endCursor },
                updateQuery: (prevResult, { fetchMoreResult }) => {
                    fetchMoreResult.properties.edges = [
                        ...prevResult.properties.edges,
                        ...fetchMoreResult.properties.edges,
                    ];
                    setLoadingMore(false);
                    return fetchMoreResult;
                },
            });
        }
    };

    if (loading) return <LoadingSkeleton />;
    if (error) return <Error error={error} />;
    if (!data) return <NoDataComponent />;

    return (
        <div className="mx-auto">
            <div
                className=" bg-sky-500 flex border-b-4 border-t-4 border-sky-400 justify-center items-center gap-4 py-4 cursor-pointer"
                onClick={() => setSearchFilters((p) => !p)}
            >
                <h5 className="text-xl text-white font-extrabold">
                    Search Property by filters
                </h5>

                <MdFilterList className=" text-white text-xl mt-1" />
            </div>

            {searchFilters && <SearchFilters />}

            {data.properties.edges.length != 0 && <PropertySection
                    title={purpose ? `Properties For ${purpose.charAt(0).toUpperCase() + purpose.slice(1).toLowerCase()}` : 'Properties'}
                    properties={data.properties.edges}
                    count={count}
                />}

            {hasNextPage && <LoadMore onClick={loadMore} isLoading={loadingMore} />} {/* Render LoadMore only if there are more items to load */}

            {data.properties.edges.length === 0 && <NoResultComponent />}
        </div>
    );
};

export default Search;
