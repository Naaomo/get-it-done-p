require('dotenv').config();
const db = require("../model/helper");
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const FacebookStrategy = require('passport-facebook').Strategy;
const LocalStrategy = require('passport-local').Strategy;
const passportBcrypt  = require('bcrypt');

passport.serializeUser((user, done) => {
    done(null, user.u_id);
});

passport.deserializeUser((u_id, done) => {
    db(`SELECT * FROM users WHERE u_id=${u_id}`)
        .then(results => {
            return done(null, results.data[0]);
        })
        .catch(err => {
            console.log(err);
        });
});

// Google Strategy
passport.use(
    new GoogleStrategy({
        //options for the google strategy
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: "http://localhost:5000/auth/google/redirect"
    },
    function (accessToken, refreshToken, profile, done) {
        // passport callback function

        // console.log('passport callback function fired');
        console.log(profile);
        // console.log(`Firstname: ${profile._json.given_name}`);
        // console.log(`Lastname: ${profile._json.family_name}`);
        // console.log(`Email: ${profile._json.email}`);
        // console.log(`Picture: ${profile._json.picture}`);

        // Check if user exist in database
        db(`SELECT * FROM users WHERE google_id='${profile.id}';`)
            .then(results => {
                // console.log(results.data);
                // If user doesn't exist, Insert new user
                if(results.data.length < 1){
                    db(`INSERT INTO users(displayName, email, ut_id, google_id, profile_img) VALUES ('${profile._json.name}', '${profile._json.email}', '1', '${profile.id}', '${profile._json.picture}'); SELECT * FROM users WHERE google_id='${profile.id}';`)
                        .then(results => {
                            console.log(results.data);
                            done(null, results.data[1][0]);
                        })
                        .catch(err => {
                            console.log(err);
                        })
                } // else, print already existing user to the console
                else{
                    console.log(results.data);
                    done(null, results.data[0]);
                }
            })
            .catch(err => {
                console.log(err.message);
            });
    })
);

// Facebook Strategy
passport.use(
    new FacebookStrategy({
        //options for the google strategy
        clientID: process.env.FACEBOOK_CLIENT_ID,
        clientSecret: process.env.FACEBOOK_CLIENT_SECRET,
        callbackURL: "http://localhost:5000/auth/facebook/redirect",
        profileFields: ['id', 'displayName', 'photos', 'email', 'gender', 'name']
    },
    function (accessToken, refreshToken, profile, done) {
        // passport callback function

        // console.log('passport callback function fired');
        console.log(profile);
        // console.log(`Firstname: ${profile._json.given_name}`);
        // console.log(`Lastname: ${profile._json.family_name}`);
        // console.log(`Email: ${profile._json.email}`);
        // console.log(`Picture: ${profile._json.picture}`);

        // Check if user exist in database
        db(`SELECT * FROM users WHERE facebook_id='${profile.id}';`)
            .then(results => {
                // console.log(results.data);
                // If user doesn't exist, Insert new user
                if(results.data.length < 1){
                    db(`INSERT INTO users(displayName, email, ut_id, facebook_id, profile_img) VALUES ('${profile.displayName}', '${profile._json.email}', '1', '${profile.id}', '${profile.photos[0].value}'); SELECT * FROM users WHERE facebook_id='${profile.id}';`)
                        .then(results => {
                            console.log(results.data);
                            done(null, results.data[1][0]);
                        })
                        .catch(err => {
                            console.log(err);
                        })
                } // else, print already existing user to the console
                else{
                    console.log(results.data);
                    done(null, results.data[0]);
                }
            })
            .catch(err => {
                console.log(err.message);
            });
    })
);

const authenticateUser = (email, password, done) => {
    db(`SELECT * FROM users WHERE email='${email}';`)
        .then(async results => {
            console.log('FROM authenticateUser');
            console.log(results);
            if(results.data.length < 1) return done(null, false, { message: 'No user with that email'});
            let user = results.data[0];
            try{
                if(await passportBcrypt.compare(password, user.password)){
                    return done(null, user);
                } else{
                    return done(null, false, { message: 'Password incorrect'});
                }
            } catch (err){
                console.log(err)
                return done(err);
            }
        })
}

// TODO: Local Strategy
passport.use(new LocalStrategy({usernameField: 'email'}, authenticateUser));