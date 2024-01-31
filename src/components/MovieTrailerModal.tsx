import { useModalStore } from "@/store/modalStore";
import React, { useEffect, useRef, useState } from "react";
import { FaPlay } from "react-icons/fa";
import ReactPlayer from "react-player";
import { FaVolumeUp } from "react-icons/fa";
import { FaVolumeMute } from "react-icons/fa";
import { AiOutlineClose } from "react-icons/ai";
import { FaPause } from "react-icons/fa";
import Link from "next/link";

function MovieTrailerModal() {
  const { setOpen } = useModalStore();
  const modalRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLDivElement>(null);

  const [isMuted, setIsMuted] = React.useState(false)
  const [isPlaying, setIsPlaying] = React.useState(false)


  const handleOutsideClick = (e: MouseEvent) => {
    
    if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
      setOpen(false);
    }
    if (closeRef.current && (closeRef.current==(e.target)||closeRef.current.contains(e.target as Node) )) {
        setOpen(false);
      }

  };
  useEffect(() => {
    document.addEventListener("mousedown", handleOutsideClick);
  }, []);
  return (
    <>
      <div className="trailer-modal fixed  bg-[rgb(0,0,0,60%)] inset-0  z-[1000] flex justify-center items-center">
        <div
          ref={modalRef}
          className="trailer-container grid grid-rows-3 relative aspect-video  h-[33rem] w-[35rem] ms-[1rem] me-[1rem] bg-[var(--background)]"
        >
          <div className="row-span-2 relative">
            <div className="black-shade  absolute inset-0 z-[10000]  w-full h-full bg-black/10 bg-gradient-to-b from-neutral-900/10 to-neutral-900"></div>
            <ReactPlayer
              style={{}}
              url={`https://www.youtube.com/watch?v=otNh9bTjXWg`}
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
            <div className="btn-container grid grid-rows-2 absolute z-[20000] top-0 w-full h-full ">
              <div className="close-btn-container flex justify-end items-start pt-7 pe-4 ">
                <div ref={closeRef} className="play-btn cursor-pointer text-[13px] rounded-full flex p-1  gap-1 justify-center items-center font-bold  mt-2 text-black bg-white  border-[1px] border-solid border-[white] rounded-[3px] hover:bg-[var(--border-btn)] hover:border-[var(--border-btn)] hover:text-white">
                  <AiOutlineClose />
                </div>
              </div>
              <div className="grid p-[1rem] ">
                <div className="btn-container self-end	">
                  <div className="banner-play flex justify-between items-center  gap-1">
                    <div onClick={()=>setIsPlaying(!isPlaying)} className="play-btn cursor-pointer text-[11px] flex pt-1 pb-1 ps-3 pe-3 gap-1 justify-center items-center font-bold  mt-2 text-black bg-white  border-[1px] border-solid border-[white] rounded-[3px] hover:bg-[var(--border-btn)] hover:border-[var(--border-btn)] hover:text-white">
                      {!isPlaying?<><FaPlay className="text-[10px]"></FaPlay>
                      Trailer</>:<><FaPause className="text-[10px]"></FaPause>
                      Pause</>}
                    </div>
                    <div
                      onClick={() => {
                        setIsMuted(!isMuted)
                    }}
                      className="play-btn cursor-pointer text-[13px] rounded-full flex p-1 gap-1 justify-center items-center font-bold  mt-2 text-black bg-white  border-[1px] border-solid border-[white] rounded-[3px] hover:bg-[var(--border-btn)] hover:border-[var(--border-btn)] hover:text-white"
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
            <h2 className="movie-title text-[1rem] font-extrabold truncate  ">
              Wonka
            </h2>

            <div className="popularity-tab flex flex-nowrap	 gap-2 justify-cener items-center">
              <div className="popularity text-[#16A34A] text-xs font-medium	 ">
                {55} Votes
              </div>
              <div className="popularity text-xs font-medium">2023-11-15</div>
            </div>
            <div className="movie-title text-xs text-justify multi-line-ellipsis">
              64 years before he becomes the tyrannical president of Panem,
              Coriolanus Snow sees a chance for a change in fortunes when he
              mentors Lucy Gray Baird, the female tribute from District 12.
            </div>
            <div className="banner-play flex gap-1">
              <Link href={'/movie/1'} className="play-btn cursor-pointer text-[11px] flex pt-1 pb-1 ps-3 pe-3 gap-1 justify-center items-center font-bold  mt-2 text-black bg-white  border-[1px] border-solid border-[white] rounded-[3px] hover:bg-[var(--border-btn)] hover:border-[var(--border-btn)] hover:text-white">
                
                <FaPlay className="text-[10px]"></FaPlay>
                Watch
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default MovieTrailerModal;
