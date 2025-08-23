import { useState } from 'react';

function Home() {
  // State for projects and new project form
  const [projects, setProjects] = useState([
    { id: 1, name: 'Project Alpha', date: '2025-08-23', place: 'Site A' },
    { id: 2, name: 'Project Beta', date: '2025-08-20', place: 'Site B' },
  ]);
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
    <div className="mt-4">
      <h1 className="text-center mb-4">Dew - Project Management</h1>

      {/* Add New Project Form */}
      <div className="card mb-4">
        <div className="card-body">
          <h5 className="card-title">Add New Project</h5>
          <form onSubmit={addProject}>
            <div className="row">
              <div className="col-md-4">
                <input
                  type="text"
                  className="form-control"
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
                  className="form-control"
                  name="date"
                  value={newProject.date}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="col-md-4">
                <input
                  type="text"
                  className="form-control"
                  name="place"
                  value={newProject.place}
                  onChange={handleInputChange}
                  placeholder="Place"
                  required
                />
              </div>
            </div>
            <button type="submit" className="btn btn-primary mt-3">
              Add Project
            </button>
          </form>
        </div>
      </div>

      {/* Project List */}
      <div className="card">
        <div className="card-body">
          <h5 className="card-title">Projects</h5>
          <table className="table table-striped">
            <thead>
              <tr>
                <th>Name</th>
                <th>Date</th>
                <th>Place</th>
                <th>Actions</th>
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
                          className="form-control"
                          name="name"
                          value={editForm.name}
                          onChange={handleEditChange}
                        />
                      </td>
                      <td>
                        <input
                          type="date"
                          className="form-control"
                          name="date"
                          value={editForm.date}
                          onChange={handleEditChange}
                        />
                      </td>
                      <td>
                        <input
                          type="text"
                          className="form-control"
                          name="place"
                          value={editForm.place}
                          onChange={handleEditChange}
                        />
                      </td>
                      <td>
                        <button
                          className="btn btn-success btn-sm"
                          onClick={() => saveEdit(project.id)}
                        >
                          Save
                        </button>
                        <button
                          className="btn btn-secondary btn-sm ms-2"
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
                          className="btn btn-warning btn-sm"
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