const passport = require('passport');
const localStrategy = require('passport-local').Strategy;
const User = require('../models/user');

passport.use(new localStrategy(
    {
        usernameField:'email',
        passReqToCallback:true
    },

    async (req, email, password, done) => {
        try {
            let user = await User.findOne({email:email});
            if(!user || user.password != password){
                console.log("Invalid username/password");
                return done(null, false);
            }

            return done(null, user);

        } catch (err) {
            console.log("Error in finding user in passport authentication ---> ", err);
            return done(err);
        }
    }
));