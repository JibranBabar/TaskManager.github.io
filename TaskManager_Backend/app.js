const dotenv = require('dotenv')
dotenv.config();
const express = require('express');
const app = express();
const session = require('express-session');
const connectDB = require('./config/connectDb')
const cors = require('cors');
const passport = require('passport')
require('./config/passportSetup');
const port = process.env.PORT;
const DATABASE_URL = process.env.DATABASE_URL
connectDB(DATABASE_URL);

app.use(session({
    resave: false,
    saveUninitialized: true,
    secret: 'SECRET' 
}));
app.use(express.urlencoded({extended: false}));
app.use(cors(
    origin = '*'
    
));

const { stringify } = require('querystring');
const { METHODS } = require('http');
app.use(passport.initialize());
app.use(passport.session());


app.get('/', (req, res) => {
    if(req.isAuthenticated()){
        res.send({"user": req.user.name , "user": req.user.email , "user": req.user.pic})
        // res.render('pages/profile' , {name: req.user.name , email: req.user.email , pic: req.user.pic});
    }
    else{
        res.send({"status" : "failed" , "message" : "login is required"})
        // res.render('pages/auth');
    }
});

app.get('/auth/google',
    passport.authenticate('google', { scope : ['profile', 'email'] }));
app.get('/auth/google/callback',cors(),
    passport.authenticate('google', { failureRedirect: '/error' }),
    function(req, res) {
        res.send({"status" : "success" , "message" : "login successfully"})
    // Successful authentication, redirect success.
    // res.redirect('/success');
});

app.get('/success', (req, res) =>{
    if(req.isAuthenticated()) {
        res.send({"user": req.user.name , "user": req.user.email , "user": req.user.pic});
        // res.render("pages/profile.ejs",{name: req.user.name , email: req.user.email , pic: req.user.pic})
    }
});
app.get('/error', (req, res) => res.send("error logging in"));

app.get('/auth/logout', (req, res) => {
    req.session.destroy();
    res.send({"status" : "Success" , "message" : "logout successfully"})
    // res.redirect('/');
    req.logout();
})

app.listen(port , () => console.log('App listening on port ' + port));