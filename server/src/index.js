const express = require("express");
const app = express();
const { CLIENT_URL } = require("./constants");
const cookieParser = require("cookie-parser");
const passport = require("passport");
const cors = require("cors");

//import passport middleware
require("./middlewares/passport-middleware");

//initialize middlewares
app.use(express.json());
app.use(cookieParser());
app.use(cors());
app.use(passport.initialize());

//import routes
const authRoutes = require("./routes/auth");
const userData = require("./routes/showData");
const viewprofile = require("./routes/viewProfile");

//initilaize routes
app.use("/api", authRoutes);
app.use("/api", userData);
app.use("/api", viewprofile);

//app start
const PORT = 8000;
app.listen(PORT, () => {
  console.log(`The app is running at http://localhost:${PORT}`);
});
