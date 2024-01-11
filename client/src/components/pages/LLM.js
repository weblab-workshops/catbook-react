import React, { useState, useEffect } from "react";
import Corpus from "../modules/Corpus";
import { NewPostInput } from "../modules/NewPostInput";
import { get, post } from "../../utilities";

const LLM = (props) => {
  const [response, setResponse] = useState("");
  const [noAPIKey, setNoAPIKey] = useState(true);

  useEffect(() => {
    get("/api/hasapikey").then((res) => setNoAPIKey(!res.hasapikey));
  }, []);

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

  if (!props.userId) {
    return <div>Log in before chatting with the LLM</div>;
  }
  if (noAPIKey) {
    return (
      <>
        <div>test query failed</div>
        <div>this is most likely due to not configuring a valid api key</div>
        <div>add a valid key to a .env in root to begin chatting with the LLM!</div>
      </>
    );
  }
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
