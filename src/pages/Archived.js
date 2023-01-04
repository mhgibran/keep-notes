import React, { useEffect, useState } from "react";
import { Card, Row, Col, Alert } from "react-bootstrap";
import Header from "../layouts/Header";
import { Fade } from "react-reveal";
import { useNavigate } from "react-router-dom";
import axios from "../api/Axios";
import { ReactComponent as RestoreIcon } from "../assets/svg/arrow_path.svg";
import toast, { Toaster } from "react-hot-toast";

export default function Archived() {
  const navigate = useNavigate();
  const [notes, setNotes] = useState([]);
  const [errMsg, setErrMsg] = useState("");

  const loadData = async () => {
    await axios
      .get("/notes/archived")
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

  const unarchivedNote = async (id) => {
    await axios
      .post("/notes/unarchived/" + id)
      .then((res) => {
        if (res.data.status === 200) {
          toast("Notes unarchived!", {
            style: {
              borderRadius: "10px",
              background: "#333",
              color: "#fff",
            },
          });
          setTimeout(() => {
            if (id === "all") {
              navigate("/");
            } else {
              loadData();
            }
          }, 1000);
        }
      })
      .catch((error) => {
        setErrMsg(error);
      });
  };

  useEffect(() => {
    loadData();
  }, []);

  return (
    <>
      <div className="py-4">
        <Header title="Archived Notes" onUnarchived={unarchivedNote} />
        <Toaster position="bottom-center" reverseOrder={false} />
        <Fade bottom>
          {errMsg && (
            <Alert className="mt-3" variant="danger">
              {errMsg}
            </Alert>
          )}
          <Row className="mt-4">
            {notes.length > 0 ? (
              notes.map((item, index) => {
                return (
                  <Col key={index} xs={6} sm={6} md={4} xl={3} className="p-2">
                    <Card
                      border="warning"
                      className="card-notes p-3"
                      style={{ overflow: "hidden" }}
                    >
                      <Card.Body
                        style={{
                          transform: "rotate(0)",
                          margin: 0,
                          padding: 0,
                        }}
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
                          <div
                            title="Unarchived Note"
                            onClick={() => unarchivedNote(item.id)}
                          >
                            <RestoreIcon style={{ width: "1.2rem" }} />
                          </div>
                        </Card.Header>
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
                      </Card.Body>
                    </Card>
                  </Col>
                );
              })
            ) : (
              <Alert variant="warning">Archived notes is not available!</Alert>
            )}
          </Row>
        </Fade>
      </div>
    </>
  );
}
