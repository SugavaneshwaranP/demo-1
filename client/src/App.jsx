import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Home from './components/Home';
import Dashboard from './components/Dashboard';

function App() {
  return (
    <Router>
      <div className="container-fluid">
        <nav className="navbar navbar-expand-lg bg-danger">
          <a className="navbar-brand text-white" href="/">Dew</a>
          <div className="navbar-nav">
            <Link className="nav-link text-white" to="/">Home</Link>
            <Link className="nav-link text-white" to="/dashboard">Dashboard</Link>
          </div>
        </nav>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;