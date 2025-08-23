import { useState, useContext } from 'react';
import { ProjectContext } from '../context/ProjectContext';

function Dashboard() {
  const { projects } = useContext(ProjectContext);
  const [selectedProject, setSelectedProject] = useState(null);

  // State for Machinery
  const [machinery, setMachinery] = useState([
    {
      id: 1,
      projectId: 1,
      type: 'Excavator',
      vehicleName: 'EXC-001',
      dateOfEntry: '2025-08-23',
      levels: 80,
      startHours: '08:00',
      endHours: '16:00',
      workDuration: '8h',
      owner: 'John Doe',
    },
  ]);
  const [newMachinery, setNewMachinery] = useState({
    type: '',
    vehicleName: '',
    dateOfEntry: '',
    levels: '',
    startHours: '',
    endHours: '',
    workDuration: '',
    owner: '',
  });
  const [editingMachineryId, setEditingMachineryId] = useState(null);
  const [editMachineryForm, setEditMachineryForm] = useState({});

  // State for Materials
  const [materials, setMaterials] = useState([
    { id: 1, projectId: 1, type: 'Sand', quantity: 100, date: '2025-08-23' },
  ]);
  const [newMaterial, setNewMaterial] = useState({ type: '', quantity: '', date: '' });
  const [editingMaterialId, setEditingMaterialId] = useState(null);
  const [editMaterialForm, setEditMaterialForm] = useState({});

  // State for Cement Daily Output
  const [cementOutputs, setCementOutputs] = useState([
    { id: 1, projectId: 1, date: '2025-08-23', quantity: 50, notes: 'Batch 1' },
  ]);
  const [newCementOutput, setNewCementOutput] = useState({ date: '', quantity: '', notes: '' });
  const [editingCementId, setEditingCementId] = useState(null);
  const [editCementForm, setEditCementForm] = useState({});

  // State for Fuel Accounts
  const [fuelAccounts, setFuelAccounts] = useState([
    { id: 1, projectId: 1, date: '2025-08-23', fuelRate: 4.5, advance: 100 },
  ]);
  const [newFuelAccount, setNewFuelAccount] = useState({ date: '', fuelRate: '', advance: '' });
  const [editingFuelId, setEditingFuelId] = useState(null);
  const [editFuelForm, setEditFuelForm] = useState({});

  // State for Accounts
  const [accounts, setAccounts] = useState([
    { id: 1, projectId: 1, date: '2025-08-23', amount: 1000, description: 'Initial payment' },
  ]);
  const [newAccount, setNewAccount] = useState({ date: '', amount: '', description: '' });
  const [editingAccountId, setEditingAccountId] = useState(null);
  const [editAccountForm, setEditAccountForm] = useState({});

  // Handle input changes
  const handleMachineryInputChange = (e) => {
    const { name, value } = e.target;
    setNewMachinery({ ...newMachinery, [name]: value });
  };

  const handleMaterialInputChange = (e) => {
    const { name, value } = e.target;
    setNewMaterial({ ...newMaterial, [name]: value });
  };

  const handleCementInputChange = (e) => {
    const { name, value } = e.target;
    setNewCementOutput({ ...newCementOutput, [name]: value });
  };

  const handleFuelInputChange = (e) => {
    const { name, value } = e.target;
    setNewFuelAccount({ ...newFuelAccount, [name]: value });
  };

  const handleAccountInputChange = (e) => {
    const { name, value } = e.target;
    setNewAccount({ ...newAccount, [name]: value });
  };

  // Add new entries
  const addMachinery = (e) => {
    e.preventDefault();
    if (newMachinery.type && newMachinery.vehicleName && newMachinery.dateOfEntry && selectedProject) {
      const start = newMachinery.startHours || '00:00';
      const end = newMachinery.endHours || '00:00';
      const workDuration = calculateWorkDuration(start, end);
      setMachinery([...machinery, { id: machinery.length + 1, projectId: selectedProject.id, ...newMachinery, workDuration }]);
      setNewMachinery({ type: '', vehicleName: '', dateOfEntry: '', levels: '', startHours: '', endHours: '', workDuration: '', owner: '' });
    }
  };

  const addMaterial = (e) => {
    e.preventDefault();
    if (newMaterial.type && newMaterial.quantity && newMaterial.date && selectedProject) {
      setMaterials([...materials, { id: materials.length + 1, projectId: selectedProject.id, ...newMaterial }]);
      setNewMaterial({ type: '', quantity: '', date: '' });
    }
  };

  const addCementOutput = (e) => {
    e.preventDefault();
    if (newCementOutput.date && newCementOutput.quantity && selectedProject) {
      setCementOutputs([...cementOutputs, { id: cementOutputs.length + 1, projectId: selectedProject.id, ...newCementOutput }]);
      setNewCementOutput({ date: '', quantity: '', notes: '' });
    }
  };

  const addFuelAccount = (e) => {
    e.preventDefault();
    if (newFuelAccount.date && newFuelAccount.fuelRate && selectedProject) {
      setFuelAccounts([...fuelAccounts, { id: fuelAccounts.length + 1, projectId: selectedProject.id, ...newFuelAccount }]);
      setNewFuelAccount({ date: '', fuelRate: '', advance: '' });
    }
  };

  const addAccount = (e) => {
    e.preventDefault();
    if (newAccount.date && newAccount.amount && selectedProject) {
      setAccounts([...accounts, { id: accounts.length + 1, projectId: selectedProject.id, ...newAccount }]);
      setNewAccount({ date: '', amount: '', description: '' });
    }
  };

  // Start editing
  const startEditingMachinery = (item) => {
    setEditingMachineryId(item.id);
    setEditMachineryForm({ ...item });
  };

  const startEditingMaterial = (item) => {
    setEditingMaterialId(item.id);
    setEditMaterialForm({ ...item });
  };

  const startEditingCement = (item) => {
    setEditingCementId(item.id);
    setEditCementForm({ ...item });
  };

  const startEditingFuel = (item) => {
    setEditingFuelId(item.id);
    setEditFuelForm({ ...item });
  };

  const startEditingAccount = (item) => {
    setEditingAccountId(item.id);
    setEditAccountForm({ ...item });
  };

  // Handle edit form changes
  const handleEditMachineryChange = (e) => {
    const { name, value } = e.target;
    setEditMachineryForm({ ...editMachineryForm, [name]: value });
  };

  const handleEditMaterialChange = (e) => {
    const { name, value } = e.target;
    setEditMaterialForm({ ...editMaterialForm, [name]: value });
  };

  const handleEditCementChange = (e) => {
    const { name, value } = e.target;
    setEditCementForm({ ...editCementForm, [name]: value });
  };

  const handleEditFuelChange = (e) => {
    const { name, value } = e.target;
    setEditFuelForm({ ...editFuelForm, [name]: value });
  };

  const handleEditAccountChange = (e) => {
    const { name, value } = e.target;
    setEditAccountForm({ ...editAccountForm, [name]: value });
  };

  // Save edited entries
  const saveMachineryEdit = (id) => {
    const workDuration = calculateWorkDuration(editMachineryForm.startHours, editMachineryForm.endHours);
    setMachinery(
      machinery.map((item) =>
        item.id === id ? { ...item, ...editMachineryForm, workDuration } : item
      )
    );
    setEditingMachineryId(null);
  };

  const saveMaterialEdit = (id) => {
    setMaterials(
      materials.map((item) =>
        item.id === id ? { ...item, ...editMaterialForm } : item
      )
    );
    setEditingMaterialId(null);
  };

  const saveCementEdit = (id) => {
    setCementOutputs(
      cementOutputs.map((item) =>
        item.id === id ? { ...item, ...editCementForm } : item
      )
    );
    setEditingCementId(null);
  };

  const saveFuelEdit = (id) => {
    setFuelAccounts(
      fuelAccounts.map((item) =>
        item.id === id ? { ...item, ...editFuelForm } : item
      )
    );
    setEditingFuelId(null);
  };

  const saveAccountEdit = (id) => {
    setAccounts(
      accounts.map((item) =>
        item.id === id ? { ...item, ...editAccountForm } : item
      )
    );
    setEditingAccountId(null);
  };

  // Calculate work duration
  const calculateWorkDuration = (start, end) => {
    if (!start || !end) return '';
    const startTime = new Date(`1970-01-01T${start}:00`);
    const endTime = new Date(`1970-01-01T${end}:00`);
    const diff = (endTime - startTime) / (1000 * 60 * 60);
    return diff >= 0 ? `${diff}h` : 'Invalid';
  };

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
                <div className="card border-danger">
                  <div className="card-body bg-white">
                    <h5 className="card-title text-danger">Machinery</h5>
                    <form onSubmit={addMachinery}>
                      <div className="row g-2">
                        <div className="col-md-4">
                          <input
                            type="text"
                            className="form-control border-danger"
                            name="type"
                            value={newMachinery.type}
                            onChange={handleMachineryInputChange}
                            placeholder="Type"
                            required
                          />
                        </div>
                        <div className="col-md-4">
                          <input
                            type="text"
                            className="form-control border-danger"
                            name="vehicleName"
                            value={newMachinery.vehicleName}
                            onChange={handleMachineryInputChange}
                            placeholder="Vehicle Name"
                            required
                          />
                        </div>
                        <div className="col-md-4">
                          <input
                            type="date"
                            className="form-control border-danger"
                            name="dateOfEntry"
                            value={newMachinery.dateOfEntry}
                            onChange={handleMachineryInputChange}
                            required
                          />
                        </div>
                        <div className="col-md-4">
                          <input
                            type="number"
                            className="form-control border-danger"
                            name="levels"
                            value={newMachinery.levels}
                            onChange={handleMachineryInputChange}
                            placeholder="Levels"
                          />
                        </div>
                        <div className="col-md-4">
                          <input
                            type="time"
                            className="form-control border-danger"
                            name="startHours"
                            value={newMachinery.startHours}
                            onChange={handleMachineryInputChange}
                            placeholder="Start Hours"
                          />
                        </div>
                        <div className="col-md-4">
                          <input
                            type="time"
                            className="form-control border-danger"
                            name="endHours"
                            value={newMachinery.endHours}
                            onChange={handleMachineryInputChange}
                            placeholder="End Hours"
                          />
                        </div>
                        <div className="col-md-4">
                          <input
                            type="text"
                            className="form-control border-danger"
                            name="owner"
                            value={newMachinery.owner}
                            onChange={handleMachineryInputChange}
                            placeholder="Owner"
                          />
                        </div>
                        <div className="col-md-4">
                          <button type="submit" className="btn btn-danger">Add</button>
                        </div>
                      </div>
                    </form>
                    <table className="table table-striped mt-3">
                      <thead className="table-danger">
                        <tr>
                          <th className="text-white">Type</th>
                          <th className="text-white">Vehicle</th>
                          <th className="text-white">Date</th>
                          <th className="text-white">Levels</th>
                          <th className="text-white">Start</th>
                          <th className="text-white">End</th>
                          <th className="text-white">Duration</th>
                          <th className="text-white">Owner</th>
                          <th className="text-white">Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {machinery
                          .filter((item) => item.projectId === selectedProject.id)
                          .map((item) => (
                            <tr key={item.id}>
                              {editingMachineryId === item.id ? (
                                <>
                                  <td>
                                    <input
                                      type="text"
                                      className="form-control border-danger"
                                      name="type"
                                      value={editMachineryForm.type}
                                      onChange={handleEditMachineryChange}
                                    />
                                  </td>
                                  <td>
                                    <input
                                      type="text"
                                      className="form-control border-danger"
                                      name="vehicleName"
                                      value={editMachineryForm.vehicleName}
                                      onChange={handleEditMachineryChange}
                                    />
                                  </td>
                                  <td>
                                    <input
                                      type="date"
                                      className="form-control border-danger"
                                      name="dateOfEntry"
                                      value={editMachineryForm.dateOfEntry}
                                      onChange={handleEditMachineryChange}
                                    />
                                  </td>
                                  <td>
                                    <input
                                      type="number"
                                      className="form-control border-danger"
                                      name="levels"
                                      value={editMachineryForm.levels}
                                      onChange={handleEditMachineryChange}
                                    />
                                  </td>
                                  <td>
                                    <input
                                      type="time"
                                      className="form-control border-danger"
                                      name="startHours"
                                      value={editMachineryForm.startHours}
                                      onChange={handleEditMachineryChange}
                                    />
                                  </td>
                                  <td>
                                    <input
                                      type="time"
                                      className="form-control border-danger"
                                      name="endHours"
                                      value={editMachineryForm.endHours}
                                      onChange={handleEditMachineryChange}
                                    />
                                  </td>
                                  <td>{editMachineryForm.workDuration}</td>
                                  <td>
                                    <input
                                      type="text"
                                      className="form-control border-danger"
                                      name="owner"
                                      value={editMachineryForm.owner}
                                      onChange={handleEditMachineryChange}
                                    />
                                  </td>
                                  <td>
                                    <button
                                      className="btn btn-danger btn-sm"
                                      onClick={() => saveMachineryEdit(item.id)}
                                    >
                                      Save
                                    </button>
                                    <button
                                      className="btn btn-outline-danger btn-sm ms-2"
                                      onClick={() => setEditingMachineryId(null)}
                                    >
                                      Cancel
                                    </button>
                                  </td>
                                </>
                              ) : (
                                <>
                                  <td>{item.type}</td>
                                  <td>{item.vehicleName}</td>
                                  <td>{item.dateOfEntry}</td>
                                  <td>{item.levels}</td>
                                  <td>{item.startHours}</td>
                                  <td>{item.endHours}</td>
                                  <td>{item.workDuration}</td>
                                  <td>{item.owner}</td>
                                  <td>
                                    <button
                                      className="btn btn-outline-danger btn-sm"
                                      onClick={() => startEditingMachinery(item)}
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

              {/* Materials Card */}
              <div className="col-md-6 mb-4">
                <div className="card border-danger">
                  <div className="card-body bg-white">
                    <h5 className="card-title text-danger">Materials</h5>
                    <form onSubmit={addMaterial}>
                      <div className="row g-2">
                        <div className="col-md-4">
                          <input
                            type="text"
                            className="form-control border-danger"
                            name="type"
                            value={newMaterial.type}
                            onChange={handleMaterialInputChange}
                            placeholder="Material Type"
                            required
                          />
                        </div>
                        <div className="col-md-4">
                          <input
                            type="number"
                            className="form-control border-danger"
                            name="quantity"
                            value={newMaterial.quantity}
                            onChange={handleMaterialInputChange}
                            placeholder="Quantity (Tons)"
                            required
                          />
                        </div>
                        <div className="col-md-4">
                          <input
                            type="date"
                            className="form-control border-danger"
                            name="date"
                            value={newMaterial.date}
                            onChange={handleMaterialInputChange}
                            required
                          />
                        </div>
                        <div className="col-md-4">
                          <button type="submit" className="btn btn-danger">Add</button>
                        </div>
                      </div>
                    </form>
                    <table className="table table-striped mt-3">
                      <thead className="table-danger">
                        <tr>
                          <th className="text-white">Type</th>
                          <th className="text-white">Quantity (Tons)</th>
                          <th className="text-white">Date</th>
                          <th className="text-white">Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {materials
                          .filter((item) => item.projectId === selectedProject.id)
                          .map((item) => (
                            <tr key={item.id}>
                              {editingMaterialId === item.id ? (
                                <>
                                  <td>
                                    <input
                                      type="text"
                                      className="form-control border-danger"
                                      name="type"
                                      value={editMaterialForm.type}
                                      onChange={handleEditMaterialChange}
                                    />
                                  </td>
                                  <td>
                                    <input
                                      type="number"
                                      className="form-control border-danger"
                                      name="quantity"
                                      value={editMaterialForm.quantity}
                                      onChange={handleEditMaterialChange}
                                    />
                                  </td>
                                  <td>
                                    <input
                                      type="date"
                                      className="form-control border-danger"
                                      name="date"
                                      value={editMaterialForm.date}
                                      onChange={handleEditMaterialChange}
                                    />
                                  </td>
                                  <td>
                                    <button
                                      className="btn btn-danger btn-sm"
                                      onClick={() => saveMaterialEdit(item.id)}
                                    >
                                      Save
                                    </button>
                                    <button
                                      className="btn btn-outline-danger btn-sm ms-2"
                                      onClick={() => setEditingMaterialId(null)}
                                    >
                                      Cancel
                                    </button>
                                  </td>
                                </>
                              ) : (
                                <>
                                  <td>{item.type}</td>
                                  <td>{item.quantity}</td>
                                  <td>{item.date}</td>
                                  <td>
                                    <button
                                      className="btn btn-outline-danger btn-sm"
                                      onClick={() => startEditingMaterial(item)}
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

              {/* Cement Daily Output Card */}
              <div className="col-md-6 mb-4">
                <div className="card border-danger">
                  <div className="card-body bg-white">
                    <h5 className="card-title text-danger">Cement Daily Output</h5>
                    <form onSubmit={addCementOutput}>
                      <div className="row g-2">
                        <div className="col-md-4">
                          <input
                            type="date"
                            className="form-control border-danger"
                            name="date"
                            value={newCementOutput.date}
                            onChange={handleCementInputChange}
                            required
                          />
                        </div>
                        <div className="col-md-4">
                          <input
                            type="number"
                            className="form-control border-danger"
                            name="quantity"
                            value={newCementOutput.quantity}
                            onChange={handleCementInputChange}
                            placeholder="Quantity (Tons)"
                            required
                          />
                        </div>
                        <div className="col-md-4">
                          <input
                            type="text"
                            className="form-control border-danger"
                            name="notes"
                            value={newCementOutput.notes}
                            onChange={handleCementInputChange}
                            placeholder="Notes"
                          />
                        </div>
                        <div className="col-md-4">
                          <button type="submit" className="btn btn-danger">Add</button>
                        </div>
                      </div>
                    </form>
                    <table className="table table-striped mt-3">
                      <thead className="table-danger">
                        <tr>
                          <th className="text-white">Date</th>
                          <th className="text-white">Quantity (Tons)</th>
                          <th className="text-white">Notes</th>
                          <th className="text-white">Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {cementOutputs
                          .filter((item) => item.projectId === selectedProject.id)
                          .map((item) => (
                            <tr key={item.id}>
                              {editingCementId === item.id ? (
                                <>
                                  <td>
                                    <input
                                      type="date"
                                      className="form-control border-danger"
                                      name="date"
                                      value={editCementForm.date}
                                      onChange={handleEditCementChange}
                                    />
                                  </td>
                                  <td>
                                    <input
                                      type="number"
                                      className="form-control border-danger"
                                      name="quantity"
                                      value={editCementForm.quantity}
                                      onChange={handleEditCementChange}
                                    />
                                  </td>
                                  <td>
                                    <input
                                      type="text"
                                      className="form-control border-danger"
                                      name="notes"
                                      value={editCementForm.notes}
                                      onChange={handleEditCementChange}
                                    />
                                  </td>
                                  <td>
                                    <button
                                      className="btn btn-danger btn-sm"
                                      onClick={() => saveCementEdit(item.id)}
                                    >
                                      Save
                                    </button>
                                    <button
                                      className="btn btn-outline-danger btn-sm ms-2"
                                      onClick={() => setEditingCementId(null)}
                                    >
                                      Cancel
                                    </button>
                                  </td>
                                </>
                              ) : (
                                <>
                                  <td>{item.date}</td>
                                  <td>{item.quantity}</td>
                                  <td>{item.notes}</td>
                                  <td>
                                    <button
                                      className="btn btn-outline-danger btn-sm"
                                      onClick={() => startEditingCement(item)}
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

              {/* Fuel Accounts Card */}
              <div className="col-md-6 mb-4">
                <div className="card border-danger">
                  <div className="card-body bg-white">
                    <h5 className="card-title text-danger">Fuel Accounts</h5>
                    <form onSubmit={addFuelAccount}>
                      <div className="row g-2">
                        <div className="col-md-4">
                          <input
                            type="date"
                            className="form-control border-danger"
                            name="date"
                            value={newFuelAccount.date}
                            onChange={handleFuelInputChange}
                            required
                          />
                        </div>
                        <div className="col-md-4">
                          <input
                            type="number"
                            className="form-control border-danger"
                            name="fuelRate"
                            value={newFuelAccount.fuelRate}
                            onChange={handleFuelInputChange}
                            placeholder="Fuel Rate ($)"
                            required
                          />
                        </div>
                        <div className="col-md-4">
                          <input
                            type="number"
                            className="form-control border-danger"
                            name="advance"
                            value={newFuelAccount.advance}
                            onChange={handleFuelInputChange}
                            placeholder="Advance ($)"
                          />
                        </div>
                        <div className="col-md-4">
                          <button type="submit" className="btn btn-danger">Add</button>
                        </div>
                      </div>
                    </form>
                    <table className="table table-striped mt-3">
                      <thead className="table-danger">
                        <tr>
                          <th className="text-white">Date</th>
                          <th className="text-white">Fuel Rate ($)</th>
                          <th className="text-white">Advance ($)</th>
                          <th className="text-white">Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {fuelAccounts
                          .filter((item) => item.projectId === selectedProject.id)
                          .map((item) => (
                            <tr key={item.id}>
                              {editingFuelId === item.id ? (
                                <>
                                  <td>
                                    <input
                                      type="date"
                                      className="form-control border-danger"
                                      name="date"
                                      value={editFuelForm.date}
                                      onChange={handleEditFuelChange}
                                    />
                                  </td>
                                  <td>
                                    <input
                                      type="number"
                                      className="form-control border-danger"
                                      name="fuelRate"
                                      value={editFuelForm.fuelRate}
                                      onChange={handleEditFuelChange}
                                    />
                                  </td>
                                  <td>
                                    <input
                                      type="number"
                                      className="form-control border-danger"
                                      name="advance"
                                      value={editFuelForm.advance}
                                      onChange={handleEditFuelChange}
                                    />
                                  </td>
                                  <td>
                                    <button
                                      className="btn btn-danger btn-sm"
                                      onClick={() => saveFuelEdit(item.id)}
                                    >
                                      Save
                                    </button>
                                    <button
                                      className="btn btn-outline-danger btn-sm ms-2"
                                      onClick={() => setEditingFuelId(null)}
                                    >
                                      Cancel
                                    </button>
                                  </td>
                                </>
                              ) : (
                                <>
                                  <td>{item.date}</td>
                                  <td>{item.fuelRate}</td>
                                  <td>{item.advance}</td>
                                  <td>
                                    <button
                                      className="btn btn-outline-danger btn-sm"
                                      onClick={() => startEditingFuel(item)}
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

              {/* Accounts Card */}
              <div className="col-md-6 mb-4">
                <div className="card border-danger">
                  <div className="card-body bg-white">
                    <h5 className="card-title text-danger">Accounts</h5>
                    <form onSubmit={addAccount}>
                      <div className="row g-2">
                        <div className="col-md-4">
                          <input
                            type="date"
                            className="form-control border-danger"
                            name="date"
                            value={newAccount.date}
                            onChange={handleAccountInputChange}
                            required
                          />
                        </div>
                        <div className="col-md-4">
                          <input
                            type="number"
                            className="form-control border-danger"
                            name="amount"
                            value={newAccount.amount}
                            onChange={handleAccountInputChange}
                            placeholder="Amount ($)"
                            required
                          />
                        </div>
                        <div className="col-md-4">
                          <input
                            type="text"
                            className="form-control border-danger"
                            name="description"
                            value={newAccount.description}
                            onChange={handleAccountInputChange}
                            placeholder="Description"
                          />
                        </div>
                        <div className="col-md-4">
                          <button type="submit" className="btn btn-danger">Add</button>
                        </div>
                      </div>
                    </form>
                    <table className="table table-striped mt-3">
                      <thead className="table-danger">
                        <tr>
                          <th className="text-white">Date</th>
                          <th className="text-white">Amount ($)</th>
                          <th className="text-white">Description</th>
                          <th className="text-white">Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {accounts
                          .filter((item) => item.projectId === selectedProject.id)
                          .map((item) => (
                            <tr key={item.id}>
                              {editingAccountId === item.id ? (
                                <>
                                  <td>
                                    <input
                                      type="date"
                                      className="form-control border-danger"
                                      name="date"
                                      value={editAccountForm.date}
                                      onChange={handleEditAccountChange}
                                    />
                                  </td>
                                  <td>
                                    <input
                                      type="number"
                                      className="form-control border-danger"
                                      name="amount"
                                      value={editAccountForm.amount}
                                      onChange={handleEditAccountChange}
                                    />
                                  </td>
                                  <td>
                                    <input
                                      type="text"
                                      className="form-control border-danger"
                                      name="description"
                                      value={editAccountForm.description}
                                      onChange={handleEditAccountChange}
                                    />
                                  </td>
                                  <td>
                                    <button
                                      className="btn btn-danger btn-sm"
                                      onClick={() => saveAccountEdit(item.id)}
                                    >
                                      Save
                                    </button>
                                    <button
                                      className="btn btn-outline-danger btn-sm ms-2"
                                      onClick={() => setEditingAccountId(null)}
                                    >
                                      Cancel
                                    </button>
                                  </td>
                                </>
                              ) : (
                                <>
                                  <td>{item.date}</td>
                                  <td>{item.amount}</td>
                                  <td>{item.description}</td>
                                  <td>
                                    <button
                                      className="btn btn-outline-danger btn-sm"
                                      onClick={() => startEditingAccount(item)}
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
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Dashboard;