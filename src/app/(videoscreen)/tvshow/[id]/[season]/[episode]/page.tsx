"use client";
import MoviePlayer from "@/components/MoviePlayer";
import MovieTrailerModal from "@/components/MovieTrailerModal";
import Navbar from "@/components/Navbar";
import { useModalStore } from "@/store/modalStore";
import Image from "next/image";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { FaInfoCircle } from "react-icons/fa";
import { BsFillCaretDownFill, BsFillCaretUpFill } from "react-icons/bs";
import { twMerge } from "tailwind-merge";

function page() {
  const { id, season, episode } = useParams();

  const [menuSeason, setMenuSeason] = useState<number>();
  const [menuOpen, setMenuOpen] = useState(false);

  const { open, setOpen } = useModalStore();

  useEffect(() => {
    if (season && season.length > 0 && season[0]) {
      setMenuSeason(parseInt(season[0])); // Ensure that season is a string or string[]
    }
    console.log(id, season, episode);
  }, []);

  return (
    <>
      <Navbar></Navbar>
      <MoviePlayer></MoviePlayer>
      <div className="season-container flex flex-col items-center justify-center mt-5">
        <div className="season-box w-[50vw] relative">
          <div
            onClick={() => setMenuOpen(!menuOpen)}
            className="menu-btn min-w-[90px] w-auto cursor-pointer text-xs flex flex-nowrap justify-center items-center gap-1 font-bold border-[1px] border-solid p-2 "
          >
            {menuOpen ? <BsFillCaretUpFill /> : <BsFillCaretDownFill />}
            Season {menuSeason}
          </div>
          {menuOpen && (
            <div className="season-list absolute z-[10] flex flex-col w-full bg-[var(--background)] cursor-pointer text-xs  flex-nowrap justify-center gap-1 font-bold border-[1px] border-solid ">
              {[1, 2, 3, 4].map((a) => (
                <div
                  onClick={() => setMenuSeason(a)}
                  className={twMerge(
                    "p-2",
                    menuSeason == a && "bg-[var(--netflix-font-red)]"
                  )}
                  key={a}
                >
                  Season {a}
                </div>
              ))}
            </div>
          )}
        </div>
        <div className="episode-list min-w-[60vw] w-[65vw]  mt-5  ">
          {[1, 2, 3, 4].map((a) => (
            <div
              key={a}
              className={twMerge(
                "w-full grid grid-cols-7 cursor-pointer h-[14vh] justify-center items-center hover:bg-[black]" ,
                a == 1 ? "border-[1px] border-white bg-black" : ""
              )}
            >
              <div className="ep-thumbnail  col-span-2  flex flex-col flex-nowrap font-bold  ">
                <div className="image-container w-full  h-[10vh] flex gap-2 justify-center relative ps-2 pe-2 overflow-hidden">
                  <div className="number flex h-full  ">{a}</div>
                  <Image
                    style={{
                      objectFit: "cover",
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
              </div>
              <div className="episode-info col-span-5 flex flex-col p-3 ">
                <div className="flex justify-between">
                <div className="eps-name text-xs truncate">
                  The Hunger Games: The Ballad of Songbirds & Snakes
                </div>
                <div className="ms-2"></div>
                <div className="eps-duration text-xs">
                      2hr
                </div>
                </div>
                <div className="eps-desc text-xs two-line-ellipsis w-[90%] mt-2">
                  64 years before he becomes the tyrannical president of Panem,
                  Coriolanus Snow sees a chance for a change in fortunes when he
                  mentors Lucy Gray Baird, the female tribute from District 12.
                  64 years before he becomes the tyrannical president of Panem,
                  Coriolanus Snow sees a chance for a change in fortunes when he
                  mentors Lucy Gray Baird, the female tribute from District 12.
                  64 years before he becomes the tyrannical president of Panem,
                  Coriolanus Snow sees a chance for a change in fortunes when he
                  mentors Lucy Gray Baird, the female tribute from District 12.
                  64 years before he becomes the tyrannical president of Panem,
                  Coriolanus Snow sees a chance for a change in fortunes when he
                  mentors Lucy Gray Baird, the female tribute from District 12.
                  64 years before he becomes the tyrannical president of Panem,
                  Coriolanus Snow sees a chance for a change in fortunes when he
                  mentors Lucy Gray Baird, the female tribute from District 12.
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
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
