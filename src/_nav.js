import React from 'react'
import CIcon from '@coreui/icons-react'
import {
  cil3d,
  cilUserFemale,
  cilSearch,
  cilChatBubble,
  cilInfo,
  cilSettings
} from '@coreui/icons'
import { CNavGroup, CNavItem, CNavTitle } from '@coreui/react'

const _nav = [
  {
    component: CNavItem,
    name: 'Home',
    to: '/home',
    icon: <CIcon icon={cil3d} customClassName="nav-icon" />,
    badge: {
      color: 'info',
    },
  }, 
  {
    component: CNavItem,
    name: 'Message',
    to: '/message',
    icon: <CIcon icon={cilChatBubble} customClassName="nav-icon" />,
    badge: {
      color: 'info',
    },
  },  
  
  {
    component: CNavTitle,
    name: 'Profile',
  },
  {
    component: CNavItem,
    name: 'Profile',
    to: '/profile',
    icon: <CIcon icon={cilUserFemale} customClassName="nav-icon" />,
    badge: {
      color: 'info',
    },
  },
]

export default _nav
