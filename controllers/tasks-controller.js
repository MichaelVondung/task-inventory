// This file contains controllers related to managing tasks

const mongoose = require('mongoose'),
    Task = require('../models/task'),
    httpStatus = require('http-status-codes');

module.exports = {
    index: (req, res, next) => {
        Task.find({})
            .then((tasks) => {
                res.locals.tasks = tasks;
                next();
                // res.render('tasks', { tasks: tasks });
            })
            .catch((error) => {
                console.error(`Error loading all records: ${error.message}`);
                next(error);
            });
        // .then(() => {
        //     console.log('from task-controller.js: showAllTasks completed');
        // });
    },
    indexView: (req, res) => {
        res.render('tasks/index');
    },
    new: (req, res) => {
        res.render('tasks/new');
    },
    create: (req, res, next) => {
        Task.create({
            name: req.body.name,
            priority: req.body.priority,
        })
            .then((task) => {
                /* The two lines below are for redirecting to the details view after creating a new task */
                // res.locals.redirect = `/tasks/${task._id}`;
                // res.locals.task = task;
                res.locals.redirect = '/tasks';
                req.flash('success', 'New task successfully saved.');
                next();
            })
            .catch((error) => {
                console.error(`Error saving new record: ${error.message}`);
                req.flash('error', `Error saving task: ${error.message}`);
                next();
            });
    },

    show: (req, res, next) => {
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
    showView: (req, res) => {
        res.render('tasks/show');
    },
    edit: (req, res) => {
        let userId = req.params.id;
        Task.findById(userId)
            .then((task) => {
                res.render('tasks/edit', { task: task });
            })
            .catch((error) => {
                console.error(`Error finding task: ${error.message}`);
                res.send(`Error finding task: ${error.message}`);
            });
    },
    update: (req, res, next) => {
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
    delete: (req, res, next) => {
        let userId = req.params.id;
        Task.findByIdAndDelete(userId)
            .then(() => {
                res.locals.redirect = '/tasks';
                req.flash('success', 'Task successfully deleted.');
                next();
            })
            .catch((error) => {
                console.error(`Error deleting record: ${error.message}`);
                req.flash(`Error deleting task: ${error.message}`);
                next();
            });
    },
    deleteAllTasks: (req, res) => {
        Task.remove({})
            .exec()
            .then(() => {
                console.log('All tasks were deleted from the database');
            })
            .catch((error) => {
                console.error(`Error deleting all tasks: ${error.message}`);
            });
    },
    redirectView: (req, res) => {
        let redirectPath = res.locals.redirect;
        res.redirect(redirectPath);
    },
    respondJSON: (req, res) => {
        res.json({
            status: httpStatus.OK,
            data: res.locals,
        });
    },
    errorJSON: (error, req, res, next) => {
        let errorObject;

        if (error) {
            errorObject = {
                status: httpStatus.INTERNAL_SERVER_ERROR,
                message: error.message,
            };
        } else {
            errorObject = {
                status: httpStatus.INTERNAL_SERVER_ERROR,
                message: 'Unknown error.',
            };
        }
    },
};
