import { BASE_API_URL } from "../config/api";
import axios from "axios";

export const SignInUser = (data) => {
  return axios.post(`${BASE_API_URL}/auth/signin`, data);
};
