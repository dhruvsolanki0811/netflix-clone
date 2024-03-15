import { useModalStore } from "@/store/modalStore";
import React from "react";
import MovieTrailerModal from "./MovieTrailerModal";
import SearchImageCard from "./SearchImageCard";
import { useSearchStore } from "@/store/searchstore";

function SearchGrid() {
  const { open } = useModalStore();
  const { shows: queryShows } = useSearchStore();
  return (
    <>
      {open && <MovieTrailerModal></MovieTrailerModal>}

      <div className="search-grid grid grid-cols-5 transitions-all	gap-x-3 gap-y-6 ms-[1rem] ps-[1.5rem] pe-[1.5rem] pt-[1rem] max-sm:ms-[1.5rem] max-sm:me-[0.8rem] max-sm:px-[0rem] ">
        {queryShows.map((a, i) => (
          <SearchImageCard show={a} key={i}></SearchImageCard>
        ))}
      </div>
    </>
  );
}

export default SearchGrid;
