import axios from 'axios';

export const loginApiFunc = async (email, password) => {
        const response = await axios.post("http://localhost:8000/login", { email, password });
        return response;
}

export const userProfileApiFunc = async (config) => {
        const response = await axios.get("http://localhost:8000/user-profile", config);
        return response;
}

export const logoutApiFunc = async (config) => {
        const response = await axios.get("http://localhost:8000/logout", config);
        return response;
}

export const userTasksApiFunc = async (config) => {
        const response = await axios.get("http://localhost:8000/user-tasks", config);
        return response;
}

export const createTaskApiFunc = async (name, description, status, priority, config) => {
        const response = await axios.post("http://localhost:8000/user-task", {name, description, status, priority}, config);
       return response;
}

export const updateTaskStatusFunc = async (id, status, config) => {
         const response = await axios.put("http://localhost:8000/user-task-status", {id, status}, config);
        return response;
}

export const updateTaskApiFunc = async (id, name, description, status, priority, config) => {
        const response = await axios.put("http://localhost:8000/user-task", {id, name, description, status, priority}, config);
        return response;
}

export const deleteTaskApiFunc = async (id, config) => {
        const response = await axios.delete(`http://localhost:8000/user-task?id=${id}`, config);
        return response;
}

