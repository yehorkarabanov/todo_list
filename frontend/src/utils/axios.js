import axios from 'axios';


export const baseAxiosSettings = {
    baseURL: 'https://' + process.env.REACT_APP_DOMAIN + '/api',
    timeout: 5000,
}

const apiInstance = axios.create(baseAxiosSettings);


export default apiInstance;