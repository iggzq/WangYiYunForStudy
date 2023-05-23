import axios from 'axios'
let service = axios.create({
    baseURL:'http://8.130.78.164:3000',
    timeout:100000,
    withCredentials: true
})
export default service