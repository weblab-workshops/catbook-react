import React from "react";
import ReactDOM from "react-dom/client";
import App from "./components/App";
// TODO (Step 5.2): import Feed, NotFound, and Profile

// TODO (Step 5.1): uncomment the following imports from react-router-dom
// import {
//   createBrowserRouter,
//   createRoutesFromElements,
//   Route,
//   RouterProvider,
// } from 'react-router-dom'

// TODO (Step 5.2): implement router

// renders React Component "Root" into the DOM element with ID "root"
ReactDOM.createRoot(document.getElementById("root")).render(
  <>
    <App />
    {/* TODO (Step 5.3): use Router to route between pages */}
  </>
);
