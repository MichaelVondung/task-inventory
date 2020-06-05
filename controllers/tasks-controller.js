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
                console.log(`Error deleting all tasks: ${error.message}`);
            });
    },
    redirectView: (req, res) => {
        res.redirect('tasks');
    },
};
