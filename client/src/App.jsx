import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Home from './components/Home';
import Dashboard from './components/Dashboard';
import { ProjectProvider } from './context/ProjectContext';
import Machinery from './components/Machinery';
<<<<<<< HEAD
import './App.css';
=======
>>>>>>> origin/main

function App() {
  return (
    <ProjectProvider>
      <Router>
<<<<<<< HEAD
        <div className="min-vh-100">
          <nav className="navbar glass-navbar navbar-expand-lg">
            <div className="container-fluid">
              <Link className="navbar-brand text-gradient fw-bold" to="/">
                <i className="fas fa-project-diagram me-2"></i>
                Project Manager
              </Link>

              <div className="navbar-nav ms-auto">
                <Link className="nav-link" to="/">
                  <i className="fas fa-home me-2"></i>Home
                </Link>
                <Link className="nav-link" to="/dashboard">
                  <i className="fas fa-tachometer-alt me-2"></i>Dashboard
                </Link>
              </div>
            </div>
          </nav>

          <main>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/dashboard/machinery/:projectId" element={<Machinery />} />
            </Routes>
          </main>
=======
        <div className="container-fluid">
          <nav className="navbar navbar-expand-lg bg-danger">
            <div className="navbar-nav">
              <Link className="nav-link text-white" to="/">Home</Link>
              <Link className="nav-link text-white" to="/dashboard">Dashboard</Link>
            </div>
          </nav>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/dashboard/machinery/:projectId" element={<Machinery />} />
          </Routes>
>>>>>>> origin/main
        </div>
      </Router>
    </ProjectProvider>
  );
}

export default App;