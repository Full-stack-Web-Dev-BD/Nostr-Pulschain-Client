import React, { useEffect, useState } from 'react'
import {
  cilChatBubble,
  cilCloudUpload,
  cilCopy,
  cilFile,
  cilHeart,
  cilSwapHorizontal,
} from '@coreui/icons'
import { useDispatch, useSelector } from 'react-redux'
import CIcon from '@coreui/icons-react'
import { Link } from 'react-router-dom'
import { createNote, extractTextAndImage, fileUpload } from '../../utils/function'

const UserNotePage = () => {
  const { userState } = useSelector((state) => state)
  const [isPreviewMode, setIsPreviewMode] = useState(false)
  const [note, setNote] = useState('')
  const [notePicture, setNotePicture] = useState(null)
  const [pictureUploadPending, setPictureUploadPending] = useState(false)
  const [isNoteCreating, setIsNoteCreating] = useState(false)
  const dispatch = useDispatch()

  return (
    <div>
      {/* Create */}
      <div className="row">
        <div className="col-12 col-md-8 offset-md-2">
          <div className="card mb-4 pb-4">
            <div className="card-body">
              <div className="col-sm-11 ms-auto">
                <div className="user_profile_box">
                  <img src={userState.picture ? userState.picture : '/img/8.jpg'} />
                  <div>
                    <h5>Hi {userState.name} ! </h5>
                    <p>
                      Wallet : <strong> {userState.wpub} </strong>
                      <span>
                        <CIcon icon={cilCopy} size="lg" />
                      </span>
                    </p>
                  </div>
                </div>
                <div className="mb-3 mt-4">
                  {isPreviewMode ? (
                    <div className="note_preview">
                      <h4> {note} </h4>
                      {notePicture ? <img src={notePicture} /> : ''}
                    </div>
                  ) : (
                    <>
                      <textarea
                        style={{ border: '0', fontSize: '26px' }}
                        className="form-control"
                        rows={3}
                        onChange={(e) => setNote(e.target.value)}
                        placeholder="What's on your mind ? "
                        value={note}
                      />
                      {notePicture ? (
                        <p>
                          {' '}
                          <CIcon icon={cilFile} /> File Uploaded !!{' '}
                        </p>
                      ) : (
                        ''
                      )}
                    </>
                  )}
                </div>
                <div>
                  <div className="upload_panal">
                    <span
                      className="cp"
                      onClick={(e) => document.getElementById('upload_note_image').click()}
                    >
                      <input
                        id="upload_note_image"
                        type="file"
                        onChange={(e) => fileUpload(e, setNotePicture, setPictureUploadPending)}
                        accept="image/*"
                        style={{ display: 'none' }}
                      />
                      <CIcon icon={cilCloudUpload} size="xxl" />
                    </span>
                    <button
                      onClick={(e) => setIsPreviewMode(!isPreviewMode)}
                      className="btn btn_success"
                    >
                      {isPreviewMode ? 'Edit Note' : 'Preview'}
                    </button>
                    <button className="btn btn_primary">Cancel</button>
                    {isNoteCreating ? (
                      <button className="btn btn_success">Sending ...</button>
                    ) : pictureUploadPending ? (
                      <button className="btn btn_success">File Processing ...</button>
                    ) : (
                      <button
                        className="btn btn_success"
                        onClick={(e) => {
                          createNote(userState, note, notePicture, setIsNoteCreating, dispatch)
                          setNote('')
                          setNotePicture('')
                          setIsPreviewMode(false)
                        }}
                      >
                        Send
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Events */}
      <div className="row">
        <div className="col-12 col-md-8 offset-md-2">
          {userState.userEvents.map((note, id) => (
            <>
              {note.kind == 0 ? (
                <div className="card mb-4" key={id}>
                  <div className="card-body">
                    <div className="col-sm-11 ms-auto mt-5" key={note.id}>
                      {/* {console.log(JSON.parse(note.content))} */}
                      <div className="user_profile_box user_profile_link">
                        {JSON.parse(note.content).about ? (
                          <img src={`${JSON.parse(note.content).picture}`} />
                        ) : (
                          <img src="/img/8.jpg" />
                        )}
                        <div>
                          <Link to={'#'}>
                            <h5> {userState.name} </h5>
                          </Link>

                          <p>
                            About : <span> {userState.npub ? userState.npub : 'N/A'} </span>
                          </p>
                        </div>
                      </div>
                      <div className="mb-3 mt-4 post_content">
                        <span>{userState.name} Updated Profile !</span>
                      </div>
                      {/* Reaction Panal */}
                      <div>
                        <div className="upload_panal">
                          <div className="post_reaction_item">
                            <span className="reaction_icon">
                              <CIcon icon={cilChatBubble} size="xl" />
                            </span>
                            <span>0</span>
                          </div>
                          <div className="post_reaction_item">
                            <span className="reaction_icon">
                              <CIcon icon={cilSwapHorizontal} size="xl" />
                            </span>
                            <span>0</span>
                          </div>
                          <div className="post_reaction_item">
                            <span className="reaction_icon">
                              <CIcon icon={cilHeart} size="xl" />
                            </span>
                            <span>0</span>
                          </div>
                        </div>
                      </div>
                      {/* Comment panal */}
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
                              {userState.userEvents.map((note) => (
                                <>
                                  {note.kind == 0 ? (
                                    <div className="comment_user mb-4" key={note.id}>
                                      <img src="/img/8.jpg" />
                                      <div>
                                        <h6> {userState.name} </h6>
                                        <p> Nice , its a great plateform to use ~ </p>
                                      </div>
                                    </div>
                                  ) : (
                                    <div className="comment_user mb-4" key={note.id}>
                                      {console.log(JSON.parse(note.content))}
                                      <img src="/img/8.jpg" />
                                      <div>
                                        <h6>Alamin Hossin</h6>
                                        <p> Nice , its a great plateform to use ~ </p>
                                      </div>
                                    </div>
                                  )}
                                </>
                              ))}
                            </div>
                          </div>
                        </div>
                      </div> */}
                    </div>
                  </div>
                </div>
              ) : (
                // Note Event  (Post)

                <div className="card mb-4 pb-4" key={id}>
                  <div className="col-sm-11 ms-auto mt-5" key={note.id}>
                    <div className="user_profile_box user_profile_link">
                      {userState.picture ? (
                        <img src={`${userState.picture}`} />
                      ) : (
                        <img src="/img/8.jpg" />
                      )}
                      <div>
                        <Link to={'#'}>
                          <h5> {userState.name} </h5>
                        </Link>
                        <p>
                          About : <span> {userState.npub} </span>
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
                    {/* Reaction Panal */}
                    <div>
                      <div className="upload_panal">
                        <div className="post_reaction_item">
                          <span className="reaction_icon">
                            <CIcon icon={cilChatBubble} size="xl" />
                          </span>
                          <span>0</span>
                        </div>
                        <div className="post_reaction_item">
                          <span className="reaction_icon">
                            <CIcon icon={cilSwapHorizontal} size="xl" />
                          </span>
                          <span>0</span>
                        </div>
                        <div className="post_reaction_item">
                          <span className="reaction_icon">
                            <CIcon icon={cilHeart} size="xl" />
                          </span>
                          <span>0</span>
                        </div>
                      </div>
                    </div>
                    {/* Comment Panal */}
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
                              {userState.userEvents.map((note) => (
                                <>
                                  {note.kind == 0 ? (
                                    <div className="comment_user mb-4" key={note.id}>
                                      <img src="/img/8.jpg" />
                                      <div>
                                        <h6> {userState.name} </h6>
                                        <p> Nice , its a great plateform to use ~ </p>
                                      </div>
                                    </div>
                                  ) : (
                                    <div className="comment_user mb-4" key={note.id}>
                                      <img src="/img/8.jpg" />
                                      <div>
                                        <h6>Alamin Hossin</h6>
                                        <p> Nice , its a great plateform to use ~ </p>
                                      </div>
                                    </div>
                                  )}
                                </>
                              ))}
                            </div>
                          </div>
                        </div>
                      </div> */}
                  </div>
                </div>
              )}
            </>
          ))}
        </div>
      </div>
    </div>
  )
}
export default UserNotePage
