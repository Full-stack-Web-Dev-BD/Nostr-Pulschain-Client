import nacl from 'tweetnacl'
import { RelayPool } from 'nostr'
import axios from 'axios'
import jwt from 'jwt-encode'
import { nip19, nip04 } from 'nostr-tools'
import { toast } from 'react-toastify'
import { RELAY_URL, UPLOAD_API_KEY } from './constant'
import { Relay, SimplePool, finalizeEvent } from 'nostr-tools'
import {
  ADD_NEW_NOTE,
  RESET_SEARCH_EVENTS,
  SEARCH_EVENTS,
  SET_LOADING,
  SET_P2P_CONVERSATION,
  SET_USER_CONVERSATION_LIST,
  SET_USER_PROFILE_EVENT,
  STOCK_EVENTS,
} from '../store/actions/actionType'
import moment from 'moment'
import { bech32 } from 'bech32'

const stockLimit = 50
const searchLimit = 30

export const npub2hexa = (npub) => {
  let { prefix, words } = bech32.decode(npub, 90)
  if (prefix === 'npub') {
    let data = new Uint8Array(bech32.fromWords(words))
    return buffer.Buffer.from(data).toString('hex')
  }
}
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

export const searchNostrContent = async (text, setLoading, dispatch) => {
  setLoading(true)
  try {
    dispatch({
      type: SET_LOADING,
      payload: {
        searchLoading: true,
      },
    })

    dispatch({
      type: RESET_SEARCH_EVENTS,
      payload: {},
    })
    const searchPool = RelayPool([RELAY_URL])
    searchPool.on('open', (relay) => {
      relay.subscribe('searchedNote', { limit: searchLimit, kinds: [1], '#t': [`${text}`] })
    })

    searchPool.on('eose', (relay) => {
      dispatch({
        type: SET_LOADING,
        payload: {
          searchLoading: false,
        },
      })
      console.log('Searching Done ')
      relay.close()
    })

    searchPool.on('event', (relay, sub_id, searchedNote) => {
      // fetch profile of each note
      try {
        const searchPool = RelayPool([RELAY_URL])
        searchPool.on('open', (relay) => {
          relay.subscribe('searchedNoteProfile', {
            limit: 1,
            kinds: [0],
            authors: [searchedNote.pubkey], // it working  with event  default pubkey
          })
        })
        searchPool.on('event', (relay, sub_id, searchedNoteProfile) => {
          dispatch({
            type: SEARCH_EVENTS,
            payload: {
              event: {
                ...searchedNote,
                user: searchedNoteProfile,
              },
            },
          })
        })
      } catch (error) {
        toast.error(error)
        console.log(error)
      }
    })
  } catch (error) {
    toast.error(error)
    console.log(error)
  }
  setLoading(false)
}
const findTagValue = (ev, tag) => {
  return ev.tags.find(([t]) => t === tag)?.[1]
}
// Search user profile all events  ( For our plateform user profile)
export const searchNostrUserProfileEvents = async (pubkey, dispatch) => {
  try {
    const hexaPubKey = npub2hexa(pubkey)
    const searchPool = RelayPool([RELAY_URL])
    searchPool.on('open', (relay) => {
      relay.subscribe('profileEvent', {
        limit: 5,
        kinds: [0, 1],
        authors: [hexaPubKey],
      })
    })
    searchPool.on('event', (relay, sub_id, profileEvent) => {
      dispatch({
        type: SET_USER_PROFILE_EVENT,
        payload: {
          event: profileEvent,
        },
      })
    })
  } catch (error) {
    toast.error(error)
    console.log(error)
  }
}

// Search Nostr profile while start a  new conversation
export const searchNostrProfile = async (pubkey, setResult, setSearchStatus) => {
  try {
    var profileData
    setSearchStatus(1)
    console.log('searchig... ')
    const hexaPubKey = npub2hexa(pubkey)
    const searchPool = RelayPool([RELAY_URL])
    console.log('init done ')
    searchPool.on('open', (relay) => {
      console.log('opening')
      relay.subscribe('searchNostrProfileData', {
        limit: 1,
        kinds: [0],
        authors: [hexaPubKey],
      })
    })
    searchPool.on('eose', (relay) => {
      console.log('Searching Done ', profileData)
      setSearchStatus(2)
      if (profileData) {
        console.log(profileData)
        setResult(profileData)
      }
      relay.close()
    })
    searchPool.on('event', (relay, sub_id, searchNostrProfileData) => {
      console.log('get event')
      profileData = searchNostrProfileData
    })
  } catch (error) {
    toast.error(error.message ? error.message : error)
    setSearchStatus(2)

    console.log(error, error.message)
  }
}

