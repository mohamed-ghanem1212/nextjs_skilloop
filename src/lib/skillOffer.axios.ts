import axios from "axios";

export const createSkillOfferApi = axios.create({
  baseURL: "http://localhost:5000/api/v1/skillOffers",
  withCredentials: true,
});
