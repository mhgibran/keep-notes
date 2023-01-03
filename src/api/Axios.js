import axios from "axios";

axios.defaults.baseURL =
  process.env.REACT_APP_API_URL ?? "http://localhost:3000/";

export default axios;
