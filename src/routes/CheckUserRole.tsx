import React, { type ReactNode } from 'react'
import { Navigate } from 'react-router-dom'
import { useUser } from '../context/UserContext'
import Spinner from '../components/ui/Spinner'

export default function CheckUserRole({children,roles}:{children:ReactNode,roles:string[]}) {
    const {user} = useUser()
    if(!user) return <Spinner/>
  return (
   <>
    {roles?.some(item=>item==user?.role)?children:<Navigate to="/404" replace/>}
   </>
  )
}
