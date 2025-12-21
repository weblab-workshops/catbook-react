const { OAuth2Client } = require("google-auth-library");
const User = require("./models/user");
const socketManager = require("./server-socket");

// Use env so backend/frontend can match without editing code
const CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
if (!CLIENT_ID) {
  throw new Error("Missing GOOGLE_CLIENT_ID in .env");
}

const client = new OAuth2Client(CLIENT_ID);

function verify(token) {
  return client
    .verifyIdToken({
      idToken: token,
      audience: CLIENT_ID,
    })
    .then((ticket) => ticket.getPayload());
}

// Same behavior: find by googleid or create
function getOrCreateUser(googleProfile) {
  return User.findOne({ googleid: googleProfile.sub }).then((existingUser) => {
    if (existingUser) return existingUser;
    // mimic old "new User(...).save()" shape
    return User.create({ name: googleProfile.name, googleid: googleProfile.sub });
  });
}

function login(req, res) {
  // some frontends send credential instead of token
  const token = req.body.token || req.body.credential;

  verify(token)
    .then((profile) => getOrCreateUser(profile))
    .then((user) => {
      req.session.user = user; // keep old behavior
      res.send(user);
    })
    .catch((err) => {
      console.log(`Failed to log in: ${err}`);
      res.status(401).send({ err: String(err.message || err) });
    });
}

function logout(req, res) {
  // Old code used req.user._id; in SQL we'll likely have req.user.id
  const userId = req.user?._id || req.user?.id;

  if (userId) {
    const userSocket = socketManager.getSocketFromUserID(userId);
    if (userSocket) socketManager.removeUser(req.user, userSocket);
  }

  req.session.user = null;
  res.send({});
}

function populateCurrentUser(req, res, next) {
  req.user = req.session.user;
  next();
}

function ensureLoggedIn(req, res, next) {
  if (!req.user) return res.status(401).send({ err: "not logged in" });
  next();
}

module.exports = { login, logout, populateCurrentUser, ensureLoggedIn };
