import ApiService from './api';

class ProjectService {
  async getAllProjects() {
    try {
      const response = await ApiService.get('/projects');
      return response.data;
    } catch (error) {
      console.error('Error fetching projects:', error);
      throw error;
    }
  }

  async getProject(id) {
    try {
      return await ApiService.get(`/projects/${id}`);
    } catch (error) {
      console.error('Error fetching project:', error);
      throw error;
    }
  }

  async createProject(projectData) {
    try {
      return await ApiService.post('/projects', projectData);
    } catch (error) {
      console.error('Error creating project:', error);
      throw error;
    }
  }

  async updateProject(id, projectData) {
    try {
      return await ApiService.put(`/projects/${id}`, projectData);
    } catch (error) {
      console.error('Error updating project:', error);
      throw error;
    }
  }

  async deleteProject(id) {
    try {
      return await ApiService.delete(`/projects/${id}`);
    } catch (error) {
      console.error('Error deleting project:', error);
      throw error;
    }
  }

  async getProjectStats(id) {
    try {
      return await ApiService.get(`/projects/${id}/stats`);
    } catch (error) {
      console.error('Error fetching project stats:', error);
      throw error;
    }
  }
}

export default new ProjectService();
