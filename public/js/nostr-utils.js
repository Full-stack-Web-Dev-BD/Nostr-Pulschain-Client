// fetch events from relay, returns a promise
const fetchFromRelay = async (relay, filter, events) =>
  new Promise((resolve, reject) => {
    try {
      // prevent hanging forever
      setTimeout(() => reject('timeout'), 20_000)
      // open websocket
      const ws = new WebSocket(relay)
      // subscription id
      const subsId = 'my-sub'
      // subscribe to events filtered by author
      ws.onopen = () => {
        ws.send(JSON.stringify(['REQ', subsId, filter]))
      }

      // Listen for messages
      ws.onmessage = (event) => {
        const [msgType, subscriptionId, data] = JSON.parse(event.data)
        // event messages
        if (msgType === 'EVENT' && subscriptionId === subsId) {
          const { id } = data
          // prevent duplicated events
          if (events[id]) return
          else events[id] = data
          // show how many events were found until this moment
          $('#events-found').text(`${Object.keys(events).length} events found`)
        }
        // end of subscription messages
        if (msgType === 'EOSE' && subscriptionId === subsId) resolve()
      }
      ws.onerror = (err) => reject(err)
    } catch (exception) {
      reject(exception)
    }
  })
// decode nip19 ('npub') to hex
const npub2hexa = (npub) => {
  let { prefix, words } = bech32.bech32.decode(npub, 90)
  if (prefix === 'npub') {
    let data = new Uint8Array(bech32.bech32.fromWords(words))
    return buffer.Buffer.from(data).toString('hex')
  }
}

// parse inserted pubkey
const parsePubkey = (pubkey) => (pubkey.match('npub1') ? npub2hexa(pubkey) : pubkey)

const getEvents = async (pubKey, length) => {
  console.log('Before process notr utils ', pubKey)
  const processedPubKey = parsePubkey(pubKey)
  let filter
  if (length) {
    filter = { authors: [processedPubKey], limit: 1, kind: [0] }
  } else [(filter = { authors: [processedPubKey] })]
  // } else [(filter = { authors: [processedPubKey], kinds: [0] })] // including the kinds
  // events hash
  const events = {}
  await Promise.allSettled(relays.map((relay) => fetchFromRelay(relay, filter, events)))
  return Object.keys(events).map((id) => events[id])
}

const fetchNostrUserProfileEvents = async (pubKey) => {
  if (!pubKey) return []
  const data = await getEvents(pubKey)
  console.log('events html ', data)
  return data
}
window.parsePubkey = parsePubkey
window.fetchNostrUserProfileEvents = fetchNostrUserProfileEvents