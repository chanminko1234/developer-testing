import { MdClose, MdHome, MdOutlineInfo, MdSearch, MdVpnKey } from "react-icons/md";
import Link from "next/link";
import BottomSvg from "./BottomSvg";
import useMainStore from "@/context/mainStore";
import useSearchParamsState from "@/hooks/useSearchParamsState";
import {useEffect} from "react";
import styles from "@/styles/Sidebar.module.scss";

const Sidebar = () => {
    const currentYear = new Date().getFullYear();

    const {
        clearSearchParams, buildQueryString
    } = useSearchParamsState();

    const sidebar = useMainStore((state) => state.sidebar);
    const setSideBar = useMainStore((state) => state.setSideBar);

    useEffect(() => {
        // Hide scrollbar
        document.body.style.overflow = sidebar ? "hidden" : "auto";
    }, [sidebar]);
  return (
    <nav
      className={`${styles.after} ${
        sidebar ? styles.after__block : styles.after__hidden
      } grid`}
    >
      <div className={styles.sidebarHeader}>
        {/* === CLOSE BUTTON */}
        <MdClose className={styles.logo} onClick={setSideBar} />
      </div>
      <ul className={` ${styles.ul} `}>
        <Link href="/" onClick={clearSearchParams} passHref>
          <div className={styles.a} onClick={setSideBar}>
            <MdHome /> Home
          </div>
        </Link>

        <Link href={`/search?${buildQueryString()}`} passHref>
          <div className={styles.a} onClick={setSideBar}>
            <MdSearch /> Search
          </div>
        </Link>

        <Link href={`/search?${buildQueryString()}&purpose=buy`} passHref>
          <div className={styles.a} onClick={setSideBar}>
            <MdOutlineInfo /> Buy
          </div>
        </Link>

        <Link href={`/search?${buildQueryString()}&purpose=rent`} passHref>
          <div className={styles.a} onClick={setSideBar}>
            <MdVpnKey /> Rent
          </div>
        </Link>

        <Link href={`/search?${buildQueryString()}&purpose=sale`} passHref>
          <div className={styles.a} onClick={setSideBar}>
            <MdVpnKey /> Sale
          </div>
        </Link>
      </ul>

      <div className=" self-end text-black text-center">
        © {currentYear} Real Estate, Inc.
      </div>
      <BottomSvg Sidebar />
    </nav>
  );
};
export default Sidebar;
