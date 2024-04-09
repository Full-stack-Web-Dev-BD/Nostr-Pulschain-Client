import React, { Suspense, useEffect } from 'react'
import { HashRouter, Route, Routes } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { useColorModes } from '@coreui/react'
import { ToastContainer } from 'react-toastify'
import {nip19} from 'nostr-tools'
// CSS
import './scss/style.scss'
import 'react-toastify/dist/ReactToastify.css'

// Pages
const DefaultLayout = React.lazy(() => import('./layout/DefaultLayout'))
const Login = React.lazy(() => import('./views/pages/login/Login'))
const Register = React.lazy(() => import('./views/pages/register/Register'))
const Page404 = React.lazy(() => import('./views/pages/page404/Page404'))
const Page500 = React.lazy(() => import('./views/pages/page500/Page500'))
const Loading = React.lazy(() => import('./views/pages/Loading/Loading'))

const App = () => {
  const { isColorModeSet, setColorMode } = useColorModes('coreui-free-react-admin-template-theme')
  const storedTheme = useSelector((state) => state.theme)

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.href.split('?')[1])
    const theme = urlParams.get('theme') && urlParams.get('theme').match(/^[A-Za-z0-9\s]+/)[0]
    if (theme) {
      setColorMode('dark')
    }

    if (isColorModeSet()) {
      return
    }

    setColorMode('dark')
  }, [])

  return (
    
    <HashRouter>
      {
                console.log(nip19.decode('nsec14t2z000qyjudnuaapvyjz4d7cc9txgu7wvyjplzdmfd3zr8eahmqrf2g0p'))
      }
      <ToastContainer position="bottom-right" style={{ textTransform: 'capitalize' }} />
      <Suspense fallback={<Loading />}>
        <Routes>
          <Route exact path="/login" name="Login Page" element={<Login />} />
          <Route exact path="/register" name="Register Page" element={<Register />} />
          <Route exact path="/404" name="Page 404" element={<Page404 />} />
          <Route exact path="/500" name="Page 500" element={<Page500 />} />
          <Route path="*" name="Home" element={<DefaultLayout />} />
        </Routes>
      </Suspense>
    </HashRouter>
  )
}

export default App
