const passport = require("passport");
var GoogleStrategy = require("passport-google-oauth20");
var LocalStrategy = require("passport-local");

const User = require("./models/user");
const bcrypt = require("bcrypt");

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

passport.use(
  new LocalStrategy({ usernameField: "email", passwordField: "password" }, function(
    email,
    password,
    done
  ) {
    User.findOne({ email }, async function(err, user) {
      if (err) {
        return done(err);
      }
      if (!user) {
        return done(null, false);
      }
      const match = await bcrypt.compare(password, user.password);
      if (!match) {
        return done(null, false);
      }

      return done(null, user);
    });
  })
);

passport.serializeUser(function(user, done) {
  done(null, user.id);
});

passport.deserializeUser(function(id, done) {
  User.findById(id, function(err, user) {
    done(err, user);
  });
});

module.exports = passport;
