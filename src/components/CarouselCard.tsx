import React, { useState } from "react";
import { useModalStore } from "@/store/modalStore";
import { Show } from "@/types/type";
import { twMerge } from "tailwind-merge";
import { Image } from "@nextui-org/image";

function CarouselCard({ show }: { show?: Show }) {
  const { setOpen, setShow } = useModalStore();
  const handleCardClick = () => {
    setOpen(true);
    setShow(show ? show : ({} as Show));
  };

  return (
    <div
      onClick={handleCardClick}
      className={twMerge(
        "card-container cursor-pointer min-w-[11rem] h-[16rem] relative text-black",
        show
          ? " transition-all	 hover:scale-110 transition-transform duration-300 ease-in-out transform  "
          : ""
      )}
    >
      {show ? (
        <Image
        isBlurred
        isLoading
        isZoomed
          src={`https://image.tmdb.org/t/p/w500/${show.poster_path}`}
          alt="card"
          style={{
            objectFit: "fill",
            height: "16rem",
            minWidth: "11rem",
            borderRadius: "none",
          }}
          width="100%"
          shadow="sm"
          radius="none"
          className="absolute"
          loading="lazy"
        />
      ) : (
        <div className="w-full h-full absolute bg-[#1d1d1d]"></div>
      )}
    </div>
  );
}

export default CarouselCard;
