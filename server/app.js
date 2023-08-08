const express = require("express");
const cookieParser = require("cookie-parser");
const passport = require("passport");
const cors = require("cors");
const morgan = require('morgan');
const { CLIENT_URL, PORT } = require("./constants");

const app = express();

//import passport middleware
require("./middlewares/passport-middleware");

//initialize middlewares
app.use(express.json());
app.use(morgan('dev'))
app.use(express.urlencoded({ extended: false }));
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
app.listen(PORT, () => {
  console.log(`The app is running at http://localhost:${PORT}`);
});
