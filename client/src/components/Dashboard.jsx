import { useState, useContext } from 'react';
import { ProjectContext } from '../context/ProjectContext';
import { Link } from 'react-router-dom';
import Machinery from './Machinery';

function Dashboard() {
  const { projects } = useContext(ProjectContext);
  const [selectedProject, setSelectedProject] = useState(null);

  return (
    <div className="container-fluid mt-4">
      <div className="row">
        {/* Left Sidebar (Fixed Column) */}
        <div className="col-md-3">
          <div className="card border-danger h-100">
            <div className="card-header bg-danger">
              <h5 className="card-title text-white">Project Details</h5>
            </div>
            <div className="card-body bg-white">
              {projects.length === 0 ? (
                <div className="alert alert-info" role="alert">
                  No projects available. Add projects in the Home page.
                </div>
              ) : (
                <ul className="list-group">
                  {projects.map((project) => (
                    <li
                      key={project.id}
                      className={`list-group-item ${selectedProject && selectedProject.id === project.id ? 'border-danger bg-light' : ''}`}
                      style={{ cursor: 'pointer' }}
                      onClick={() => setSelectedProject(project)}
                    >
                      <h6 className="mb-1 text-danger fw-bold">{project.name}</h6>
                      <p className="mb-1"><strong>Date:</strong> {project.date}</p>
                      <p className="mb-0"><strong>Place:</strong> {project.place}</p>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="col-md-9">
          <h1 className="text-center mb-4 text-danger">
            Dashboard {selectedProject ? `- ${selectedProject.name}` : ''}
          </h1>
          {!selectedProject ? (
            <div className="alert alert-warning text-center" role="alert">
              Select a project from the sidebar to view details.
            </div>
          ) : (
            <div className="row">
              {/* Machinery Card */}
              <div className="col-md-6 mb-4">
                <div className="card border-danger h-100">
                  <div className="card-body bg-white">
                    <h5 className="card-title text-danger">Machinery</h5>
                    <Link to={`/dashboard/machinery/${selectedProject.id}`} className="btn btn-danger w-100">
                      View Machinery Details
                    </Link>
                  </div>
                </div>
              </div>

              {/* Materials Card */}
              <div className="col-md-6 mb-4">
                <div className="card border-danger h-100">
                  <div className="card-body bg-white">
                    <h5 className="card-title text-danger">Materials</h5>
                    <p className="text-muted">Details coming soon.</p>
                  </div>
                </div>
              </div>

              {/* Cement Daily Output Card */}
              <div className="col-md-6 mb-4">
                <div className="card border-danger h-100">
                  <div className="card-body bg-white">
                    <h5 className="card-title text-danger">Cement Daily Output</h5>
                    <p className="text-muted">Details coming soon.</p>
                  </div>
                </div>
              </div>

              {/* Fuel Accounts Card */}
              <div className="col-md-6 mb-4">
                <div className="card border-danger h-100">
                  <div className="card-body bg-white">
                    <h5 className="card-title text-danger">Fuel Accounts</h5>
                    <p className="text-muted">Details coming soon.</p>
                  </div>
                </div>
              </div>

              {/* Accounts Card */}
              <div className="col-md-6 mb-4">
                <div className="card border-danger h-100">
                  <div className="card-body bg-white">
                    <h5 className="card-title text-danger">Accounts</h5>
                    <p className="text-muted">Details coming soon.</p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Dashboard;