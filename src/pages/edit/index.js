import { React, useEffect, useRef } from "react";
import Header from "../../layouts/Header";
import { Fade } from "react-reveal";
import { Card, Form } from "react-bootstrap";

export default function Edit() {
  const inputReference = useRef(null);

  useEffect(() => {
    inputReference.current.focus();
  });

  return (
    <div>
      <Header />
      <Fade bottom>
        <Card border="warning" className="mt-4">
          <Form className="p-2">
            <div>
              <Form.Control
                type="text"
                placeholder="Title"
                id="title"
                className="mb-3 shadow-none"
                style={{ border: "none" }}
                ref={inputReference}
              />
            </div>
            <div>
              <Form.Control
                as="textarea"
                rows={10}
                id="body"
                className="mb-3 shadow-none"
                style={{ border: "none" }}
                placeholder="Type note.."
              />
            </div>
          </Form>
        </Card>
      </Fade>
    </div>
  );
}
