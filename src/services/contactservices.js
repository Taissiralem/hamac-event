import { BASE_API_URL } from "../config/api";
import axios from "axios";

export const createContact = (data) => {
  return axios.post(`${BASE_API_URL}/contact/create`, data);
};
export const getContact = () => {
  return axios.get(`${BASE_API_URL}/contact`);
};
export const DeleteContact = (id) => {
  return axios.delete(`${BASE_API_URL}/contact/${id}`);
};
