import React, { useEffect, useState } from 'react'
import { CFormInput, CModal, CModalBody, CModalHeader, CModalTitle } from '@coreui/react'
import { toast } from 'react-toastify'
import { extractTextAndImage, searchNostrProfile } from '../../../utils/function'

const AddNostrUserOnChat = () => {
  const [visible, setVisible] = useState(false)
  const [nPubKey, setNPubKey] = useState('')
  const [result, setresult] = useState(null)
  const [searchStatus, setSearchStatus] = useState(0)

  useEffect(() => {
    console.log(result)
  }, [result])

  function isValidNostrPublicKey() {
    if (nPubKey.startsWith('npub') && nPubKey.length === 63) {
      searchNostrProfile(nPubKey, setresult, setSearchStatus)
    } else {
      toast.error('Invalid Key Standard !! ')
    }
  }

  return (
    <>
      <h5
        onClick={() => setVisible(!visible)}
        className="font-weight-bold mb-3 text-center text-lg-start btn btn_success"
      >
        + Nostr Member
      </h5>

      <CModal
        backdrop="static"
        visible={visible}
        onClose={() => {
          setVisible(false)
          setVisible(false)
          setNPubKey('')
          setSearchStatus(0)
        }}
      >
        <CModalBody>
          {searchStatus == 0 ? (
            <>
              <CModalTitle>Enter Nostr Public Key </CModalTitle>
              <CFormInput
                placeholder="Enter Nostr NPub Key "
                className="mb-2"
                onChange={(e) => {
                  setNPubKey(e.target.value)
                }}
              />
            </>
          ) : (
            ''
          )}
          <div className="mb-4 ">
            {nPubKey ? (
              <>
                {searchStatus == 0 ? (
                  <button className="btn btn_success" onClick={() => isValidNostrPublicKey()}>
                    Search On Nostr
                  </button>
                ) : searchStatus == 1 ? (
                  <>
                    <h4>Searching...</h4>
                    <hr />
                    <button className="btn btn_success">Please Wait Searching ...</button>
                  </>
                ) : searchStatus == 2 ? (
                  <>
                    {result ? (
                      <div>
                        <div style={{ textAlign: 'center' }}>
                          <h6>User Finded !</h6>
                          {JSON.parse(result.content).picture ? (
                            <img
                              style={{
                                borderRadius: '12px',
                                maxWidth: '150px',
                                maxHeight: '150px',
                              }}
                              src={JSON.parse(result.content).picture}
                            />
                          ) : (
                            ''
                          )}
                          {JSON.parse(result.content).name ? (
                            <p> {JSON.parse(result.content).name} </p>
                          ) : (
                            ''
                          )}
                        </div>
                        <button
                          className="btn btn_primary mr-3 "
                          onClick={() => {
                            setVisible(false)
                            setVisible(false)
                            setNPubKey('')
                            setSearchStatus(0)
                          }}
                        >
                          Cancel
                        </button>
                        <button className="btn btn_success"> Start Conversation </button>
                      </div>
                    ) : (
                      ''
                    )}
                  </>
                ) : (
                  <button className="btn btn_success" onClick={() => isValidNostrPublicKey()}>
                    Search On Nostr
                  </button>
                )}
              </>
            ) : (
              ''
            )}
          </div>
        </CModalBody>
      </CModal>
    </>
  )
}

export default AddNostrUserOnChat
