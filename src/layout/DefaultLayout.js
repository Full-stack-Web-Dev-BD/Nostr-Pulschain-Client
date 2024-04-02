import React, { useEffect, useState } from 'react'
import { AppContent, AppSidebar, AppFooter, AppHeader } from '../components/index'
import Loading from '../views/pages/Loading/Loading'
import NotAuthenticated from '../views/pages/NotAuthenticated/NotAuthenticated'

const DefaultLayout = () => {
  const [isLoading, setIsLoading] = useState(true)
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  useEffect(() => {
    const checkAuth = () => {
      if (localStorage.getItem('token')) {
        setIsAuthenticated(true)
        setIsLoading(false)
      } else {
        setIsAuthenticated(false)
        setIsLoading(false) // Set isLoading to false when authentication fails
      }
    }

    setTimeout(() => {
      checkAuth()
    }, 2000)

    // Call checkAuth immediately
    checkAuth()
  }, [])

  return (
    <div>
      {isLoading ? (
        <Loading />
      ) : (
        <>
          {isAuthenticated ? (
            <>
              <AppSidebar />
              <div className="wrapper d-flex flex-column min-vh-100">
                <AppHeader />
                <div className="body flex-grow-1">
                  <AppContent />
                </div>
                <AppFooter />
              </div>
            </>
          ) : (
            <NotAuthenticated/>
          )}
        </>
      )}
    </div>
  )
}

export default DefaultLayout
