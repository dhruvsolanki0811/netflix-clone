import React from 'react'
import Navbar from '@/components/Navbar'
import { FaGoogle } from "react-icons/fa";

function page() {
  return (
    <>
    <Navbar></Navbar>
    <div className="h-[90vh] w-full flex justify-center items-center">
        <div className="sigin-btn-container  rounded-[4px] flex flex-col justify-center items-center gap-10 bg-[#1F1F1F] p-10">
            <div className="signin-header font-semibold ">Signin</div>
            <div className="btn flex flex-row justify-center items-center gap-2  text-white font-semibold rounded-[4px] bg-[var(--netflix-font-red)] pt-1 pb-1 ps-2 pe-2 cursor-pointer hover:bg-[#c61414]">
            <FaGoogle/>
            Google
            </div>
        </div>
    </div>

    </>
  )
}

export default page