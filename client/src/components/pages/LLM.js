import React, { useState } from "react";
import Corpus from "../modules/Corpus";
import { NewPostInput } from "../modules/NewPostInput";

const LLM = (props) => {
  const [response, setResponse] = useState("");

  const makeQuery = (q) => {
    console.log(q);
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
      </div>
    </>
  );
};

export default LLM;
