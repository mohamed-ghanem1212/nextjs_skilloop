import axios from "axios";

export const createOfferRegisterApi = axios.create({
  baseURL: `${process.env.NEXT_PUBLIC_API_URL}/api/v1/offerRegisters`,
  withCredentials: true,
});
