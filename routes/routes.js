// imported into app.js

const router = require('express').Router(),
    taskRoutes = require('./task-routes'),
    errorRoutes = require('./error-routes'),
    homeRoutes = require('./home-routes'),
    apiRoutes = require('./api-routes');

// Logging incoming requests, for development only.
router.use((req, res, next) => {
    console.log(req.url);
    next();
});

router.use('/tasks', taskRoutes);

router.use('/api', apiRoutes);

router.use('/', homeRoutes);
router.use('/', errorRoutes);

module.exports = router;
