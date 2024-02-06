"use client";
import React from "react";
import { ProtectedPage } from "@/components/HOC/WithAuth";
import { useModalStore } from "@/store/modalStore";
import MovieTrailerModal from "@/components/MovieTrailerModal";
import { useFetchFavShows } from "@/hooks/useFavShowsData";
import SearchImageCard from "@/components/SearchImageCard";
import { Show } from "@/types/type";
import FavouriteCard from "@/components/FavouriteCard";
import Link from "next/link";
const Page = () => {
  const { setShow, setOpen, open } = useModalStore();
  const { data: favShows, isLoading } = useFetchFavShows();
  if (isLoading) {
    return <></>;
  }
  return (
    <>
      {open && <MovieTrailerModal />}
      {favShows.length == 0 && (
        <>
          <div className="flex justify-center mt-[20vh] p-10 h-[7rem]">
            <Link href={`/`} className="account text-[14px] font-semibold flex items-center justify-center rounded-[4px] bg-[var(--netflix-font-red)] pt-1 pb-1 ps-2 pe-2 cursor-pointer hover:bg-[#c61414]">
              Explore More!!
            </Link>
          </div>
        </>
      )}
      <div className="search-grid grid grid-cols-5 transitions-all	gap-x-3 gap-y-6 ps-[5rem] pe-[5rem] pt-[1rem]">
        {favShows.map((item: { favoriteShow: Show }, i: number) => (
          <FavouriteCard key={i} show={item.favoriteShow} />
        ))}
      </div>
    </>
  );
};
export default ProtectedPage(Page);
