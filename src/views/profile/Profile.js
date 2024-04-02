import React, { useEffect, useState } from 'react'
import {  cilCloudUpload, cilCopy, } from '@coreui/icons'
import CIcon from '@coreui/icons-react'
import { CFormInput, CFormLabel } from '@coreui/react'
import { jwtDecode } from 'jwt-decode'




const Profile = () => {
  const [isShowKeys, setisShowKeys] = useState(false)


  const [userInfo, setUserInfo] = useState({})
  const [keyPair, setKeyPair] = useState({})
  

  useEffect(() => {
    const token = localStorage.getItem('token'); // Assuming you store your token in localStorage
    if (token) {
      const decoded = jwtDecode(token)
      setUserInfo(decoded);
      console.log("userinfo", decoded)
    }
  }, []);
  return (
    <div>
      <div className="col-12 col-md-8 offset-md-2">
        <div className="profile_cover_wrap">
          <div className="profile_cover_photo">
            <button className="btn btn_cp_upload">
              <CIcon icon={cilCloudUpload} size="lg" />
              <span>Upload</span>
            </button>
            <div className="profile_main_photo"></div>
          </div>
        </div>
        <div className="ca mb-4">
          <div className="row">
            <div className="col-sm-11 ms-auto">
              <form>
                <div className="mb-3">
                  <CFormLabel htmlFor="exampleFormControlInput1">Name</CFormLabel>
                  <CFormInput type="text" placeholder="Name" value="Alamin" />
                </div>
              </form>
              <div>
                {/* Public Key */}
                <div>
                  <h3 className="mt-5">Public Keys</h3>
                  <hr />
                  <div className='web3pub_qr_code text-center mt-4 mb-4'>
                    <img src='/img/qr.png' />
                    <p className='mt-2'> Your Web3 Wallet  </p>
                  </div>
                  <div className="mb-3 color_keys">
                    <CFormLabel htmlFor="exampleFormControlInput1">Nostr Public Key</CFormLabel>
                    <p>
                      <strong>
                        npub1dar6k7fzqmc3cx75ac8j00z9vp67ljyjh726wlget3dm8z9en2vs9494cp
                      </strong>
                      <span>
                        <CIcon icon={cilCopy} size="lg" />
                      </span>
                    </p>
                  </div>
                  <div className="mb-3 color_keys">
                    <CFormLabel htmlFor="exampleFormControlInput1">Web3 Public Key</CFormLabel>
                    <p>
                      <strong> 0xCF3b9Bf1A60aeC3381f30d4877E4D615cC29C01E</strong>
                      <span>
                        <CIcon icon={cilCopy} size="lg" />
                      </span>
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
                          <strong>
                            npub1dar6k7fzqmc3cx75ac8j00z9vp67ljyjh726wlget3dm8z9en2vs9494cp
                          </strong>
                          <span>
                            <CIcon icon={cilCopy} size="lg" />
                          </span>
                        </p>
                      </div>
                      <div className="mb-3 color_keys">
                        <CFormLabel htmlFor="exampleFormControlInput1">Web3 Private Key</CFormLabel>
                        <p>
                          <strong>
                            npub1dar6k7fzqmc3cx75ac8j00z9vp67ljyjh726wlget3dm8z9en2vs9494cp
                          </strong>
                          <span>
                            <CIcon icon={cilCopy} size="lg" />
                          </span>
                        </p>
                      </div>
                      <div>
                        
                        </div>
                    </div>
                  ) : (
                    ''
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
