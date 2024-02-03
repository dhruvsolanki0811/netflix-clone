'use client'
import React from 'react'
import ShowsContainer from '@/components/ShowsContainer'
import { useFetchNewMovies, useFetchPopularMovies } from '@/hooks/useMoviesData'
import { CategorizedShows } from '@/types/type'
import { useFetchPopularShows } from '@/hooks/useShowsData'
import { shuffle } from '@/utils/utils'

function Page() {
  const {data:popMovies}=useFetchPopularMovies()
  const {data:popShows}=useFetchPopularShows()
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

export default Page