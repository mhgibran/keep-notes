import React, { useEffect, useState } from "react";
import { Card, Row, Col, Alert } from "react-bootstrap";
import Header from "../layouts/Header";
import { Fade } from "react-reveal";
import { Link, useNavigate } from "react-router-dom";
import axios from "../api/Axios";
import { ReactComponent as TrashIcon } from "../assets/svg/trash.svg";
import toast, { Toaster } from "react-hot-toast";

export default function Home() {
  const navigate = useNavigate();
  const [notes, setNotes] = useState([]);
  const [errMsg, setErrMsg] = useState("");

  const loadData = async () => {
    await axios
      .get("/notes")
      .then((res) => {
        setNotes(res?.data?.data);
      })
      .catch((error) => {
        setErrMsg(error);
      });
  };

  const deleteData = async (id) => {
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

  useEffect(() => {
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
                      <Card.Header
                        style={{
                          width: "94%",
                          position: "absolute",
                          // margin: 0,
                          padding: 0,
                          display: "flex",
                          justifyContent: "end",
                          marginTop: "-14px",
                          backgroundColor: "transparent",
                          border: "none",
                        }}
                      >
                        <TrashIcon
                          className="text-danger"
                          style={{ width: "1.3rem" }}
                          onClick={() => deleteData(item.id)}
                        />
                      </Card.Header>
                      <div style={{ transform: "rotate(0)" }}>
                        <Card.Title
                          style={{
                            textOverflow: "ellipsis",
                            whiteSpace: "nowrap",
                          }}
                        >
                          {item.title}
                        </Card.Title>
                        <Card.Text
                          style={{
                            overflow: "ellipsis",
                            display: "-webkit-box",
                            WebkitBoxOrient: "vertical",
                            WebkitLineClamp: 5,
                            whiteSpace: "pre-wrap",
                          }}
                        >
                          {item.note}
                        </Card.Text>

                        <Link
                          to={`/show/${item.id}`}
                          className="stretched-link"
                        ></Link>
                      </div>
                    </Card>
                  </Col>
                );
              })
            ) : (
              <Alert variant="warning">Notes is not available!</Alert>
            )}
          </Row>
        </Fade>
      </div>
    </>
  );
}
