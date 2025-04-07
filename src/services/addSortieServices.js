import { BASE_API_URL } from "../config/api";
import axios from "axios";

export const addSortie = (data) => {
  return axios.post(`${BASE_API_URL}/tb/addSortie`, data);
};

export const updateSortie = (id, data) => {
  return axios.put(`${BASE_API_URL}/tb/addSortie/${id}`, data);
};

export const deleteSortie = (id) => {
  return axios.delete(`${BASE_API_URL}/tb/addSortie/${id}`);
};

export const getSorties = (page) => {
  return axios.get(`${BASE_API_URL}/tb/addSortie?page=${page}`);
};

export const getSortieById = (id) => {
  return axios.get(`${BASE_API_URL}/tb/addSortie/${id}`);
};
