import React from 'react'
import {
  CButton,
  CCol,
  CContainer,
  CInputGroup,
  CRow,
} from '@coreui/react'
import { Link } from 'react-router-dom'

const NotAuthenticated = () => {
  return (
    <div className="bg-body-tertiary min-vh-100 d-flex flex-row align-items-center">
      <CContainer>
        <CRow className="justify-content-center">
          <CCol md={6}>
            <span className="clearfix">
              <h1 className="float-start display-3 me-4">401</h1>
              <h4 className="pt-3">Unauthorized Access</h4>
              <p className="text-body-secondary float-start">
                You are not authenticated to access this page. You need to login First !
              </p>
            </span>
            <CInputGroup className="input-prepend"> 
              <Link to={"/login"}>
              <CButton className='btn btn_success' color="info">Login</CButton>
              </Link>
            </CInputGroup>
          </CCol>
        </CRow>
      </CContainer>
    </div>
  )
}

export default NotAuthenticated
