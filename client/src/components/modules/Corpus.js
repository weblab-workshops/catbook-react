import React, { useState, useEffect, useRef } from "react";
import Document from "./Document";
import { NewPostInput } from "./NewPostInput";
import "./Document.css";

import { get, post } from "../../utilities";

const Corpus = (props) => {
  const [loading, setLoading] = useState(true);
  const [corpus, setCorpus] = useState([]);
  const corpusRef = useRef(null);

  useEffect(() => {
    get("/api/document").then((corpus) => {
      setCorpus(corpus);
      setLoading(false);
    });
  }, []);

  const handleNewDocument = (content) => {
    post("/api/document", { content: content }).then((newDoc) => {
      setCorpus(corpus.concat([newDoc]));
      if (corpusRef.current) {
        corpusRef.current.scrollTop = corpusRef.current.scrollHeight;
      }
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
              {corpus.map((doc, i) => (
                <Document key={i} content={doc.content} id={doc._id} />
              ))}
            </>
          )}
        </>
      </div>
      <div className="NewDocument">
        <NewPostInput defaultText={"add new document"} onSubmit={handleNewDocument} />
      </div>
    </>
  );
};

export default Corpus;
