import React, { useState, useEffect, useRef } from "react";
import Document from "./Document";
import { NewPostInput } from "./NewPostInput";
import "./Document.css";

import { get, post } from "../../utilities";

const Corpus = (props) => {
  const [alertContent, setAlertContent] = useState("");
  const corpusRef = useRef(null);

  const alert = (message, ms) => {
    setAlertContent(message);
    setTimeout(() => {
      setAlertContent("");
    }, ms);
  };

  const handleNewDocument = (content) => {
    setAlertContent("generating document...");
    post("/api/document", { content: content })
      .then((newDoc) => {
        props.setCorpus(props.corpus.concat([newDoc]));
        if (corpusRef.current) {
          corpusRef.current.scrollTop = corpusRef.current.scrollHeight;
        }
        alert("document successfully generated!", 2000);
      })
      .catch(() => {
        alert("error adding document. check server logs!", 2000);
      });
  };

  const handleUpdateDocument = (id, content) => {
    setAlertContent("updating document...");
    post("/api/updateDocument", { _id: id, content: content })
      .then(() => {
        alert("document successfully updated!", 2000);
      })
      .catch(() => {
        alert("error adding document. check server logs!", 2000);
      });
  };

  const handleDeleteDocument = (id) => {
    setAlertContent("deleting document...");
    post("/api/deleteDocument", { _id: id })
      .then(() => {
        props.setCorpus(props.corpus.filter((doc) => doc._id !== id));
        alert("document successfully deleted!", 2000);
      })
      .catch(() => {
        alert("error deleting document. check server logs!", 2000);
      });
  };

  return (
    <>
      <div className="CorpusContainer" ref={corpusRef}>
        <>
          {props.loading ? (
            <div>Loading...</div>
          ) : (
            <>
              {props.corpus.length === 0 && <div>Empty!</div>}
              {props.corpus.map((doc) => (
                <Document
                  key={doc._id}
                  content={doc.content}
                  id={doc._id}
                  handleUpdate={handleUpdateDocument}
                  handleDelete={handleDeleteDocument}
                />
              ))}
            </>
          )}
        </>
      </div>
      <div className="NewDocument">
        <NewPostInput defaultText={"add new document"} onSubmit={handleNewDocument} />
        {alertContent && <div>{alertContent}</div>}
      </div>
    </>
  );
};

export default Corpus;
