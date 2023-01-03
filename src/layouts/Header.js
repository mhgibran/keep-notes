import { React } from "react";
import { Button, Stack } from "react-bootstrap";
import { ReactComponent as AddIcon } from "../assets/svg/add.svg";
import { ReactComponent as CheckIcon } from "../assets/svg/check.svg";
import { ReactComponent as ArrowLeftIcon } from "../assets/svg/arrow_left.svg";
import { ReactComponent as TrashIcon } from "../assets/svg/trash.svg";
import { Link, useLocation } from "react-router-dom";

export default function Header(props) {
  const location = useLocation();

  return (
    <Stack direction="horizontal">
      {location.pathname !== "/" && (
        <Link
          to="/"
          className="me-3"
          style={{ color: "#ffc107", cursor: "pointer" }}
        >
          <ArrowLeftIcon style={{ width: "2.5rem" }} />
        </Link>
      )}
      <h1 className="color-warning">
        {location.pathname === "/" && "Keep Notes"}{" "}
        {location.pathname === "/create" && "Create Notes"}{" "}
        {props.title && props.title}
      </h1>
      <div className="ms-auto">
        {location.pathname === "/" && (
          <Link to="/create" style={{ color: "#ffc107", cursor: "pointer" }}>
            <AddIcon style={{ width: "2.5rem" }} />
          </Link>
        )}
        {location.pathname === "/create" && (
          <Link
            style={{ color: "#ffc107", cursor: "pointer" }}
            onClick={() => props.onCreate()}
          >
            <CheckIcon style={{ width: "2.5rem" }} />
          </Link>
        )}
        {location.pathname.includes("show") && (
          <div className="d-flex justify-content-end gap-4">
            <Link
              style={{ color: "#ffc107", cursor: "pointer" }}
              onClick={() => props.onUpdate()}
            >
              <CheckIcon style={{ width: "2.5rem" }} />
            </Link>
            <Link
              style={{ color: "#e15549", cursor: "pointer" }}
              onClick={() => props.onDelete(props.noteId)}
            >
              <TrashIcon style={{ width: "2.5rem" }} />
            </Link>
          </div>
        )}
      </div>
    </Stack>
  );
}
