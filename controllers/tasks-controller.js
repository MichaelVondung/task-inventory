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
    // ! The following function should probably be rewritten to use Task.Create with a redirect.
    saveNewTaskToDatabase: (req, res) => {
        let newTask = new Task({
            name: req.body.name,
            priority: req.body.priority,
        });
        newTask
            .save()
            .then((result) => {
                res.render('task-added');
            })
            .catch((error) => {
                res.send(error);
            });
    },
    deleteAllTask: (req, res) => {
        Task.remove({})
        .exec()
        .then(() => {
            console.log('All tasks were deleted from the database')
        })
        .catch(error => {
            console.log(`Error deleting all tasks: ${error.message}`)
        })
    }
};

// exports.showAllTasks = (req, res) => {
//     Task.find({})

//         .exec()
//         .then((tasks) => {
//             res.render('tasks', { tasks: tasks });
//         })
//         .catch((error) => {
//             console.log(error);
//             return [];
//         })
//         .then(() => {
//             console.log('from task-controller.js: showAllTasks completed');
//         });
// };

// exports.showNewTaskForm = (req, res) => {
//     res.render('new-task');
// };

// exports.saveNewTaskToDatabase = (req, res) => {
//     let newTask = new Task({
//         name: req.body.name,
//         importance: req.body.importance,
//     });
//     newTask
//         .save()
//         .then((result) => {
//             res.render('task-added');
//         })
//         .catch((error) => {
//             res.send(error);
//         });
// };
