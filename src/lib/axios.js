import axios from "axios";

export const axiosInstance = axios.create({
  baseURL: "https://chat-app-server-fjqp.onrender.com/api",
  withCredentials: true,
});
