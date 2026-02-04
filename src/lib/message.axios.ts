import axios from "axios";

export const createMessageApi = axios.create({
  baseURL: "http://localhost:5000/api/v1/messages",
  withCredentials: true,
});
