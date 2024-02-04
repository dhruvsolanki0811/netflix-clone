"use client";
import Navbar from "@/components/Navbar";
import React from "react";
import { QueryClientProvider, QueryClient } from "react-query";
import { SessionProvider } from "next-auth/react";

const queryClient = new QueryClient();

function Provider({ children }: { children: React.ReactNode }) {
  return (
    <>
      <SessionProvider>
        <QueryClientProvider client={queryClient}>
          <Navbar></Navbar>
          {children}
        </QueryClientProvider>
      </SessionProvider>
    </>
  );
}

export default Provider;
