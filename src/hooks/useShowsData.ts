import { Show } from "@/types/type";
import axios from "axios";
import { useQuery } from "react-query";

const fetchTrendingShows = async () => {
    try {
      const response = await axios.get(
        `https://api.themoviedb.org/3/trending/tv/day`,
        {
          headers: {
            Authorization: `Bearer ${process.env.NEXT_PUBLIC_ACCESS_TOKEN_TMDB}`,
          },
        }
      );
  
      const trendingShows: Show[] = response.data.results;
      trendingShows.map(a=>a.media_type='tv')
      return trendingShows;
    } catch (error) {
      throw new Error("Failed to fetch trending movies");
    }
  };
  
  export const usefetchTrendingShows = () => {
    return useQuery("Trending shows", fetchTrendingShows);
  };
  
  

  const fetchTopRatedShows = async () => {
    try {
      const response = await axios.get(
        `https://api.themoviedb.org/3/tv/top_rated`,
        {
          headers: {
            Authorization: `Bearer ${process.env.NEXT_PUBLIC_ACCESS_TOKEN_TMDB}`,
          },
        }
      );
  
      const toprated: Show[] = response.data.results.map((movie: Show) => ({
        ...movie,
        media_type: "tv", // Adding the media_type property
      }));
      return toprated;
    } catch (error) {
      throw new Error("Failed to fetch trending movies");
    }
  };
  
  export const useFetchTopRatedShows = () => {
    return useQuery("Toprated shows", fetchTopRatedShows);
  };
  

  const fetchShowByGenreId = async ({queryKey}:any) => {
    const genreId = queryKey[2]
    try {
      const response = await axios.get(
        `https://api.themoviedb.org/3/discover/tv?with_genres=${genreId}`,
        {
          headers: {
            Authorization: `Bearer ${process.env.NEXT_PUBLIC_ACCESS_TOKEN_TMDB}`,
          },
        }
      );
      const listOfshows: Show[] = response.data.results.map((show: Show) => ({
        ...show,
        media_type: "tv", // Adding the media_type property
      }));
      return listOfshows;
    } catch (error) {
      throw new Error("Failed to fetch trending movies");
    }
  };
  
  export const useFetchShowByGenre = (genre:string,genreId:number) => {
    return useQuery(["Show",genre ,genreId], fetchShowByGenreId);
  };


  const fetchPopularShows = async () => {
    try {
      const response = await axios.get(
        `https://api.themoviedb.org/3/tv/popular`,
        {
          headers: {
            Authorization: `Bearer ${process.env.NEXT_PUBLIC_ACCESS_TOKEN_TMDB}`,
          },
        }
      );
  
      const popularShows: Show[] = response.data.results;
      popularShows.map(a=>a.media_type='tv')
      return popularShows;
    } catch (error) {
      throw new Error("Failed to fetch trending movies");
    }
  };
  
  export const usefetchPopularShows = () => {
    return useQuery("Popular shows", fetchPopularShows);
  };
  
  