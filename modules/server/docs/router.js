const router = require('express').Router();
const swagger = require('./swagger');

router.use('/swagger', swagger);

module.exports = router;
