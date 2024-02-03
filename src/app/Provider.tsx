'use client'
import Navbar from '@/components/Navbar';
import React from 'react'
import { QueryClientProvider, QueryClient } from "react-query";

const queryClient = new QueryClient()

function Provider({children}:{children:React.ReactNode}) {

  return (
    <>
    <QueryClientProvider client={queryClient}>
    <Navbar></Navbar>
    {children}
    </QueryClientProvider>
    </>
  )
}

export default Provider