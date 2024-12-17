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
const deleteTask = (id, userId) => axiosClient.delete(`/task/deleteTask/${id}?userId=${userId}`);
const getSharedTask = (id) => axiosClient.get('/task/collaborate/shared-tasks/' + id);
const getFilterTasks = (filters) => {
    const params = new URLSearchParams(filters).toString();
    return axiosClient.get(`/task/filterTasks?${params}`);
};

const addActivityLogs = (id, data) =>
    axiosClient.post(`/task/activityLog/${id}`, data);

const getGlobalActivity = ()=> axiosClient.get('/global-logs')

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
    getFilterTasks,
    addActivityLogs,
    getGlobalActivity
}

