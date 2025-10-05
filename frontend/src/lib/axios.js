import axios from "axios"

export const axiosInstance = axios.create({
    baseURL: "https://chat-application-rsxd.onrender.com/api",
    withCredentials: true
})

// user routes
export const loginUser = async (data) => {
    const res = await axiosInstance.post("/auth/login", data )
    return res.data
}

export const logoutUser = async () =>{
    const res = await axiosInstance.get("/auth/logout")
    return res.data
}

export const updateUser = async (data) =>{
    const res = await axiosInstance.post("/user/update-profile", data)
    return res.data
}

export const signUpUser = async (data) =>{
    const res = await axiosInstance.post("/auth/signup", data)
    return res.data
}

//messages api calls

export const getAllContacts = async() =>{
    const res = await axiosInstance.get("/message/getAllContacts")
    return res.data;
}