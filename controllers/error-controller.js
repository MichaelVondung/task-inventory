// Error handler

// 2020-06-03 11:31:23 - Updated with the object-based exporting style (#1).

const httpStatus = require('http-status-codes');

// ! Style #1:
module.exports = {
    pageNotFoundError: (req, res) => {
        let errorCode = httpStatus.NOT_FOUND;
        res.status(errorCode);
        res.send('Page not found');
    },
    internalServerError: (error, req, res, next) => {
        let errorCode = httpStatus.INTERNAL_SERVER_ERROR;
        res.status(errorCode);
        res.send(`${error} - Internal server error`);
        next();
    },
};

// ! Style #2:
// exports.pageNotFoundError = (req, res) => {
//     let errorCode = httpStatus.NOT_FOUND;
//     res.status(errorCode);
//     res.send('Page not found');
// };
// exports.internalServerError = (error, req, res, next) => {
//     let errorCode = httpStatus.INTERNAL_SERVER_ERROR;
//     res.status(errorCode);
//     res.send(`${error} - Internal server error`);
//     next();
// };

// ! Style #3:
// const pageNotFoundError = (req, res) => {
//     let errorCode = httpStatus.NOT_FOUND;
//     res.status(errorCode);
//     res.send('Page not found');
// };
// const internalServerError = (error, req, res, next) => {
//     let errorCode = httpStatus.INTERNAL_SERVER_ERROR;
//     res.status(errorCode);
//     res.send(`${error} - Internal server error`);
//     next();
// };
// module.exports = { pageNotFoundError, internalServerError };
