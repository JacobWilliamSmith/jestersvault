import axios from "axios";

export default axios.create({
  withCredentials: true,
  baseURL: process.env.REACT_APP_API_BASE_URL,
  headers: { "Content-type": "application/json" },
});
