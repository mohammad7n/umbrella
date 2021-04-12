const camelcaseKeys = require('camelcase-keys');

const camelCase = () => {
    return function (req, res, next) {
        req.query = camelcaseKeys(req.query, { exclude: ['_id'] });
        next();
    };
};

module.exports = camelCase;
