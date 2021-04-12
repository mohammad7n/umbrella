const router = require('express').Router();
const controller = require('./controller');
const { validateReqBody, validateReqQuerystring } = require('./validators');
const { authenticate } = require('@modules/auth');

router.use(authenticate.userBearer);

router.route('/')
    .post(validateReqBody.createBook, controller.createBook)
    .get(validateReqQuerystring.searchBook, controller.searchBooksWithPagination);

router.route('/:bookId')
    .get(controller.getBook)
    .put(validateReqBody.updateBook, controller.updateBook)
    .delete(controller.deleteBook);

router.route('/thrid-party')
    .get(validateReqQuerystring.searchBook, controller.thridPartyBookSearch);

module.exports = router;
