const { OAuth2Client } = require("google-auth-library");
const User = require("./models/user");
const socket = require("./server-socket");
const keys = require("./creds.json");

// create a new OAuth client used to verify google sign-in
const CLIENT_ID = "121479668229-t5j82jrbi9oejh7c8avada226s75bopn.apps.googleusercontent.com";

// accepts a login token from the frontend, and verifies that it's legit
function verify(token) {
  return client
    .verifyIdToken({
      idToken: token,
      audience: CLIENT_ID,
    })
    .then((ticket) => ticket.getPayload());
}

// gets user from DB, or makes a new account if it doesn't exist yet
function getOrCreateUser(user) {
  // the "sub" field means "subject", which is a unique identifier for each user
  return User.findOne({ googleid: user.sub }).then((existingUser) => {
    if (existingUser) return existingUser;

    const newUser = new User({
      name: user.name,
      googleid: user.sub,
    });

    return newUser.save();
  });
}

function login(req, res) {
  console.log(keys.web.client_id, keys.web.client_secret);
  const client = new OAuth2Client(keys.web.client_id, keys.web.client_secret);

  console.log(req.body.code);
  client
    .getToken(req.body.code)
    .then((tokens) => {
      console.log(tokens);
    })
    .catch((err) => {
      console.log(`Failed to log in: ${err}`);
    });

  // verify(req.body.token)
  //   .then((user) => getOrCreateUser(user))
  //   .then((user) => {
  //     // persist user in the session
  //     req.session.user = user;
  //     res.send(user);
  //   })
  //   .catch((err) => {
  //     console.log(`Failed to log in: ${err}`);
  //     res.status(401).send({ err });
  //   });
}

function logout(req, res) {
  const userSocket = socket.getSocketFromUserID(req.user._id);
  if (userSocket) {
    // delete user's socket if they logged out
    socket.removeUser(req.user, userSocket);
  }

  req.session.user = null;
  res.send({});
}

function populateCurrentUser(req, res, next) {
  // simply populate "req.user" for convenience
  req.user = req.session.user;
  next();
}

function ensureLoggedIn(req, res, next) {
  if (!req.user) {
    return res.status(401).send({ err: "not logged in" });
  }

  next();
}

module.exports = {
  login,
  logout,
  populateCurrentUser,
  ensureLoggedIn,
};
