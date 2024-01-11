import React, { useState } from "react";
import Corpus from "../modules/Corpus";
import { NewPostInput } from "../modules/NewPostInput";
import { get, post } from "../../utilities";

const LLM = (props) => {
  const [response, setResponse] = useState("");

  const makeQuery = (q) => {
    setResponse("querying the model...");
    post("/api/query", { query: q })
      .then((res) => {
        setResponse(res.queryresponse);
      })
      .catch(() => {
        setResponse("error during query. check your server logs!");
        setTimeout(() => {
          setResponse("");
        }, 2000);
      });
  };

  // if (!props.userId) {
  //   return <div>Log in before chatting with the LLM</div>;
  // }
  return (
    <>
      <div className="corpus-container">
        <h1>Corpus</h1>
        <Corpus />
      </div>
      <div className="llm-container">
        <h1>Query the LLM!</h1>
        <NewPostInput defaultText={"What does Tony eat for breakfast?"} onSubmit={makeQuery} />
        <div>{response}</div>
      </div>
    </>
  );
};

export default LLM;
