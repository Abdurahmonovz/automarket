import React, { useEffect } from 'react'
import { Navigate } from 'react-router-dom'
import Layout from '../components/layout/Layout'
import useMe from '../features/auth/hooks/useMe'
import Spinner from '../components/ui/Spinner'
import { useUser } from '../context/UserContext'
import { ConfigProvider, theme } from 'antd'
import { useTheme } from '../context/ThemeContext'
import { DEV_BYPASS_USER, DISABLE_AUTH } from '../config/auth'

export default function ProtectRoutes() {
  const { user, isLoading } = useMe(!DISABLE_AUTH)
  const { theme: t } = useTheme()
  const { setUser } = useUser()
  useEffect(() => {
    if (DISABLE_AUTH) {
      setUser(DEV_BYPASS_USER)
      return
    }

    if (user) {
      setUser(user)
    }
  }, [user, setUser])

  if (!DISABLE_AUTH && isLoading) return <Spinner />

  if (!DISABLE_AUTH && !user && !isLoading) return <Navigate to={"/login"} replace />


  return <ConfigProvider
    theme={{
      algorithm: t == "dark" ? theme.darkAlgorithm : theme.defaultAlgorithm,
    }}
  >
    <Layout />
  </ConfigProvider>
}
