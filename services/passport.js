const passport = require('passport');
const User = require('../models/user');
const config = require('../config');
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const localStrategy = require('passport-local');


const localOptions = { usernameField: 'email'};
const localLogin = new localStrategy(localOptions, (email, password, done) => {
    User.findOne({ email: email }, (err, user) => {
        if(err) { return done(err) }

        if(!user) { return done(null, false) }

        user.comparePassword(password, (err, isMatch) => {
            if(err) { return done(err) }
            if(!isMatch) { return done(null, false) }

            return done(null, user);
        })
    })
})


const jwtOptions = {
    jwtFromRequest: ExtractJwt.fromHeader('authorization'),
    secretOrKey: config.secret
};

const jwtLogin = new JwtStrategy(jwtOptions, (payload, done) => {
    User.findById(payload.sub, (err, user) => {
        if(err) { return done(err, false) }

        if(user) {
            done(null, user);
        } else {
            done(null, false);
        }
    })
})

passport.use(jwtLogin);
passport.use(localLogin);