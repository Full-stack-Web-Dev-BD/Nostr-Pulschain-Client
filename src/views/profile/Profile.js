import React, { useState } from 'react'
import { cilCloudUpload, cilCopy } from '@coreui/icons'
import CIcon from '@coreui/icons-react'
import { CFormInput, CFormLabel } from '@coreui/react' 
import CopyToClipboard from 'react-copy-to-clipboard'
import { toast } from 'react-toastify'
import QRCode from 'react-qr-code' 
import { useSelector } from 'react-redux'
import { shortenString } from '../../utils/function'


const Profile = () => {
  const [isShowKeys, setIsShowKeys] = useState(false)
  const {user} = useSelector((state) => state) 

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
              Your Balance : <span>{user.balance}</span>
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
                  <CFormInput type="text" placeholder={user.name} />
                </div>
              </form>
              <div>
                {/* Public Key */}
                <div>
                  <h3 className="mt-5">Public Keys</h3>
                  <hr />
                  <div className="web3pub_qr_code text-center mt-4 mb-4">
                    {user.wpub ? (
                      <div className="qr_wrap">
                        <QRCode
                          size={256}
                          style={{ height: 'auto', maxWidth: '300px', width: '300px' }}
                          value={user.wpub}
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
                      <strong>{shortenString(user.npub)}</strong>
                      <CopyToClipboard text={user.npub}>
                        <span onClick={(e) => toast('Copied To Clipboard!')}>
                          <CIcon icon={cilCopy} size="lg" />
                        </span>
                      </CopyToClipboard>
                    </p>
                  </div>
                  <div className="mb-3 color_keys">
                    <CFormLabel htmlFor="exampleFormControlInput1">Web3 Public Key</CFormLabel>
                    <p>
                      <strong> {shortenString(user.wpub)} </strong>
                      <CopyToClipboard text={user.wpub}>
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
                  <button className="btn btn_success" onClick={(e) => setIsShowKeys(!isShowKeys)}>
                    {isShowKeys ? <span>Hide private key</span> : <span>Reveal private key</span>}
                  </button>
                  {isShowKeys ? (
                    <div>
                      <div className="mb-3 color_keys">
                        <CFormLabel htmlFor="exampleFormControlInput1">
                          Nostr Private Key
                        </CFormLabel>
                        <p>
                          <strong>{shortenString(user.nsec)}</strong>
                          <CopyToClipboard text={user.nsec}>
                            <span onClick={(e) => toast('Copied To Clipboard!')}>
                              <CIcon icon={cilCopy} size="lg" />
                            </span>
                          </CopyToClipboard>
                        </p>
                      </div>
                      <div className="mb-3 color_keys">
                        <CFormLabel htmlFor="exampleFormControlInput1">Web3 Private Key</CFormLabel>
                        <p>
                          <strong>{shortenString(user.wsec)}</strong>
                          <CopyToClipboard text={user.wsec}>
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
                            {shortenString(user.nsec)}
                          </strong>
                        </p>
                      </div>
                      <div className="mb-3 color_keys">
                        <CFormLabel htmlFor="exampleFormControlInput1">Web3 Private Key</CFormLabel>
                        <p>
                          <strong className="password_line">
                            {shortenString(user.wsec)}
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

export default  Profile
