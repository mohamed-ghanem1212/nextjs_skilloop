import axios from "axios";

export const createOfferRegisterApi = axios.create({
  baseURL: "http://localhost:5000/api/v1/offerRegisters",
  withCredentials: true,
});
