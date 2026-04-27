import { Navigate, Outlet } from 'react-router-dom'
import { useSession } from '../context/SessionContext'
import { DISABLE_AUTH } from '../config/auth'

export default function AuthRoutes() {
  const {isAuth,loading} = useSession()
  if (DISABLE_AUTH) return <Navigate to="/" replace />
  if(loading) return null
  return isAuth?<Navigate to="/" replace/>:<Outlet/>
}
