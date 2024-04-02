import React, { useEffect, useState } from 'react'
import { cilCloudUpload, cilCopy } from '@coreui/icons'
import CIcon from '@coreui/icons-react'
import { CFormInput, CFormLabel } from '@coreui/react'
import { jwtDecode } from 'jwt-decode'
import Web3 from 'web3'
import CopyToClipboard from 'react-copy-to-clipboard'
import { toast } from 'react-toastify'
import QRCode from 'react-qr-code'
import { entropyToMnemonic, mnemonicToEntropy } from 'bip39'

const Profile = () => {
  const [isShowKeys, setisShowKeys] = useState(false)
  const [userInfo, setUserInfo] = useState({})
  const [privateKeys, setPrivateKeys] = useState({})
  const [balance, setBalance] = useState('0.00000 PLS')
  const web3 = new Web3('wss://pulsechain-rpc.publicnode.com')

  useEffect(() => {
    // Set token and extract keys ( Nostr Private key )
    const token = localStorage.getItem('token')
    if (token) {
      const decoded = jwtDecode(token)
      setUserInfo(decoded)
      generateWeb3Key(decoded)
    }
  }, [])

  // Convert user Wei balance to PLS token
  function weiToPLS(balanceWei) {
    const balancePLS = web3.utils.fromWei(balanceWei, 'ether')
    return parseFloat(balancePLS).toFixed(4) + ' PLS'
  }
  // Initialize  web3 key pair from the nostr private key and set balance ( PLS )
  const generateWeb3Key = async (userInfo) => {
    if (userInfo.nsec) {
      const wsec = web3.utils.sha3(userInfo.nsec)
      const web3Profile = web3.eth.accounts.privateKeyToAccount(wsec, [])
      setUserInfo({ ...userInfo, wpub: web3Profile.address })
      setPrivateKeys({ ...privateKeys, wsec, nsec: userInfo.nsec })
      const balance = weiToPLS(await web3.eth.getBalance(web3Profile.address))
      setBalance(balance)
    }
  }

  // Shorten the  full address to short  dotted address
  function shortenString(fullString) {
    if (fullString) {
      if (fullString.length <= 6) {
        return fullString // If the string is 6 characters or less, return it as it is
      }

      const firstChars = fullString.slice(0, 15)
      const lastChars = fullString.slice(-15)

      return `${firstChars}...${lastChars}`
    } else return ''
  }

  return (
    <div>
      <div className="col-12 col-md-8 offset-md-2">
        <div className="profile_cover_wrap">
          <div className="profile_cover_photo">
            <button className="btn btn_cp_upload">
              <CIcon icon={cilCloudUpload} size="lg" />
              <span>Upload</span>
            </button>
            <h3 className="mt-5">
              Your Balance : <span>{balance}</span>
            </h3>

            <div className="profile_main_photo"></div>
          </div>
        </div>
        <div className="ca mb-4">
          <div className="row">
            <div className="col-sm-11 ms-auto">
              <form>
                <div className="mb-3">
                  <CFormLabel htmlFor="exampleFormControlInput1">Name</CFormLabel>
                  <CFormInput type="text" placeholder={userInfo.name} />
                </div>
              </form>
              <div>
                {/* Public Key */}
                <div>
                  <h3 className="mt-5">Public Keys</h3>
                  <hr />
                  <div className="web3pub_qr_code text-center mt-4 mb-4">
                    {userInfo.wpub ? (
                      <div className="qr_wrap">
                        <QRCode
                          size={256}
                          style={{ height: 'auto', maxWidth: '300px', width: '300px' }}
                          value={userInfo.wpub}
                          viewBox={`0 0 256 256`}
                        />
                      </div>
                    ) : (
                      ''
                    )}
                    <p className="mt-2"> Your Web3 Wallet </p>
                  </div>
                  <div className="mb-3 color_keys">
                    <CFormLabel htmlFor="exampleFormControlInput1">Nostr Public Key</CFormLabel>
                    <p>
                      <strong>{shortenString(userInfo.npub)}</strong>
                      <CopyToClipboard text={userInfo.npub}>
                        <span onClick={(e) => toast('Copied To Clipboard!')}>
                          <CIcon icon={cilCopy} size="lg" />
                        </span>
                      </CopyToClipboard>
                    </p>
                  </div>
                  <div className="mb-3 color_keys">
                    <CFormLabel htmlFor="exampleFormControlInput1">Web3 Public Key</CFormLabel>
                    <p>
                      <strong> {shortenString(userInfo.wpub)} </strong>
                      <CopyToClipboard text={userInfo.wpub}>
                        <span onClick={(e) => toast('Copied To Clipboard!')}>
                          <CIcon icon={cilCopy} size="lg" />
                        </span>
                      </CopyToClipboard>
                    </p>
                  </div>
                </div>
                {/* Private Key */}
                <div>
                  <h3 className="mt-5">Private Keys</h3>
                  <hr />
                  <button className="btn btn_success" onClick={(e) => setisShowKeys(!isShowKeys)}>
                    {isShowKeys ? <span>Hide private key</span> : <span>Reveal private key</span>}
                  </button>
                  {isShowKeys ? (
                    <div>
                      <div className="mb-3 color_keys">
                        <CFormLabel htmlFor="exampleFormControlInput1">
                          Nostr Private Key
                        </CFormLabel>
                        <p>
                          <strong>{shortenString(privateKeys.nsec)}</strong>
                          <CopyToClipboard text={userInfo.nsec}>
                            <span onClick={(e) => toast('Copied To Clipboard!')}>
                              <CIcon icon={cilCopy} size="lg" />
                            </span>
                          </CopyToClipboard>
                        </p>
                      </div>
                      <div className="mb-3 color_keys">
                        <CFormLabel htmlFor="exampleFormControlInput1">Web3 Private Key</CFormLabel>
                        <p>
                          <strong>{shortenString(privateKeys.wsec)}</strong>
                          <CopyToClipboard text={userInfo.wsec}>
                            <span onClick={(e) => toast('Copied To Clipboard!')}>
                              <CIcon icon={cilCopy} size="lg" />
                            </span>
                          </CopyToClipboard>
                        </p>
                      </div>
                      <div></div>
                    </div>
                  ) : (
                    <div>
                      <div className="mb-3 color_keys">
                        <CFormLabel htmlFor="exampleFormControlInput1">
                          Nostr Private Key
                        </CFormLabel>
                        <p>
                          <strong className="password_line">
                            {shortenString(privateKeys.nsec)}
                          </strong>
                        </p>
                      </div>
                      <div className="mb-3 color_keys">
                        <CFormLabel htmlFor="exampleFormControlInput1">Web3 Private Key</CFormLabel>
                        <p>
                          <strong className="password_line">
                            {shortenString(privateKeys.wsec)}
                          </strong>
                        </p>
                      </div>
                      <div></div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Profile
