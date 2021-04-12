const errorCodeList = require('./codes/error-codes');
const statusCodeList = require('./codes/status-codes');
const mongooseError = require('./mongoose-error');

const getByErrorCode = errorCode => errorCodeList[errorCode] || errorCodeList['INTERNAL_SERVER_ERROR'];
const getByStatusCode = statusCode => statusCodeList[statusCode] || statusCodeList[500];

const expressErrorHandler = (err, req, res, next) => {
    console.log('Response error handler:', err);

    if (Array.isArray(err)) {
        res.status(400).json({
            success: false,
            message: 'invalid input',
            errors: err
        });

    } else {
        if (err.name && err.name === 'MongoError') {
            err = { errorCode: mongooseError(err) };
        }
        const { status, errorCode = getByStatusCode(status) } = err;
        const { message, statusCode } = getByErrorCode(errorCode);
        console.log(`statusCode: ${statusCode}, errorCode: ${errorCode}, message: ${message}`);
        res.status(statusCode).json({
            success: false,
            message: 'failed',
            errors: [{
                message,
                errorCode
            }]
        });
    }
};

module.exports = expressErrorHandler;
