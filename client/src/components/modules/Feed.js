import React, { useState } from "react";
import Tabs from "./Tabs";
import TweetPanel from "./TweetPanel";

const Feed = () => {
  const [selectedTab, setSelectedTab] = useState("tweets");
  return (
    <div className="Feed">
      <Tabs selectedTab={selectedTab} setSelectedTab={setSelectedTab} />
      <TweetPanel contentType={selectedTab} />
    </div>
  );
};

export default Feed;
