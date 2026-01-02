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
const GOOGLE_CLIENT_ID = "742137728386-pqusg4i0ihv54t2if3m4866kih4j0jbt.apps.googleusercontent.com";

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
