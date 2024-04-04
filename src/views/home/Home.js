import React, { useEffect, useState } from 'react'
import {
  cilChatBubble,
  cilCloudUpload,
  cilCopy,
  cilFile,
  cilHeart,
  cilSwapHorizontal,
} from '@coreui/icons'
import { useSelector } from 'react-redux'
import CIcon from '@coreui/icons-react'
import { Link } from 'react-router-dom'
import { createNote, fileUpload } from '../../utils/function'



const Home = () => {
  const { userState } = useSelector((state) => state)
  const [isPreviewMode, setIsPreviewMode] = useState(false)
  const [note, setNote] = useState('')
  const [notePicture, setNotePicture] = useState(null)
  const [pictureUploadPending, setPictureUploadPending] = useState(false)
  const [isNoteCreating, setIsNoteCreating] = useState(false)

  useEffect(() => {
    if(userState.npub){
      fetchEvent()
    }
  }, [userState.npub])

  const fetchEvent = async () => {
    const data = await window.fetchAndBroadcast()
    console.log("Events data",  data)
  }
  return (
    <div>
      <div className="col-12 col-md-8 offset-md-2">
        <div className="card mb-4">
          <div className="card-body">
            <div className="row">
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
                        defaultValue={''}
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
                    ) : (
                      <button
                        className="btn btn_success"
                        onClick={(e) => {
                          createNote(userState, note, notePicture, setIsNoteCreating)
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

      <div className="col-12 col-md-8 offset-md-2">
        <div className="card mb-4">
          <div className="card-body">
            <div className="row">
              {[1, 2, 4, 6, 7, 5].map((el) => (
                <div className="col-sm-11 ms-auto mt-5" key={el}>
                  <div className="user_profile_box user_profile_link">
                    <img src="/img/8.jpg" />
                    <div>
                      <Link to={'#'}>
                        <h5>Alamin Hossin </h5>
                      </Link>

                      <p>
                        PubKey : <strong>0xCF3b9Bf1A60aeC3381f30d4877E4D615cC29C01E</strong>
                        <span>
                          <CIcon icon={cilCopy} size="lg" />
                        </span>
                      </p>
                    </div>
                  </div>
                  <div className="mb-3 mt-4 post_content">
                    <p> I recently started Nostr to share my thought </p>
                    <img src="/img/post.jpg" />
                  </div>
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
                  <div>
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
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
export default Home
