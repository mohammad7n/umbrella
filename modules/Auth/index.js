const router = require('./router');
const authenticate = require('./middlewares/authenticate');

module.exports = {
    router,
    authenticate
};
