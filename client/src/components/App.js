import React, { useState } from "react";

// to use styles, import the necessary CSS files
import "./App.css";
import Clock from "./modules/Clock";

/**
 * Define the "App" component as a function.
 */
const App = () => {
  const [showClock, setShowClock] = useState(true);
  return (
    <>
      <button onClick={() => setShowClock(!showClock)}>Toggle Clock</button>
      {showClock ? <Clock /> : <></>}
    </>
  );
};

export default App;
