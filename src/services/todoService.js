import axios from 'axios';

const API_URL = 'http://localhost:8080';

export const TodoService = {
  createTask: (projectId, taskData) => axios.post(`${API_URL}/createTask/${projectId}`, taskData),
  
  getAllTasks: () => axios.get(`${API_URL}/allTasks`),
  deleteTask: (id) => axios.delete(`${API_URL}/deleteTask/${id}`),
  updateTask: async (taskId, updatedFields) => {
    try {
      return await axios.patch(`${API_URL}/updateTask/${taskId}`, updatedFields); 
    } catch (error) {
      console.error('Error updating task:', error);
      throw error;
    }
  },
  
};

