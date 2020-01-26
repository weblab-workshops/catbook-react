const passport = require("passport");
var GoogleStrategy = require("passport-google-oauth20");

const User = require("./models/user");

// set up passport configs
passport.use(
  new GoogleStrategy(
    {
      clientID: "1023896289089-dmo7at78mmlrhto4u6e7ifhlt44rlait.apps.googleusercontent.com",
      clientSecret: "jEWQbBdvUZcHDWK6yasjEeiq",
      callbackURL: "/auth/google/callback",
    },
    function(accessToken, refreshToken, profile, done) {
      User.findOne({ googleid: profile.id })
        .then((user) => {
          if (user) return user;

          // create user if doesn't exist yet
          const newUser = new User({
            name: profile.displayName,
            googleid: profile.id,
          });

          return newUser.save();
        })
        .then((user) => done(null, user))
        .catch(done);
    }
  )
);

passport.serializeUser(function(user, done) {
  done(null, user.id);
});

passport.deserializeUser(function(id, done) {
  //   console.log("im running on id " + id);
  User.findById(id, function(err, user) {
    done(err, user);
  });
});

module.exports = passport;
