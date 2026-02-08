import axios from "axios";

export const createUserApi = axios.create({
  baseURL: `${process.env.NEXT_PUBLIC_API_URL}/api/v1/users`,
  withCredentials: true,
});
