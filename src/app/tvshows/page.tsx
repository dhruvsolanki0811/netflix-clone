"use client";

import React from 'react'
import ShowsContainer from '@/components/ShowsContainer'
import { useFetchShowByGenre, useFetchTopRatedShows, useFetchTrendingShows } from '@/hooks/useShowsData';
import {CategorizedShows} from '@/types/type'
function Page() {
  const { data: trendingShows } = useFetchTrendingShows();
  const {data:topratedShows} =useFetchTopRatedShows()
  const { data: comedyShows } = useFetchShowByGenre("Comedy",35);
  const { data: aaShows } = useFetchShowByGenre("Action & Adventure",10759);
  const { data: documentaryShows } = useFetchShowByGenre("Documentary Shows",99);
  const { data: animatedShows } = useFetchShowByGenre("Animations Shows",16);
  const { data: crimeShows } = useFetchShowByGenre("Crime Shows",80);

  const allShowsByCategory: CategorizedShows[] = [ 
    {
      title: "Trending Shows",
      shows: trendingShows || []
    },
    {
      title: "Toprated Shows",
      shows: topratedShows || []
    },
    {
      title: "Comedy Shows",
      shows: comedyShows || []
    },
    {
      title: "Action & Adventures Shows",
      shows: aaShows || []
    },
    {
      title: "Documentary Shows",
      shows: documentaryShows || []
    },
    {
      title: "Animated Shows",
      shows: animatedShows || []
    },
    {
      title: "Crime Shows",
      shows: crimeShows || []
    },

  ]
  
    return (
    <>
      <ShowsContainer categorizedShows={allShowsByCategory}></ShowsContainer>
    </>
  )
}

export default Page