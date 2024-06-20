import axios from "axios";
import { CONSTANTS } from "../constants/constants";
import { BASE_URL } from "./endpoints";

const axiosInstance = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Interceptor to add the auth token to each request
axiosInstance.interceptors.request.use(
  async (config) => {
    const token = getToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

const getToken = async () => {
  return CONSTANTS.TOKEN;
};

// GET request
export const getRequest = async (url, params) => {
  try {
    const response = await axiosInstance.get(url, { params });
    return response.data;
  } catch (error) {
    handleError(error);
  }
};

// POST request
export const postRequest = async (url, data) => {
  try {
    const response = await axiosInstance.post(url, data);
    return response.data;
  } catch (error) {
    handleError(error);
  }
};

// PUT request
export const putRequest = async (url, data) => {
  try {
    const response = await axiosInstance.put(url, data);
    return response.data;
  } catch (error) {
    handleError(error);
  }
};

// DELETE request
export const deleteRequest = async (url) => {
  try {
    const response = await axiosInstance.delete(url);
    return response.data;
  } catch (error) {
    handleError(error);
  }
};

// Handle errors
const handleError = (error) => {
  if (error.response) {
    console.error("Error response:", error.response.data);
  } else if (error.request) {
    console.error("Error request:", error.request);
  } else {
    console.error("Error message:", error.message);
  }
  throw error;
};
