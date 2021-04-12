const router = require('express').Router();
const controller = require('./controller');
const { validateReqBody } = require('./validators');

router
    .route('/register')
    .post(validateReqBody.register, controller.register);

router
    .route('/login')
    .post(validateReqBody.login, controller.login);

module.exports = router;
