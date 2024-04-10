const express = require("express");
const path = require("path");
const mongoose = require("mongoose");
const cookiePaser = require("cookie-parser");
const passport = require('passport');
const session = require("express-session");

const userRoute = require("./routes/user");



const {
  checkForAuthenticationCookie,
} = require("./middlewares/authentication");

const app = express();
const PORT = 8000;

// mongodb connection
main()
  .then(() => {
    console.log("mongodb connected");
  })
  .catch((err) => {
    console.log(err);
  });



async function main() {
  await mongoose.connect("mongodb://127.0.0.1:27017/cart");
}

// middlewares
app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));
app.use(express.static(path.join(__dirname, "/public")));
app.use(express.urlencoded({ extended: true }));
app.use(cookiePaser());
app.use(checkForAuthenticationCookie("token"));
app.use(express.static(path.join(__dirname, 'public')));






// apis
app.get("/", (req, res) => {
  return res.render("home.ejs", {
    user: req.user,
  });
});


app.use("/user", userRoute);

app.listen(PORT, () => console.log(`server started at port ${PORT}`));
