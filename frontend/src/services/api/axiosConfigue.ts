import axios, { AxiosError, AxiosResponse, ResponseType } from "axios";
// import dotenv from "dotenv";
// dotenv.config();
const apiUrl = import.meta.env.VITE_API_URL;
console.log(apiUrl);

const axiosInstance = axios.create({
  baseURL: apiUrl,
  timeout: 5000,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

// axiosInstance.interceptors.response.use((response: AxiosResponse) => {
//   async (error: AxiosError) => {
//     alert("hi");
//     const originalRequest = error.config;
//     console.log(originalRequest, "is the original request ");
//     if (error.response?.status === 401) {
//       console.log(error.response.statusText);
//     }
//     return axios(originalRequest);
//   };
//   return Promise.reject("error");
// });

export default axiosInstance;
