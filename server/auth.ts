import { OAuth2Client } from "google-auth-library";
import { Request, Response, NextFunction } from "express";
import User from "./models/user";
import socketManager from "./server-socket";

// create a new OAuth client used to verify google sign-in
const CLIENT_ID = "884615792154-63asahc9uepm1aflp9rvq7sq12pm1cg8.apps.googleusercontent.com";
const client = new OAuth2Client(CLIENT_ID);

// Define the structure of the user from Google
interface GoogleUser {
  sub: string;
  name: string;
}

// accepts a login token from the frontend, and verifies that it's legit
async function verify(token: string): Promise<GoogleUser> {
  const ticket = await client
    .verifyIdToken({
      idToken: token,
      audience: CLIENT_ID,
    });
  return ticket.getPayload() as GoogleUser;
}

// gets user from DB, or makes a new account if it doesn't exist yet
async function getOrCreateUser(user: GoogleUser): Promise<any> {
  // the "sub" field means "subject", which is a unique identifier for each user
  const existingUser = await User.findOne({ googleid: user.sub });
  if (existingUser) return existingUser;
  const newUser = new User({
    name: user.name,
    googleid: user.sub,
  });
  return newUser.save();
}

function login(req: Request, res: Response): void {
  verify(req.body.token)
    .then((user) => getOrCreateUser(user))
    .then((user) => {
      // persist user in the session
      req.session.user = user;
      res.send(user);
    })
    .catch((err) => {
      console.log(`Failed to log in: ${err}`);
      res.status(401).send({ err });
    });
}

function logout(req: Request, res: Response): void {
  const userSocket = socketManager.getSocketFromUserID(req.user._id);
  if (userSocket) {
    // delete user's socket if they logged out
    socketManager.removeUser(req.user, userSocket);
  }

  req.session.user = null;
  res.send({});
}

function populateCurrentUser(req: Request, res: Response, next: NextFunction): void {
  // simply populate "req.user" for convenience
  req.user = req.session.user;
  next();
}

function ensureLoggedIn(req: Request, res: Response, next: NextFunction): void {
  if (!req.user) {
    return res.status(401).send({ err: "not logged in" });
  }

  next();
}

export default {
  login,
  logout,
  populateCurrentUser,
  ensureLoggedIn,
};
