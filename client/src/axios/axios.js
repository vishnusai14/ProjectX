import axios from 'axios'
// Create instance called instance
const instance = axios.create({
    baseURL : "http://localhost:8080"
});

export default instance