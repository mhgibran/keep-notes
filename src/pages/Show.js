import { React, useEffect, useState } from "react";
import Header from "../layouts/Header";
import { Fade } from "react-reveal";
import { Card, Form, Alert } from "react-bootstrap";
import TextareaAutosize from "react-textarea-autosize";
import { useNavigate, useParams } from "react-router-dom";
import axios from "../api/Axios";
import toast, { Toaster } from "react-hot-toast";

export default function Show() {
  const params = useParams();
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [note, setNote] = useState("");
  const [errMsg, setErrMsg] = useState("");

  useEffect(() => {
    const loadData = async () => {
      await axios
        .get("/notes/" + params.id)
        .then((res) => {
          setTitle(res?.data?.data.title);
          setNote(res?.data?.data.note);
        })
        .catch((error) => {
          setErrMsg(error);
        });
    };

    loadData();
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
        .put("/notes/" + params.id, payload)
        .then((res) => {
          navigate("/show/" + res.data.data.id);
        })
        .catch((err) => {
          setErrMsg(err);
        });
    }
  };

  const onDelete = async (id) => {
    await axios
      .delete("/notes/" + id)
      .then((res) => {
        if (res.data.status === 200) {
          toast("Notes deleted!", {
            style: {
              borderRadius: "10px",
              background: "#333",
              color: "#fff",
            },
          });
          setTimeout(() => {
            navigate("/");
          }, 1000);
        }
      })
      .catch((error) => {
        setErrMsg(error);
      });
  };

  return (
    <div className="py-4">
      <Header
        onUpdate={onSubmit}
        title={title}
        onDelete={onDelete}
        noteId={params.id}
      />
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
