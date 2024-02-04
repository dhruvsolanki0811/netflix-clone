"use client";
import SearchGrid from "@/components/SearchGrid";
import { useSearchStore } from "@/store/searchstore";
import React from "react";
import { FaGoogle } from "react-icons/fa";
import { signIn } from "next-auth/react"

function Page() {
  const { query } = useSearchStore();
  if (query.length > 0) {
    return <SearchGrid></SearchGrid>;
  }
  return (
    <>
      <div className="main-container w-full h-[90vh] flex justify-center items-center">
        <div className="sigin-btn-container  rounded-[4px] flex flex-col justify-center items-center gap-10 bg-[#1F1F1F] p-10">
          <div className="signin-header font-semibold ">Signin</div>
          <div onClick={()=>signIn("google")}className="btn flex flex-row justify-center items-center gap-2  text-white font-semibold rounded-[4px] bg-[var(--netflix-font-red)] pt-1 pb-1 ps-2 pe-2 cursor-pointer hover:bg-[#c61414]">
            <FaGoogle />
            Google
          </div>
        </div>
      </div>
    </>
  );
}

export default Page;
