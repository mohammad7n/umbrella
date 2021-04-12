const passport = require('passport');
const JwtStrategy = require('passport-jwt').Strategy,
    { ExtractJwt } = require('passport-jwt');

const options = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: process.env.JWT_SECRET_KEY
};

const jwtBearer = (modelName, jwtBearerCb) => {
    passport.use(`${modelName}-jwtBearer`, new JwtStrategy(options, jwtBearerCb));
    return passport.authenticate(`${modelName}-jwtBearer`, { session: false });
};

module.exports = jwtBearer;
