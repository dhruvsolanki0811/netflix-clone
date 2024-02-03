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
        className="card-container cursor-pointer min-w-[9rem] h-[9rem] relative  text-black  transition-all	 hover:scale-110 "
      >
        <Image
          src={
            `https://image.tmdb.org/t/p/original/${show.poster_path}`
          }
          fill
          sizes="inherit"
          alt="card"
          style={{objectFit:"fill"}}
          />
      </div>

    </>
  );
}

export default CarouselCard;
