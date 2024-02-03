import { Season,Show } from "@/types/type";
import axios from "axios";
import { useQuery } from "react-query";

const fetchSingleShow = async ({queryKey}:any) => {
    const id=queryKey[1]
    try {
      const response = await axios.get(
        `https://api.themoviedb.org/3/tv/${id}`,
        {
          headers: {
            Authorization: `Bearer ${process.env.NEXT_PUBLIC_ACCESS_TOKEN_TMDB}`,
          },
        }
      );
  
      const show: Show = response.data;
      show.media_type="tv"
      return show;
    } catch (error) {
      throw new Error("Failed to fetch trending movies");
    }
  };
  
  export const useFetchSingleShow = (id:number|string) => {
        return useQuery(['Single Show',id], fetchSingleShow);
  };



  export const fetchSeasonsDetails = async (showId:number|string,seasonId:number|string) => {
    // const showId=queryKey[1]
    // const seasonId=queryKey[2]
    try {
      const response = await axios.get(
        `https://api.themoviedb.org/3/tv/${showId}/season/${seasonId}`,
        {
          headers: {
            Authorization: `Bearer ${process.env.NEXT_PUBLIC_ACCESS_TOKEN_TMDB}`,
          },
        }
      );
  
    //   const season: Season = response.data;
      return response.data;
    } catch (error) {
      throw new Error("Failed to fetch Season");
    }
  };
  
//   export const useFetchSeasonsDetails = (showId:number|string,SeasonId:number|string) => {
//         return useQuery(['Shows Seasons',showId,SeasonId], fetchSeasonsDetails);
//   };
