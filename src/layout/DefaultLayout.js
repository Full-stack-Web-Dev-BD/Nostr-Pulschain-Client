import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { AppContent, AppSidebar, AppFooter, AppHeader } from '../components/index'
import Loading from '../views/pages/Loading/Loading'
import NotAuthenticated from '../views/pages/NotAuthenticated/NotAuthenticated'
import Web3 from 'web3'
import { jwtDecode } from 'jwt-decode'
import { SET_USER_PROFILE } from '../store/actions/actionType'
import { RPC_URL } from '../utils/constant'

const DefaultLayout = () => {
  const [isLoading, setIsLoading] = useState(true)
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const { userState } = useSelector((state) => state)
  const dispatch = useDispatch()

  useEffect(() => {
    const checkAuth = () => {
      if (localStorage.getItem('token')) {
        setIsAuthenticated(true)
        setIsLoading(false)
      } else {
        setIsAuthenticated(false)
        setIsLoading(false)
      }
    }

    setTimeout(() => {
      checkAuth()
    }, 2000)

    checkAuth()
  }, [])

  const web3 = new Web3(RPC_URL)
  // set user token info
  useEffect(() => {
    const init = async () => {
      const token = localStorage.getItem('token')
      if (token) {
        const decoded = jwtDecode(token)
        const data = await window.fetchAndBroadcast()

        dispatch({
          type: SET_USER_PROFILE,
          payload: {
            userState: {
              ...decoded,
              userEvents: data,
            },
          },
        })
        generateWeb3Key(decoded)
      }
    }
    init()
  }, [dispatch])

  function weiToPLS(balanceWei) {
    const balancePLS = web3.utils.fromWei(balanceWei, 'ether')
    return parseFloat(balancePLS).toFixed(4) + ' PLS'
  }

  const generateWeb3Key = async (userInfo) => {
    if (userInfo.nsec) {
      const wsec = web3.utils.sha3(userInfo.nsec)
      const web3Profile = web3.eth.accounts.privateKeyToAccount(wsec, [])
      const balance = weiToPLS(await web3.eth.getBalance(web3Profile.address))
      dispatch({
        type: SET_USER_PROFILE,
        payload: { userState: { ...userInfo, wpub: web3Profile.address, wsec, balance } },
      })
    }
  }

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
            <NotAuthenticated />
          )}
        </>
      )}
    </div>
  )
}

export default DefaultLayout
