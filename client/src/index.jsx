import React from "react";
import ReactDOM from "react-dom/client";
import App from "./components/App";
import Feed from "./components/pages/Feed";
import NotFound from "./components/pages/NotFound";
import Profile from "./components/pages/Profile";
import Chatbook from "./components/pages/Chatbook";
import Game from "./components/pages/Game";


import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
  useNavigate
} from 'react-router-dom'
import { GoogleOAuthProvider } from "@react-oauth/google";

// This identifies your web application to Google's authentication service
const GOOGLE_CLIENT_ID = "884615792154-63asahc9uepm1aflp9rvq7sq12pm1cg8.apps.googleusercontent.com";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route errorElement={<NotFound />} element={<App />}>
      <Route path="/" element={<Feed />}/>
      <Route path="/profile/:userId" element={<Profile />}/>
      <Route path="/chat/" element={<Chatbook />}/>
      <Route path="/game/" element={<Game />}/>
    </Route>
  )
)

// renders React Component "Root" into the DOM element with ID "root"
ReactDOM.createRoot(document.getElementById("root")).render(
  <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
    <RouterProvider router={router} />
  </GoogleOAuthProvider>
);
