import { useQuery } from "react-query";
import axios from "axios";
import { Show } from "@/types/type";

const fetchTrendingMovies = async () => {
  try {
    const response = await axios.get(
      `https://api.themoviedb.org/3/trending/movie/day`,
      {
        headers: {
          Authorization: `Bearer ${process.env.NEXT_PUBLIC_ACCESS_TOKEN_TMDB}`,
        },
      }
    );

    const trendingMovies: Show[] = response.data.results;
    return trendingMovies;
  } catch (error) {
    throw new Error("Failed to fetch trending movies");
  }
};

export const usefetchTrendingMovies = () => {
  return useQuery("Trending movies", fetchTrendingMovies);
};







const fetchTopRatedMovies = async () => {
    try {
      const response = await axios.get(
        `https://api.themoviedb.org/3/movie/top_rated`,
        {
          headers: {
            Authorization: `Bearer ${process.env.NEXT_PUBLIC_ACCESS_TOKEN_TMDB}`,
          },
        }
      );
  
      const toprated: Show[] = response.data.results.map((movie: Show) => ({
        ...movie,
        media_type: "movie", // Adding the media_type property
      }));

      return toprated;
    } catch (error) {
      throw new Error("Failed to fetch trending movies");
    }
  };
  
  export const useFetchTopRatedMovies = () => {
    return useQuery("Toprated movies", fetchTopRatedMovies);
  };
  


  const fetchMovieByGenreId = async ({queryKey}:any) => {
    const genreId = queryKey[1]
    try {
      const response = await axios.get(
        `https://api.themoviedb.org/3/discover/movie?with_genres=${genreId}`,
        {
          headers: {
            Authorization: `Bearer ${process.env.NEXT_PUBLIC_ACCESS_TOKEN_TMDB}`,
          },
        }
      );
      const listOfMovies: Show[] = response.data.results.map((movie: Show) => ({
        ...movie,
        media_type: "movie", // Adding the media_type property
      }));
      return listOfMovies;
    } catch (error) {
      throw new Error("Failed to fetch trending movies");
    }
  };
  
  export const useFetchMovieByGenre = (genre:string,genreId:number) => {
    return useQuery([genre ,genreId], fetchMovieByGenreId);
  };
  

  const fetchNewMovies = async () => {
    try {
      const response = await axios.get(
        `https://api.themoviedb.org/3/movie/now_playing`,
        {
          headers: {
            Authorization: `Bearer ${process.env.NEXT_PUBLIC_ACCESS_TOKEN_TMDB}`,
          },
        }
      );
  
      const NewMovies: Show[] = response.data.results;
      return NewMovies;
    } catch (error) {
      throw new Error("Failed to fetch trending movies");
    }
  };
  
  export const useFetchNewMovies = () => {
    return useQuery("Newest movies", fetchNewMovies);
  };
  
  
  
  
  const fetchPopularMovies = async () => {
    try {
      const response = await axios.get(
        `https://api.themoviedb.org/3/movie/popular`,
        {
          headers: {
            Authorization: `Bearer ${process.env.NEXT_PUBLIC_ACCESS_TOKEN_TMDB}`,
          },
        }
      );
  
      const popularMovies: Show[] = response.data.results;
      popularMovies.map(a=>a.media_type='movie')
      return popularMovies;
    } catch (error) {
      throw new Error("Failed to fetch trending movies");
    }
  };
  
  export const usefetchPopularMovies = () => {
    return useQuery("Popular Movies", fetchPopularMovies);
  };