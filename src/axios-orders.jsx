import axios from "axios";

const instance = axios.create({
    baseURL: 'https://react-my-burger-6dcc8-default-rtdb.firebaseio.com/'
});

export default instance;
