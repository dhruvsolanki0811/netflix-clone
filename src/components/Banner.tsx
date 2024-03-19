"use client";
import React, { useEffect, useState } from "react";

import { FaPlay, FaInfoCircle } from "react-icons/fa";
import { useModalStore } from "@/store/modalStore";
import { CategorizedShows, Show } from "@/types/type";
import Link from "next/link";
import { getRandomInt } from "@/utils/utils";
function Banner({ shows }: { shows?: CategorizedShows[] }) {
  const { setOpen, setShow } = useModalStore();
  const [bannerShow, setBannerShow] = useState({} as Show);
  const [randomInt, setRandomInt] = useState<number>(getRandomInt(15));
  useEffect(() => {
    if (shows) {
      setBannerShow(shows[0]?.shows?.at(randomInt) || ({} as Show));
    }
  }, [shows]);
  return (
    <>
      <div className="banner w-full h-100 ">
        <div className="movie-info flex flex-col gap-2 max-w-[50vw]  mt-[4rem] mb-[3.4rem]  ms-[2.5rem] me-[2.5rem] max-sm:ms-[1.4rem] max-sm:me-[0.9rem]">
          {bannerShow.title ? (
            <div className="movie-title text-[1.9rem] font-extrabold">
              {bannerShow.title
                ? bannerShow.title
                : bannerShow?.name
                ? bannerShow.name
                : bannerShow?.original_title
                ? bannerShow.original_title
                : ""}
            </div>
          ) : (
            <div className="movie-title h-[1.9rem]  font-extrabold">
              <div
                className="h-[1rem] w-[50%] bg-[#1d1d1d]"></div>
            </div>
          )}
          <div className="popularity-tab flex flex-nowrap	 gap-2 justify-cener items-center">
            {bannerShow.vote_average?<div className="popularity text-[#16A34A] text-sm font-medium	 ">
              {bannerShow?.vote_average} Average Votes
            </div>:
            <div className="movie-title h-[1.9rem] w-[24%] font-extrabold">
            <div
              className="h-[1rem] w-full bg-[#1d1d1d]"></div>
          </div>}
            {bannerShow.release_date?<div className="popularity text-sm font-medium">
              {bannerShow?.release_date}
            </div>:
            <div className="movie-title h-[1.9rem] w-[24%] font-extrabold">
            <div
              className="h-[1rem] w-full bg-[#1d1d1d]"></div>
          </div>}
          </div>
          {bannerShow.overview?<div className="movie-title text-sm text-justify multi-line-ellipsis">
            {bannerShow?.overview}
          </div>:
          <div className="movie-title  w-full font-extrabold">
          <div
            className="h-[4.3rem] w-full bg-[#1d1d1d]"></div>
        </div>}
          <div className="banner-play flex gap-1">
            {bannerShow.title?<Link
              href={
                bannerShow?.id && bannerShow?.media_type == "tv"
                  ? `/tvshow/${bannerShow.id}/1/1`
                  : `/movie/${bannerShow?.id}`
              }
              className="play-btn cursor-pointer text-[14px] flex pt-1 pb-1 ps-3 pe-3 gap-1 justify-center items-center font-bold  mt-2 text-black bg-white  border-[1px] border-solid border-[white] rounded-[3px] hover:bg-[var(--border-btn)] hover:border-[var(--border-btn)] hover:text-white"
            >
              <FaPlay className="text-[12px]"></FaPlay>
              Watch
            </Link>:
            <div className="movie-title h-[1.9rem]  font-extrabold">
            <div
              className="h-[31px] w-[84px] bg-[#1d1d1d]"></div>
          </div>}
            {bannerShow.title?<div
              onClick={() => {
                setOpen(true);
                setShow(bannerShow);
              }}
              className="play-btn cursor-pointer text-[14px] flex flex-nowrap pt-1 pb-1 ps-3 pe-3 gap-1 justify-center items-center font-bold  mt-2 text-black bg-transparent text-white rounded-[3px] border-[1px] border-solid border-[var(--border-btn)] hover:bg-[var(--border-btn)]"
            >
              <FaInfoCircle className="text-[14px] "></FaInfoCircle>
              More Info
            </div>:<div className="movie-title h-[1.9rem]  font-extrabold">
              <div
                className="h-[31px] w-[110px] bg-[#1d1d1d]"></div>
            </div>}
          </div>
        </div>
        <div className="banner-inset absolute inset-0 -z-10 ">
          <div className="banner-img-container w-full h-full relative">
            {bannerShow.backdrop_path ? (
              <img
                style={{
                  objectFit: "cover",
                  width: "100%",
                  height: "100%",
                  position: "absolute",
                }}
                src={`https://image.tmdb.org/t/p/original/${bannerShow.backdrop_path}`}
                alt=""
              />
            ) : (
              <div className="bg-[var(--background)] w-full h-full"></div>
            )}
          </div>
        </div>
        <div
          className="black-shade  absolute inset-0  w-full h-full -z-[5] 
        bg-black/60 bg-gradient-to-b from-neutral-900/10 to-neutral-900 
        "
        ></div>
      </div>
    </>
  );
}

export default Banner;
