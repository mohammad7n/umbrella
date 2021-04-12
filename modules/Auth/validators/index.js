const bodySchemas = require('./body-validators');

const bodyValidator = require('@modules/utils').validator('body', bodySchemas);

const validateReqBody = {
    register: bodyValidator('register'),
    login: bodyValidator('login')
};

module.exports = {
    validateReqBody
};
