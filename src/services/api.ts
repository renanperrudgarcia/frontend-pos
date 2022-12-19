import axios from "axios";

export const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  headers: {
    accept: "application/json",
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
  },
});

api.interceptors.request.use(async (config) => {
  const user = localStorage.getItem("user");
  const userData = JSON.parse(user);

  if (userData?.access_token) {
    config.headers.Authorization = `Bearer ${userData.access_token}`;
  }

  return config;
});