const nSecToHexString = (nsec) => {
  const { type, data } = nip19.decode(nsec)
  const hexString = Array.from(data)
    .map((byte) => ('00' + byte.toString(16)).slice(-2))
    .join('')
  return hexString
}
// Search Nostr profile while start a  new conversation
export const searchUserConversations = async (nsec, pubkey, dispatch) => {
  dispatch({
    type: SET_LOADING,
    payload: {
      conversationLoading: true,
    },
  })
  const hexaPubKey = npub2hexa(pubkey)
  let messagesByUser = {} // Object to store messages by user peer ID
  let myAllConversation = []

  const searchPool = RelayPool([RELAY_URL])
  searchPool.on('open', (relay) => {
    relay.subscribe('searchUserConversation', {
      kinds: [4],
      authors: [hexaPubKey],
    })
  })

  searchPool.on('eose', (relay) => {
    console.log('Messages by user:', messagesByUser)
    relay.close()
  })

  searchPool.on('event', (relay, sub_id, event) => {
    const peer = findTagValue(event, 'p')
    const privateKey = nSecToHexString(nsec)

    // const peerMessages = messagesByUser[peer] || []; // Array to store messages for this peer

    const searchPool = RelayPool([RELAY_URL])
    searchPool.on('open', (relay) => {
      relay.subscribe('searchmessagesender', {
        limit: 1,
        kinds: [0],
        authors: [peer],
      })
    })

    searchPool.on('eose', (relay) => {
      dispatch({
        type: SET_USER_CONVERSATION_LIST,
        payload: {
          conversationList: messagesByUser,
          myAllConversation:myAllConversation
        },
      })
      dispatch({
        type: SET_LOADING,
        payload: {
          conversationLoading: false,
        },
      })
      relay.close()
    })

    searchPool.on('event', (relay, sub_id, searchmessagesender) => {
      const user = JSON.parse(searchmessagesender.content)
      nip04.decrypt(privateKey, peer, event.content).then((content) => {
        console.log("my pub key ", npub2hexa(pubkey))
        myAllConversation.push({
          message: content,
          ...event,
          receiver:searchmessagesender,
        })
        messagesByUser[peer] = {
          message: content,
          sender: event.pubkey,
          ...user,
        }
      })
    })
  })
}

