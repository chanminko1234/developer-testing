'use client';

import Link from "next/link";
import { memo, useEffect } from "react";
import Btn from "@/components/Btn/Btn";
import useMainStore from "@/context/mainStore";
import useSearchParamsState from "@/hooks/useSearchParamsState";
import SearchBox from "@/components/Search/SearchBox";
import Sidebar from "@/components/Sidebar/Sidebar";

const Navbar = () => {
    const {
        clearSearchParams, buildQueryString
    } = useSearchParamsState();

    const sidebar = useMainStore((state) => state.sidebar);
    const setSideBar = useMainStore((state) => state.setSideBar);

    useEffect(() => {
        document.body.style.overflow = sidebar ? "hidden" : "auto";
    }, [sidebar]);

    return (
        <div className="flex relative z-50 m-0 w-full justify-between bg-white sm:h-[60px] font-FiraMono items-center" id="navbar">
            <div className="flex gap-2 ml-2 items-center">
                <Link href="/" onClick={clearSearchParams} className="text-sky-600 font-OpenSans pt-[1px] text-xl col-start-3 col-end-5 font-extrabold">
                    Real Estate
                </Link>
            </div>

            <SearchBox />

            <ul className="bg-slate-100 rounded-md hidden sm:flex justify-center items-center">
                <NavItem href="/" onClick={clearSearchParams} text="Home" />
                <NavItem href={`/search?${buildQueryString()}`} text="Search" />
                <NavItem href={`/search?${buildQueryString()}&purpose=buy`} text="Buy" />
                <NavItem href={`/search?${buildQueryString()}&purpose=rent`} text="Rent" />
                <NavItem href={`/search?${buildQueryString()}&purpose=sale`} text="Sale" />
            </ul>

            <MobileMenuIcon setSideBar={setSideBar} />
            <Sidebar />
        </div>
    );
};

const NavItem = ({ href, onClick, text }: { href: string; onClick?: () => void; text: string }) => (
    <li>
        <Link href={href} onClick={onClick}>
            <Btn text={text} />
        </Link>
    </li>
);

const MobileMenuIcon = ({ setSideBar }: { setSideBar: () => void }) => (
    <div className="flex w-32 h-8 sm:h-10 bg-sky-400 sm:hidden relative">
        <div className="navClip h-full"> </div>
        <div className="transition cursor-pointer p-2 flex justify-center items-center" onClick={setSideBar}>
            <svg className="h-5 w-5 text-white" strokeWidth="3" stroke="currentColor">
                <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                <line x1="4" y1="6" x2="20" y2="6" />
                <line x1="4" y1="12" x2="20" y2="12" />
                <line x1="4" y1="18" x2="20" y2="18" />
            </svg>
        </div>
    </div>
);

export default memo(Navbar);
