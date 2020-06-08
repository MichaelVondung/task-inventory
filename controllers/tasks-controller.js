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
            });
        // .then(() => {
        //     console.log('from task-controller.js: showAllTasks completed');
        // });
    },
    showNewTaskForm: (req, res) => {
        res.render('new-task');
    },
    saveNewTaskToDatabase: (req, res, next) => {
        Task.create({
            name: req.body.name,
            priority: req.body.priority,
        })
            .then((task) => {
                console.log(task);
                res.locals.redirect = `/tasks/${task._id}`;
                res.locals.task = task; // Only needed if I show the details view in the redirect.
                next();
            })
            .catch((error) => {
                console.error(`Error saving new record: ${error.message}`);
                next(error);
            });
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
    editDetails: (req, res, next) => {
        let userId = req.params.id;
        Task.findById(userId)
            .then((task) => {
                res.render('edit-task', { task: task });
            })
            .catch((error) => {
                console.error(`Error finding task: ${error.message}`);
                next(error);
            });
    },
    updateRecord: (req, res, next) => {
        let userId = req.params.id;
        let updatedData = {
            name: req.body.taskName,
            priority: req.body.taskPriority,
        };
        Task.findByIdAndUpdate(userId, { $set: updatedData })
            .then((task) => {
                res.locals.redirect = `/tasks/${task._id}`;
                res.locals.task = task;
                next();
            })
            .catch((error) => {
                console.error(`Error updating record: ${error.message}`);
                next(error);
            });
    },
    deleteRecord: (req, res, next) => {
        let userId = req.params.id;
        Task.findByIdAndDelete(userId)
            .then(() => {
                res.locals.redirect = '/tasks';
                next();
            })
            .catch((error) => {
                console.error(`Error deleting record: ${error.message}`);
                next(error);
            });
    },
    redirectView: (req, res) => {
        let redirectPath = res.locals.redirect;
        res.redirect(redirectPath);
    },
};
