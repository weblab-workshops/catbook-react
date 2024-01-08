import React from "react";
import "./CatHappiness.css";

/**
 * Component that renders cat happiness
 *
 * Props
 * @param {int} catHappiness is how happy your cat is
 */
const CatHappiness = () => {
  return (
    <div className="CatHappiness-container">
      <div className="CatHappiness-story">
        <p className="CatHappiness-storyContent"></p>
      </div>
    </div>
  );
};

export default CatHappiness;
