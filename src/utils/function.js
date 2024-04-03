import axios from 'axios'
import jwt from 'jwt-encode'
import * as nip19 from 'nostr-tools/nip19'
import { toast } from 'react-toastify'
import { RELAY_URL, UPLOAD_API_KEY } from './constant'
import { Relay, finalizeEvent } from 'nostr-tools'
import { queryProfile } from 'nostr-tools/nip05'

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

export const nsecToSK = (nsec) => {
  let { type, data } = nip19.decode(nsec)
  return data
}

export const fileUpload = (event, setFile, setLoading) => {
  const formData = new FormData()
  formData.append('image', event.target.files[0])
  setLoading(true)

  axios
    .post(`https://api.imgbb.com/1/upload?key=${UPLOAD_API_KEY}`, formData)
    .then((response) => {
      if (response.data) {
        setFile(response.data.data.url)
      }
    })
    .catch((error) => {
      toast.error('Error on Processing Image .')
      console.error('Upload failed:', error)
    })
    .finally(() => {
      setLoading(false)
    })
}

export const createNote = async (userState, text, notePicture, setLoading) => {
  setLoading(true)
  try {
    const { nsec, npub } = userState
    const noteObj = {
      content: `
      ${text}
      ${notePicture}
    `,
    }
    const relay = await Relay.connect(RELAY_URL)
    relay.subscribe(
      [
        {
          kinds: [1],
          authors: [npub],
        },
      ],
      {
        onevent(event) {
          console.log('got event:', event)
        },
      },
    )
 
    let eventTemplate = {
      kind: 1,
      created_at: Math.floor(Date.now() / 1000),
      tags: [],
      content: noteObj.content,
    }
    const signedEvent = finalizeEvent(eventTemplate, nsecToSK(nsec))
    await relay.publish(signedEvent)
    relay.close()
    toast('Note Created!')
  } catch (error) {
    toast.error(error)
    console.log(error)
  }
  setLoading(false)
}



export const fetchProfile = async (userState) => {
  try {
    const { nsec, npub } = userState 
    const relay = await Relay.connect(RELAY_URL)
    relay.subscribe(
      [
        {
          kinds: [1],
          authors: [npub],
        },
      ],
      {
        onevent(event) {
          console.log('got event:', event)
        },
      },
    )
    let profile = await queryProfile("jb55.com")
    console.log("nostr profile data "  , profile)
  } catch (error) {
    toast.error(error)
    console.log(error)
  }
}
