import React, { useEffect, useState } from "react";
import { Card, Row, Col, Alert } from "react-bootstrap";
import Header from "../layouts/Header";
import { Fade } from "react-reveal";
import { Link } from "react-router-dom";
import axios from "../api/Axios";
import { ReactComponent as TrashIcon } from "../assets/svg/trash.svg";
import { ReactComponent as ArchiveIcon } from "../assets/svg/archive_box_arrow_down.svg";
// import { ReactComponent as PaintBrushIcon } from "../assets/svg/paint_brush.svg";
import toast, { Toaster } from "react-hot-toast";
import Masonry from "react-masonry-css";

export default function Home() {
  const [notes, setNotes] = useState([]);
  const [errMsg, setErrMsg] = useState("");

  const loadData = async () => {
    await axios
      .get("/notes")
      .then((res) => {
        setNotes(res?.data?.data);
      })
      .catch((error) => {
        toast(error?.code, {
          style: {
            borderRadius: "10px",
            background: "#333",
            color: "#fff",
          },
        });
      });
  };

  const deleteNote = async (id) => {
    await axios
      .delete("/notes/" + id)
      .then((res) => {
        if (res.data.status === 200) {
          loadData();
          toast("Notes deleted!", {
            style: {
              borderRadius: "10px",
              background: "#333",
              color: "#fff",
            },
          });
        }
      })
      .catch((error) => {
        setErrMsg(error);
      });
  };

  const archiveNote = async (id) => {
    await axios
      .post("/notes/archived/" + id)
      .then((res) => {
        if (res.data.status === 200) {
          loadData();
          toast("Notes archived!", {
            style: {
              borderRadius: "10px",
              background: "#333",
              color: "#fff",
            },
          });
        }
      })
      .catch((error) => {
        setErrMsg(error);
      });
  };

  useEffect(() => {
    document.title = "Keep Notes";
    loadData();
  }, []);

  return (
    <>
      <div className="py-4">
        <Header />
        <Toaster position="bottom-center" reverseOrder={false} />
        <Fade bottom>
          {errMsg && (
            <Alert className="mt-3" variant="danger">
              {errMsg}
            </Alert>
          )}
          <Masonry
            breakpointCols={{ default: 4, 1100: 3, 700: 2, 500: 1 }}
            className="my-masonry-grid mt-4"
            columnClassName="my-masonry-grid_column"
          >
            {notes.length > 0 ? (
              notes.map((item, index) => {
                return (
                  <div key={index} className="p-2">
                    <Card
                      border="warning"
                      className="card-notes p-3"
                      style={{ overflow: "hidden" }}
                    >
                      <Card.Header
                        className="d-flex justify-content-end gap-3 align-items-center"
                        style={{
                          backgroundColor: "transparent",
                          border: "none",
                          padding: 0,
                          marginBottom: "1em",
                          marginTop: "-.8em",
                        }}
                      >
                        {/* <div title="Background Options">
                          <PaintBrushIcon style={{ width: "1.2rem" }} />
                        </div> */}
                        <div
                          title="Archive Note"
                          onClick={() => archiveNote(item.id)}
                        >
                          <ArchiveIcon style={{ width: "1.2rem" }} />
                        </div>
                        <div
                          title="Delete Note"
                          onClick={() => deleteNote(item.id)}
                        >
                          <TrashIcon style={{ width: "1.2rem" }} />
                        </div>
                      </Card.Header>
                      <Card.Body
                        style={{
                          transform: "rotate(0)",
                          margin: 0,
                          padding: 0,
                        }}
                      >
                        <Card.Title
                          style={{
                            overflow: "ellipsis",
                            display: "-webkit-box",
                            WebkitBoxOrient: "vertical",
                            WebkitLineClamp: 2,
                            whiteSpace: "pre-wrap",
                          }}
                        >
                          {item.title}
                        </Card.Title>
                        <Card.Text
                          style={{
                            overflow: "ellipsis",
                            display: "-webkit-box",
                            WebkitBoxOrient: "vertical",
                            WebkitLineClamp: 12,
                            whiteSpace: "pre-wrap",
                            marginBottom: "-.6em",
                          }}
                        >
                          {item.note}
                        </Card.Text>
                        <Link
                          to={`/show/${item.id}`}
                          className="stretched-link"
                        ></Link>
                      </Card.Body>
                    </Card>
                  </div>
                );
              })
            ) : (
              <Alert variant="warning">Notes is not available!</Alert>
            )}
          </Masonry>
        </Fade>
      </div>
    </>
  );
}
