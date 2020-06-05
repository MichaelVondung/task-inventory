// This is the model that defines a task

const mongoose = require('mongoose');

const taskSchema = mongoose.Schema(
    {
        name: { type: String, required: true },
        priority: { type: Number, default: 0 },
        completed: { type: Boolean, default: false },
    },
    { timestamps: true }
);

module.exports = mongoose.model('Task', taskSchema, 'tasks');
