const router = require('express').Router();
const { router: swagger } = require('../docs');

const { router: book } = require('@modules/book');
const { router: auth } = require('@modules/auth');

router.use('/docs', swagger);
router.use('/books', book);
router.use('/auth', auth);
module.exports = router;
