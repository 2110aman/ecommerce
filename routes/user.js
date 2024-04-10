const { Router } = require("express");
const { createTokenForUser } = require("../services/authentication");

const router = Router();

const User = require("../models/user");




router.get("/signin", (req, res) => {
  return res.render("login");
});




router.get("/logout", (req, res) => {
  res.clearCookie("token").redirect("/");
})


router.get('/login/google', passport.authenticate('google'));


router.get('/login/redirect/google', passport.authenticate('google', {
  successRedirect: '/',
  failureRedirect: '/login'
}));



router.post('/logout', function(req, res, next) {
  req.logout(function(err) {
    if (err) { return next(err); }
    res.redirect('/');
  });
});



router.post("/signin", async (req, res) => {
  const { email, password } = req.body;
  try {
    const token = await User.matchPasswordAndGenerateToken(email, password);

    return res.cookie("token", token).redirect("/");
  } catch (error) {
    return res.render("login", {
      error, // "Incorrect Email or Password"
    });
  }
});



router.post("/signup", async (req, res) => {
  const { fullName, email, password } = req.body;
  try {
    let ifUser = await User.findOne({email});
    if (ifUser) throw new Error("User already exists!! sign in");

    let user = await User.create({
      fullName,
      email,
      password,
    });

    const token = createTokenForUser(user);
    return res.cookie("token", token).redirect("/");

  } catch(error) {
    res.render("login", {
      error,
    });
  }
 
});





module.exports = router;
