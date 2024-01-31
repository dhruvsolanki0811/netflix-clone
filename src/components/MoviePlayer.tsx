'use client'
import React, { useEffect } from 'react'
import ReactPlayer from 'react-player'

function MoviePlayer() {
       
      
  return (
    <>
    <div className="w-full   bg-black flex justify-center ">
    <div
        className="player-wrapper  w-[70vw] h-[60vh]"
      >
        {/* <div className="bg-white w-full h-full"></div> */}
       <iframe src={`https://vidsrc.xyz/embed/movie/tt8108198`} allowFullScreen className=' w-full h-full' ></iframe>
      </div>
      </div>
    </>
  )
}

export default MoviePlayer