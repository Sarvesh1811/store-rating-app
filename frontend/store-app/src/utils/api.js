import axios from "axios";

const API = axios.create({
  baseURL: "https://store-rating-app-zuu5.onrender.com",
});

API.interceptors.request.use((req) => {
  const token = localStorage.getItem("token");
  if (token) {
    req.headers.Authorization = `Bearer ${token}`;
  }
  return req;
});

export default API;
