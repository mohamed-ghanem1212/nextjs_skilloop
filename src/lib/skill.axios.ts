import axios from "axios";

export const createSkillApi = axios.create({
  baseURL: `${process.env.NEXT_PUBLIC_API_URL}/api/v1/skills`,
  withCredentials: true,
});
