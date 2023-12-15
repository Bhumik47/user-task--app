import axios from "axios";
import { BASE_URL } from "../common/constant";

const API_URL = BASE_URL + "tasks/";

axios.defaults.withCredentials = true;

const addTask = async (list_id, description) => {
    const response = await axios.post(`${API_URL}createtask/${list_id}`, { description });
    return response.data;
}

const deletedTask = async (task_id) => {
    const response = await axios.delete(`${API_URL}deletetask/${task_id}`);
    return response.data;
}

const updateTaskDescription = async (task_id, description) => {
    const response = await axios.put(`${API_URL}updatedesc/${task_id}`, { description });
    return response.data;
}

const getAllTask = async (listsId) => {
    const response = await axios.post(`${API_URL}gettasks`, { listsId });
    return response.data;
}

const updateTaskListId = async (task_id, new_list_id) => {
    const response = await axios.put(`${API_URL}updatelistid/${task_id}/${new_list_id}`);
    return response.data;
}


const TaskService = {
    addTask,
    deletedTask,
    updateTaskDescription,
    getAllTask,
    updateTaskListId
}

export default TaskService;