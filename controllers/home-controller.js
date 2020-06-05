// This file handles has general controllers

// 2020-06-03 10:57:14 - Updated to a style where one object with functions is exported.

module.exports = {
    logIncomingRequestsToConsole: (req, res, next) => {
        console.log(req.url);
        next();
    },
    showIndexPage: (req, res) => {
        res.render('index');
    },
};

// exports.logIncomingRequestsToConsole = (req, res, next) => {
//     console.log(req.url);
//     next();
// };

// exports.showIndexPage = (req, res) => {
//     res.render('index');
// };
