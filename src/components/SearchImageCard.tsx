import { useModalStore } from "@/store/modalStore";
import { Show } from "@/types/type";
import React from "react";
import placeholder from "../assets/placeholder.jpg";
import { url } from "inspector";
import Image from "next/image";
function SearchImageCard({ show }: { show: Show }) {
  const { setOpen, setShow } = useModalStore();

  return (
    <>
      <div
        onClick={() => {
          setOpen(true);
          setShow(show);
        }}
        className="card-container cursor-pointer h-[7rem] hover:scale-110 transition-transform duration-300 ease-in-out transform  transition-transform duration-300 ease-in-out transform  relative bg- text-black border-none"
      >
        {show?.backdrop_path ? (
          <img
            src={`https://image.tmdb.org/t/p/w500/${show?.backdrop_path}`}
            alt=""
            style={{
              objectFit: "cover",
              width: "100%",
              height: "100%",
              position: "absolute",
            }}
          />
        ) : show?.poster_path ? (
          <img
            src={`https://image.tmdb.org/t/p/w500/${show?.poster_path}`}
            alt=""
            style={{
              objectFit: "cover",
              width: "100%",
              height: "100%",
              position: "absolute",
            }}
          />
        ) : (
          <Image
            src={placeholder}
            alt=""
            style={{
              objectFit: "cover",
              width: "100%",
              height: "100%",
              position: "absolute",
            }}
          />
        )}
      </div>
    </>
  );
}

export default SearchImageCard;
