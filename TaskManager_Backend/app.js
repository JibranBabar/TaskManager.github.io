const dotenv = require('dotenv');
dotenv.config();
const cors = require('cors');
const express = require('express');
app.use(cors());
const app = express();
const port = process.env.PORT;
const DATABASE_URL = process.env.DATABASE_URL
connectDB(DATABASE_URL);

const passport = require('./config/passportSetup');

const session = require('express-session');
app.use(session({
    resave: false,
    saveUninitialized: true,
    secret: 'SECRET' 
}));

/*  PASSPORT SETUP  */
const { stringify } = require('querystring');
app.use(passport.initialize());
app.use(passport.session());

app.get('/', (req, res) => {
    if(req.isAuthenticated()){
        res.render('pages/profile' , {name: req.user.name , email: req.user.email , pic: req.user.pic});
    }
    else{
        res.render('pages/auth');
    }
});

app.get('/success', (req, res) =>{
    res.render("pages/profile.ejs",{name: req.user.name , email: req.user.email , pic: req.user.pic})
});
app.get('/error', (req, res) => res.send("error logging in"));

app.get('/auth/logout', (req, res) => {
    req.session.destroy();
    res.redirect('/');
    req.logout();
})
app.get('/auth/google', 
    passport.authenticate('google', { scope : ['profile', 'email'] }));
app.get('/auth/google/callback', 
    passport.authenticate('google', { failureRedirect: '/error' }),
    function(req, res) {
    // Successful authentication, redirect success.
    res.redirect('/success');
});

app.listen(port , () => console.log('App listening on port ' + port));