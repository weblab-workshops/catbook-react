import React, { useState, useEffect } from "react";
import Document from "./Document";
import { NewPostInput } from "./NewPostInput";
import "./Document.css";

import { get, post } from "../../utilities";

const Corpus = (props) => {
  const [corpus, setCorpus] = useState([]);

  useEffect(() => {
    get("/api/document").then((corpus) => {
      setCorpus(corpus);
    });
  }, []);

  const handleNewDocument = (content) => {
    post("/api/document", { content: content }).then((newDoc) => {
      setCorpus(corpus.concat([newDoc]));
    });
  };

  return (
    <>
      <div className="CorpusContainer">
        {corpus.map((doc, i) => (
          <Document key={i} content={doc.content} id={doc._id} />
        ))}
      </div>
      <div className="NewDocument">
        <NewPostInput defaultText={"add new document"} onSubmit={handleNewDocument} />
      </div>
    </>
  );
};

export default Corpus;
