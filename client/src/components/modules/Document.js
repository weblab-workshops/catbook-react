import React, { useState } from "react";
import "./Document.css";

const Document = (props) => {
  const [value, setValue] = useState(props.content);

  const handleChange = (event) => {
    setValue(event.target.value);
  };

  return (
    <>
      <div className="u-flex">
        <input type="text" value={value} onChange={handleChange} className="NewPostInput-input" />
        <button
          type="submit"
          className="NewPostInput-button u-pointer Document-save-button"
          value="Submit"
          onClick={() => props.handleUpdate(props.id, value)}
        >
          Update
        </button>
        <button
          type="submit"
          className="NewPostInput-button u-pointer Document-delete-button"
          value="Submit"
          onClick={() => props.handleDelete(props.id)}
        >
          Delete
        </button>
      </div>
    </>
  );
};

export default Document;
