import React from "react";

const Tabs = ({ selectedTab, setSelectedTab }) => {
  return (
    <span className="Tabs">
      <button
        onClick={() => setSelectedTab("tweets")}
        style={{ fontWeight: selectedTab === "tweets" ? "bold" : "normal" }}
      >
        Tweets
      </button>
      <button
        onClick={() => setSelectedTab("likes")}
        style={{ fontWeight: selectedTab === "likes" ? "bold" : "normal" }}
      >
        Likes
      </button>
    </span>
  );
};

export default Tabs;
