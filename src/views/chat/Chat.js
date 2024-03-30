import React, { useEffect, useState } from 'react'

const ChatPage = () => { 
  const [chatHistoryWidth, setChatHistoryWidth] = useState('100%');

  useEffect(() => {
    const chatHistoryElement = document.getElementById('chat_history');
    if (chatHistoryElement) {
      setChatHistoryWidth((chatHistoryElement.offsetWidth-38) + 'px');
    }
  }, []);

  return (
    
    <div>
      <section>
        <div className="container py-5">
          <h5 className="font-weight-bold mb-3 text-center text-lg-start">Nostr Member</h5>

          <div className="row chat_wrap">
            {/* Conversation user List */}
            <div className="col-md-6 col-lg-5 col-xl-4 mb-4 mb-md-0 chat_user">
              <div className="card " style={{height:'100%'}}>
                <div className="card-body">
                  <ul className="list-unstyled mb-0">
                    <li className="p-2 border-bottom single_user">
                      <span className="d-flex justify-content-between">
                        <div className="d-flex flex-row">
                          <img
                            src="https://mdbcdn.b-cdn.net/img/Photos/Avatars/avatar-8.webp"
                            alt="avatar"
                            className="rounded-circle d-flex align-self-center me-3 shadow-1-strong"
                            width={60}
                          />
                          <div className="pt-1">
                            <p className="fw-bold mb-0">John Doe</p>
                            <p className="small text-muted">Hello, Are you there?</p>
                          </div>
                        </div>
                        <div className="pt-1">
                          <p className="small text-muted mb-1">Just now</p>
                          <span className="badge bg-danger float-end">1</span>
                        </div>
                      </span>
                    </li> 
                  </ul>
                </div>
              </div>
            </div>
            {/* Conversation history ( message ) */}
            <div className="col-md-6 col-lg-7 col-xl-8 chat_history" id='chat_history'>
              <ul className="list-unstyled" style={{marginBottom:'100px'}}>
                <li className="d-flex justify-content-between mb-4">
                  <img
                    src="https://mdbcdn.b-cdn.net/img/Photos/Avatars/avatar-6.webp"
                    alt="avatar"
                    className="rounded-circle d-flex align-self-start me-3 shadow-1-strong"
                    width={60}
                  />
                  <div className="card">
                    <div className="card-header d-flex justify-content-between p-3">
                      <p className="fw-bold mb-0">Brad Pitt</p>
                      <p className="text-muted small mb-0">
                        <i className="far fa-clock" /> 12 mins ago
                      </p>
                    </div>
                    <div className="card-body">
                      <p className="mb-0">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
                        tempor incididunt ut labore et dolore magna aliqua.
                      </p>
                    </div>
                  </div>
                </li>

                <li className="d-flex justify-content-between mb-4">
                  <img
                    src="https://mdbcdn.b-cdn.net/img/Photos/Avatars/avatar-6.webp"
                    alt="avatar"
                    className="rounded-circle d-flex align-self-start me-3 shadow-1-strong"
                    width={60}
                  />
                  <div className="card">
                    <div className="card-header d-flex justify-content-between p-3">
                      <p className="fw-bold mb-0">Brad Pitt</p>
                      <p className="text-muted small mb-0">
                        <i className="far fa-clock" /> 12 mins ago
                      </p>
                    </div>
                    <div className="card-body">
                      <p className="mb-0">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
                        tempor incididunt ut labore et dolore magna aliqua.
                      </p>
                    </div>
                  </div>
                </li>
                <li className="d-flex justify-content-between mb-4">
                  <img
                    src="https://mdbcdn.b-cdn.net/img/Photos/Avatars/avatar-6.webp"
                    alt="avatar"
                    className="rounded-circle d-flex align-self-start me-3 shadow-1-strong"
                    width={60}
                  />
                  <div className="card">
                    <div className="card-header d-flex justify-content-between p-3">
                      <p className="fw-bold mb-0">Brad Pitt</p>
                      <p className="text-muted small mb-0">
                        <i className="far fa-clock" /> 12 mins ago
                      </p>
                    </div>
                    <div className="card-body">
                      <p className="mb-0">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
                        tempor incididunt ut labore et dolore magna aliqua.
                      </p>
                    </div>
                  </div>
                </li>
                <li className="d-flex justify-content-between mb-4">
                  <img
                    src="https://mdbcdn.b-cdn.net/img/Photos/Avatars/avatar-6.webp"
                    alt="avatar"
                    className="rounded-circle d-flex align-self-start me-3 shadow-1-strong"
                    width={60}
                  />
                  <div className="card">
                    <div className="card-header d-flex justify-content-between p-3">
                      <p className="fw-bold mb-0">Brad Pitt</p>
                      <p className="text-muted small mb-0">
                        <i className="far fa-clock" /> 12 mins ago
                      </p>
                    </div>
                    <div className="card-body">
                      <p className="mb-0">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
                        tempor incididunt ut labore et dolore magna aliqua.
                      </p>
                    </div>
                  </div>
                </li>
                <li className="d-flex justify-content-between mb-4">
                  <div className="card w-100">
                    <div className="card-header d-flex justify-content-between p-3">
                      <p className="fw-bold mb-0">Lara Croft</p>
                      <p className="text-muted small mb-0">
                        <i className="far fa-clock" /> 13 mins ago
                      </p>
                    </div>
                    <div className="card-body">
                      <p className="mb-0">
                        Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium
                        doloremque laudantium.
                      </p>
                    </div>
                  </div>
                  <img
                    src="https://mdbcdn.b-cdn.net/img/Photos/Avatars/avatar-5.webp"
                    alt="avatar"
                    className="rounded-circle d-flex align-self-start ms-3 shadow-1-strong"
                    width={60}
                  />
                </li>
                <li className="d-flex justify-content-between mb-4">
                  <img
                    src="https://mdbcdn.b-cdn.net/img/Photos/Avatars/avatar-6.webp"
                    alt="avatar"
                    className="rounded-circle d-flex align-self-start me-3 shadow-1-strong"
                    width={60}
                  />
                  <div className="card">
                    <div className="card-header d-flex justify-content-between p-3">
                      <p className="fw-bold mb-0">Brad Pitt</p>
                      <p className="text-muted small mb-0">
                        <i className="far fa-clock" /> 10 mins ago
                      </p>
                    </div>
                    <div className="card-body">
                      <p className="mb-0">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
                        tempor incididunt ut labore et dolore magna aliqua.
                      </p>
                    </div>
                  </div>
                </li>
              </ul>
              <div className="message_sendbox" style={{ width: chatHistoryWidth }}>
                <div className="form-outline input_box">
                  <textarea
                    className="form-control"
                    rows={2}
                    defaultValue={''}
                  />
                </div>
                <button type="button" className="btn float-end btn_success">
                  Send
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default ChatPage
