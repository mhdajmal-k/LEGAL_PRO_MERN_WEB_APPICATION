import axios from "axios";
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

axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const requestedApi = error.config;

    if (
      error.response.status === 401 &&
      error.response.data?.message === "Authorization denied. Invalid token"
    ) {
      try {
        if (error.response.data.result == "user") {
          const response = await axiosInstance.post("/api/user/refreshToken");
          if (response.status == 200) {
            return axiosInstance(requestedApi);
          }
        } else if (error.response.data.result == "lawyer") {
          const response = await axiosInstance.post("/api/lawyer/refreshToken");

          if (response.status == 200) {
            return axiosInstance(requestedApi);
          }
        }
      } catch (error: any) {
        if (error?.response.data.result.user == "user") {
        }

        return Promise.reject(error || error?.response.data.message);
      }
    }

    return Promise.reject(error || error?.response.data.message);
  }
);

export default axiosInstance;
