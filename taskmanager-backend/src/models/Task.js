const mongoose = require("mongoose");
const {TASK_PRIORITY, TASK_STATUS} = require("../services/constants");


const taskSchema = new mongoose.Schema({
    name: {
        type: String,
        minlength: 1,
        maxlength: 100
    },
    description: {
        type: String,
        minlength: 1,
        maxlength: 250
    },
    priority: {
        type: String,
        enum: [TASK_PRIORITY.HIGH, TASK_PRIORITY.MEDIUM, TASK_PRIORITY.LOW]
    },
    status: {
        type: String,
        enum: [TASK_STATUS.OPEN, TASK_STATUS.IN_PROGRESS, TASK_STATUS.DONE, TASK_STATUS.REVIEW, TASK_STATUS.CLOSED, TASK_STATUS.BLOCKED]
    },
    creatorId: {
        type: mongoose.Types.ObjectId,
        ref: 'User'
    },
    // userIds: [ future implementation in which creator can assign task to multiple users
    //     {
    //         type: mongoose.Types.ObjectId,
    //         ref: 'User'
    //     }
    // ]
}, { timestamps: true });

const Task = mongoose.model('Task', taskSchema);

module.exports = Task