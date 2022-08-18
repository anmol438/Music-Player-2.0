const passport = require('passport');
const localStrategy = require('passport-local').Strategy;
const User = require('../models/user');

passport.use(new localStrategy(
    {
        usernameField: 'email',
        passReqToCallback: true
    },

    async (req, email, password, done) => {
        try {
            let user = await User.findOne({ email: email });
            if (!user || user.password != password) {
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

passport.serializeUser((user, done) => {
    done(null, {
        id: user.id,
        email: user.email,
        name: user.name
    });
});

passport.deserializeUser((user, done) => {
    User.findById(user.id, (err, user) => {
        if (err) {
            console.log("Error in finding user while passport deserializing ---> ", err);
            return done(err);
        }

        return done(null, user);
    });
});

passport.check_auth = (req, res, next) => {
    if (req.isAuthenticated()) {
        return next();
    }
    return res.redirect('/users/sign-in');
};

passport.set_auth_user = (req, res, next) => {
    if (req.isAuthenticated()) {
        res.locals.user = req.user;
    }
    return next();
};


module.exports = passport;