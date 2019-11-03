var axios = require('axios');

var axiosInstance = axios.create({
  baseURL: 'localhost:5000',
  /* other custom settings */
});

module.exports = axiosInstance;