'use client'
import React from 'react'
import ShowsContainer from '@/components/ShowsContainer'
import { useFetchMovieByGenre, useFetchTopRatedMovies, useFetchTrendingMovies } from '@/hooks/useMoviesData';
import { CategorizedShows } from '@/types/type';


function Page() {
  const { data: trendingMovies } = useFetchTrendingMovies();
  const { data: topRatedMovies } = useFetchTopRatedMovies();
  const { data: actionMovies } = useFetchMovieByGenre("Action",28);
  const { data: comedyMovies } = useFetchMovieByGenre("Comedy",35);
  const { data: thrillerMovies } = useFetchMovieByGenre("Thriller",53);
  // const { data: romanceMovies } = useFetchMovieByGenre("Romance",10749);
  // const { data: crimeMovies } = useFetchMovieByGenre("Crime",80);
  const { data: documentaryMovies } = useFetchMovieByGenre("Documentary",99);
  // const { data: horrorMovies } = useFetchMovieByGenre("Horror",27);
  // const { data: animatedMovies } = useFetchMovieByGenre("Animated",16);
  
      const allShowsByCategory: CategorizedShows[] = [
        {
          title: "Trending Movies",
          shows: trendingMovies || []
        },
        {
          title: "Top Rated Movies",
          shows: topRatedMovies || []
        },
        {
          title: "Action Movies",
          shows: actionMovies || []
        },
        {
          title: "Comedy Movies",
          shows: comedyMovies || []
        },
        {
          title: "Thrillers",
          shows: thrillerMovies || []
        },
        {
          title: "Documentaries",
          shows: documentaryMovies || []
        },
        
        
      ];
 

  return (
    <>
      <ShowsContainer categorizedShows={allShowsByCategory} />
    </>
  );
}

export default Page