import React, { useEffect, useState } from 'react'
import { cilCloudUpload, cilCopy } from '@coreui/icons'
import CIcon from '@coreui/icons-react'
import { CFormInput, CFormLabel, CFormTextarea } from '@coreui/react'
import CopyToClipboard from 'react-copy-to-clipboard'
import { toast } from 'react-toastify'
import QRCode from 'react-qr-code'
import { useSelector } from 'react-redux'
import { fileUpload, nsecToSK, shortenString, updateToken } from '../../utils/function'
import { Relay, SimplePool, finalizeEvent } from 'nostr-tools'
import { RELAY_URL, UPLOAD_API_KEY } from '../../utils/constant'
import axios from 'axios'

const Profile = () => {
  const [isShowKeys, setIsShowKeys] = useState(false)
  const { userState } = useSelector((state) => state)

  const [name, setName] = useState(userState.name)
  const [about, setAbout] = useState(userState.about)
  const [picture, setPicture] = useState(userState.picture)

  const [profileUpdateInPending, setProfileUpdateInPending] = useState(false)
  const [pictureUploadPending, setPictureUploadPending] = useState(null)

  const updateProfile = async () => {
    try {
      setProfileUpdateInPending(true)
      const { nsec, npub } = userState
      const userObj = { name, about, picture }
      const relay = await Relay.connect(RELAY_URL)
      relay.subscribe(
        [
          {
            kinds: [0],
            authors: [npub],
          },
        ],
        {
          onevent(event) {
            console.log('got event:', event)
          },
        },
      )

      const eventObject = {
        ...userObj,
      }
      const eventJson = JSON.stringify(eventObject)
      let eventTemplate = {
        kind: 0,
        created_at: Math.floor(Date.now() / 1000),
        tags: [],
        content: eventJson,
      }
      const signedEvent = finalizeEvent(eventTemplate, nsecToSK(nsec))
      await relay.publish(signedEvent)
      relay.close()
      updateToken({ name, about, picture, npub, nsec })
      toast('Profile update Request submitted !')
    } catch (error) {
      toast.error(error)
      console.log(error)
    }
    setProfileUpdateInPending(false)
  }

  return (
    <div>
      <div className="col-12 col-md-8 offset-md-2">
        <div className="profile_cover_wrap">
          <div className="profile_cover_photo">
            {pictureUploadPending ? (
              <button className="btn btn_cp_upload">
                <CIcon icon={cilCloudUpload} size="lg" />
                <span>Processing ...</span>
              </button>
            ) : (
              <button
                onClick={(e) => document.getElementById('upload_nostr_picture').click()}
                className="btn btn_cp_upload"
              >
                <input
                  type="file"
                  onChange={(e) => fileUpload(e, setPicture, setPictureUploadPending)}
                  accept="image/*"
                  style={{ display: 'none' }}
                  id="upload_nostr_picture"
                />
                <CIcon icon={cilCloudUpload} size="lg" />
                <span>Upload</span>
              </button>
            )}
            <h3 className="mt-5" onClick={(e) => console.log(picture)}>
              Your Balance : <span className="">{userState.balance}</span>
            </h3>

            <div
              className="profile_main_photo"
              style={{
                backgroundImage: `url(${picture ? picture : '/src/assets/images/avatars/8.jpg'})`,
              }}
            ></div>
          </div>
        </div>
        <div className="ca mb-4">
          <div className="row">
            <div className="col-sm-11 ms-auto">
              <div>
                <div className="mb-3">
                  <CFormLabel htmlFor="exampleFormControlInput1">Name</CFormLabel>
                  <CFormInput
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder={name ? name : 'Your Name'}
                  />
                </div>

                <div className="mb-3">
                  <CFormLabel htmlFor="exampleFormControlInput1">About</CFormLabel>
                  <CFormTextarea
                    rows={3}
                    onChange={(e) => setAbout(e.target.value)}
                    type="text"
                    value={about}
                    placeholder={about ? about : 'About You '}
                  />
                </div>
                <div className="text-right">
                  {profileUpdateInPending ? (
                    <button className="btn btn_primary mt-4 ml-auto">Request Sending</button>
                  ) : (
                    <button
                      className="btn btn_success mt-4 ml-auto"
                      onClick={(e) => updateProfile()}
                    >
                      Update Profile
                    </button>
                  )}
                </div>
              </div>
              <div>
                {/* Public Key */}
                <div>
                  <h3 className="mt-5">Public Keys</h3>
                  <hr />
                  <div className="web3pub_qr_code text-center mt-4 mb-4">
                    {userState.wpub ? (
                      <div className="qr_wrap">
                        <QRCode
                          size={256}
                          style={{ height: 'auto', maxWidth: '300px', width: '300px' }}
                          value={userState.wpub}
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
                      <strong>{shortenString(userState.npub)}</strong>
                      <CopyToClipboard text={userState.npub}>
                        <span onClick={(e) => toast('Copied To Clipboard!')}>
                          <CIcon icon={cilCopy} size="lg" />
                        </span>
                      </CopyToClipboard>
                    </p>
                  </div>
                  <div className="mb-3 color_keys">
                    <CFormLabel htmlFor="exampleFormControlInput1">Web3 Public Key</CFormLabel>
                    <p>
                      <strong> {shortenString(userState.wpub)} </strong>
                      <CopyToClipboard text={userState.wpub}>
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
                  {isShowKeys ? (
                    <div>
                      <div className="mb-3 color_keys">
                        <CFormLabel htmlFor="exampleFormControlInput1">
                          Nostr Private Key
                        </CFormLabel>
                        <p>
                          <strong>{shortenString(userState.nsec)}</strong>
                          <CopyToClipboard text={userState.nsec}>
                            <span onClick={(e) => toast('Copied To Clipboard!')}>
                              <CIcon icon={cilCopy} size="lg" />
                            </span>
                          </CopyToClipboard>
                        </p>
                      </div>
                      <div className="mb-3 color_keys">
                        <CFormLabel htmlFor="exampleFormControlInput1">Web3 Private Key</CFormLabel>
                        <p>
                          <strong>{shortenString(userState.wsec)}</strong>
                          <CopyToClipboard text={userState.wsec}>
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
                          <strong className="password_line">{shortenString(userState.nsec)}</strong>
                        </p>
                      </div>
                      <div className="mb-3 color_keys">
                        <CFormLabel htmlFor="exampleFormControlInput1">Web3 Private Key</CFormLabel>
                        <p>
                          <strong className="password_line">{shortenString(userState.wsec)}</strong>
                        </p>
                      </div>
                      <div></div>
                    </div>
                  )}

                  <button
                    className="btn btn_success mt-4"
                    onClick={(e) => setIsShowKeys(!isShowKeys)}
                  >
                    {isShowKeys ? <span>Hide private key</span> : <span>Reveal private key</span>}
                  </button>
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
