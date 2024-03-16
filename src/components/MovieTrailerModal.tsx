"use client";
import { AnimatePresence, motion } from "framer-motion";
import { useModalStore } from "@/store/modalStore";
import React, { useEffect, useRef, useState } from "react";
import { FaPlay } from "react-icons/fa";
import ReactPlayer from "react-player";
import { FaVolumeUp } from "react-icons/fa";
import { FaVolumeMute } from "react-icons/fa";
import { AiOutlineClose } from "react-icons/ai";
import { FaPause } from "react-icons/fa";
import Link from "next/link";
import { useFetchMovieTrailer } from "@/hooks/useTrailerData";

import { FaCheck } from "react-icons/fa";
import { MdAdd } from "react-icons/md";
import {
  useAddFavShow,
  useFetchFavShowStatus,
  useRemoveFavShow,
} from "@/hooks/useFavShowsData";
import { useSession } from "next-auth/react";
import Loader from "./Loader";
import { LuLoader2 } from "react-icons/lu";

function MovieTrailerModal() {
  const { setOpen, show } = useModalStore();
  const { data: trailer, isLoading } = useFetchMovieTrailer(
    String(show?.id),
    show?.media_type ? show.media_type : ""
  );
  const { data: favstatus, isLoading: statusLoading } = useFetchFavShowStatus(
    String(show?.id)
  );
  const { mutate: addFavShow, isLoading: addListLoader } = useAddFavShow(
    String(show?.id)
  );
  const { mutate: removeShow, isLoading: removeListLoader } = useRemoveFavShow(
    String(show?.id)
  );
  const { status: authStatus } = useSession();
  const modalRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLDivElement>(null);

  const [isMuted, setIsMuted] = React.useState(false);
  const [isPlaying, setIsPlaying] = React.useState(false);

  const handleOutsideClick = (e: MouseEvent) => {
    if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
      setOpen(false);
    }
    if (
      closeRef.current &&
      (closeRef.current == e.target ||
        closeRef.current.contains(e.target as Node))
    ) {
      setOpen(false);
    }
  };
  useEffect(() => {
    document.addEventListener("mousedown", handleOutsideClick);
  }, []);
  return (
    <>
      <div className="trailer-modal fixed  bg-[rgb(0,0,0,60%)] inset-0  z-[1000] flex justify-center items-center">
        <motion.div
          initial={{ y: 100 }}
          animate={{ y: 0 }}
          exit={{ y: -100 }}
          ref={modalRef}
          className="trailer-container grid grid-rows-3 relative aspect-video  h-[40rem] w-[42rem] ms-[1rem] me-[1rem] bg-[var(--background)]"
        >
          <div className="row-span-2 relative">
            <div className="black-shade  absolute inset-0 z-[10000]  w-full h-full bg-black/10 bg-gradient-to-b from-neutral-900/10 to-neutral-900"></div>
            {isLoading ? (
              <div className="w-full h-full flex items-center justify-center">
                <Loader></Loader>
              </div>
            ) : !trailer ? (
              <div className="w-full h-full flex items-center justify-center">
                <div className="text-[22px] font-bold">
                  Trailer Not Found Sorry T_T
                </div>
              </div>
            ) : (
              <ReactPlayer
                style={{}}
                url={`https://www.youtube.com/watch?v=${trailer?.key}`}
                width="100%"
                height="100%"
                controls={false}
                muted={isMuted}
                playing={isPlaying}
                onStart={() => setIsPlaying(true)}
                onPlay={() => setIsPlaying(true)}
                onPause={() => setIsPlaying(false)}
                onEnded={() => setIsPlaying(false)}
              />
            )}
            <div className="btn-container grid grid-rows-2 absolute z-[20000] top-0 w-full h-full ">
              <div className="close-btn-container flex justify-end items-start pt-7 pe-4 ">
                <div
                  ref={closeRef}
                  className="play-btn cursor-pointer text-[17px] rounded-full flex p-1  gap-1 justify-center items-center font-bold  mt-2 text-black bg-white  border-[1px] border-solid border-[white] rounded-[3px] hover:bg-[var(--border-btn)] hover:border-[var(--border-btn)] hover:text-white"
                >
                  <AiOutlineClose />
                </div>
              </div>
              <div className="grid p-[1rem] ">
                <div className="btn-container self-end	">
                  <div className="banner-play flex justify-between items-center  gap-1">
                    <div className="play-btn-container flex gap-2">
                      <div
                        onClick={() => {
                          if (trailer) setIsPlaying(!isPlaying);
                        }}
                        className="play-btn cursor-pointer text-[14px] flex pt-1 pb-1 ps-3 pe-3 gap-1 justify-center items-center font-bold  mt-2 text-black bg-white  border-[1px] border-solid border-[white] rounded-[3px] hover:bg-[var(--border-btn)] hover:border-[var(--border-btn)] hover:text-white"
                      >
                        {!isPlaying ? (
                          <>
                            <FaPlay className="text-[13px]"></FaPlay>
                            Trailer
                          </>
                        ) : (
                          <>
                            <FaPause className="text-[13px]"></FaPause>
                            Pause
                          </>
                        )}
                      </div>

                      {authStatus == "unauthenticated" ? (
                        <Link
                          href={"/login"}
                          className="add-btn cursor-pointer text-[14px] rounded-full  flex pt-2 pb-2 ps-2 pe-2 gap-1 justify-center items-center font-bold  mt-2 text-black bg-white  border-[1px] border-solid border-[white] rounded-[3px] hover:bg-[var(--border-btn)] hover:border-[var(--border-btn)] hover:text-white"
                        >
                          <MdAdd className="text-[14px]" />
                        </Link>
                      ) : statusLoading ||
                        addListLoader ||
                        removeListLoader ? (
                        <div className="add-btn  cursor-pointer text-[14px] rounded-full  flex pt-2 pb-2 ps-2 pe-2 gap-1 justify-center items-center font-bold  mt-2 text-black bg-white  border-[1px] border-solid border-[white] rounded-[3px] hover:bg-[var(--border-btn)] hover:border-[var(--border-btn)] hover:text-white">
                          <LuLoader2 className="animate-spin duration-2000 text-[14px]" />
                        </div>
                      ) : !favstatus.isPresent ? (
                        <div
                          onClick={() => {
                            if (authStatus == "authenticated") {
                              addFavShow({
                                id: show?.id ? String(show.id) : "",
                                media_type: show?.media_type
                                  ? show.media_type
                                  : "movie",
                                overview: show?.overview ? show.overview : "",
                                poster_path: show?.poster_path
                                  ? show.poster_path
                                  : show?.backdrop_path
                                  ? show?.backdrop_path
                                  : "",
                                release_date: show?.release_date
                                  ? show.release_date
                                  : show?.first_air_date
                                  ? show.first_air_date
                                  : show?.last_air_date
                                  ? show.last_air_date
                                  : "",
                                title: show?.title
                                  ? show.title
                                  : show?.name
                                  ? show.name
                                  : show?.original_title
                                  ? show.original_title
                                  : "N/A",
                                vote_average: show?.vote_average,
                              });
                            }
                          }}
                          className="add-btn cursor-pointer text-[14px] rounded-full  flex pt-2 pb-2 ps-2 pe-2 gap-1 justify-center items-center font-bold  mt-2 text-black bg-white  border-[1px] border-solid border-[white] rounded-[3px] hover:bg-[var(--border-btn)] hover:border-[var(--border-btn)] hover:text-white"
                        >
                          <MdAdd className="text-[14px]" />
                        </div>
                      ) : (
                        <div
                          onClick={() => {
                            if (authStatus == "authenticated") {
                              removeShow(String(show?.id));
                            }
                          }}
                          className="add-btn cursor-pointer text-[14px] rounded-full  flex pt-2 pb-2 ps-2 pe-2 gap-1 justify-center items-center font-bold  mt-2 text-black bg-white  border-[1px] border-solid border-[white] rounded-[3px] hover:bg-[var(--border-btn)] hover:border-[var(--border-btn)] hover:text-white"
                        >
                          <FaCheck className="text-[14px]" />
                        </div>
                      )}
                    </div>
                    <div
                      onClick={() => {
                        setIsMuted(!isMuted);
                      }}
                      className="play-btn cursor-pointer text-[18px] rounded-full flex p-1 gap-1 justify-center items-center font-bold  mt-2 text-black bg-white  border-[1px] border-solid border-[white] rounded-[3px] hover:bg-[var(--border-btn)] hover:border-[var(--border-btn)] hover:text-white"
                    >
                      {isMuted ? (
                        <FaVolumeMute></FaVolumeMute>
                      ) : (
                        <FaVolumeUp></FaVolumeUp>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="bg-[var(--background)] flex flex-col gap-2 p-[1rem] grid grid-row-4">
            <h2 className="movie-title text-[1.4rem] font-extrabold truncate  ">
              {show?.title
                ? show.title
                : show?.name
                ? show.name
                : show?.original_title
                ? show.original_title
                : "N/A"}
            </h2>

            <div className="popularity-tab flex flex-nowrap	 gap-2  items-center">
              <div className="popularity text-[#16A34A] text-[0.8rem] font-medium	 ">
                {show?.vote_average ? show?.vote_average : 0} Average Votes
              </div>
              <div className="popularity text-[0.8rem] font-medium">
                {show?.release_date
                  ? show?.release_date
                  : show?.first_air_date
                  ? show.first_air_date
                  : show?.last_air_date}
              </div>
            </div>
            <div className="movie-title text-xs text-justify multi-line-ellipsis">
              {show?.overview}
            </div>
            <div className="banner-play flex gap-1">
              <Link
                href={
                  show?.id && show?.media_type == "tv"
                    ? `/tvshow/${show.id}/1/1`
                    : `/movie/${show?.id}`
                }
                className="play-btn cursor-pointer text-[14px] flex pt-1 pb-1 ps-3 pe-3 gap-1 justify-center items-center font-bold  mt-2 text-black bg-white  border-[1px] border-solid border-[white] rounded-[3px] hover:bg-[var(--border-btn)] hover:border-[var(--border-btn)] hover:text-white"
              >
                <FaPlay className="text-[13px]"></FaPlay>
                Watch
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </>
  );
}

export default MovieTrailerModal;
