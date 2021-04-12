const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

const local = (modelName, localCb, options) => {
    passport.use(`${modelName}-local`, new LocalStrategy(
        {
            usernameField: 'email',
            passwordField: 'password',
            session: false
        },
        localCb
    ));
    return passport.authenticate(`${modelName}-local`, { session: false });
};

module.exports = local;
