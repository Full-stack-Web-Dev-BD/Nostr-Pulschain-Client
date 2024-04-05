import { RelayPool } from 'nostr'
import axios from 'axios'
import jwt from 'jwt-encode'
import * as nip19 from 'nostr-tools/nip19'
import { toast } from 'react-toastify'
import { RELAY_URL, UPLOAD_API_KEY } from './constant'
import { Relay, SimplePool, finalizeEvent } from 'nostr-tools'
import { ADD_NEW_NOTE } from '../store/actions/actionType'

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

export const createNote = async (userState, text, notePicture, setLoading, dispatch) => {
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

    dispatch({
      type: ADD_NEW_NOTE,
      payload: {
        note: signedEvent,
      },
    })
  } catch (error) {
    toast.error(error)
    console.log(error)
  }
  setLoading(false)
}

export const searchNostrContent = async (userState, text, setLoading, dispatch) => {
  setLoading(true)
  try {
    let storeEvents=[]
    const pool = RelayPool([RELAY_URL])
    
    
    // start storeEvents
    pool.on('open', (relay) => {
      relay.subscribe('subid', { limit: 10, kinds: [1], '#t': ['btc'] })
    })

    pool.on('eose', (relay) => {
      console.log('closed', storeEvents)
      relay.close()
    })

    pool.on('event', (relay, sub_id, ev) => {
      storeEvents.push(ev)
    }) 

  } catch (error) {
    toast.error(error)
    console.log(error)
  }
  setLoading(false)
}

export function extractTextAndImage(post) {
  // Regular expression pattern to match text and image link
  var pattern = /(.*?)\s*(https?:\/\/\S+\.(?:jpg|png|gif|jpeg)|null)\s*/

  // Execute the regular expression on the post
  var matches = post.match(pattern)

  if (matches) {
    // Extract text and image link from the first match
    var text = matches[1].trim()
    var imageLink = matches[2]

    // Return as an object
    return { text: text, img: imageLink !== 'null' ? imageLink : null }
  } else {
    // If no matches found, return only the text
    return { text: post.trim(), img: null }
  }
}
