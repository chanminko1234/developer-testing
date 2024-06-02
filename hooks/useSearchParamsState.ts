import { useRouter, useSearchParams } from "next/navigation";
import { useState, useEffect } from "react";

const useSearchParamsState = () => {
    const router = useRouter();
    const searchParams = useSearchParams();

    const [searchValue, setSearchValue] = useState(searchParams.get("keyword") || "");
    const [purpose, setPurpose] = useState("");
    const [minPrice, setMinPrice] = useState(searchParams.get("minPrice") || "");
    const [maxPrice, setMaxPrice] = useState(searchParams.get("maxPrice") || "");
    const [areaMax, setAreaMax] = useState(searchParams.get("areaMax") || "");
    const [roomsMin, setRoomsMin] = useState(searchParams.get("roomsMin") || "");
    const [bathsMin, setBathsMin] = useState(searchParams.get("bathsMin") || "");

    const buildQueryString = () => {
        const params = new URLSearchParams();
        if (searchValue) params.set("keyword", searchValue);
        if (purpose) params.set("purpose", purpose);
        if (minPrice) params.set("minPrice", minPrice);
        if (maxPrice) params.set("maxPrice", maxPrice);
        if (areaMax) params.set("areaMax", areaMax);
        if (roomsMin) params.set("roomsMin", roomsMin);
        if (bathsMin) params.set("bathsMin", bathsMin);
        return params.toString();
    };

    const handleSearch = () => {
        const queryString = buildQueryString();
        router.push(`/search?${queryString}`);
    };

    const clearSearchParams = () => {
        setSearchValue("");
        setPurpose("");
        setMinPrice("");
        setMaxPrice("");
        setAreaMax("");
        setRoomsMin("");
        setBathsMin("");
        router.push('/');
    };

    const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === "Enter") {
            handleSearch();
        }
    };

    return {
        searchValue,
        setSearchValue,
        purpose,
        setPurpose,
        minPrice,
        setMinPrice,
        maxPrice,
        setMaxPrice,
        areaMax,
        setAreaMax,
        roomsMin,
        setRoomsMin,
        bathsMin,
        setBathsMin,
        buildQueryString,
        handleSearch,
        handleKeyPress,
        clearSearchParams,
    };
};

export default useSearchParamsState;
