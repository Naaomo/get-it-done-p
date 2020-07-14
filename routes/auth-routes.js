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
    res.send('logging out')
});

//auth with google TODO: handle with passport
router.get('/google', passport.authenticate('google', {
    scope: ['profile']
}));

// Google callback route
router.get('/google/redirect', (req, res) => {
    res.send('You reached the callback URI')
})

module.exports = router;