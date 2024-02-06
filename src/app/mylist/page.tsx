'use client'
import React from 'react'
import {ProtectedPage} from '@/components/HOC/WithAuth'
import { useModalStore } from '@/store/modalStore'
import MovieTrailerModal from '@/components/MovieTrailerModal'
import { useFetchFavShows } from '@/hooks/useFavShowsData'
import SearchImageCard from '@/components/SearchImageCard'
import { Show } from '@/types/type'
import FavouriteCard from '@/components/FavouriteCard'
const Page=() =>{
  const {setShow,setOpen,open}=useModalStore()
  const {data:favShows,isLoading}=useFetchFavShows()
  if(isLoading){
    return <></>
  }
  return (
    <>
    {open && <MovieTrailerModal/>}
    <div 
    // onClick={}
    className="search-grid grid grid-cols-5 transitions-all	gap-x-3 gap-y-6 ps-[5rem] pe-[5rem] pt-[1rem]">
         {favShows.map((item:{favoriteShow:Show},i:number)=> <FavouriteCard key={i} show={item.favoriteShow}/>)}
    </div>
    </>
  )
}
export default ProtectedPage(Page)
