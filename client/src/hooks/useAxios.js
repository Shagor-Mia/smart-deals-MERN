import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://smart-deals-ph-server.vercel.app",
});

export const useAxios = () => {
  return axiosInstance;
};
