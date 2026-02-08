import axios from "axios";

export const createMessageApi = axios.create({
  baseURL: `${process.env.NEXT_PUBLIC_API_URL}/api/v1/messages`,
  withCredentials: true,
});
