import axios from "axios"

export const axiosInstance = axios.create({
    baseURL: "http://localhost:3000/api",
    withCredentials: true
})

// user routes
export const loginUser = async (data) => {
    const res = await axiosInstance.post("/auth/login", data )
    return res.data
}