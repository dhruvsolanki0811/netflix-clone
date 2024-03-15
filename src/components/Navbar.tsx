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
import { IoMdHome, IoMdLink, IoMdList } from "react-icons/io";
import { PiTelevisionSimpleFill } from "react-icons/pi";
import { MdLocalMovies } from "react-icons/md";

import { useSearchStore } from "@/store/searchstore";
import Image from "next/image";
import fulllogo from "@/assets/fulllogo.png";
import smalllogo from "@/assets/smalllogo.png";
import axios from "axios";
import { Show } from "@/types/type";
import { useQuery } from "react-query";
import { signOut, useSession } from "next-auth/react";
import { FaCheck } from "react-icons/fa";

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
  const { data: session, status } = useSession()

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
          "header h-[4rem] w-full  sticky top-0 z-[100]",
          isScrolled ? "bg-[#171717]" : "bg-transparent"
        )}
      >
        <div className="nav-container flex justify-between   ps-[1.5rem] pe-[1.5rem] max-sm:px-[0.7rem]  pt-[0.1rem] pb-[0.5rem] font-bold	text-[2rem]">
          <div className="logo-menu-container flex justify-center items-center flex-nowrap gap-2">
            <Link
              href={"/"}
              onClick={() => {
                setQuery("");
                setShows([]);
              }}
              className="relative nav-items w-[7.5rem] h-[4.5rem] full-logo cursor-pointer "
            >
              <Image src={fulllogo} fill alt=""></Image>
            </Link>

            <div
              onClick={() => setMenu(!menu)}
              className="relative  flex justify-center items-center gap-2  cursor-pointer hover:bg-[#1c1c1c] rounded-[10px] p-1 "
            >
              <div
                className="relative w-[2.5rem] h-[2.5rem] nav-items small-logo  hidden cursor-pointer "
                onClick={() => {
                  setQuery("");
                  setShows([]);
                }}
              >
                <Image src={smalllogo} fill alt=""></Image>
                {menu && (
                  <div ref={menuRef} className="absolute text-xs rounded-[4px] border-[1px] p-1 flex flex-col flex-nowrap gap-1 small-logo hidden bg-[rgb(38,38,38)] mt-[3rem]  w-[10rem] ">
                    <Link
                      onClick={() => {
                        setQuery("");
                        setShows([]);
                      }}
                      href={"/"}
                      className="w-full flex items-center gap-1  hover:bg-[#647080] pt-1 pb-1"
                    >
                      <IoMdHome className="text-[1.1rem]"></IoMdHome>
                      <div className="nav-link cursor-pointer text-[0.9rem]">Home</div>
                    </Link>
                    <Link
                      onClick={() => {
                        setQuery("");
                        setShows([]);
                      }}
                      href={"/tvshows"}
                      className="w-full flex items-center gap-1 hover:bg-[#647080] pt-1 pb-1"
                    >
                      <PiTelevisionSimpleFill className="text-[1.1rem]"></PiTelevisionSimpleFill>
                      <div className="nav-link cursor-pointer text-[0.9rem]">TV Shows</div>
                    </Link>
                    <Link
                      onClick={() => {
                        setQuery("");
                        setShows([]);
                      }}
                      href={"/movies"}
                      className="w-full  flex items-center gap-1  hover:bg-[#647080] pt-1 pb-1"
                    >
                      <MdLocalMovies className="text-[1.1rem]"></MdLocalMovies>
                      <div className="nav-link cursor-pointer text-[0.9rem]">Movies</div>
                    </Link>
                    <Link
                      onClick={() => {
                        setQuery("");
                        setShows([]);
                      }}
                      href={"/new&popular"}
                      className="w-full flex items-center gap-1 hover:bg-[#647080] pt-1 pb-1"
                    >
                      <AiOutlineRise className="text-[1.1rem]"></AiOutlineRise>
                      <div className="nav-link cursor-pointer text-[0.9rem] ">
                        New & Popular
                      </div>
                    </Link>
                    <Link
                      onClick={() => {
                        setQuery("");
                        setShows([]);
                      }}
                      href={"/mylist"}
                      className="w-full flex items-center gap-1 hover:bg-[#647080] pt-1 pb-1"
                    >
                      <IoMdList className="text-[1.1rem]"/>
                      <div className="nav-link cursor-pointer text-[0.9rem] ">
                        My List
                      </div>
                    </Link>
                  </div>
                )}
              </div>
              <div className="small-logo relative  menu-text nav-items  hidden text-[1rem]">
                Menu
              </div>
            </div>

            <div className="nav-items nav-links flex gap-3 text-[14px] font-semibold">
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
              <Link
                onClick={() => {
                  setQuery("");
                  setShows([]);
                }}
                href={"/mylist"}
                className="nav-link cursor-pointer hover:text-[#647080]"
              >
                My List
              </Link>
            </div>
          </div>
          
          <div className="navitems nav-icons  flex items-center gap-3 ">
            <div
              ref={searchIconRef}
              className={twMerge(
                "search-icon text-[1.4rem] cursor-pointer  flex  items-center flex-nowrap  gap-2 ps-1 pe-1",
                showSearchBox && "border-white border-solid border-[1px]"
              )}
            >
              <IoSearch
                onClick={() => {
                  setShowSearchBox(!showSearchBox);  
                }}
              />
              {showSearchBox && (
                <input
                  ref={inputRef}
                  autoFocus
                  placeholder="Search"
                  value={query}
                  onChange={handleSearchChange}
                  className="search-input-container bg-transparent outline-none  w-[10rem] max-sm:w-[5rem] h-[1.9rem] font-light text-[1rem] text-white flex items-center"
                />
              )}
            </div>
            {status=='unauthenticated'?<Link
              onClick={() => {
                setQuery("");
                setShows([]);
              }}
              href={"/login"}
              className="account text-[14px] font-semibold flex items-center justify-center rounded-[4px] bg-[var(--netflix-font-red)] pt-1 pb-1 ps-2 pe-2 cursor-pointer hover:bg-[#c61414]"
            >
              Signin
            </Link>:
            <div
            onClick={() => {
              if(status=='authenticated'){
                signOut()
              }
              setQuery("");
              setShows([]);
            }}
            className="account text-[14px] font-semibold flex items-center justify-center rounded-[4px] bg-[var(--netflix-font-red)] pt-1 pb-1 ps-2 pe-2 cursor-pointer hover:bg-[#c61414]"
          >
            {status=='authenticated'?'Logout':'Signin'}
          </div>
            }
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
