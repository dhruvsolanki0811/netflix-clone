import { Show } from "@/types/type";
import axios from "axios";
import { useQuery } from "react-query";

const fetchSingleMovie = async ({queryKey}:any) => {
    const id =queryKey[1]
    try {
      const response = await axios.get(
        `https://api.themoviedb.org/3/movie/${id}`,
        {
          headers: {
            Authorization: `Bearer ${process.env.NEXT_PUBLIC_ACCESS_TOKEN_TMDB}`,
          },
        }
      );
  
      const movie: Show = response.data;
      movie.media_type="movie"
      return movie;
    } catch (error) {
      throw new Error("Failed to fetch trending movies");
    }
  };
  
  export const useFetchSingleMovie = (id:number|string) => {
        return useQuery(['Single movie',id], fetchSingleMovie);
  };