import { RouteComponentProps, useLocation, useNavigate } from "@reach/router";
import { Helmet } from "react-helmet";
import AppWrapper from "views/components/app-wrapper";
import AppMenu from "views/components/app-menu";
import { useState } from "react";
import AppContent from "views/components/app-content";
import { Box, Card, CardContent, CircularProgress } from "@mui/material";
import { t } from "i18next";
import useMediaBreakPoint from "hooks/use-media-break-point";
import { fileUpload } from "util/function";

const ChannelPage = (props: RouteComponentProps) => {
  const [isPreviewMode, setIsPreviewMode] = useState(false);
  const [note, setNote] = useState("");
  const [notePicture, setNotePicture] = useState(null);
  const [pictureUploadPending, setPictureUploadPending] = useState(false);
  const [isNoteCreating, setIsNoteCreating] = useState(false);
  const { isSm } = useMediaBreakPoint();

  return (
    <>
      <Helmet>
        <title>Home</title>
      </Helmet>
      <AppWrapper>
        <AppMenu />

        <AppContent>
          <div className="row">
            <div className="mt-5 col-12 col-md-8 offset-md-2">
              <Card>
                <CardContent>
                  <div className="row pb-4 mt-5">
                    <div className="col-sm-11 ms-auto">
                      <div className="user_profile_box">
                        <img src={"/img/user.jpg"} />
                        <div>
                          <h5>Hi Alamin</h5>
                          <p>
                            {/* {formatTime(note.created_at)} */}
                            Wallet : <strong> {"userState.wpub"} </strong>
                          </p>
                        </div>
                      </div>
                      <div className="mb-3 mt-4">
                        {isPreviewMode ? (
                          <div className="note_preview">
                            <h4> {note} </h4>
                            {notePicture ? <img src={notePicture} /> : ""}
                          </div>
                        ) : (
                          <>
                            <textarea
                              style={{ background:'transparent', border: "0", fontSize: "26px" }}
                              className="form-control"
                              rows={3}
                              onChange={(e) => setNote(e.target.value)}
                              placeholder="What's on your mind ? "
                              value={note}
                            />
                            {notePicture ? <p>File Uploaded !!</p> : ""}
                          </>
                        )}
                      </div>
                      <div>
                        <div className="upload_panal">
                          <span
                            className="cp"
                            onClick={(e) =>
                              document
                                .getElementById("upload_note_image")
                                ?.click()
                            }
                          >
                            <input
                              id="upload_note_image"
                              type="file"
                              onChange={(e) =>
                                fileUpload(
                                  e,
                                  setNotePicture,
                                  setPictureUploadPending
                                )
                              }
                              accept="image/*"
                              style={{ display: "none" }}
                            />
                            {/* <CIcon icon={cilCloudUpload} size="xxl" /> */}
                          </span>
                          <button
                            onClick={(e) => setIsPreviewMode(!isPreviewMode)}
                            className="btn btn_success"
                          >
                            {isPreviewMode ? "Edit Note" : "Preview"}
                          </button>
                          <button className="btn btn_primary">Cancel</button>
                          {isNoteCreating ? (
                            <button className="btn btn_success">
                              Sending ...
                            </button>
                          ) : pictureUploadPending ? (
                            <button className="btn btn_success">
                              File Processing ...
                            </button>
                          ) : (
                            <button className="btn btn_success">Send</button>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div> 
          </div>
        </AppContent>
      </AppWrapper>
    </>
  );
};

export default ChannelPage;
