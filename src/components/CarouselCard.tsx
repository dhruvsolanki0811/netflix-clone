"use client";
import Image from "next/image";
import React, { useState } from "react";
import MovieTrailerModal from "./MovieTrailerModal";
import { useModalStore } from "@/store/modalStore";

function CarouselCard() {
    const {setOpen} =useModalStore()
  return (
    <>
      <div
        onClick={() =>{setOpen(true)}}
        className="card-container cursor-pointer min-w-[11.7rem] h-[8rem] relative bg-white text-black  transition-all	 hover:scale-125 "
      >
        <Image
          src={
            "https://image.tmdb.org/t/p/w500//uIk2g2bRkNwNywKZIhC5oIU94Kh.jpg"
          }
          fill
          alt="card"
          style={{objectFit:"cover"}}
          />
      </div>

    </>
  );
}

export default CarouselCard;
