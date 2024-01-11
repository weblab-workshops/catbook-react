import React, { useState, useEffect } from "react";
import Corpus from "../modules/Corpus";
import { NewPostInput } from "../modules/NewPostInput";
import { get, post } from "../../utilities";

const LLM = (props) => {
  const [loading, setLoading] = useState(false);
  const [corpus, setCorpus] = useState([]);
  const [response, setResponse] = useState("");
  const [noAPIKey, setNoAPIKey] = useState(true);

  useEffect(() => {
    get("/api/hasapikey").then((res) => {
      if (res.hasapikey) {
        setNoAPIKey(false);
        get("/api/document").then((corpus) => {
          setCorpus(corpus);
          setLoading(false);
        });
      }
      setLoading(false);
    });
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
        <div>(if you think this is a mistake, refresh the page)</div>
      </>
    );
  }
  return (
    <>
      <div className="corpus-container">
        <h1>Corpus</h1>
        <Corpus corpus={corpus} setCorpus={setCorpus} loading={loading} />
      </div>
      <div className="llm-container">
        <h1>Query the LLM</h1>
        <NewPostInput defaultText={"what does Tony eat for breakfast?"} onSubmit={makeQuery} />
        <div>{response}</div>
      </div>
    </>
  );
};

export default LLM;
