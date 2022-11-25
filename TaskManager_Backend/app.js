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


app.use(express.urlencoded({extended:true}))
app.use(
    session({
        secret: 'keyboard cat',
        resave: false,
        saveUninitialized: false,
        // store: new MongoStore({ mongooseConnection: mongoose.connection }),
    })
)

app.use(cors(
    origin = '*'
));


app.use(passport.initialize());
app.use(passport.session());


app.get('/test', (req, res) => {
    res.send({"status": "workings"});
});

app.get('/', (req, res) => {
    if(req.isAuthenticated()){
        res.send({"user": req.user.name , "user": req.user.email , "user": req.user.pic})
    }
    else{
        res.send({"status" : "failed" , "message" : "login is required"})
    }
});

app.get('/auth/google',
    passport.authenticate('google', { scope : ['profile', 'email'] }));
app.get('/auth/google/callback',
            passport.authenticate('google', {successRedirect: '/auth/google/callback/success' , failureRedirect: '/'}),
            (req, res) => {
                res.send({"status" : "success" , "message" : "login successfully"})
            }
);

app.get('/auth/google/callback/success', (req, res) =>{
    if(req.isAuthenticated()) {
        res.send({"status" : "success" , "message" : "login successfully"})
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











// 
// locations = [

//     {
//       'city' => 'New York',
//       'state' => 'NY',
//       'zip' => '000000',
//     },
//     {
//       'city' => 'New York',
//       'state' => 'NY',
//       'zip' => '000000',
//     },
//     {
//       'city' => 'New York',
//       'state' => 'NY',
//       'zip' => '000000',
//     },
//     {
//       'city' => 'New York',
//       'state' => 'NY',
//       'zip' => '000000',
//     },
//     {
//       'city' => 'New York',
//       'state' => 'NY',
//       'zip' => '000000',
//     },
  
  
//   ]