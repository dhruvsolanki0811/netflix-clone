"use client";
import MovieTrailerModal from "@/components/MovieTrailerModal";
import { useModalStore } from "@/store/modalStore";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { FaInfoCircle } from "react-icons/fa";
import { BsFillCaretDownFill, BsFillCaretUpFill } from "react-icons/bs";
import { twMerge } from "tailwind-merge";
import { useSearchStore } from "@/store/searchstore";
import { fetchSeasonsDetails, useFetchSingleShow } from "@/hooks/useShowData";
import { useQueries } from "react-query";
import { Season } from "@/types/type";
import Link from "next/link";
import ShowPlayer from "@/components/ShowPlayer";
import SearchGrid from "@/components/SearchGrid";
import Loader from "@/components/Loader";
import { ToastContainer, toast } from "react-toastify";

function Page() {
  const { id, season, episode: episodeNumber } = useParams();
  const { setQuery, query, shows: queryShows } = useSearchStore();
  const [ShowId, setShowId] = useState(Array.isArray(id) ? id[0] : id);
  // const [seasons,setSeasons] = useState<Season[]>([])
  const [seasons, setSeasons] = useState<Map<number, Season>>(new Map());

  const { data: show, isLoading } = useFetchSingleShow(ShowId);

  const onSuccess = (data: Season) => {
    if (data) {
      setSeasons((prevSeasons) => {
        const updatedSeasons = new Map(prevSeasons);
        updatedSeasons.set(data.season_number, data);
        return updatedSeasons;
      });
    }
  };
  const queryResults = useQueries(
    Array.from(
      { length: show?.number_of_seasons ? show.number_of_seasons : 1 },
      (_, i) => i
    ).map((id) => {
      return {
        queryKey: ["season details", id],
        queryFn: () => {
          if (show?.id) return fetchSeasonsDetails(show.id, id + 1);
        },
        enabled: !!show?.id,

        onSuccess,
      };
    })
  );
  const parsedSeason = Array.isArray(season)
    ? parseInt(season[0])
    : parseInt(season); // Parse season parameter into number
  const parsedEpisodeNumber = Array.isArray(episodeNumber)
    ? parseInt(episodeNumber[0])
    : parseInt(episodeNumber); // Parse episodeNumber parameter into number
  const [menuSeason, setMenuSeason] = useState<number>(parsedSeason);
  const [menuEP, setMenuEp] = useState<number>(parsedEpisodeNumber);

  const [menuOpen, setMenuOpen] = useState(false);

  const { open, setOpen, setShow } = useModalStore();

  useEffect(() => {
    toast.warning(
      "Due to 3rd party library beaware of ads while streaming. Enjoy **Winks**!"
    );
    setOpen(false);
    setQuery("");
  }, []);

  if (query.length > 0) {
    return (
      <>
        <SearchGrid></SearchGrid>
      </>
    );
  }
  if (isLoading || queryResults.some((result) => result.isLoading)) {
    return (
      <>
        {" "}
        <ToastContainer theme="colored"></ToastContainer>
        <div className="w-[100vw] h-[80vh] flex items-center justify-center ">
          <Loader></Loader>
        </div>
      </>
    );
  }

  if (seasons)
    return (
      <>
        <ToastContainer theme="colored"></ToastContainer>
        <ShowPlayer
          imdb={ShowId}
          season={parsedSeason}
          episode={parsedEpisodeNumber}
        ></ShowPlayer>
        <div className="movie-info-container grid grid-cols-5	pt-8 mb-8">
          <div className="thumbnail-container flex flex-col font-bold justify-start items-end ">
            <img
              style={{
                boxShadow: "19px 11px 15px -3px rgba(0,0,0,41%)",
              }}
              src={`https://image.tmdb.org/t/p/original/${show?.poster_path}`}
              width={100}
              height={100}
              alt=""
              className="hover:scale-110 transition-transform duration-300 ease-in-out transform   cursor-pointer"
            />
          </div>

          <div className="movie-info col-span-4 flex flex-col  gap-2   ms-[2.5rem] me-[2.5rem]">
            <div className="movie-title text-[1.6rem] font-extrabold">
              {show?.title
                ? show.title
                : show?.name
                ? show.name
                : show?.original_title
                ? show.original_title
                : "N/A"}
            </div>
            <div className="popularity-tab flex flex-nowrap	 gap-2 justify-cener items-center">
              <div className="popularity text-[#16A34A] text-xs font-medium	 ">
                {show?.vote_average ? show?.vote_average : 0} Average Votes
              </div>
              <div className="popularity text-xs font-medium">
                {show?.release_date
                  ? show?.release_date
                  : show?.first_air_date
                  ? show.first_air_date
                  : show?.last_air_date}
              </div>
            </div>
            <div className="banner-play flex gap-1">
              <div
                onClick={() => {
                  if (show) {
                    setOpen(true);
                    setShow(show);
                  }
                }}
                className="play-btn cursor-pointer text-[11px] flex flex-nowrap pt-1 pb-1 ps-3 pe-3 gap-1 justify-center items-center font-bold  mt-2 text-black bg-transparent text-white rounded-[3px] border-[1px] border-solid border-[var(--border-btn)] hover:bg-[var(--border-btn)]"
              >
                <FaInfoCircle className="text-[12px] "></FaInfoCircle>
                More Info
              </div>
            </div>
            <div className="movie-title text-xs text-justify ">
              {show?.overview}
            </div>
          </div>
        </div>

        <div className="season-container flex flex-col items-center justify-center mt-5">
          <div className="season-box w-[50vw] relative">
            <div
              onClick={() => setMenuOpen(!menuOpen)}
              className="menu-btn min-w-[90px] w-auto cursor-pointer text-xs flex flex-nowrap justify-center items-center gap-1 font-bold border-[1px] border-solid p-2 "
            >
              {menuOpen ? <BsFillCaretUpFill /> : <BsFillCaretDownFill />}
              Season {menuSeason}
            </div>
            {menuOpen && (
              <div className="season-list  absolute z-[10] flex flex-col w-full bg-[var(--background)] cursor-pointer text-xs  flex-nowrap justify-center gap-1 font-bold border-[1px] border-solid ">
                {Array.from(seasons.values())
                  .sort((a, b) => a.season_number - b.season_number)
                  .map((season, a) =>
                    season.episodes.length == 0 || !season.air_date ? (
                      <></>
                    ) : (
                      <div
                        onClick={() => setMenuSeason(season.season_number)}
                        className={twMerge(
                          "p-2",
                          menuSeason == season.season_number &&
                            "bg-[var(--netflix-font-red)]"
                        )}
                        key={a}
                      >
                        Season {season.season_number}
                      </div>
                    )
                  )}
              </div>
            )}
          </div>
          <div className="episode-list min-w-[60vw] w-[65vw]  mt-5  ">
            {seasons.get(menuSeason)?.episodes.map((episode, a) => (
              <Link
                href={`/tvshow/${show?.id}/${episode.season_number}/${episode.episode_number}`}
                key={a}
                className={twMerge(
                  "w-full grid grid-cols-7 cursor-pointer h-[14vh] justify-center items-center hover:bg-[black]",
                  episode.episode_number == menuEP &&
                    parsedSeason == episode.season_number
                    ? "border-[1px] border-white bg-black"
                    : ""
                )}
              >
                <div className="ep-thumbnail  col-span-2  flex flex-col flex-nowrap font-bold  ">
                  <div className="image-container w-full  h-[10vh] flex gap-2 justify-center relative ps-2 pe-2 overflow-hidden">
                    <div className="number flex h-full  ">
                      {episode.episode_number}
                    </div>
                    <img
                      style={{
                        objectFit: "cover",
                        boxShadow: "19px 11px 15px -3px rgba(0,0,0,41%)",
                      }}
                      src={`https://image.tmdb.org/t/p/original/${episode.still_path}`}
                      width={100}
                      height={100}
                      alt=""
                      className="hover:scale-110 transition-transform duration-300 ease-in-out transform  cursor-pointer"
                    />
                  </div>
                </div>
                <div className="episode-info col-span-5 flex flex-col p-3 ">
                  <div className="flex justify-between">
                    <div className="eps-name text-xs truncate">
                      {episode.name}
                    </div>
                    <div className="ms-2"></div>
                    <div className="eps-duration text-xs">
                      {episode.runtime} min
                    </div>
                  </div>
                  <div className="eps-desc text-xs two-line-ellipsis w-[90%] mt-2">
                    {episode.overview}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
        {open && <MovieTrailerModal></MovieTrailerModal>}
      </>
    );
}

export default Page;
