const { default: axios } = require("axios");

const axiosClient = axios.create({
    baseURL: 'http://localhost:8000'
});

const createUser = (data) => axiosClient.post('/user', data);
const getUsers = () => axiosClient.get('/user')
const getUserByClerkId = (clerkId) => axiosClient.get('/user/' + clerkId);
const createTask = (data) => axiosClient.post('/task', data);


export default {
    createUser,
    getUsers,
    getUserByClerkId,
    createTask
}

