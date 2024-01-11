import React, { useState, useEffect, useRef } from "react";
import Document from "./Document";
import { NewPostInput } from "./NewPostInput";
import "./Document.css";

import { get, post } from "../../utilities";

const Corpus = (props) => {
  const [loading, setLoading] = useState(true);
  const [alertContent, setAlertContent] = useState("");
  const [corpus, setCorpus] = useState([]);
  const corpusRef = useRef(null);

  useEffect(() => {
    get("/api/document").then((corpus) => {
      setCorpus(corpus);
      setLoading(false);
    });
  }, []);

  const handleNewDocument = (content) => {
    setAlertContent("generating document...");
    post("/api/document", { content: content })
      .then((newDoc) => {
        setCorpus(corpus.concat([newDoc]));
        if (corpusRef.current) {
          corpusRef.current.scrollTop = corpusRef.current.scrollHeight;
        }
        setAlertContent("");
      })
      .catch(() => {
        setAlertContent("error adding document. check your server logs!");
        setTimeout(() => {
          setAlertContent("");
        }, 2000);
      });
  };

  const handleUpdateDocument = (id, content) => {
    setAlertContent("updating document...");
    post("/api/updateDocument", { _id: id, content: content })
      .then(() => {
        setAlertContent("document successfully updated!");
        setTimeout(() => {
          setAlertContent("");
        }, 2000);
      })
      .catch(() => {
        setAlertContent("error adding document. check your server logs!");
        setTimeout(() => {
          setAlertContent("");
        }, 2000);
      });
  };

  const handleDeleteDocument = (id) => {
    setAlertContent("deleting document...");
    post("/api/deleteDocument", { _id: id })
      .then(() => {
        setCorpus(corpus.filter((doc) => doc._id !== id));
        setAlertContent("document successfully deleted!");
        setTimeout(() => {
          setAlertContent("");
        }, 2000);
      })
      .catch(() => {
        setAlertContent("error deleting document. check your server logs!");
        setTimeout(() => {
          setAlertContent("");
        }, 2000);
      });
  };

  return (
    <>
      <div className="CorpusContainer" ref={corpusRef}>
        <>
          {loading ? (
            <div>Loading...</div>
          ) : (
            <>
              {corpus.length === 0 && <div>Empty!</div>}
              {corpus.map((doc) => (
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
