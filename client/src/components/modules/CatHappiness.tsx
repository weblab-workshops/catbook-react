import React from "react";
import "./CatHappiness.css";

type CatHappinessProps = {
  catHappiness: number;
}

const CatHappiness = (props: CatHappinessProps) => {
  return (
    <div className="CatHappiness-container">
      <div className="CatHappiness-story">
        <p className="CatHappiness-storyContent">{props.catHappiness}</p>
      </div>
    </div>
  );
};

export default CatHappiness;
