const model = require('./model');
const genericMethod = require('@modules/generic')(model);


module.exports = {
    ...genericMethod
};
