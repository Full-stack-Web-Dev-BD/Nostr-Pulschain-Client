import React, { useEffect, useState } from 'react'
import AddNostrUserOnChat from '../notifications/modals/AddNostrUserOnChat'
import { useSelector } from 'react-redux'
import { shortenString } from '../../utils/function'

const ChatPage = () => {
  const [chatHistoryWidth, setChatHistoryWidth] = useState('100%')
  const { userState } = useSelector((state) => state)
  const [selectedUser, setselectedUser] = useState(null)

  useEffect(() => {
    const chatHistoryElement = document.getElementById('chat_history')
    if (chatHistoryElement) {
      setChatHistoryWidth(chatHistoryElement.offsetWidth - 38 + 'px')
    }
  }, [])

  const users = [
    { username: 'user1', real_name: 'John Smith' },
    { username: 'user2', real_name: 'Emily Johnson' },
    { username: 'user3', real_name: 'Michael Davis' },
    { username: 'user4', real_name: 'Sarah Lee' },
    { username: 'user1', real_name: 'John Smith' },
    { username: 'user2', real_name: 'Emily Johnson' },
    { username: 'user3', real_name: 'Michael Davis' },
    { username: 'user4', real_name: 'Sarah Lee' },
    { username: 'user5', real_name: 'David Brown' },
    { username: 'user1', real_name: 'John Smith' },
    { username: 'user2', real_name: 'Emily Johnson' },
    { username: 'user3', real_name: 'Michael Davis' },
    { username: 'user4', real_name: 'Sarah Lee' },
    { username: 'user5', real_name: 'David Brown' },
    { username: 'user1', real_name: 'John Smith' },
    { username: 'user2', real_name: 'Emily Johnson' },
    { username: 'user3', real_name: 'Michael Davis' },
    { username: 'user4', real_name: 'Sarah Lee' },
    { username: 'user5', real_name: 'David Brown' },
    { username: 'user1', real_name: 'John Smith' },
    { username: 'user2', real_name: 'Emily Johnson' },
    { username: 'user3', real_name: 'Michael Davis' },
    { username: 'user4', real_name: 'Sarah Lee' },
    { username: 'user5', real_name: 'David Brown' },
    { username: 'user1', real_name: 'John Smith' },
    { username: 'user2', real_name: 'Emily Johnson' },
    { username: 'user3', real_name: 'Michael Davis' },
    { username: 'user4', real_name: 'Sarah Lee' },
    { username: 'user5', real_name: 'David Brown' },
    { username: 'user1', real_name: 'John Smith' },
    { username: 'user2', real_name: 'Emily Johnson' },
    { username: 'user3', real_name: 'Michael Davis' },
    { username: 'user4', real_name: 'Sarah Lee' },
    { username: 'user5', real_name: 'David Brown' },
    { username: 'user1', real_name: 'John Smith' },
    { username: 'user2', real_name: 'Emily Johnson' },
    { username: 'user3', real_name: 'Michael Davis' },
    { username: 'user4', real_name: 'Sarah Lee' },
    { username: 'user5', real_name: 'David Brown' },
    { username: 'user5', real_name: 'David Brown' },
  ]

  const conversation = [
    { sender: 'user1', receiver: 'user2', message: 'Hey, how are you?' },
    { sender: 'user2', receiver: 'user1', message: "Hi! I'm doing well, thanks for asking." },
    { sender: 'user1', receiver: 'user2', message: "That's great to hear!" },
    { sender: 'user2', receiver: 'user1', message: "What about you? How's everything going?" },
    {
      sender: 'user1',
      receiver: 'user2',
      message: "I'm doing alright, just busy with work lately.",
    },
    {
      sender: 'user2',
      receiver: 'user1',
      message: 'I understand. Work can be demanding sometimes.',
    },
    {
      sender: 'user1',
      receiver: 'user2',
      message: "Yeah, definitely. But it's all part of the job, right?",
    },
    { sender: 'user2', receiver: 'user1', message: 'Absolutely. So, any plans for the weekend?' },
    {
      sender: 'user1',
      receiver: 'user2',
      message: 'Not really, just planning to relax at home. How about you?',
    },
    { sender: 'user2', receiver: 'user1', message: "I might go hiking if the weather's good." },
    {
      sender: 'user1',
      receiver: 'user2',
      message: 'Sounds like fun! I hope the weather cooperates for you.',
    },
    { sender: 'user2', receiver: 'user1', message: 'Thanks! Fingers crossed.' },
    { sender: 'user1', receiver: 'user2', message: 'By the way, have you seen the latest movie?' },
    { sender: 'user2', receiver: 'user1', message: 'No, not yet. Is it any good?' },
    { sender: 'user1', receiver: 'user2', message: 'I heard mixed reviews, but I enjoyed it.' },
    { sender: 'user2', receiver: 'user1', message: "Hmm, I'll have to check it out then." },
    { sender: 'user1', receiver: 'user2', message: 'Definitely worth a watch, in my opinion.' },
    { sender: 'user2', receiver: 'user1', message: 'Thanks for the recommendation!' },
    {
      sender: 'user1',
      receiver: 'user2',
      message: 'No problem. Let me know what you think after watching it.',
    },
    { sender: 'user2', receiver: 'user1', message: 'Will do!' },
    {
      sender: 'user1',
      receiver: 'user2',
      message: 'Anyway, got to get back to work now. Talk to you later!',
    },
    { sender: 'user2', receiver: 'user1', message: 'Sure thing. Take care!' },
    { sender: 'user1', receiver: 'user2', message: 'You too!' },
    { sender: 'user2', receiver: 'user1', message: "Hey, how's it going?" },
    { sender: 'user1', receiver: 'user2', message: "Hey! I'm doing well, thanks. What's up?" },
    { sender: 'user2', receiver: 'user1', message: 'Not much, just wanted to catch up.' },
    { sender: 'user1', receiver: 'user2', message: 'Sounds good. How have you been?' },
    { sender: 'user2', receiver: 'user1', message: 'Pretty good, just staying busy with work.' },
    {
      sender: 'user1',
      receiver: 'user2',
      message: 'I can relate. Work has been hectic for me too.',
    },
    { sender: 'user2', receiver: 'user1', message: "Yeah, it's that time of the year, I guess." },
    {
      sender: 'user1',
      receiver: 'user2',
      message: 'Definitely. So, any exciting plans for the weekend?',
    },
    {
      sender: 'user2',
      receiver: 'user1',
      message: 'Not really, probably just going to relax at home.',
    },
    {
      sender: 'user1',
      receiver: 'user2',
      message: "Same here. Sometimes that's all you need, right?",
    },
    {
      sender: 'user2',
      receiver: 'user1',
      message: 'Absolutely. A quiet weekend can be quite refreshing.',
    },
    { sender: 'user1', receiver: 'user2', message: "Couldn't agree more." },
    {
      sender: 'user2',
      receiver: 'user1',
      message: 'By the way, have you tried that new restaurant downtown?',
    },
    { sender: 'user1', receiver: 'user2', message: 'No, not yet. Is it any good?' },
    {
      sender: 'user2',
      receiver: 'user1',
      message: 'I went there last weekend and the food was amazing.',
    },
    { sender: 'user1', receiver: 'user2', message: "Sounds tempting. I'll have to check it out." },
    {
      sender: 'user2',
      receiver: 'user1',
      message: 'Let me know if you want to go together sometime.',
    },
    { sender: 'user1', receiver: 'user2', message: 'That sounds like a plan!' },
  ]

  return (
    <div>
      <section>
        <div className="container py-5">
          <AddNostrUserOnChat />
          <div className="row chat_wrap">
            {/* Conversation user List */}
            <div className="col-md-6 col-lg-5 col-xl-4 mb-4 mb-md-0 chat_user">
              <div className="card " style={{ height: '100%' }}>
                <div className="card-body">
                  <ul className="list-unstyled mb-0">
                    {Object.keys(userState.userConversationList).map((key, id) => (
                      <li onClick={e=>{setselectedUser(key)}} className={selectedUser== key ? "p-2 border-bottom single_user single_user_active": "p-2 border-bottom single_user"} key={id}>
                        <span className="d-flex justify-content-between">
                          <div className="d-flex flex-row" style={{ alignItems: 'center' }}>
                            {userState.userConversationList[key].picture ? (
                              <img
                                src={userState.userConversationList[key].picture}
                                alt="avatar"
                                className="rounded-circle d-flex align-self-center me-3 shadow-1-strong"
                                width={60}
                              />
                            ) : (
                              <img
                                src="/img/8.jpg"
                                alt="avatar"
                                className="rounded-circle d-flex align-self-center me-3 shadow-1-strong"
                                width={60}
                              />
                            )}

                            <div className="pt-1">
                              <p className="fw-bold mb-0 ">
                                {' '}
                                {userState.userConversationList[key].name
                                  ? userState.userConversationList[key].name
                                  : 'Nostr User'}{' '}
                              </p>
                              <p className="small text-muted"> {shortenString(key)} </p>
                            </div>
                          </div>
                          {/* <div className="pt-1">
                          <p className="small text-muted mb-1">Just now</p>
                          <span className="badge bg-danger float-end">1</span>
                        </div> */}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
            {/* Conversation history ( message ) */}
            <div className="col-md-6 col-lg-7 col-xl-8 chat_history" id="chat_history" style={{position:'relative'}}>
              {selectedUser ? (
                <>
                  <ul className="list-unstyled" style={{ marginBottom: '100px' }}>
                    {conversation.map((item, id) => (
                      <>
                        {item.sender == 'user1' ? (
                          <li className="d-flex justify-content-between mb-4" key={id}>
                            <div className="card w-100">
                              <div className="card-body">
                                <p className="mb-0">
                                  Sed ut perspiciatis unde omnis iste natus error sit voluptatem
                                  accusantium doloremque laudantium.
                                </p>
                                <p className="text_right">12:04 AM</p>
                              </div>
                            </div>
                            <img
                              src="https://mdbcdn.b-cdn.net/img/Photos/Avatars/avatar-5.webp"
                              alt="avatar"
                              className="rounded-circle d-flex align-self-start ms-3 shadow-1-strong"
                              width={60}
                            />
                          </li>
                        ) : (
                          <li className="d-flex justify-content-between mb-4" key={id}>
                            <img
                              src="https://mdbcdn.b-cdn.net/img/Photos/Avatars/avatar-6.webp"
                              alt="avatar"
                              className="rounded-circle d-flex align-self-start me-3 shadow-1-strong"
                              width={60}
                            />
                            <div className="card">
                              <div className="card-body">
                                <p className="mb-0">
                                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                                  eiusmod tempor incididunt ut labore et dolore magna aliqua.
                                </p>
                                <p>10:45 AM</p>
                              </div>
                            </div>
                          </li>
                        )}
                      </>
                    ))}
                  </ul>
                  <div className="message_sendbox" style={{ width: chatHistoryWidth  }}>
                    <div className="form-outline input_box">
                      <textarea className="form-control" rows={2} defaultValue={''} />
                    </div>
                    <button type="button" className="btn float-end btn_success">
                      Send
                    </button>
                  </div>
                </>
              ) : (
                <h4
                  style={{
                    textAlign: 'center',
                    position: ' absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                  }}
                >
                  Select a user to Start Chat
                </h4>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default ChatPage
