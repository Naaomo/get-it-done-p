require('dotenv').config();
const db = require("../model/helper");
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;

passport.serializeUser((user, done) => {
    done(null, user.u_id);
});

passport.deserializeUser((u_id, done) => {
    db(`SELECT * FROM users WHERE u_id=${u_id}`)
        .then(results => {
            done(null, results.data[0]);
        })
        .catch(err => {
            console.log(err);
        });
});

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
        // console.log(profile);
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
                    db(`INSERT INTO users(fname, lname, email, ut_id, google_id, profile_img) VALUES ('${profile._json.given_name}', '${profile._json.family_name}', '${profile._json.email}', '1', '${profile.id}', '${profile._json.picture}'); SELECT * FROM users WHERE google_id='${profile.id}';`)
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