import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import {
  CButton,
  CCard,
  CCardBody,
  CCardGroup,
  CCol,
  CContainer,
  CForm,
  CFormInput,
  CInputGroup,
  CInputGroupText,
  CRow,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilUser } from '@coreui/icons'

// Nostr
import { SimplePool } from 'nostr-tools'
import { Relay } from 'nostr-tools/relay'
import { finalizeEvent, generateSecretKey, getPublicKey } from 'nostr-tools/pure'
import * as nip19 from 'nostr-tools/nip19'

export const RELAYS = ['wss://relay.damus.io']

const Register = () => {
  const [name, setName] = useState('')

  const [pool, setPool] = useState()

  useEffect(() => {
    const _pool = new SimplePool()
    setPool(_pool)

    return () => {
      _pool.close(RELAYS)
    }
  }, [])

  const registerNostr = async () => {
    let sk = generateSecretKey()
    let nsec = nip19.nsecEncode(sk)
    console.log('Secret Key', nsec)
    let pk = getPublicKey(sk)
    let npub = nip19.npubEncode(pk)
    console.log('Public Key', npub)

    const relay = await Relay.connect('wss://relay.damus.io')
    console.log(`connected to ${relay.url}`)
    let eventTemplate = {
      kind: 0,
      created_at: Math.floor(Date.now() / 1000),
      tags: [],
      content: `{"name":"Alamin"}`,
    }

    // this assigns the pubkey, calculates the event id and signs the event in a single step
    const signedEvent = finalizeEvent(eventTemplate, sk)
    const response = await relay.publish(signedEvent)
    console.log('response', response)
    relay.close()
  }
  return (
    <div className="bg-body-tertiary min-vh-100 d-flex flex-row align-items-center">
      <CContainer>
        <CRow className="justify-content-center">
          <CCol md={8}>
            <CCardGroup>
              <CCard className="p-4">
                <CCardBody>
                  <CForm className="pt-4">
                    <h1>Signup</h1>
                    <p className="text-body-secondary">What should we call you?</p>
                    <CInputGroup className="mb-3">
                      <CInputGroupText>
                        <CIcon icon={cilUser} />
                      </CInputGroupText>
                      <CFormInput
                        placeholder="Your Name"
                        onChange={(e) => setName(e.target.value)}
                        autoComplete="Name"
                      />
                    </CInputGroup>
                    <CRow>
                      <CCol xs={6}>
                        <button
                          className="btn btn-primary px-4 btn_primary"
                          type="button"
                          onClick={(e) => registerNostr()}
                        >
                          Create
                        </button>
                      </CCol>
                    </CRow>
                  </CForm>
                </CCardBody>
              </CCard>
              <CCard className="text-white bg-primary py-5" style={{ width: '44%' }}>
                <CCardBody className="text-center">
                  <div>
                    <h2>Login</h2>
                    <p>Already have an account?</p>
                    <Link to="/login">
                      <button className="btn btn-primary px-4 btn_success" type="button">
                        Create
                      </button>
                    </Link>
                  </div>
                </CCardBody>
              </CCard>
            </CCardGroup>
          </CCol>
        </CRow>
      </CContainer>
    </div>
  )
}

export default Register
