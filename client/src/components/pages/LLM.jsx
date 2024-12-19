import React, { useState, useEffect } from "react";
import Corpus from "../modules/Corpus";
import { NewPostInput } from "../modules/NewPostInput";
import { get, post } from "../../utilities";

const LLM = (props) => {
  const [loading, setLoading] = useState(false);
  const [corpus, setCorpus] = useState([]);
  const [response, setResponse] = useState("");
  const [runnable, setRunnable] = useState(false);

  useEffect(() => {
    get("/api/isrunnable").then((res) => {
      if (res.isrunnable) {
        setRunnable(true);
        get("/api/document").then((corpus) => {
          setCorpus(corpus);
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
  if (!runnable) {
    return (
      <>
        <div>error detected</div>
        <div>this is most likely due to one of two reasons:</div>
        <div>
          1. a valid api key is not configured. add a valid key to a .env in root to begin chatting
          with the LLM!
        </div>
        <div>
          2. your chroma db server is not running. run `chroma run` in a separate terminal to start
          up the db (follow setup guide to make sure this is set up correctly)
        </div>
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
