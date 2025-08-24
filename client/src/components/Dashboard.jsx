import { useState, useContext } from 'react';
import { ProjectContext } from '../context/ProjectContext';
import { Link } from 'react-router-dom';

function Dashboard() {
  const { projects } = useContext(ProjectContext);
  const [selectedProject, setSelectedProject] = useState(null);

  return (
    <div className="container-fluid py-4">
      <div className="animate-fade-in">
        <h1 className="main-title">
          <i className="fas fa-tachometer-alt me-3"></i>
          Dashboard
          {selectedProject && (
            <span className="text-gradient"> - {selectedProject.name}</span>
          )}
        </h1>

        <div className="row">
          {/* Left Sidebar */}
          <div className="col-lg-3 mb-4">
            <div className="glass-card h-100">
              <h2 className="section-title">
                <i className="fas fa-folder-open"></i>
                Project Details
              </h2>

              {projects.length === 0 ? (
                <div className="alert-modern alert-info-modern">
                  <i className="fas fa-info-circle"></i>
                  No projects available. Add projects in the Home page.
                </div>
              ) : (
                <div className="space-y-3">
                  {projects.map((project) => (
                    <div
                      key={project._id}
                      className={`sidebar-card ${selectedProject?._id === project._id ? 'active' : ''}`}
                      onClick={() => setSelectedProject(project)}
                    >
                      <h6 className="text-gradient fw-bold mb-2">
                        <i className="fas fa-folder me-2"></i>
                        {project.name}
                      </h6>
                      <p className="text-muted mb-1">
                        <i className="fas fa-calendar me-2"></i>
                        <strong>Date:</strong> {new Date(project.date).toLocaleDateString()}
                      </p>

                      <p className="text-muted mb-0">
                        <i className="fas fa-map-marker-alt me-2"></i>
                        <strong>Place:</strong> {project.place}
                      </p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Main Content */}
          <div className="col-lg-9">
            {!selectedProject ? (
              <div className="alert alert-danger text-center">
                <i className="fas fa-hand-pointer"></i>
                Select a project from the sidebar to view details.
              </div>
            ) : (
              <div className="row">
                {/* Machinery Card */}
                <div className="col-md-6 mb-4">
                  <div className="dashboard-card animate-slide-in">
                    <i className="fas fa-cogs dashboard-icon"></i>
                    <h3 className="text-gradient fw-bold mb-3">Machinery</h3>
                    <p className="text-muted mb-4">
                      Manage and track all machinery operations
                    </p>
                    <Link
                      to={`/dashboard/machinery/${selectedProject._id}`}
                      className="btn-modern btn-primary-modern w-100"
                    >
                      <i className="fas fa-eye me-2"></i>
                      View Machinery Details
                    </Link>
                  </div>
                </div>

                {/* Materials Card */}
                <div className="col-md-6 mb-4">
                  <div className="dashboard-card animate-slide-in" style={{ animationDelay: '0.1s' }}>
                    <i className="fas fa-boxes dashboard-icon"></i>
                    <h3 className="text-gradient fw-bold mb-3">Materials</h3>
                    <p className="text-muted mb-4">
                      Track material inventory and usage
                    </p>
                    <button className="btn-modern btn-outline-modern w-100" disabled>
                      <i className="fas fa-clock me-2"></i>
                      Coming Soon
                    </button>
                  </div>
                </div>

                {/* Cement Daily Output Card */}
                <div className="col-md-6 mb-4">
                  <div className="dashboard-card animate-slide-in" style={{ animationDelay: '0.2s' }}>
                    <i className="fas fa-industry dashboard-icon"></i>
                    <h3 className="text-gradient fw-bold mb-3">Cement Output</h3>
                    <p className="text-muted mb-4">
                      Monitor daily cement production
                    </p>
                    <button className="btn-modern btn-outline-modern w-100" disabled>
                      <i className="fas fa-clock me-2"></i>
                      Coming Soon
                    </button>
                  </div>
                </div>

                {/* Fuel Accounts Card */}
                <div className="col-md-6 mb-4">
                  <div className="dashboard-card animate-slide-in" style={{ animationDelay: '0.3s' }}>
                    <i className="fas fa-gas-pump dashboard-icon"></i>
                    <h3 className="text-gradient fw-bold mb-3">Fuel Accounts</h3>
                    <p className="text-muted mb-4">
                      Track fuel consumption and costs
                    </p>
                    <button className="btn-modern btn-outline-modern w-100" disabled>
                      <i className="fas fa-clock me-2"></i>
                      Coming Soon
                    </button>
                  </div>
                </div>

                {/* Financial Accounts Card */}
                <div className="col-md-6 mb-4">
                  <div className="dashboard-card animate-slide-in" style={{ animationDelay: '0.4s' }}>
                    <i className="fas fa-calculator dashboard-icon"></i>
                    <h3 className="text-gradient fw-bold mb-3">Accounts</h3>
                    <p className="text-muted mb-4">
                      Financial tracking and reporting
                    </p>
                    <button className="btn-modern btn-outline-modern w-100" disabled>
                      <i className="fas fa-clock me-2"></i>
                      Coming Soon
                    </button>
                  </div>
                </div>

                {/* Reports Card */}
                <div className="col-md-6 mb-4">
                  <div className="dashboard-card animate-slide-in" style={{ animationDelay: '0.5s' }}>
                    <i className="fas fa-chart-bar dashboard-icon"></i>
                    <h3 className="text-gradient fw-bold mb-3">Reports</h3>
                    <p className="text-muted mb-4">
                      Generate comprehensive reports
                    </p>
                    <button className="btn-modern btn-outline-modern w-100" disabled>
                      <i className="fas fa-clock me-2"></i>
                      Coming Soon
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;