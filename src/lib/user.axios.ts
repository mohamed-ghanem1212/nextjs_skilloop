import axios from "axios";

export const createUserApi = axios.create({
  baseURL: "http://localhost:5000/api/v1/users",
  withCredentials: true,
});
