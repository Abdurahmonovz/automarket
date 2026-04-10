import React, { type ReactNode } from 'react'
import { Navigate } from 'react-router-dom'
import Layout from '../components/layout/Layout'
// import { useSession } from '../context/SessionContext'
import useMe from '../features/auth/hooks/useMe'
import Spinner from '../components/ui/Spinner'
import { useUser } from '../context/UserContext'

export default function ProtectRoutes() {
  const { user, isLoading } = useMe()
  const {setUser} = useUser()
  if (isLoading) return <Spinner />

  if (!user && !isLoading) return <Navigate to={"/login"} replace />
   
  if(user&&!isLoading){
    setUser(user)
  }

  return <Layout />
}
