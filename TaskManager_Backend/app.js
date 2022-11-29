const dotenv = require("dotenv");
dotenv.config();
const express = require("express");
const app = express();
const session = require("express-session");
const connectDB = require("./config/connectDB.js");
const cors = require("cors");
const passport = require("passport");
require("./config/passportSetup");
const port = process.env.PORT;
const DATABASE_URL = process.env.DATABASE_URL;
const f_URL = process.env.FRONTEND_URL;
connectDB(DATABASE_URL);
const authRoute = require('./routes/userRoute.js')
app.use(express.urlencoded({ extended: true }));
app.use(
    session({
    secret: "keyboard cat",
    resave: false,
    saveUninitialized: false,
    })
);
app.use(cors((origin = "*")));
app.use(passport.initialize());
app.use(passport.session());
app.use('/' , authRoute)
app.listen(port, () => console.log("App listening on port " + port));