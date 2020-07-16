require('dotenv').config();
const router = require('express').Router();
const passport = require('passport');
const passportSetup = require('../config/passport-setup');

const FE_URL=process.env.FE_URL;

//auth login
router.get('/login', (req, res) => {
    res.render('login');
});

//auth logout
router.get('/logout', (req, res) => {
    //handle with passport
    req.logout();
    res.redirect('/');
    req.session.notice = "Has been successfully been logged out!";
});

//auth with Google
router.get('/google', passport.authenticate('google', {
    scope: ['profile', 'email']
}));

// Google callback route
router.get('/google/redirect', passport.authenticate('google'), (req, res) => {
    let user = req.user;
    // res.send(req.user);
    // res.redirect('/profile/');
    // res.redirect('/');
    // const userID=req.user.u_id;
    res.cookie('userID', `${user.u_id}`).cookie('fname', `${user.fname}`).redirect(`${FE_URL}/`);
});


//auth with Facebook
router.get('/facebook', passport.authenticate('facebook'));

// Google callback route
router.get('/facebook/redirect', passport.authenticate('facebook'), (req, res) => {
    // res.send(req.user);
    res.redirect('/profile/');
});



module.exports = router;