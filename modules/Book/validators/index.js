const bodySchemas = require('./body-validators');
const querySchemas = require('./query-validators');

const bodyValidator = require('@modules/utils').validator('body', bodySchemas);
const queryValidator = require('@modules/utils').validator('query', querySchemas);

const validateReqBody = {
    createBook: bodyValidator('createBook'),
    updateBook: bodyValidator('updateBook')
};

const validateReqQuerystring = {
    searchBook: queryValidator('searchBook'),
};

module.exports = {
    validateReqBody,
    validateReqQuerystring
};
