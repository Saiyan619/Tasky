const { default: axios } = require("axios");

const axiosClient = axios.create({
    baseURL: 'http://localhost:8000'
});

const createUser = (data) => axiosClient.post('/user', data);
const getUsers = () => axiosClient.get('/user')
const getUserByClerkId = (clerkId) => axiosClient.get('/user/' + clerkId);
const createTask = (data) => axiosClient.post('/task', data);
const getTaskByClerkId = (clerkId) => axiosClient.get('/task/user/' + clerkId);
const getTaskDetails = (id) => axiosClient.get('/task/taskInfo/' + id)
const updateTask = (id, data) => axiosClient.put(`/task/editTask/${id}`, data);
const deleteTask = (id) => axiosClient.delete('/task/deleteTask/' + id);
const getSharedTask = (id) => axiosClient.get('/task/collaborate/shared-tasks/' + id);
const getFilterTasks = (filters) => {
    const params = new URLSearchParams(filters).toString();
    return axiosClient.get(`/task/filterTasks?${params}`);
};

export default {
    createUser,
    getUsers,
    getUserByClerkId,
    createTask,
    getTaskByClerkId,
    getTaskDetails,
    updateTask,
    deleteTask,
    getSharedTask,
    getFilterTasks
}

