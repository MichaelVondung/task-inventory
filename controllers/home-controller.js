// 2020-06-03 10:57:14 - Updated to a style where one object with functions is exported.
// 2020-06-25 14:11:30 - Moved request logger to routes.js.

module.exports = {
    showIndexPage: (req, res) => {
        res.render('index');
    },
};

