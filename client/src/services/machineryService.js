import api from './api';

class MachineryService {
  // Get all machinery for a specific project
  async getMachineryByProject(projectId) {
    try {
      const data = await api.get(`/machinery/project/${projectId}`);
      return data.data;
    } catch (error) {
      console.error('Error fetching machinery:', error);
      throw error;
    }
  }

  // Get all machinery
  async getAllMachinery(filters = {}) {
    try {
      const queryParams = new URLSearchParams();
      
      if (filters.type) queryParams.append('type', filters.type);
      if (filters.status) queryParams.append('status', filters.status);
      if (filters.projectId) queryParams.append('projectId', filters.projectId);
      
      const url = `/machinery${queryParams.toString() ? `?${queryParams.toString()}` : ''}`;
      const data = await api.get(url);
      
      return data.data;
    } catch (error) {
      console.error('Error fetching machinery:', error);
      throw error;
    }
  }

  // Get single machinery by ID
  async getMachineryById(id) {
    try {
      const data = await api.get(`/machinery/${id}`);
      
      return data.data;
    } catch (error) {
      console.error('Error fetching machinery:', error);
      throw error;
    }
  }

  // Create new machinery
  async createMachinery(machineryData) {
    try {
      const data = await api.post('/machinery', machineryData);
      
      return data.data;
    } catch (error) {
      console.error('Error creating machinery:', error);
      throw error;
    }
  }

  // Update machinery
  async updateMachinery(id, machineryData) {
    try {
      const data = await api.put(`/machinery/${id}`, machineryData);
      
      return data.data;
    } catch (error) {
      console.error('Error updating machinery:', error);
      throw error;
    }
  }

  // Delete machinery
  async deleteMachinery(id) {
    try {
      const data = await api.delete(`/machinery/${id}`);
      
      return data;
    } catch (error) {
      console.error('Error deleting machinery:', error);
      throw error;
    }
  }

  // Get machinery types
  async getMachineryTypes() {
    try {
      const data = await api.get('/machinery/types/all');
      
      return data.data;
    } catch (error) {
      console.error('Error fetching machinery types:', error);
      throw error;
    }
  }

  // Get machinery statistics
  async getMachineryStats() {
    try {
      const data = await api.get('/machinery/stats/all');
      
      return data.data;
    } catch (error) {
      console.error('Error fetching machinery statistics:', error);
      throw error;
    }
  }
}

export default new MachineryService();