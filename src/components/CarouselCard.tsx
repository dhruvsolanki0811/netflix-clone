"use client";
import React, {  useState } from "react";
import { useModalStore } from "@/store/modalStore";
import { Show } from "@/types/type";
import { twMerge } from "tailwind-merge";

function CarouselCard({ show }: { show?: Show }) {
  const [imageLoaded, setimageLoaded] = useState(false);
  const { setOpen, setShow } = useModalStore();
  // useEffect(() => {
  //   const img = new Image();
  //   img.src =
  //     show && show.poster_path
  //       ? `https://image.tmdb.org/t/p/original/${show.poster_path}`
  //       : "";
  // }, [show?.backdrop_path]);
  return (
    <>
      <div
        onClick={() => {
          setOpen(true);
          setShow(show ? show : ({} as Show));
        }}
        className={twMerge(
          "card-container cursor-pointer min-w-[11rem] h-[15rem] relative  text-black  ",
          show && imageLoaded
            ? " transition-all	 hover:scale-110 transition-transform duration-300 ease-in-out transform  "
            : ""
        )}
      >
        {show ? (
          <>
            {/* <div
              style={{ background:"#1d1d1d",width: "100%", height: "100%",display:imageLoaded?'none':'block' }}
            ></div> */}
            <img
              src={`https://image.tmdb.org/t/p/w92/${show.poster_path}`}
              onLoad={() => setimageLoaded(true)}
              alt="card"
              style={{
                objectFit: "cover",
                backgroundPosition:"center",
                width: "100%",
                height: "100%",
                position: "absolute",
                display:imageLoaded?'none':'block' ,
                transition:"display 200ms ease-in-out" 
                
              }}
              loading="lazy"
              
            />
            <img
              src={`https://image.tmdb.org/t/p/original/${show.poster_path}`}
              onLoad={() => setimageLoaded(true)}
              alt="card"
              style={{
                objectFit: "fill",
                width: "100%",
                height: "100%",
                position: "absolute",
                display:!imageLoaded?'none':'block' 

              }}
              loading="lazy"
              
            />
          </>
        ) : (
          <div className="w-full h-full absolute bg-[#1d1d1d]"></div>
        )}
      </div>
    </>
  );
}

export default CarouselCard;
