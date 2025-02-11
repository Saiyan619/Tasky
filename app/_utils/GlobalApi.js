const { default: axios } = require("axios");

const axiosClient = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL
});

const createUser = (data) => axiosClient.post('/user/createUser', data);
const getUsers = () => axiosClient.get('/user')
const getUserByClerkId = (clerkId) => axiosClient.get('/user/' + clerkId);
const createTask = (data) => axiosClient.post('/task', data);
const getTaskByClerkId = (clerkId) => axiosClient.get('/task/user/' + clerkId);
const getTaskDetails = (id) => axiosClient.get('/task/taskInfo/' + id)
const updateTask = (id, data) => axiosClient.put(`/task/editTask/${id}`, data);
const deleteTask = (id, userId) => axiosClient.delete(`/task/deleteTask/${id}?userId=${userId}`);
const getSharedTask = (id) => axiosClient.get('/task/collaborate/shared-tasks/' + id);
const getStatistics = (userId) => axiosClient.get(`task/statistics/${userId}`);
const getFilterTasks = (filters) => {
    const params = new URLSearchParams(filters).toString();
    return axiosClient.get(`/task/filterTasks?${params}`);
};

const addActivityLogs = (id, data) =>
    axiosClient.post(`/logs/activity-logs/${id}`, data);

const getGlobalActivity = () => axiosClient.get('/global-logs');

const getAiResponse = (data) => axiosClient.post('ai/generate', data);

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
    getGlobalActivity,
    getAiResponse,
    getStatistics
}

