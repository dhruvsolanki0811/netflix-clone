"use client";
import React, {
  ChangeEvent,
  MouseEventHandler,
  ReactEventHandler,
  useEffect,
  useRef,
  useState,
} from "react";
import { AiOutlineRise } from "react-icons/ai";

import { twMerge } from "tailwind-merge";
import { IoSearch } from "react-icons/io5";
import Link from "next/link";
import { IoMdHome } from "react-icons/io";
import { PiTelevisionSimpleFill } from "react-icons/pi";
import { MdLocalMovies } from "react-icons/md";

import { useSearchStore } from "@/store/searchstore";
import Image from "next/image";
import fulllogo from "../../public/assets/FullLogo.png";
import smalllogo from "../../public/assets/smalllogo.png";
import axios from "axios";
import { Show } from "@/types/type";
import { useQuery } from "react-query";

const searchQuery = async ({ queryKey }: any) => {
  const query = queryKey[1];

  try {
    const response = await axios.get(
      `https://api.themoviedb.org/3/search/multi?query=${query}`,
      {
        headers: {
          Authorization: `Bearer ${process.env.NEXT_PUBLIC_ACCESS_TOKEN_TMDB}`,
        },
      }
    );

    const searchResult: Show[] = response.data.results.filter(
      (result: Show) => {
        return result.media_type == "movie" || result.media_type == "tv";
      }
    );
    return searchResult;
  } catch (error) {
    throw new Error("Failed to fetch trending movies");
  }
};

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [showSearchBox, setShowSearchBox] = useState(false);
  const searchIconRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const menuRef = useRef<HTMLInputElement>(null);
  const [menu, setMenu] = useState(false);
  const { setQuery, query, setShows } = useSearchStore();
  let typingTimeout: NodeJS.Timeout;

  useEffect(() => {
    const changeBgColor = () => {
      window.scrollY > 10 ? setIsScrolled(true) : setIsScrolled(false);
    };
    window.addEventListener("scroll", changeBgColor);
    const handleClickOutside = (event: MouseEvent) => {
      if (
        searchIconRef.current &&
        !searchIconRef.current.contains(event.target as Node)
      ) {
        setShowSearchBox(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    const handleClickOutsideMenu = (event: MouseEvent) => {
      if (
        menuRef.current &&
        !menuRef.current.contains(event.target as Node)
      ) {
        setMenu(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutsideMenu);

    return () => {
      window.removeEventListener("scroll", changeBgColor);
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("mousedown", handleClickOutsideMenu);
    };
  }, [isScrolled]);
  const { data: searchResult, refetch } = useQuery(
    ["search", query],
    searchQuery,
    { enabled: false }
  );
  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    const searchValue = e.target.value;
    setQuery(searchValue);

    // Clear previous timeout (if any)
    clearTimeout(typingTimeout);

    // Set a new timeout to execute refetch after a delay (e.g., 500 milliseconds)
    typingTimeout = setTimeout(async () => {
      const { data: updatedSearchResult } = await refetch({
        exact: true,
        queryKey: ["search", searchValue],
      });
      if (updatedSearchResult) {
        setShows(updatedSearchResult);
      }
    }, 500);
  };

  return (
    <>
      <div
        className={twMerge(
          "header h-[3rem] w-full  sticky top-0 z-[100]",
          isScrolled ? "bg-[#171717]" : "bg-transparent"
        )}
      >
        <div className="nav-container flex justify-between   ps-[3rem] pe-[3rem]  pt-[0.1rem] pb-[0.5rem] font-bold	text-[1rem]">
          <div className="logo-menu-container flex justify-center items-center flex-nowrap gap-2">
            <Link
              href={"/"}
              onClick={() => {
                setQuery("");
                setShows([]);
              }}
              className="relative nav-items w-[6rem] h-[3rem] full-logo cursor-pointer "
            >
              <Image src={fulllogo} fill alt=""></Image>
            </Link>

            <div
              onClick={() => setMenu(!menu)}
              className="relative  flex justify-center items-center gap-2  cursor-pointer hover:bg-[#1c1c1c] rounded-[10px] p-1 "
            >
              <Link
                href={"/"}
                className="relative w-[1.6rem] h-[1.6rem] nav-items small-logo  hidden cursor-pointer "
                onClick={() => {
                  setQuery("");
                  setShows([]);
                }}
              >
                <Image src={smalllogo} fill alt=""></Image>
                {menu && (
                  <div ref={menuRef} className="absolute text-xs rounded-[4px] border-[1px] p-1 flex flex-col flex-nowrap gap-1 small-logo hidden bg-[rgb(38,38,38)] mt-[2.3rem]  w-[8rem] ">
                    <Link
                      onClick={() => {
                        setQuery("");
                        setShows([]);
                      }}
                      href={"/"}
                      className="w-full flex items-center gap-1  hover:bg-[#647080] pt-1 pb-1"
                    >
                      <IoMdHome className="text-sm"></IoMdHome>
                      <div className="nav-link cursor-pointer ">Home</div>
                    </Link>
                    <Link
                      onClick={() => {
                        setQuery("");
                        setShows([]);
                      }}
                      href={"/tvshows"}
                      className="w-full flex items-center gap-1 hover:bg-[#647080] pt-1 pb-1"
                    >
                      <PiTelevisionSimpleFill className="text-sm"></PiTelevisionSimpleFill>
                      <div className="nav-link cursor-pointer ">TV Shows</div>
                    </Link>
                    <Link
                      onClick={() => {
                        setQuery("");
                        setShows([]);
                      }}
                      href={"/movies"}
                      className="w-full  flex items-center gap-1 hover:bg-[#647080] pt-1 pb-1"
                    >
                      <MdLocalMovies className="text-sm"></MdLocalMovies>
                      <div className="nav-link cursor-pointer ">Movies</div>
                    </Link>
                    <Link
                      onClick={() => {
                        setQuery("");
                        setShows([]);
                      }}
                      href={"/new&popular"}
                      className="w-full flex items-center gap-1 hover:bg-[#647080] pt-1 pb-1"
                    >
                      <AiOutlineRise className="text-sm"></AiOutlineRise>
                      <div className="nav-link cursor-pointer ">
                        New & Popular
                      </div>
                    </Link>
                  </div>
                )}
              </Link>
              <div className="small-logo relative  menu-text nav-items  hidden text-xs">
                Menu
              </div>
            </div>

            <div className="nav-items nav-links flex gap-3 text-[11px] font-semibold">
              <Link
                onClick={() => {
                  setQuery("");
                  setShows([]);
                }}
                href={"/"}
                className="nav-link cursor-pointer hover:text-[#647080]"
              >
                Home
              </Link>
              <Link
                onClick={() => {
                  setQuery("");
                  setShows([]);
                }}
                href={"/tvshows"}
                className="nav-link cursor-pointer hover:text-[#647080]"
              >
                TV Shows
              </Link>
              <Link
                onClick={() => {
                  setQuery("");
                  setShows([]);
                }}
                href={"/movies"}
                className="nav-link cursor-pointer hover:text-[#647080]"
              >
                Movies
              </Link>
              <Link
                onClick={() => {
                  setQuery("");
                  setShows([]);
                }}
                href={"/new&popular"}
                className="nav-link cursor-pointer hover:text-[#647080]"
              >
                New & Popular
              </Link>
            </div>
          </div>

          <div className="navitems nav-icons  flex items-center gap-3 ">
            <div
              ref={searchIconRef}
              className={twMerge(
                "search-icon text-[1rem] cursor-pointer  flex  items-center flex-nowrap  gap-2 ps-1 pe-1",
                showSearchBox && "border-white border-solid border-[1px]"
              )}
            >
              <IoSearch
                onClick={() => {
                  setShowSearchBox(true);
                  if (inputRef.current) {
                    inputRef.current.focus();
                  }
                }}
              />
              {showSearchBox && (
                <input
                  ref={inputRef}
                  placeholder="Search"
                  value={query}
                  onChange={handleSearchChange}
                  className="search-input-container bg-transparent outline-none  w-[10rem] h-[1.5rem] font-light text-[0.7rem] text-white flex items-center"
                />
              )}
            </div>
            <Link
              onClick={() => {
                setQuery("");
                setShows([]);
              }}
              href={"/signin"}
              className="account text-[11px] font-semibold flex items-center justify-center rounded-[4px] bg-[var(--netflix-font-red)] pt-1 pb-1 ps-2 pe-2 cursor-pointer hover:bg-[#c61414]"
            >
              Signin
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
