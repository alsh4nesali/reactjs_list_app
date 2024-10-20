import axios from 'axios';


const API_BASE_URL  = 'http://localhost:8081';


export const fetchList = () => {
    const userId = localStorage.getItem("userId");
    
    return axios.get(`${API_BASE_URL}/Home?userId=${userId}`)
        .then((api_response) => 
            api_response.data
        )
        .catch((error) => {
            console.error("Error fetching list:", error);
            throw error;
        })
};


export const createTask = (task: string, status: string, description: string, taskDate: string,user_id: number) => {
    return axios.post(`${API_BASE_URL}/addTask`, {
        task,
        status,
        description,
        taskDate,
        user_id,
    })
        .then((api_response) => api_response.data)
        .catch((error) => {
            console.error("Error creating task:", error);
            throw error;
        })
}

export const LoginTask = (email: string, password: string) => {
    return axios.post(`${API_BASE_URL}/`, {
        email,
        password
    })
    .then((api_response) => api_response.data)
    .catch((error) =>{
        console.log(error);
        console.error("Error creating task:", error);
        throw error
    })
}


export const deleteTask = (id: number) => {
    return axios.delete(`${API_BASE_URL}/Home/${id}`)
    .then((response) => response.data)
    .catch((error) => {
        console.error("Error deleting task:", error);
        throw error;
    })
}