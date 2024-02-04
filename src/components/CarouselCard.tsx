"use client";
import Image from "next/image";
import React, { useState } from "react";
import MovieTrailerModal from "./MovieTrailerModal";
import { useModalStore } from "@/store/modalStore";
import { Show } from "@/types/type";

function CarouselCard({show}:{show:Show}) {
    const {setOpen,setShow} =useModalStore()
  return (
    <>
      <div
        onClick={() =>{setOpen(true)
        setShow(show)
        }}
        className="card-container cursor-pointer min-w-[11rem] h-[11rem] relative  text-black  transition-all	 hover:scale-110 "
      >
        <img
          src={
            `https://image.tmdb.org/t/p/original/${show.poster_path}`
          }
          
          sizes="inherit"
          alt="card"
          style={{objectFit:"fill",width:"100%",height:"100%",position:"absolute"}}
          />
      </div>

    </>
  );
}

export default CarouselCard;
