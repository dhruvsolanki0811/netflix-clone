'use client'
import { useSession } from 'next-auth/react'
import { redirect } from 'next/navigation'
import { useEffect } from 'react'

export const WithoutAuth = (Component: any) => {
  return function WithoutAuth(props: any) {
    const { data: session, status } = useSession()
    const userEmail = session?.user?.email

    useEffect(() => {
      
      if (status=='authenticated') {
        redirect('/')
      }
      
    }, [status])
    return <Component {...props} />
  }
}