export const searchP2PConversations = async (nsec, pubkey, recPubKey, dispatch) => {
  // dispatch({
  //   type: SET_LOADING,
  //   payload: {
  //     p2pCNV:true
  //   },
  // })
  const hexaPubKey = npub2hexa(pubkey)
  console.log('searching ... ', pubkey, hexaPubKey)

  const messagesByUser = {} // Object to store messages by user peer ID
  const searchPool = RelayPool([RELAY_URL])
  searchPool.on('open', (relay) => {
    relay.subscribe('searchUserConversation', {
      kinds: [4],
      // hexaPubKey ,
      authors: [recPubKey],
      // '#t': [`${hexaPubKey}`]
    })
  })

  searchPool.on('eose', (relay) => {
    console.log('Messages by user:', messagesByUser)
    relay.close()
  })

  searchPool.on('event', (relay, sub_id, event) => {
    console.log('cnv', event)
    // const peer = findTagValue(event, 'p');
    // const privateKey = nSecToHexString(nsec);

    // // const peerMessages = messagesByUser[peer] || []; // Array to store messages for this peer

    // const searchPool = RelayPool([RELAY_URL]);
    // searchPool.on('open', (relay) => {
    //   relay.subscribe('searchmessagesender', {
    //     limit: 1,
    //     kinds: [0],
    //     authors: [peer, recPubKey],
    //   });
    // });

    // searchPool.on('eose', (relay) => {
    //   dispatch({
    //     type: SET_P2P_CONVERSATION,
    //     payload: {
    //       conversationList:messagesByUser
    //     },
    //   })
    //   dispatch({
    //     type: SET_LOADING,
    //     payload: {
    //       p2pCNV:true
    //     },
    //   })
    //   relay.close();
    // });

    // searchPool.on('event', (relay, sub_id, searchmessagesender) => {
    //   const user = JSON.parse(searchmessagesender.content);
    //   nip04.decrypt(privateKey, peer, event.content).then((content) => {
    //     messagesByUser[peer]={
    //       message:content,
    //       ...user
    //     }
    //   });
    // });
  })
}
// fetch initial  notes for nome page
export const getStockNostrContent = async (dispatch) => {
  try {
    dispatch({
      type: SET_LOADING,
      payload: {
        stockLoading: true,
      },
    })
    const pool = RelayPool([RELAY_URL])
    pool.on('open', (relay) => {
      relay.subscribe('nostrNote', { limit: stockLimit, kinds: [1] })
    })

    pool.on('eose', (relay) => {
      dispatch({
        type: SET_LOADING,
        payload: {
          stockLoading: false,
        },
      })
      // console.log('Stock Ended')
      relay.close()
    })

    pool.on('event', (relay, sub_id, eventNote) => {
      // search nested user
      try {
        const pool = RelayPool([RELAY_URL])
        pool.on('open', (relay) => {
          relay.subscribe('nostrNoteProfile', {
            limit: 1,
            kinds: [0],
            authors: [eventNote.pubkey], // it working  with event  default pubkey
          })
        })
        pool.on('event', (relay, sub_id, eventProfileNote) => {
          dispatch({
            type: STOCK_EVENTS,
            payload: {
              event: {
                ...eventNote,
                user: eventProfileNote,
              },
            },
          })
        })
      } catch (error) {
        toast.error(error)
        console.log(error)
      }
    })
  } catch (error) {
    toast.error(error)
    console.log(error)
  }
}

// extract data ( image and  text from a post note)
export function extractTextAndImage(content) {
  // Regular expression pattern to match text and image link
  var pattern = /(.*?)\s*(https?:\/\/\S+\.(?:jpg|png|gif|jpeg)|null)\s*/

  // Execute the regular expression on the content
  var matches = content.match(pattern)

  if (matches) {
    // Extract text and image link from the first match
    var text = matches[1].trim()
    var imageLink = matches[2]

    // Return as an object
    return { text: text, img: imageLink !== 'null' ? imageLink : null }
  } else {
    // If no matches found, return only the text
    return { text: content.trim(), img: null }
  }
}
export const formatTime = (timestamp) => {
  const currentTime = moment()
  const postTime = moment.unix(timestamp)

  const diffMinutes = currentTime.diff(postTime, 'minutes')
  const diffHours = currentTime.diff(postTime, 'hours')
  const diffDays = currentTime.diff(postTime, 'days')
  const diffWeeks = currentTime.diff(postTime, 'weeks')
  const diffMonths = currentTime.diff(postTime, 'months')

  if (diffMinutes < 1) {
    return 'Just Now'
  } else if (diffMinutes < 5) {
    return `${diffMinutes} Minutes Ago`
  } else if (diffMinutes < 10) {
    return '5 Minutes Ago'
  } else if (diffMinutes < 15) {
    return '10 Minutes Ago'
  } else if (diffMinutes < 30) {
    return '15 Minutes Ago'
  } else if (diffMinutes < 60) {
    return '30 Minutes Ago'
  } else if (diffHours < 2) {
    return '1 Hour Ago'
  } else if (diffHours < 3) {
    return '2 Hours Ago'
  } else if (diffHours < 4) {
    return '3 Hours Ago'
  } else if (diffHours < 6) {
    return '6 Hours Ago'
  } else if (diffHours < 12) {
    return '12 Hours Ago'
  } else if (diffDays < 2) {
    return '1 Day Ago'
  } else if (diffDays < 3) {
    return '2 Days Ago'
  } else if (diffDays < 4) {
    return '3 Days Ago'
  } else if (diffWeeks < 2) {
    return '1 Week Ago'
  } else if (diffWeeks < 3) {
    return '2 Weeks Ago'
  } else if (diffMonths < 2) {
    return '1 Month Ago'
  } else {
    // Customize this part if you want to handle older timestamps differently
    return 'More than 1 Month Ago'
  }
}
