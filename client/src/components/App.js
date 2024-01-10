import React, { useState } from "react";

// to use styles, import the necessary CSS files
import "./App.css";
import Stopwatch from "./modules/Stopwatch";

/**
 * Define the "App" component as a function.
 */
const App = () => {
  const [showStopwatch, setShowStopwatch] = useState(true);
  return (
    <>
      <button onClick={() => setShowStopwatch(!showStopwatch)}>Toggle Clock</button>
      {showStopwatch ? <Stopwatch /> : <></>}
    </>
  );
};

export default App;
