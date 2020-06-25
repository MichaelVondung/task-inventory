// All routes related to Tasks.

const express = require('express'),
    router = express.Router(),
    tasksController = require('../controllers/tasks-controller');

router.get('/', tasksController.index, tasksController.indexView);
router.get('/new', tasksController.new);
router.post('/create', tasksController.create, tasksController.redirectView);
router.get('/delete-all', tasksController.deleteAllTasks);
router.get('/:id', tasksController.show, tasksController.showView);
router.get('/:id/edit', tasksController.edit);
router.put('/:id/update', tasksController.update, tasksController.redirectView);
router.delete('/:id/delete', tasksController.delete, tasksController.redirectView);

module.exports = router;
