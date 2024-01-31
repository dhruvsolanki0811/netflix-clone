"use client";
import React, { useEffect } from "react";
import Carousel from "@/components/Carousel";
import Navbar from "@/components/Navbar";
import { usePathname } from "next/navigation";
import Banner from "./Banner";
import { useSearchStore } from "@/store/searchstore";
import SearchImageCard from "./SearchImageCard";
import MovieTrailerModal from "@/components/MovieTrailerModal";
import { useModalStore } from "@/store/modalStore";

function ShowsContainer() {
  const { open } = useModalStore();
  const { query,setQuery } = useSearchStore();
  useEffect(()=>{
    setQuery("")
  },[])
  const path = usePathname();
  if (query.length > 0) {
    return (
      <>
        {open && <MovieTrailerModal></MovieTrailerModal>}

        <div className="show-grid grid grid-cols-5	gap-x-1 gap-y-6 ps-[4rem] pe-[4rem] pt-[1rem]">
          {[1, 2, 3, 4, 5, 6, 7, 8, 9, 1, 2, 3, 4, 5, 6, 7, 8, 9].map((a,i) => (
            <SearchImageCard key={i}></SearchImageCard>
          ))}
        </div>
      </>
    );
  }
  return (
    <>
      {open && <MovieTrailerModal></MovieTrailerModal>}

      {path == "/" && (
        <>
          <Banner></Banner>
        </>
      )}
      <Carousel></Carousel>
      <Carousel></Carousel>
      <Carousel></Carousel>
      <Carousel></Carousel>
    </>
  );
}

export default ShowsContainer;
