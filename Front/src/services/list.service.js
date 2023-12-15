import axios from "axios";
import { BASE_URL } from "../common/constant";

const API_URL = BASE_URL + "lists/";

axios.defaults.withCredentials = true;

const createList = async (name) => {
    const response = await axios.post(`${API_URL}createlist`, { name });
    return response.data
}

const deletedList = async (id) => {
    const response = await axios.delete(`${API_URL}deletelist/${id}`);
    return response.data;
}

const updateListName = async (id,name) => {
    const response = await axios.put(`${API_URL}updatelist/${id}`, { name });
    return response.data;
}

const getAllList = async () => {
    const response = await axios.get(`${API_URL}getlists`);
    return response.data;
}


const ListService = {
    createList,
    deletedList,
    updateListName,
    getAllList
}

export default ListService;