require('dotenv').config();
const passport = require('passport');
const express = require('express');
const logger = require('morgan');
const cors = require('cors');
const xssClean = require('xss-clean');
const routes = require('./routes');
require('./db/connection');
const responseHandler = require('@modules/response-handler');
const app = express();

app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(xssClean());
app.use(responseHandler.response);
app.use(passport.initialize());
app.use('/api', routes);
app.use(responseHandler.error);
app.use(routes);

module.exports = app;
