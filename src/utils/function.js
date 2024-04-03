import jwt from 'jwt-encode'
import * as nip19 from 'nostr-tools/nip19'
import { toast } from 'react-toastify'

export const logoutAccount = () => {
  localStorage.removeItem('token')
  toast('Logout success !')
  setTimeout(() => {
    window.location.href = '/#/login'
  }, 1000)
}
export function shortenString(fullString) {
  if (fullString) {
    if (fullString.length <= 6) {
      return fullString // If the string is 6 characters or less, return it as it is
    }

    const firstChars = fullString.slice(0, 15)
    const lastChars = fullString.slice(-15)

    return `${firstChars}...${lastChars}`
  } else return ''
}



export const updateToken = (userInfo) => {
  const secret = 'Iheakaram '
  const token = jwt(userInfo, secret)
  localStorage.setItem('token', token) 
}

export const nsecToSK= (nsec)=>{
  let { type, data } = nip19.decode(nsec)
  return data
}