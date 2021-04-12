const { MongooseQueryParser } = require('mongoose-query-parser');

const queryParser = () => {
    const exceptions = [
        '/api/users/auth/callback',
        '/api/users/auth/google/callback',
        '/api/users/auth/facebook/callback',
        '/api/users/auth/linkedin/callback',
    ];
    const outOfFilterKeys = ['pageNumber', 'pageSize', 'q'];
    const parser = new MongooseQueryParser();
    return function (req, res, next) {
        const url = req.originalUrl.split('?').shift();
        if (exceptions.includes(url)) {
            return next();
        }
        const query = parser.parse(req.query);
        outOfFilterKeys.forEach((key) => {
            if (key in query.filter) {
                query[key] = query.filter[key];
                delete query.filter[key];
            }
        });
        req.query = query;
        next();
    };
};

module.exports = queryParser;
