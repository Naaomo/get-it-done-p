require('dotenv').config();
const router = require('express').Router();
const bodyParser = require("body-parser");
const db = require('../model/helper');
const passport = require('passport');
const passportSetup = require('../config/passport-setup');
const bcrypt = require('bcrypt');
const FE_URL=process.env.FE_URL;

router.use(bodyParser.json());

//auth logout
router.get('/logout', (req, res) => {
    //handle with passport
    req.logout();
    res.redirect(`${FE_URL}/`);
    req.session.notice = "Has been successfully been logged out!";
});

// TODO: User Registration
router.post('/register', async (req, res) => {
    // Check if user exists
    db(`SELECT * FROM users WHERE email = '${req.body.email}';`)
        .then(async result => {
            // if user exist, send an error message
            if(result.data.length > 0){
                // res.status(400).send('A user with this email already exists');
                throw new Error("A user with this email already exists");
            } // if user doesn't exist....
            else{
                try {
                    // hash the password
                    const hashedPassword = await bcrypt.hash(req.body.password, 10);
                    // insert into user database
                    db(`INSERT INTO users(displayName, email, password, ut_id) VALUES('${req.body.fullName}', '${req.body.email}', '${hashedPassword}', 1); SELECT * FROM users WHERE email='${req.body.email}';`)
                        .then(result => {
                            let user = result.data[1][0];
                            console.log('IN AUTH/REGISTER');
                            console.log(user.u_id);
                            // res.cookie('userID', `${results.data[1][0].u_id}`, {maxAge: 3600000});
                            // res.cookie('displayName', `${user.displayName}`, {maxAge: 3600000});
                            // res.redirect(`${FE_URL}/`);
                            // res.status(201).send(`${user.u_id}`);
                            res.status(201).send("User Created");
                        })
                        .catch(err => res.status(500).send(err.message))
                }catch (err) {
                    res.status(500).send(err.message);
                }
            }
        })
        .catch(err => {
            res.status(500).send(err.message);
        });
});

//auth login
router.post('/login', passport.authenticate('local', {
    successRedirect: '/auth/login/redirect',
    failureRedirect: '/'
}));

router.get('/login/redirect', (req, res) => {
    res.clearCookie('userID');
    res.clearCookie('displayName');
    res.clearCookie('profile_img');
    let user = req.user;
    console.log("FROM AUTH/LOGIN");
    console.log(user);
    res.cookie('userID', `${user.u_id}`, {maxAge: 3600000});
    res.cookie('displayName', `${user.displayName}`, {maxAge: 3600000});
    res.cookie('profile_img', `${user.profile_img}`, {maxAge: 3600000});
    res.redirect(`${FE_URL}/`);
});

//auth with Google
router.get('/google', passport.authenticate('google', {
    scope: ['profile', 'email']
}));

// Google callback route
router.get('/google/redirect', passport.authenticate('google'), (req, res) => {
    let user = req.user;
    res.clearCookie('userID');
    res.clearCookie('displayName');
    res.clearCookie('profile_img');
    res.cookie('userID', `${user.u_id}`, {maxAge: 3600000});
    res.cookie('displayName', `${user.displayName}`, {maxAge: 3600000});
    res.cookie('profile_img', `${user.profile_img}`, {maxAge: 3600000});
    res.redirect(`${FE_URL}/`);
});


//auth with Facebook
router.get('/facebook', passport.authenticate('facebook', { scope: ['email'] }));

// Google callback route
router.get('/facebook/redirect', passport.authenticate('facebook'), (req, res) => {
    let user = req.user;
    res.clearCookie('userID');
    res.clearCookie('displayName');
    res.cookie('userID', `${user.u_id}`, {maxAge: 3600000});
    res.cookie('displayName', `${user.displayName}`, {maxAge: 3600000});
    res.redirect(`${FE_URL}/`);
});

module.exports = router;