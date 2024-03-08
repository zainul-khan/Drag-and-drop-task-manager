const route = require("express").Router();
const userController = require("../controllers/userController");
const taskController = require("../controllers/taskController");
const {validateUser} = require("../middleware/auth");

route.post('/user', userController.createUser);
route.post('/login', userController.login);
route.get('/user-profile', validateUser, userController.fetchUser);
route.get('/logout', validateUser, userController.logout);

route.post('/user-task', validateUser, taskController.createTask);
route.get('/user-tasks', validateUser, taskController.fetchTasks);
route.put('/user-task-status', validateUser, taskController.updateTaskStatus);
route.put('/user-task', validateUser, taskController.updateTask);
route.delete('/user-task', taskController.deleteTask);

module.exports = route