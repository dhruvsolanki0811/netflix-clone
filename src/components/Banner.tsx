'use client'
import React from 'react'
import Carousel from './Carousel'
import Image from "next/image";
import { FaPlay, FaInfoCircle } from "react-icons/fa";
import { useModalStore } from '@/store/modalStore';
import { Show } from '@/types/type';
function Banner({show}:{show:Show}) {
  const {setOpen,setShow}=useModalStore()
  return (
    <>
    <div className="banner w-full h-100 ">
        <div className="movie-info flex flex-col gap-2 max-w-[50vw]  mt-[4rem] mb-[3.4rem]  ms-[2.5rem] me-[2.5rem]">
          <div className="movie-title text-[1.6rem] font-extrabold">
          {show?.title?show.title:(show?.name?show.name:(show?.original_title?show.original_title:"N/A"))}
          </div>
          <div className="popularity-tab flex flex-nowrap	 gap-2 justify-cener items-center">
            <div className="popularity text-[#16A34A] text-xs font-medium	 ">
              {show?.vote_average} Average Votes
            </div>
            <div className="popularity text-xs font-medium">{show?.release_date}</div>
          </div>
          <div className="movie-title text-xs text-justify multi-line-ellipsis">
            {show?.overview}
          
          </div>
          <div className="banner-play flex gap-1">
            <div className="play-btn cursor-pointer text-[11px] flex pt-1 pb-1 ps-3 pe-3 gap-1 justify-center items-center font-bold  mt-2 text-black bg-white  border-[1px] border-solid border-[white] rounded-[3px] hover:bg-[var(--border-btn)] hover:border-[var(--border-btn)] hover:text-white">
              <FaPlay className="text-[10px]"></FaPlay>
              Watch
            </div>
            <div onClick={()=>{setOpen(true)
            setShow(show)}} className="play-btn cursor-pointer text-[11px] flex flex-nowrap pt-1 pb-1 ps-3 pe-3 gap-1 justify-center items-center font-bold  mt-2 text-black bg-transparent text-white rounded-[3px] border-[1px] border-solid border-[var(--border-btn)] hover:bg-[var(--border-btn)]">
              <FaInfoCircle className="text-[12px] "></FaInfoCircle>
              More Info
            </div>
          </div>
        </div>
        <div className="banner-inset absolute inset-0 -z-10 ">
          <div className="banner-img-container w-full h-full relative">
            <img
              style={{objectFit:"cover",width:"100%",height:"100%",position:"absolute"}}
              src={
                `https://image.tmdb.org/t/p/original/${show?.backdrop_path}`
              }
              alt=""
              
            />
          </div>
        </div>
        <div className="black-shade  absolute inset-0  w-full h-full -z-[5] 
        bg-black/60 bg-gradient-to-b from-neutral-900/10 to-neutral-900 
        "></div>
      </div>
      {/* <div className="placeholder placeholder-1 pt-2 ">
        <Carousel></Carousel>
      </div> */}
    </>
  )
}

export default Banner