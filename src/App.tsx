
import { Route, Routes } from 'react-router-dom'
import ProtectRoutes from './routes/ProtectRoutes'
import AuthRoutes from './routes/AuthRoutes'
import { authRoutes, privateRoutes } from './utils/navigate'
import React, { Suspense } from 'react'
import CheckUserRole from './routes/CheckUserRole'
import Notfound from './features/404/pages/Notfound'
import Spinner from './components/ui/Spinner'

export default function App() {
  return (
    <Suspense fallback={<Spinner />} >
      <Routes>
        <Route element={<ProtectRoutes />} >
          {privateRoutes.map(item => <Route path={item?.path} element={<CheckUserRole roles={item.roles}>{React.createElement(item?.component)}</CheckUserRole>} />)}
        </Route>
        <Route element={<AuthRoutes />} >
          {authRoutes.map(item => <Route path={item?.path} element={React.createElement(item?.component)} />)}
        </Route>

        <Route path='/404' element={<Notfound />} />
        <Route path='*' element={<Notfound />} />
      </Routes>
    </Suspense>

  )
}
