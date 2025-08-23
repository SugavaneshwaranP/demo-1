import { useState, useContext } from 'react';
import { ProjectContext } from '../context/ProjectContext';

function Home() {
  const { projects, setProjects } = useContext(ProjectContext);
  const [newProject, setNewProject] = useState({ name: '', date: '', place: '' });
  const [editingId, setEditingId] = useState(null);
  const [editForm, setEditForm] = useState({ name: '', date: '', place: '' });

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewProject({ ...newProject, [name]: value });
  };

  // Add new project
  const addProject = (e) => {
    e.preventDefault();
    if (newProject.name && newProject.date && newProject.place) {
      setProjects([...projects, { id: projects.length + 1, ...newProject }]);
      setNewProject({ name: '', date: '', place: '' });
    }
  };

  // Start editing a project
  const startEditing = (project) => {
    setEditingId(project.id);
    setEditForm({ name: project.name, date: project.date, place: project.place });
  };

  // Handle edit form changes
  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditForm({ ...editForm, [name]: value });
  };

  // Save edited project
  const saveEdit = (id) => {
    setProjects(
      projects.map((project) =>
        project.id === id ? { ...project, ...editForm } : project
      )
    );
    setEditingId(null);
  };

  return (
    <div className="mt-4 bg-white p-3">
      <h1 className="text-center mb-4 text-danger">Project Management</h1>

      {/* Add New Project Form */}
      <div className="card mb-4 border-danger">
        <div className="card-body bg-white">
          <h5 className="card-title text-danger">Add New Project</h5>
          <form onSubmit={addProject}>
            <div className="row">
              <div className="col-md-4">
                <input
                  type="text"
                  className="form-control border-danger"
                  name="name"
                  value={newProject.name}
                  onChange={handleInputChange}
                  placeholder="Project Name"
                  required
                />
              </div>
              <div className="col-md-4">
                <input
                  type="date"
                  className="form-control border-danger"
                  name="date"
                  value={newProject.date}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="col-md-4">
                <input
                  type="text"
                  className="form-control border-danger"
                  name="place"
                  value={newProject.place}
                  onChange={handleInputChange}
                  placeholder="Place"
                  required
                />
              </div>
            </div>
            <button type="submit" className="btn btn-danger mt-3">
              Add Project
            </button>
          </form>
        </div>
      </div>

      {/* Project List */}
      <div className="card border-danger">
        <div className="card-body bg-white">
          <h5 className="card-title text-danger">Projects</h5>
          <table className="table table-striped">
            <thead className="table-danger">
              <tr>
                <th className="bg-danger text-white">Name</th>
                <th className="bg-danger text-white">Date</th>
                <th className="bg-danger text-white">Place</th>
                <th className="bg-danger text-white">Actions</th>
              </tr>
            </thead>
            <tbody>
              {projects.map((project) => (
                <tr key={project.id}>
                  {editingId === project.id ? (
                    <>
                      <td>
                        <input
                          type="text"
                          className="form-control border-danger"
                          name="name"
                          value={editForm.name}
                          onChange={handleEditChange}
                        />
                      </td>
                      <td>
                        <input
                          type="date"
                          className="form-control border-danger"
                          name="date"
                          value={editForm.date}
                          onChange={handleEditChange}
                        />
                      </td>
                      <td>
                        <input
                          type="text"
                          className="form-control border-danger"
                          name="place"
                          value={editForm.place}
                          onChange={handleEditChange}
                        />
                      </td>
                      <td>
                        <button
                          className="btn btn-danger btn-sm"
                          onClick={() => saveEdit(project.id)}
                        >
                          Save
                        </button>
                        <button
                          className="btn btn-outline-danger btn-sm ms-2"
                          onClick={() => setEditingId(null)}
                        >
                          Cancel
                        </button>
                      </td>
                    </>
                  ) : (
                    <>
                      <td>{project.name}</td>
                      <td>{project.date}</td>
                      <td>{project.place}</td>
                      <td>
                        <button
                          className="btn btn-outline-danger btn-sm"
                          onClick={() => startEditing(project)}
                        >
                          Edit
                        </button>
                      </td>
                    </>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default Home;