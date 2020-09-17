import axios from 'axios';

const instance=axios.create({
    baseURL: 'https://react-myburgerwebsite.firebaseio.com/'
});

export default instance;