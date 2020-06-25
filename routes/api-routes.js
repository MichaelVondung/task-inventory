const router = require('express').Router(),
    tasksController = require('../controllers/tasks-controller');

router.get('/tasks', tasksController.index, tasksController.respondJSON);
router.use(tasksController.errorJSON);

module.exports = router;
