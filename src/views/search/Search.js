import React, { useState } from 'react'
import { cilCopy, cilHeart } from '@coreui/icons'
import { useDispatch, useSelector } from 'react-redux'
import CIcon from '@coreui/icons-react'
import { Link } from 'react-router-dom'
import { extractTextAndImage, searchNostrContent, shortenString } from '../../utils/function'
import LoadingContent from '../pages/Loading/LoadingContent'

const SearchTag = () => {
  const { loading, userState } = useSelector((state) => state)
  const [text, setText] = useState('')
  const [contentLoading, setContentLoading] = useState(false)
  const dispatch = useDispatch()

  return (
    <div>
      <div className="col-12 col-md-8 offset-md-2">
        <div className="card mb-4">
          <div className="card-body">
            <div className="row pb-4">
              <div className="col-sm-11 ms-auto">
                <div className="user_profile_box">
                  <img src={userState.picture ? userState.picture : '/img/8.jpg'} />
                  <div>
                    <h5>Hi {userState.name ? userState.name : 'Nostr User'} ! </h5>
                    <p>
                      Wallet : <strong> {userState.wpub} </strong>
                      <span>
                        <CIcon icon={cilCopy} size="lg" />
                      </span>
                    </p>
                  </div>
                </div>
                <div className="mb-3 mt-4">
                  <div style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
                    <input
                      className="form-control"
                      onChange={(e) => setText(e.target.value)}
                      placeholder="Search on Nostr #BTC  "
                      value={text}
                    />
                    <button
                      className="btn btn_success"
                      onClick={(e) => searchNostrContent(text, setContentLoading, dispatch)}
                    >
                      Search
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Stock Content */}
      <div className="row">
        <div className="col-12 col-md-8 offset-md-2">
          <h4>Search Result</h4>
          <hr />
        </div>
        <div className="col-12 col-md-8 offset-md-2">
          <></>
          {userState.searchedEvents.length > 0 ? (
            <>
              {userState.searchedEvents.map((note, i) => (
                <div className="card mb-4 pb-4" key={i}>
                  <div className="col-sm-11 ms-auto mt-5" >
                    <div className="user_profile_box user_profile_link">
                      {JSON.parse(note.user.content).picture ? (
                        <img src={JSON.parse(note.user.content).picture} />
                      ) : (
                        <img src="/img/8.jpg" />
                      )}
                      <div>
                        <Link to={'#'}>
                          <h5 style={{ textTransform: 'capitalize' }}>
                            {JSON.parse(note.user.content).name
                              ? JSON.parse(note.user.content).name
                              : 'Nostr User'}
                          </h5>
                        </Link>

                        <p>
                          PubKey : <strong> {shortenString(note.pubkey)} </strong>
                          <span>
                            <CIcon icon={cilCopy} size="lg" />
                          </span>
                        </p>
                      </div>
                    </div>
                    <div className="mb-3 mt-4 post_content">
                      {extractTextAndImage(note.content).text ? (
                        <p> {extractTextAndImage(note.content).text} </p>
                      ) : (
                        ''
                      )}
                      {extractTextAndImage(note.content).img ? (
                        <img src={extractTextAndImage(note.content).img} />
                      ) : (
                        ''
                      )}
                    </div>
                    <div>
                      <div className="upload_panal">
                        {/* <div className="post_reaction_item">
                          <span className="reaction_icon">
                            <CIcon icon={cilChatBubble} size="xl" />
                          </span>
                          <span>0</span>
                        </div> */}
                        {/* <div className="post_reaction_item">
                          <span className="reaction_icon">
                            <CIcon icon={cilSwapHorizontal} size="xl" />
                          </span>
                          <span>0</span>
                        </div> */}
                        <div className="post_reaction_item">
                          <span className="reaction_icon">
                            <CIcon icon={cilHeart} size="xl" />
                          </span>
                          <span> {note.tags.length} </span>
                        </div>
                      </div>
                    </div>
                    {/* <div>
                      <div className="card mb-4">
                        <div className="card-body">
                          <textarea
                            className="form-control no_border"
                            id="exampleFormControlTextarea1"
                            rows="3"
                            placeholder="Wnat's in your mind ?"
                            spellCheck="false"
                          ></textarea>
                          <div className="post_comments">
                            {[1, 2, 3, 4, 5].map((el) => (
                              <div className="comment_user mb-4" key={el}>
                                <img src="/img/8.jpg" />
                                <div>
                                  <h6>Alamin Hossin</h6>
                                  <p> Nice , its a great plateform to use ~ </p>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div> */}
                  </div>
                </div>
              ))}
            </>
          ) : loading.searchLoading ? (
            <>
              <LoadingContent />
            </>
          ) : (
            <h3 className="text-center">{userState.searchedEvents.length < 1 ? 'Empty' : ''}</h3>
          )}
        </div>
      </div>
    </div>
  )
}
export default SearchTag
