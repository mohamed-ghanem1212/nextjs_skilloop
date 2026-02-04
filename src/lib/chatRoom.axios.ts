import axios from "axios";

export const createChatRoomApi = axios.create({
  baseURL: "http://localhost:5000/api/v1/chat",
  withCredentials: true,
});
