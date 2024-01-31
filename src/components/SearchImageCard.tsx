import { useModalStore } from "@/store/modalStore";
import Image from "next/image";
import React from "react";

function SearchImageCard() {
  const {setOpen}=useModalStore()
  return (
    <>
      <div onClick={()=>setOpen(true)} className="card-container cursor-pointer h-[6rem] hover:scale-110 relative bg-white text-black">
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

export default SearchImageCard;
