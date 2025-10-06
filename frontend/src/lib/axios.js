import axios from "axios"

axios.defaults.withCredentials = true;

export const axiosInstance = axios.create({
    baseURL: import.meta.env.VITE_API_URL || "https://chat-application-rsxd.onrender.com/api",
    withCredentials: true,
    timeout: 30000, // 30 second timeout for slower mobile networks
    headers: { 
        "Content-Type": "application/json"
    },
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
        if (error.code === 'NETWORK_ERROR') {
            console.error('Network error detected - check mobile connection');
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