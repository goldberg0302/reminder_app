const express = require("express");
const passport = require("../middleware/passport");
const { forwardAuthenticated } = require("../middleware/checkAuth");

const router = express.Router();

router.get("/login", forwardAuthenticated, (req, res) => 
  res.render("auth/login")
);

router.get("/register", forwardAuthenticated, (req, res) => 
  res.render(
    "auth/register",
    {layout: './layout'},
  )
);

// The code 
router.post(
  "/login",
  passport.authenticate("local", {
    successRedirect: "/dashboard",
    // successReturnToOrRedirect: "/dashboard",
    failureRedirect: "auth/login",
    keepSessionInfo:true,
    })
);

router.get("/logout", (req, res, next) => {
  req.logout((err)=>{
    if(err){return next(err)};
  })
  res.redirect("/login");
});

module.exports = router;
