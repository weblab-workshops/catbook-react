import React from "react";
import ReactDOM from "react-dom/client";
import App from "./components/App";
// TODO (step5): import Feed, NotFound, and Profile

// TODO (step5): uncomment the following imports from react-router-dom
// import {
//   createBrowserRouter,
//   createRoutesFromElements,
//   Route,
//   RouterProvider,
// } from 'react-router-dom'

// TODO (step5): implement router

// renders React Component "Root" into the DOM element with ID "root"
ReactDOM.createRoot(document.getElementById("root")).render(
  <>
    <App />
    {/* TODO (step5): use Router to route between pages */}
  </>
);
