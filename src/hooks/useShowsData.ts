import { Show } from '@/types/type';
import axios from 'axios';
import { useQuery } from 'react-query';

export const useFetchTrendingShows = () => {
  const fetchTrendingShows = async () => {
    try {
      const response = await axios.get(`https://api.themoviedb.org/3/trending/tv/day`, {
        headers: {
          Authorization: `Bearer ${process.env.NEXT_PUBLIC_ACCESS_TOKEN_TMDB}`,
        },
      });

      const trendingShows: Show[] = response.data.results;
      trendingShows.forEach(show => (show.media_type = 'tv'));
      return trendingShows;
    } catch (error) {
      throw new Error('Failed to fetch trending movies');
    }
  };

  return useQuery('Trending shows', fetchTrendingShows);
};

export const useFetchTopRatedShows = () => {
  const fetchTopRatedShows = async () => {
    try {
      const response = await axios.get(`https://api.themoviedb.org/3/tv/top_rated`, {
        headers: {
          Authorization: `Bearer ${process.env.NEXT_PUBLIC_ACCESS_TOKEN_TMDB}`,
        },
      });

      const topRatedShows: Show[] = response.data.results.map((show: Show) => ({
        ...show,
        media_type: 'tv',
      }));
      return topRatedShows;
    } catch (error) {
      throw new Error('Failed to fetch top rated shows');
    }
  };

  return useQuery('Toprated shows', fetchTopRatedShows);
};

export const useFetchShowByGenre = (genre: string, genreId: number) => {
  const fetchShowByGenreId = async ({ queryKey }: any) => {
    const genreId = queryKey[2];
    try {
      const response = await axios.get(
        `https://api.themoviedb.org/3/discover/tv?with_genres=${genreId}`,
        {
          headers: {
            Authorization: `Bearer ${process.env.NEXT_PUBLIC_ACCESS_TOKEN_TMDB}`,
          },
        }
      );
      const listOfShows: Show[] = response.data.results.map((show: Show) => ({
        ...show,
        media_type: 'tv',
      }));
      return listOfShows;
    } catch (error) {
      throw new Error('Failed to fetch shows by genre');
    }
  };

  return useQuery(['Show', genre, genreId], fetchShowByGenreId);
};

export const useFetchPopularShows = () => {
  const fetchPopularShows = async () => {
    try {
      const response = await axios.get(`https://api.themoviedb.org/3/tv/popular`, {
        headers: {
          Authorization: `Bearer ${process.env.NEXT_PUBLIC_ACCESS_TOKEN_TMDB}`,
        },
      });

      const popularShows: Show[] = response.data.results;
      popularShows.forEach(show => (show.media_type = 'tv'));
      return popularShows;
    } catch (error) {
      throw new Error('Failed to fetch popular shows');
    }
  };

  return useQuery('Popular shows', fetchPopularShows);
};
