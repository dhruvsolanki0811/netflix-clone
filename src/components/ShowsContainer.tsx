"use client";
import React, { useEffect, useState } from "react";
import Carousel from "@/components/Carousel";
import { usePathname } from "next/navigation";
import Banner from "./Banner";
import { useSearchStore } from "@/store/searchstore";
import MovieTrailerModal from "@/components/MovieTrailerModal";
import { useModalStore } from "@/store/modalStore";
import { CategorizedShows } from "@/types/type";
import { getRandomInt } from "@/utils/utils";
import SearchGrid from "./SearchGrid";

function ShowsContainer({
  categorizedShows
}: {
  categorizedShows: CategorizedShows[];
}) {
  const { open } = useModalStore();
  const { query, shows: queryShows, setQuery } = useSearchStore();
  const [randomInt, setRandomInt] = useState<number>(getRandomInt(15));

  useEffect(() => {
    setQuery("");
  }, []);

  


  const path = usePathname();
  if (query.length > 0) {
    return (
      <>
       <SearchGrid/>
      </>
    );
  }
  return (
    <>
      {open && <MovieTrailerModal></MovieTrailerModal>}
      {(
        categorizedShows.length>0 && categorizedShows[0].shows.length>0 
      ) && (
          <>
            {path == "/" && (
              <>
                <Banner show={categorizedShows[0].shows[randomInt]}></Banner>
              </>
            )}

            {categorizedShows.map((categorizedShow, index) => (
              <Carousel
                key={index}
                shows={categorizedShow.shows}
                title={categorizedShow.title}
              ></Carousel>
            ))}
          </>
        )}
    </>
  );
}

export default ShowsContainer;
