"use client";
import Image from "next/image";
import React, { useState } from "react";
import MovieTrailerModal from "./MovieTrailerModal";
import { useModalStore } from "@/store/modalStore";
import { Show } from "@/types/type";
import { twMerge } from "tailwind-merge";

function CarouselCard({show}:{show?:Show}) {
    const {setOpen,setShow} =useModalStore()
  return (
    <>
      <div
        onClick={() =>{setOpen(true)
        setShow(show?show:{}as Show)
        }}
        className={twMerge("card-container cursor-pointer min-w-[11rem] h-[15rem] relative  text-black  ",show?" transition-all	 hover:scale-110 transition-transform duration-300 ease-in-out transform  ":"")}
      >
        {show?<img
          src={
            `https://image.tmdb.org/t/p/original/${show.poster_path}`
          }
          
          sizes="inherit"
          alt="card"
          style={{objectFit:"fill",width:"100%",height:"100%",position:"absolute"}}
          />:<div className="w-full h-full absolute bg-[#1d1d1d]"></div>}
      </div>

    </>
  );
}

export default CarouselCard;
