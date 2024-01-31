"use client";
import MoviePlayer from "@/components/MoviePlayer";
import MovieTrailerModal from "@/components/MovieTrailerModal";
import Navbar from "@/components/Navbar";
import { useModalStore } from "@/store/modalStore";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { FaInfoCircle } from "react-icons/fa";

function page() {
  useEffect(() => {
    setOpen(false);
  }, []);
  const { setOpen, open } = useModalStore();
  return (
    <>
      <Navbar></Navbar>
      <MoviePlayer></MoviePlayer>
      <div className="movie-info-container grid grid-cols-5	pt-8 mb-8">
        <div className="thumbnail-container flex flex-col font-bold justify-start items-end ">
          <Image
            style={{
              boxShadow: "19px 11px 15px -3px rgba(0,0,0,41%)",
            }}
            src={
              "https://image.tmdb.org/t/p/original//pB8BM7pdSp6B6Ih7QZ4DrQ3PmJK.jpg"
            }
            width={100}
            height={100}
            alt=""
            className="hover:scale-110 cursor-pointer"
          ></Image>
        </div>

        <div className="movie-info col-span-4 flex flex-col  gap-2   ms-[2.5rem] me-[2.5rem]">
          <div className="movie-title text-[1.6rem] font-extrabold">
            The Hunger Games: The Ballad of Songbirds & Snakes
          </div>
          <div className="popularity-tab flex flex-nowrap	 gap-2 justify-cener items-center">
            <div className="popularity text-[#16A34A] text-xs font-medium	 ">
              {55} Votes
            </div>
            <div className="popularity text-xs font-medium">2023-11-15</div>
          </div>
          <div className="banner-play flex gap-1">
            <div
              onClick={() => setOpen(true)}
              className="play-btn cursor-pointer text-[11px] flex flex-nowrap pt-1 pb-1 ps-3 pe-3 gap-1 justify-center items-center font-bold  mt-2 text-black bg-transparent text-white rounded-[3px] border-[1px] border-solid border-[var(--border-btn)] hover:bg-[var(--border-btn)]"
            >
              <FaInfoCircle className="text-[12px] "></FaInfoCircle>
              More Info
            </div>
          </div>
          <div className="movie-title text-xs text-justify ">
            64 years before he becomes the tyrannical president of Panem,
            Coriolanus Snow sees a chance for a change in fortunes when he
            mentors Lucy Gray Baird, the female tribute from District 12. 64
            years before he becomes the tyrannical president of Panem,
            Coriolanus Snow sees a chance for a change in fortunes when he
            mentors Lucy Gray Baird, the female tribute from District 12. 64
            years before he becomes the tyrannical president of Panem,
            Coriolanus Snow sees a chance for a change in fortunes when he
            mentors Lucy Gray Baird, the female tribute from District 12. 64
            years before he becomes the tyrannical president of Panem,
            Coriolanus Snow sees a chance for a change in fortunes when he
            mentors Lucy Gray Baird, the female tribute from District 12. 64
            years before he becomes the tyrannical president of Panem,
            Coriolanus Snow sees a chance for a change in fortunes when he
            mentors Lucy Gray Baird, the female tribute from District 12.
          </div>
        </div>
      </div>
      {open && <MovieTrailerModal></MovieTrailerModal>}
    </>
  );
}

export default page;
