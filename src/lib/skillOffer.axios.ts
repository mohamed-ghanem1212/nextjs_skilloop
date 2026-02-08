import axios from "axios";

export const createSkillOfferApi = axios.create({
  baseURL: `${process.env.NEXT_PUBLIC_API_URL}/api/v1/skillOffers`,
  withCredentials: true,
});
