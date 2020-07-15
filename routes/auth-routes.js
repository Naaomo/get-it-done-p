const router = require('express').Router();
const passport = require('passport');
const passportSetup = require('../config/passport-setup');

//auth login
router.get('/login', (req, res) => {
    res.render('login');
});

//auth logout
router.get('/logout', (req, res) => {
    //TODO: handle with passport
    req.logout();
    res.redirect('/');
});

//auth with google
router.get('/google', passport.authenticate('google', {
    scope: ['profile', 'email']
}));

// Google callback route
router.get('/google/redirect', passport.authenticate('google'), (req, res) => {
    // res.send(req.user);
    res.redirect('/profile/');
});

module.exports = router;