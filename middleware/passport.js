const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const userController = require("../controller/userController");
const localLogin = new LocalStrategy(
  {
    usernameField: "email", // default is username not email
    passwordField: "password",
  },
  (email, password, done) => {
    const user = userController.getUserByEmailIdAndPassword(email, password);
    return user
      ? done(null, user)  // create session for a user
      : done(null, false, {
          message: "Your login details are not valid. Please try again",
        });
  }
);

// This function is called by password.authenticate
// It creates a session and attaches req.user
// It creates req.session.passport.user object where user id is stored
// It defines what is stored in the session
// first parameter is passed return value 'user' of localLogin function
passport.serializeUser(function (user, done) {
  done(null, user.id);
});


// The function uses id parameter which you store in the session, and look for user in the database.  
// Reattach to req.user from the database to ensure we always have up-to-date user information.
passport.deserializeUser(function (id, done) {
  let user = userController.getUserById(id);
  if (user) {
    done(null, user); // User object attaches to the request as req.user
  } else {
    done({ message: "User not found" }, null);
  }
});

module.exports = passport.use(localLogin); // return instance of localStrategy

//-------------  Server Hard Drive -----------
/*
Session = {
  's%3Al3ozSdvQ83TtC5RvJ.CibaQoHtaY0H3QOB1kqR8H2A': {
    user.id is stored here by using serializeUser method
  }
}

The s%3A at the start indicates that it is a signed cookie.
The l3ozSdvQ83TtC5RvJ is the session id (you can confirm this by checking req.session.id on the server).
The CibaQoHtaY0H3QOB1kqR8H2A is the signature.

*/
