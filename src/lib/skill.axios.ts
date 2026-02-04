import axios from "axios";

export const createSkillApi = axios.create({
  baseURL: "http://localhost:5000/api/v1/skills",
  withCredentials: true,
});
