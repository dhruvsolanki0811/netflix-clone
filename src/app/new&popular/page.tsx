'use client'
import React from 'react'
import ShowsContainer from '@/components/ShowsContainer'
import { useFetchNewMovies, usefetchPopularMovies } from '@/hooks/useMoviesData'
import { CategorizedShows } from '@/types/type'
import { usefetchPopularShows } from '@/hooks/useShowsData'
import { shuffle } from '@/utils/utils'

function page() {
  const {data:popMovies}=usefetchPopularMovies()
  const {data:popShows}=usefetchPopularShows()
  const allcategoryshows:CategorizedShows[]=[
    
    {
      title:"Popular Movies",
      shows:popMovies||[]
    },
    {
      title:"Popular Shows",
      shows:popShows||[]
    },
  ]
  return (
    <>
     <ShowsContainer categorizedShows={allcategoryshows}></ShowsContainer>

    </>
  )
}

export default page