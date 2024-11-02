import axios from 'axios';

const API_URL = 'http://localhost:8080';

export const ProjectService = {
  createProject: async (projectData) => {
    try {
      return await axios.post(`${API_URL}/createProject`, projectData);
    } catch (error) {
      console.error('Error creating project:', error);
      throw error;
    }
  },

  updateProject: async (id, projectData) => {
    try {
      return await axios.patch(`${API_URL}/updateProject/${id}`, projectData);
    } catch (error) {
      console.error('Error updating project:', error);
      throw error;
    }
  },

  getAllProjects: async () => {
    try {
      return await axios.get(`${API_URL}/allProjects`);
    } catch (error) {
      console.error('Error fetching all projects:', error);
      throw error;
    }
  },

  deleteProject: async (id) => {
    try {
      return await axios.delete(`${API_URL}/deleteProject/${id}`);
    } catch (error) {
      console.error('Error deleting project:', error);
      throw error;
    }
  },

  // New method to fetch tasks related to a specific project
  getProjectTasks: async (projectId) => {
    try {
      return await axios.get(`${API_URL}/projects/${projectId}/tasks`);
    } catch (error) {
      console.error(`Error fetching tasks for project ID ${projectId}:`, error);
      throw error;
    }
  },
};
