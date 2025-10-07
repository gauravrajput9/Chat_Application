import axios from "axios"

axios.defaults.withCredentials = true;

const apiBaseFromEnv = (import.meta.env && import.meta.env.VITE_API_URL)
  ? import.meta.env.VITE_API_URL.trim().replace(/\/$/, "")
  : "";
const apiBaseFromWindow = typeof window !== "undefined"
  ? `${window.location.origin.replace(/\/$/, "")}/api`
  : "";

export const axiosInstance = axios.create({
    baseURL: apiBaseFromEnv || apiBaseFromWindow || "http://localhost:3000/api",
    withCredentials: true,
    timeout: 30000, 
});

// Add request interceptor for better mobile debugging
axiosInstance.interceptors.request.use(
    (config) => {
        console.log(`Making ${config.method?.toUpperCase()} request to: ${config.url}`);
        return config;
    },
    (error) => {
        console.error('Request error:', error);
        return Promise.reject(error);
    }
);

// Add response interceptor for better error handling on mobile
axiosInstance.interceptors.response.use(
    (response) => {
        console.log(`Response received from: ${response.config.url}`);
        return response;
    },
    (error) => {
        console.error('Response error:', error.message);
        
        // Handle different error scenarios
        if (error.response?.status === 502 || error.response?.status === 503) {
            console.error('😴 Backend service is sleeping/restarting (502/503). This is common on free hosting.');
            error.isBackendSleeping = true;
        } else if (error.code === 'ERR_NETWORK') {
            console.error('🌐 Network error detected - check connection or backend might be starting up');
        } else if (error.response?.status === 0) {
            console.error('🚫 CORS or network connectivity issue');
        }
        
        return Promise.reject(error);
    }
);

// user routes
export const loginUser = async (data) => {
    const res = await axiosInstance.post("/auth/login", data)
    console.log(res.data)
    return res.data
}

export const logoutUser = async () => {
    const res = await axiosInstance.get("/auth/logout")
    return res.data
}

export const updateUser = async (data) => {
    const res = await axiosInstance.post("/user/update-profile", data)
    return res.data
}

export const signUpUser = async (data) => {
    const res = await axiosInstance.post("/auth/signup", data)
    return res.data
}

//messages api calls

export const getAllContacts = async () => {
    const res = await axiosInstance.get("/message/getAllContacts")
    return res.data;
}