import React, { useState } from "react";
import "./Document.css";
import { post } from "../../utilities";

const Document = (props) => {
  const [value, setValue] = useState(props.content);
  const [deleted, setDeleted] = useState(false);

  // called whenever the user types in the new post input box
  const handleChange = (event) => {
    setValue(event.target.value);
  };

  // called when the user hits "Submit" for a new post
  const handleSave = () => {
    post("/api/updateDocument", { _id: props.id, content: value });
  };

  const handleDelete = () => {
    post("/api/deleteDocument", { _id: props.id }).then(() => setDeleted(true));
  };

  return (
    <>
      {!deleted && (
        <>
          <div className="u-flex">
            <input
              type="text"
              value={value}
              onChange={handleChange}
              className="NewPostInput-input"
            />
            <button
              type="submit"
              className="NewPostInput-button u-pointer Document-save-button"
              value="Submit"
              onClick={handleSave}
            >
              Update
            </button>
            <button
              type="submit"
              className="NewPostInput-button u-pointer Document-delete-button"
              value="Submit"
              onClick={handleDelete}
            >
              Delete
            </button>
          </div>
        </>
      )}
    </>
  );
};

export default Document;
