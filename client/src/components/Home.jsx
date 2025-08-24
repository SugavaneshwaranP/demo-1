import { useState, useContext, useEffect } from 'react';
import { ProjectContext } from '../context/ProjectContext';
import projectService from '../services/projectService';

function Home() {
  const { projects, setProjects } = useContext(ProjectContext);
  const [newProject, setNewProject] = useState({ name: '', date: '', place: '', description: '' });
  const [editingId, setEditingId] = useState(null);
  const [editForm, setEditForm] = useState({ name: '', date: '', place: '', description: '' });
  const [showPopup, setShowPopup] = useState(false);
  const [popupMessage, setPopupMessage] = useState('');
  const [loading, setLoading] = useState(true); // Add loading state

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        setLoading(true); // Set loading to true before fetching
        const data = await projectService.getAllProjects();
        setProjects(data);
      } catch (error) {
        console.error("Error fetching projects:", error);
      } finally {
        setLoading(false); // Set loading to false after fetching (success or error)
      }
    };
    fetchProjects();
  }, [setProjects]);

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewProject({ ...newProject, [name]: value });
  };

  // Add new project
  const addProject = async (e) => {
    e.preventDefault();
    if (newProject.name && newProject.date && newProject.place) {
      try {
        await projectService.createProject(newProject); 
        const updatedProjects = await projectService.getAllProjects();
         setProjects(updatedProjects);
        // const createdProject = await projectService.createProject(newProject);
        // setProjects([...projects, updatedProjects]);
        setNewProject({ name: '', date: '', place: '', description: '' });
        setShowPopup(false); // Hide popup on success
        // fetchProjects();
      } catch (error) {
        console.error("Error creating project:", error);
        setPopupMessage(error.message || 'Failed to create project');
        setShowPopup(true);
      }
    }
  };

  // Start editing a project
  const startEditing = (project) => {
    setEditingId(project._id);
    setEditForm({ name: project.name, date: project.date, place: project.place, description: project.description });
  };

  // Handle edit form changes
  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditForm({ ...editForm, [name]: value });
  };

  // Save edited project
  const saveEdit = async (id) => {
    try {
      await projectService.updateProject(id, editForm);
      const refreshedProjects = await projectService.getAllProjects(); // Always fetch fresh data
      setProjects(refreshedProjects);
      setEditingId(null);
      setShowPopup(false);
    } catch (error) {
      console.error("Error updating project:", error);
      setPopupMessage(error.message || 'Failed to update project');
      setShowPopup(true);
    }
  };

  // Delete project
  const deleteProject = async (id) => {
    try {
      await projectService.deleteProject(id);
      setProjects(projects.filter((project) => project._id !== id));
      setShowPopup(false); // Hide popup on success
    } catch (error) {
      console.error("Error deleting project:", error);
      setPopupMessage(error.message || 'Failed to delete project');
      setShowPopup(true);
    }
  };

  return (
    <div className="container-fluid py-4">
      <div className="animate-fade-in">
        <h3 className="main-title">
          <i className="fas fa-project-diagram me-2"></i>
          Project Management
        </h3>

        {/* Add New Project Form */}
        <div className="glass-card mb-5">
          <h2 className="section-title">
            <i className="fas fa-plus-circle"></i>
            Add New Project
          </h2>
          
          <form onSubmit={addProject}>
            <div className="form-modern">
              <div className="form-group-modern">
                <label className="form-label-modern">
                  <i className="fas fa-tag"></i>
                  Project Name
                </label>
                <input
                  type="text"
                  className="form-input-modern"
                  name="name"
                  value={newProject.name}
                  onChange={handleInputChange}
                  placeholder="Enter project name"
                  required
                />
              </div>
              
              <div className="form-group-modern">
                <label className="form-label-modern">
                  <i className="fas fa-calendar"></i>
                  Project Date
                </label>
                <input
                  type="date"
                  className="form-input-modern"
                  name="date"
                  value={newProject.date}
                  onChange={handleInputChange}
                  required
                />
              </div>
              
              <div className="form-group-modern">
                <label className="form-label-modern">
                  <i className="fas fa-map-marker-alt"></i>
                  Location
                </label>
                <input
                  type="text"
                  className="form-input-modern"
                  name="place"
                  value={newProject.place}
                  onChange={handleInputChange}
                  placeholder="Enter location"
                  required
                />
              </div>
            </div>
            
            <div className="form-button-container"> 
              <button type="submit" className="btn-modern btn-primary-modern">
                <i className="fas fa-plus me-2"></i>
                Add Project
              </button>
            </div>
          </form>
        </div>

        {/* Project List */}
        <div className="glass-card">
          <h2 className="section-title">
            <i className="fas fa-list"></i>
            Project List
          </h2>
          
          <div className="table-container">
            <table className="table-modern">
              <thead>
                <tr>
                  <th><i className="fas fa-tag me-2"></i>Project Name</th>
                  <th><i className="fas fa-calendar me-2"></i>Date</th>
                  <th><i className="fas fa-map-marker-alt me-2"></i>Location</th>
                  <th><i className="fas fa-cogs me-2"></i>Actions</th>
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  <tr>
                    <td colSpan="4" className="text-center text-muted py-4">
                      <i className="fas fa-spinner fa-spin fa-2x mb-3 d-block"></i>
                      Loading projects...
                    </td>
                  </tr>
                ) : projects.length === 0 ? (
                  <tr>
                    <td colSpan="4" className="text-center text-muted py-4">
                      <i className="fas fa-inbox fa-2x mb-3 d-block"></i>
                      No projects added yet. Create your first project above.
                    </td>
                  </tr>
                ) : (
                  Array.isArray(projects) && projects.map((project) => (
                    <tr key={project._id}>
                      {editingId === project._id ? (
                        <>
                          <td>
                            <input
                              type="text"
                              className="form-input-modern"
                              name="name"
                              value={editForm.name}
                              onChange={handleEditChange}
                              placeholder="Project name"
                            />
                          </td>
                          <td>
                            <input
                              type="date"
                              className="form-input-modern"
                              name="date"
                              value={editForm.date}
                              onChange={handleEditChange}
                            />
                          </td>
                          <td>
                            <input
                              type="text"
                              className="form-input-modern"
                              name="place"
                              value={editForm.place}
                              onChange={handleEditChange}
                              placeholder="Location"
                            />
                          </td>
                          <td>
                            <div className="table-actions">
                              <button
                                className="btn-modern btn-success-modern"
                                onClick={() => saveEdit(project._id)}
                              >
                                <i className="fas fa-save me-1"></i>Save
                              </button>
                              <button
                                className="btn-modern btn-outline-modern"
                                onClick={() => setEditingId(null)}
                              >
                                <i className="fas fa-times me-1"></i>Cancel
                              </button>
                            </div>
                          </td>
                        </>
                      ) : (
                        <>
                          <td className="fw-semibold text-gradient">{project.name}</td>
                          <td>{new Date(project.date).toLocaleDateString()}</td>
                          <td>{project.place}</td>
                          <td>
                            <div className="table-actions">
                              <button
                                className="btn-modern btn-outline-modern"
                                onClick={() => startEditing(project)}
                              >
                                <i className="fas fa-edit me-1"></i>Edit
                              </button>
                              <button
                                className="btn-modern btn-danger-modern"
                                onClick={() => deleteProject(project._id)}
                              >
                                <i className="fas fa-trash-alt me-1"></i>Delete
                              </button>
                            </div>
                          </td>
                        </>
                      )}
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Popup/Modal for error messages */}
        {showPopup && (
          <div className="popup-overlay">
            <div className="popup-content">
              <h4 className="popup-title">Error</h4>
              <p className="popup-message">{popupMessage}</p>
              <button
                className="btn-modern btn-primary-modern"
                onClick={() => setShowPopup(false)}
              >
                Close
              </button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}

export default Home;