// This file contains controllers related to managing tasks

const mongoose = require('mongoose'),
    Task = require('../models/task');

module.exports = {
    showAllTasks: (req, res) => {
        Task.find({})
            .exec()
            .then((tasks) => {
                res.render('tasks', { tasks: tasks });
            })
            .catch((error) => {
                console.log(error);
                return [];
            })
            .then(() => {
                console.log('from task-controller.js: showAllTasks completed');
            });
    },
    showNewTaskForm: (req, res) => {
        res.render('new-task');
    },
    saveNewTaskToDatabase: (req, res, next) => {
        Task.create({
            name: req.body.name,
            priority: req.body.priority,
        })
            .then((result) => {
                console.log(result);
            })
            .catch((error) => {
                console.error(error.message);
                res.send(error.message);
            });
        next();
    },
    deleteAllTask: (req, res) => {
        Task.remove({})
            .exec()
            .then(() => {
                console.log('All tasks were deleted from the database');
            })
            .catch((error) => {
                console.error(`Error deleting all tasks: ${error.message}`);
            });
    },
    showDetails: (req, res, next) => {
        let taskId = req.params.id;
        Task.findById(taskId)
            .then((task) => {
                res.locals.task = task; // the details view has access to this
                next();
            })
            .catch((error) => {
                console.error(error.message);
                next();
            });
    },
    showDetailsView: (req, res) => {
        res.render('show-details');
    },
    redirectView: (req, res) => {
        res.redirect('tasks');
    },
};
