import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Home from './components/Home';
import Dashboard from './components/Dashboard';
import { ProjectProvider } from './context/ProjectContext';
import Machinery from './components/Machinery';

function App() {
  return (
    <ProjectProvider>
      <Router>
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
        </div>
      </Router>
    </ProjectProvider>
  );
}

export default App;