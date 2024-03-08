const Joi = require("joi");
const Task = require("../models/Task");
const { TASK_PRIORITY, TASK_STATUS } = require("../services/constants");
const Response = require("../services/response");

module.exports = {

    createTask: async (req, res) => {

        try {

            const schema = Joi.object({
                name: Joi.string().min(2).max(50).required(),
                description: Joi.string().min(1).max(250).required(),
                priority: Joi.string().valid(TASK_PRIORITY.HIGH, TASK_PRIORITY.MEDIUM, TASK_PRIORITY.LOW).required(),
                status: Joi.string().valid(TASK_STATUS.OPEN, TASK_STATUS.IN_PROGRESS, TASK_STATUS.DONE, TASK_STATUS.REVIEW, TASK_STATUS.CLOSED, TASK_STATUS.BLOCKED).required(),
            });

            const { error, value } = schema.validate(req.body);

            if (error) return Response.joiErrorResponseData(res, error);

            const task = await Task.create({
                name: value.name,
                description: value.description,
                priority: value.priority,
                status: value.status,
                creatorId: req.authUserId
            })

            return Response.successResponseData(res, "Task created successfully", task)

        } catch (error) {

            console.log("error=>", error);
            return res.status(500).json({ error: "Something went wrong" });
        }
    },

    fetchTasks: async (req, res) => {

        try {

            const tasks = await Task.find({ creatorId: req.authUserId }).populate("creatorId", "_id name").sort({ priority: 1 }); // Sort by priority ascending (High -> Medium -> Low)
            return Response.successResponseData(res, "Tasks fetched successfully", tasks)


        } catch (error) {

            console.log("error=>", error);
            return res.status(500).json({ error: "Something went wrong" });
        }
    },

    updateTaskStatus: async (req, res) => {

        try {

            const schema = Joi.object({
                id: Joi.string().required(),
                status: Joi.string().valid(TASK_STATUS.OPEN, TASK_STATUS.IN_PROGRESS, TASK_STATUS.DONE, TASK_STATUS.REVIEW, TASK_STATUS.CLOSED, TASK_STATUS.BLOCKED).required(),
            });

            const { error, value } = schema.validate(req.body);

            if (error) return Response.joiErrorResponseData(res, error);

            const task = await Task.findById(value.id);
            // return Response.successResponseData(res, "Tasks fetched successfully", tasks)
            if (!task) return Response.errorResponseWithoutData(res, "Task does not exist");
            
            if (String(task.creatorId) !== String(req.authUserId)) return Response.errorResponseWithoutData(res, "Unauthorized action");

            task.status = value.status;

            await task.save();

            return Response.successResponseData(res, "Status updated successfully", task);


        } catch (error) {

            console.log("error=>", error);
            return res.status(500).json({ error: "Something went wrong" });
        }
    },

    updateTask: async (req, res) => {
        // console.log("wooo");
        try {

            const schema = Joi.object({
                id: Joi.string().required(),
                name: Joi.string().min(2).max(50).required(),
                description: Joi.string().min(1).max(250).required(),
                priority: Joi.string().valid(TASK_PRIORITY.HIGH, TASK_PRIORITY.MEDIUM, TASK_PRIORITY.LOW).required(),
                status: Joi.string().valid(TASK_STATUS.OPEN, TASK_STATUS.IN_PROGRESS, TASK_STATUS.DONE, TASK_STATUS.REVIEW, TASK_STATUS.CLOSED, TASK_STATUS.BLOCKED).required(),
            });      


            const { error, value } = schema.validate(req.body);
            if (error) return Response.joiErrorResponseData(res, error);

            const task = await Task.findById(value.id);
            // return Response.successResponseData(res, "Tasks fetched successfully", tasks)
            if (!task) return Response.errorResponseWithoutData(res, "Task does not exist");
            
            if (String(task.creatorId) !== String(req.authUserId)) return Response.errorResponseWithoutData(res, "Unauthorized action");

            task.name = value.name;
            task.description = value.description;
            task.priority = value.priority;
            task.status = value.status;

            await task.save();

            return Response.successResponseData(res, "Task Updated successfully", task);

        } catch (error) {

            console.log("error=>", error);
            return res.status(500).json({ error: "Something went wrong" });
        }
    },

    deleteTask: async (req, res) => {
        try {
            
           let {id} = req.query;

           if (!id) return Response.errorResponseWithoutData(res, 'Id is required');

            const deleteDoc = await Task.findOneAndDelete({_id: id});

            return Response.successResponseData(res, "Doc deleted successfully", deleteDoc);

        } catch (error) {
            
            
            console.log("error=>", error);
            return res.status(500).json({ error: "Something went wrong" });
        }
    }
}