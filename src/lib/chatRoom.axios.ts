import axios from "axios";

export const createChatRoomApi = axios.create({
  baseURL: `${process.env.NEXT_PUBLIC_API_URL}/api/v1/chat`,
  withCredentials: true,
});
