import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

function Machinery() {
  const { projectId } = useParams();
  const [machinery, setMachinery] = useState([
    {
      id: 1,
      projectId: parseInt(projectId),
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

  // Handle input changes
  const handleMachineryInputChange = (e) => {
    const { name, value } = e.target;
    setNewMachinery({ ...newMachinery, [name]: value });
  };

  const handleEditMachineryChange = (e) => {
    const { name, value } = e.target;
    setEditMachineryForm({ ...editMachineryForm, [name]: value });
  };

  // Add new machinery
  const addMachinery = (e) => {
    e.preventDefault();
    if (newMachinery.type && newMachinery.vehicleName && newMachinery.dateOfEntry) {
      const start = newMachinery.startHours || '00:00';
      const end = newMachinery.endHours || '00:00';
      const workDuration = calculateWorkDuration(start, end);
      setMachinery([...machinery, { id: machinery.length + 1, projectId: parseInt(projectId), ...newMachinery, workDuration }]);
      setNewMachinery({ type: '', vehicleName: '', dateOfEntry: '', levels: '', startHours: '', endHours: '', workDuration: '', owner: '' });
    }
  };

  // Start editing
  const startEditingMachinery = (item) => {
    setEditingMachineryId(item.id);
    setEditMachineryForm({ ...item });
  };

  // Save edited machinery
  const saveMachineryEdit = (id) => {
    const workDuration = calculateWorkDuration(editMachineryForm.startHours, editMachineryForm.endHours);
    setMachinery(
      machinery.map((item) =>
        item.id === id ? { ...item, ...editMachineryForm, workDuration } : item
      )
    );
    setEditingMachineryId(null);
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
      <h1 className="text-center mb-4 text-danger">Machinery Details</h1>
      <div className="row">
        <div className="col-md-12">
          <div className="card border-danger">
            <div className="card-body bg-white">
              <h5 className="card-title text-danger">Add Machinery</h5>
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
              <h5 className="card-title text-danger mt-4">Machinery List</h5>
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
                    .filter((item) => item.projectId === parseInt(projectId))
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
      </div>
    </div>
  );
}

export default Machinery;