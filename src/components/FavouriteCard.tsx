import { useModalStore } from "@/store/modalStore";
import { Show } from "@/types/type";
import Image from "next/image";
import React from "react";

function FavouriteCard({show}:{show:Show}) {
  const {setOpen,setShow}=useModalStore()
  
  return (
    <>
      <div onClick={()=>{setOpen(true)
      setShow(show)
      }} className="card-container cursor-pointer h-[20rem] w-[14rem] hover:scale-110 transition-transform duration-300 ease-in-out transform   relative bg- text-black border-none">
        <img
          src={
            show?.backdrop_path?
            `https://image.tmdb.org/t/p/w500/${show?.backdrop_path}`:
            `https://image.tmdb.org/t/p/w500/${show?.poster_path}`
          }
          
          alt=""
          style={{objectFit:"fill",width:"100%",height:"100%",position:"absolute"}}
          />
      </div>
    </>
  );
}

export default FavouriteCard;
