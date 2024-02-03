'use client'
import React, { useEffect } from 'react'
import ReactPlayer from 'react-player'

function ShowPlayer({imdb,season,episode}:{imdb:string|number,season:string|number,episode:string|number}) {
       
      
  return (
    <>
    <div className="w-full   bg-black flex justify-center ">
    <div
        className="player-wrapper  w-[70vw] h-[60vh]"
      >
       <iframe src={`https://vidsrc.xyz/embed/tv/${imdb}/${season}-${episode}`} allowFullScreen className=' w-full h-full' ></iframe>
      </div>
      </div>
    </>
  )
}

export default ShowPlayer