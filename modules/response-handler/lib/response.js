const expressResponsehandler = (req, res, next) => {
    const handlers = {
        success: (data, statusCode = 200, message = 'ok') => {
            let metaData = undefined;
            if (data && data.pagination) {
                metaData = {
                    pagination: data.pagination
                };
                data = data.records;
            }
            res.status(statusCode).json({
                success: true,
                metaData,
                data,
                message,
            });
        },
        excel: (xlsx, name) => {
            res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
            res.setHeader('Content-Disposition', `attachment; filename=${name}.xlsx`);
            xlsx.write(res)
                .then(() => {
                    res.end();
                });
        },
        fail: (errorCode = 'INTERNAL_SERVER_ERROR', statusCode = 500) =>
            next({
                errorCode,
                statusCode,
            }),
    };
    Object.assign(res, handlers);
    next();
};

module.exports = expressResponsehandler;
