const express = require('express'),
    router = express.Router(),
    homeController = require('../controllers/home-controller');

// Moved to routes.js, for development only.
// router.use(homeController.logIncomingRequestsToConsole);
router.get('/', homeController.showIndexPage);

module.exports = router;
