import React from "react";
import "./CatHappiness.css";

/**
 * Component that renders cat happiness
 *
 * Proptypes
 * @param {int} catHappiness is how happy your cat is
 */
const CatHappiness = () => {
  return (
    <div className="CatHappiness-container">
      <div className="CatHappiness-story">
        <p className="CatHappiness-storyContent">{/* TODO: insert happiness counter here!*/}</p>
      </div>
    </div>
  );
};

export default CatHappiness;
