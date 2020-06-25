const router = require('express').Router(),
    errorController = require('../controllers/error-controller');

router.use(errorController.pageNotFoundError);
router.use(errorController.internalServerError);

module.exports = router;
