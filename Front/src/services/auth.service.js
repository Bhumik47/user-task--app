import axios from "axios";
import { BASE_URL } from "../common/constant";

const API_URL = BASE_URL + "users/";

const registerUser = async (body) => {
    const response = await axios.post(`${API_URL}new`, body,
        {
            headers: {
                "Content-Type": "application/json",
            },
            withCredentials: true,
        });
    return response;
} 

const login = async (body) => {
    const response = await axios.post(`${API_URL}login`, body, {
        headers: {
            "Content-Type": "application/json",
        },
        withCredentials: true,
    });

    return response;
}

const logout = async () => {
    const response = await axios.get(`${API_URL}logout`, {
        withCredentials: true,
    });
    return response;
}

const AuthService = {
    registerUser,
    login,
    logout
}

export default AuthService;