const passport = require("passport");
require("../config/passportSetup.js");
const index = (req , res) => {
    if (req.isAuthenticated()) {
        res.send({ user: req.user.name, user: req.user.email, user: req.user.pic });
        } else {
        res.send({ status: "failed", message: "login is required" });
        }
}
const user_login = (
    passport.authenticate("google", { scope: ["profile", "email"] })
);
const user_callback = (
    passport.authenticate("google", {
        successRedirect: "/auth/google/callback/success",
        failureRedirect: "/error",
    })
);
const login_success = (req , res) => {
    if (req.isAuthenticated()) {
        res.writeHead(301, {
            Location: f_URL + "/index.html",
            }).end();
        }
    }
const login_failed = (req , res) => {
    res.writeHead(301, {
        Location: f_URL + "/auth_index.html",
    })
}
const user_logout = (req , res) => {
    req.session.destroy();
  // res.send({"status" : "Success" , "message" : "logout successfully"})
    res.writeHead(301, {
        Location: f_URL + "/auth_index.html",
    }).end();
    req.logout();
}
module.exports = {
    index,
    user_login,
    user_callback,
    login_success,
    login_failed,
    user_logout
}