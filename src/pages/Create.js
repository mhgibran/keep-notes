import { React, useEffect, useRef, useState } from "react";
import Header from "../layouts/Header";
import { Fade } from "react-reveal";
import { Card, Form, Alert } from "react-bootstrap";
import TextareaAutosize from "react-textarea-autosize";
import axios from "../api/Axios";
import { useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";

export default function Create() {
  const navigate = useNavigate();
  const titleRef = useRef(null);
  const [title, setTitle] = useState("");
  const [note, setNote] = useState("");
  const [errMsg, setErrMsg] = useState("");

  useEffect(() => {
    titleRef.current.focus();
    document.title = "Create Note";
  }, []);

  const onSubmit = async () => {
    if (title === "") {
      return setErrMsg("Title cannot be empty");
    } else if (note === "") {
      return setErrMsg("Notes cannot be empty");
    } else {
      let payload = {
        title: title,
        note: note,
      };

      await axios
        .post("/notes", payload)
        .then((res) => {
          toast("Notes created!", {
            style: {
              borderRadius: "10px",
              background: "#333",
              color: "#fff",
            },
          });
          setTimeout(() => {
            navigate("/show/" + res.data.data.id);
          }, 1000);
        })
        .catch((err) => {
          setErrMsg(err);
        });
    }
  };

  return (
    <div className="py-4">
      <Header onCreate={onSubmit} />
      <Toaster position="bottom-center" reverseOrder={false} />
      <Fade bottom>
        {errMsg && (
          <Alert className="mt-3" variant="danger">
            {errMsg}
          </Alert>
        )}
        <Card border="warning" className="mt-4">
          <div className="p-2">
            <div>
              <Form.Control
                type="text"
                placeholder="Title"
                className="mb-3 shadow-none"
                style={{ border: "none" }}
                ref={titleRef}
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>
            <div>
              <TextareaAutosize
                minRows={8}
                className="form-control mb-3 shadow-none"
                placeholder="Type note.."
                value={note}
                style={{ border: "none" }}
                onChange={(e) => setNote(e.target.value)}
              />
            </div>
          </div>
        </Card>
      </Fade>
    </div>
  );
}
