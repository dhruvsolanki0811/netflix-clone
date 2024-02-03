import { useModalStore } from "@/store/modalStore";
import { Show } from "@/types/type";
import Image from "next/image";
import React from "react";

function SearchImageCard({show}:{show:Show}) {
  const {setOpen,setShow}=useModalStore()
  // if(!show?.poster_path && !show?.backdrop_path){
  //   return <></>
  // }
  return (
    <>
      <div onClick={()=>{setOpen(true)
      setShow(show)
      }} className="card-container cursor-pointer h-[7rem] hover:scale-110 relative bg- text-black border-none">
        <Image
          src={
            show?.backdrop_path?
            `https://image.tmdb.org/t/p/w500/${show?.backdrop_path}`:
            `https://image.tmdb.org/t/p/w500/${show?.poster_path}`
          }
          fill
          alt=""
          style={{objectFit:"cover"}}
          />
      </div>
    </>
  );
}

export default SearchImageCard;
