import { React } from "react";
import { Stack } from "react-bootstrap";
import { ReactComponent as ArchiveIcon } from "../assets/svg/archive_box.svg";
import { ReactComponent as AddIcon } from "../assets/svg/add.svg";
import { ReactComponent as CheckIcon } from "../assets/svg/check.svg";
import { ReactComponent as ArrowLeftIcon } from "../assets/svg/arrow_left.svg";
import { ReactComponent as TrashIcon } from "../assets/svg/trash.svg";
import { ReactComponent as RestoreIcon } from "../assets/svg/arrow_path.svg";
import { Link, useLocation } from "react-router-dom";

export default function Header(props) {
  const location = useLocation();
  const pathName = location.pathname;

  function BackButton() {
    return (
      pathName !== "/" && (
        <Link to="/" className="btn-cta me-3" title="Back to Home">
          <ArrowLeftIcon />
        </Link>
      )
    );
  }

  function TopTitle() {
    if (pathName === "/") {
      return "Keep Notes";
    }
    if (pathName === "/create") {
      return "Create Notes";
    }
    return props.title;
  }

  function CtaButton() {
    if (pathName === "/") {
      return (
        <div className="d-flex justify-content-end gap-4 align-items-center">
          <Link to="/trashed" className="btn-cta" title="Trash Notes">
            <TrashIcon style={{ width: "2.1rem" }} />
          </Link>
          <Link to="/archived" className="btn-cta" title="Archive Notes">
            <ArchiveIcon style={{ width: "2.2rem" }} />
          </Link>
          <Link to="/create" className="btn-cta" title="Create a note">
            <AddIcon />
          </Link>
        </div>
      );
    }

    if (pathName === "/create") {
      return (
        <Link
          className="btn-cta"
          onClick={() => props.onCreate()}
          title="Save this note"
        >
          <CheckIcon />
        </Link>
      );
    }

    if (pathName.includes("show")) {
      return (
        <div className="d-flex justify-content-end gap-4 align-items-center">
          <Link
            className="btn-cta"
            onClick={() => props.onUpdate()}
            title="Save this note"
          >
            <CheckIcon />
          </Link>
          <Link
            className="btn-cta"
            style={{ color: "#fb6340" }}
            onClick={() => props.onDelete(props.noteId)}
            title="Delete this note"
          >
            <TrashIcon style={{ width: "2.1rem" }} />
          </Link>
        </div>
      );
    }

    if (pathName.includes("trashed")) {
      return (
        <div className="d-flex justify-content-end gap-4 align-items-center">
          <Link
            className="btn-cta"
            onClick={() => props.onRestore("all")}
            title="Restore Trash Notes"
          >
            <RestoreIcon />
          </Link>
        </div>
      );
    }

    if (pathName.includes("archived")) {
      return (
        <div className="d-flex justify-content-end gap-4 align-items-center">
          <Link
            className="btn-cta"
            onClick={() => props.onUnarchived("all")}
            title="Unarchived Notes"
          >
            <RestoreIcon />
          </Link>
        </div>
      );
    }
  }

  return (
    <Stack direction="horizontal">
      <BackButton />
      <h1 className="color-warning">
        <TopTitle />
      </h1>
      <div className="ms-auto">
        <CtaButton />
      </div>
    </Stack>
  );
}
