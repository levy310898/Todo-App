import axios from "axios";

const setAuthToken = token => {// setup api . If client has token then attach token to api.
  if (token) {
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  } else {
    delete axios.defaults.headers.common['Authorization'];
  }
}

export default setAuthToken;