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
      startHours: '08:00',
      endHours: '16:00',
      workDuration: '8h',
      owner: { name: 'John Doe', contact: '123-456-7890' },
      fuelRate: 4.5,
      advancePay: 100,
    },
  ]);
  const [machineryTypes, setMachineryTypes] = useState(['Excavator', 'Bulldozer', 'Crane', 'Loader']);
  const [newMachinery, setNewMachinery] = useState({
    type: 'Excavator',
    vehicleName: '',
    dateOfEntry: '',
    startHours: '',
    endHours: '',
    workDuration: '',
    owner: { name: '', contact: '' },
    fuelRate: '',
    advancePay: '',
  });
  const [showAddType, setShowAddType] = useState(false);
  const [newType, setNewType] = useState('');
  const [editingMachineryId, setEditingMachineryId] = useState(null);
  const [editMachineryForm, setEditMachineryForm] = useState({});

  // Handle input changes
  const handleMachineryInputChange = (e) => {
    const { name, value } = e.target;
    if (name === 'owner.name' || name === 'owner.contact') {
      setNewMachinery((prev) => ({
        ...prev,
        owner: { ...prev.owner, [name.split('.')[1]]: value },
      }));
    } else {
      setNewMachinery({ ...newMachinery, [name]: value });
    }
  };

  const handleEditMachineryChange = (e) => {
    const { name, value } = e.target;
    if (name === 'owner.name' || name === 'owner.contact') {
      setEditMachineryForm((prev) => ({
        ...prev,
        owner: { ...prev.owner, [name.split('.')[1]]: value },
      }));
    } else {
      setEditMachineryForm({ ...editMachineryForm, [name]: value });
    }
  };

  // Add new machinery type
  const addMachineryType = (e) => {
    e.preventDefault();
    if (newType && !machineryTypes.includes(newType)) {
      setMachineryTypes([...machineryTypes, newType]);
      setNewType('');
      setShowAddType(false);
    }
  };

  // Add new machinery
  const addMachinery = (e) => {
    e.preventDefault();
    if (newMachinery.vehicleName && newMachinery.dateOfEntry) {
      const start = newMachinery.startHours || '00:00';
      const end = newMachinery.endHours || '00:00';
      const workDuration = calculateWorkDuration(start, end, newMachinery.type);
      setMachinery([...machinery, { id: machinery.length + 1, projectId: parseInt(projectId), ...newMachinery, workDuration }]);
      setNewMachinery({
        type: 'Excavator',
        vehicleName: '',
        dateOfEntry: '',
        startHours: '',
        endHours: '',
        workDuration: '',
        owner: { name: '', contact: '' },
        fuelRate: '',
        advancePay: '',
      });
    }
  };

  // Start editing
  const startEditingMachinery = (item) => {
    setEditingMachineryId(item.id);
    setEditMachineryForm({ ...item });
  };

  // Save edited machinery
  const saveMachineryEdit = (id) => {
    const workDuration = calculateWorkDuration(editMachineryForm.startHours, editMachineryForm.endHours, editMachineryForm.type);
    setMachinery(
      machinery.map((item) =>
        item.id === id ? { ...item, ...editMachineryForm, workDuration } : item
      )
    );
    setEditingMachineryId(null);
  };

  // Calculate work duration (conditional based on vehicle type)
  const calculateWorkDuration = (start, end, type) => {
    if (!start || !end || ['Crane'].includes(type)) return '';
    const startTime = new Date(`1970-01-01T${start}:00`);
    const endTime = new Date(`1970-01-01T${end}:00`);
    const diff = (endTime - startTime) / (1000 * 60 * 60);
    return diff >= 0 ? `${diff}h` : 'Invalid';
  };

  return (
    <div className="container-fluid mt-4" style={{ fontFamily: 'Arial, sans-serif' }}>
      <h1 className="text-center mb-4" style={{ color: '#2c3e50', fontWeight: 700, textTransform: 'uppercase' }}>Machinery Details</h1>
      <div className="row">
        <div className="col-md-12">
          <div className="card" style={{ borderRadius: '15px', boxShadow: '0 4px 15px rgba(0, 0, 0, 0.1)', border: 'none' }}>
            <div className="card-body" style={{ background: 'linear-gradient(135deg, #ffffff, #f8f9fa)', padding: '30px' }}>
              <h5 className="card-title mb-4" style={{ color: '#e74c3c', fontWeight: 600, borderBottom: '2px solid #e74c3c', paddingBottom: '10px' }}>Add Machinery</h5>
              <form onSubmit={addMachinery} style={{ display: 'flex', flexWrap: 'wrap', gap: '15px' }}>
                <div style={{ flex: '1 1 200px', minWidth: '200px' }}>
                  <label style={{ color: '#34495e', fontWeight: 500 }}>Machinery Type</label>
                  <select
                    name="type"
                    value={newMachinery.type}
                    onChange={handleMachineryInputChange}
                    style={{ width: '100', padding: '10px', borderRadius: '8px', border: '1px solid #ddd', background: '#fff', boxShadow: 'inset 0 1px 3px rgba(0, 0, 0, 0.1)' }}
                  >
                    {machineryTypes.map((type) => (
                      <option key={type} value={type}>{type}</option>
                    ))}
                  </select>
                  <button
                    type="button"
                    onClick={() => setShowAddType(true)}
                    style={{ marginTop: '5px', padding: '8px 15px', background: '#e74c3c', color: '#fff', border: 'none', borderRadius: '8px', cursor: 'pointer', transition: 'background 0.3s' }}
                    onMouseOver={(e) => (e.target.style.background = '#c0392b')}
                    onMouseOut={(e) => (e.target.style.background = '#e74c3c')}
                  >
                    Add New Type
                  </button>
                  {showAddType && (
                    <div style={{ marginTop: '10px' }}>
                      <input
                        type="text"
                        value={newType}
                        onChange={(e) => setNewType(e.target.value)}
                        style={{ width: '70%', padding: '10px', borderRadius: '8px', border: '1px solid #ddd', marginRight: '10px' }}
                      />
                      <button onClick={addMachineryType} style={{ padding: '10px 15px', background: '#2ecc71', color: '#fff', border: 'none', borderRadius: '8px', cursor: 'pointer' }}>
                        Save Type
                      </button>
                    </div>
                  )}
                </div>
                <div style={{ flex: '1 1 200px', minWidth: '200px' }}>
                  <label style={{ color: '#34495e', fontWeight: 500 }}>Vehicle Unique Name</label>
                  <input
                    type="text"
                    name="vehicleName"
                    value={newMachinery.vehicleName}
                    onChange={handleMachineryInputChange}
                    required
                    style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid #ddd', background: '#fff', boxShadow: 'inset 0 1px 3px rgba(0, 0, 0, 0.1)' }}
                  />
                </div>
                <div style={{ flex: '1 1 200px', minWidth: '200px' }}>
                  <label style={{ color: '#34495e', fontWeight: 500 }}>Date of Entry</label>
                  <input
                    type="date"
                    name="dateOfEntry"
                    value={newMachinery.dateOfEntry}
                    onChange={handleMachineryInputChange}
                    required
                    style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid #ddd', background: '#fff', boxShadow: 'inset 0 1px 3px rgba(0, 0, 0, 0.1)' }}
                  />
                </div>
                {['Excavator', 'Bulldozer', 'Loader'].includes(newMachinery.type) && (
                  <>
                    <div style={{ flex: '1 1 200px', minWidth: '200px' }}>
                      <label style={{ color: '#34495e', fontWeight: 500 }}>Starting Hours</label>
                      <input
                        type="time"
                        name="startHours"
                        value={newMachinery.startHours}
                        onChange={handleMachineryInputChange}
                        style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid #ddd', background: '#fff', boxShadow: 'inset 0 1px 3px rgba(0, 0, 0, 0.1)' }}
                      />
                    </div>
                    <div style={{ flex: '1 1 200px', minWidth: '200px' }}>
                      <label style={{ color: '#34495e', fontWeight: 500 }}>Ending Hours</label>
                      <input
                        type="time"
                        name="endHours"
                        value={newMachinery.endHours}
                        onChange={handleMachineryInputChange}
                        style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid #ddd', background: '#fff', boxShadow: 'inset 0 1px 3px rgba(0, 0, 0, 0.1)' }}
                      />
                    </div>
                  </>
                )}
                <div style={{ flex: '1 1 200px', minWidth: '200px' }}>
                  <label style={{ color: '#34495e', fontWeight: 500 }}>Working Duration</label>
                  <input
                    type="text"
                    name="workDuration"
                    value={newMachinery.workDuration}
                    readOnly
                    style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid #ddd', background: '#f1f1f1', boxShadow: 'inset 0 1px 3px rgba(0, 0, 0, 0.1)' }}
                  />
                </div>
                <div style={{ flex: '1 1 200px', minWidth: '200px' }}>
                  <label style={{ color: '#34495e', fontWeight: 500 }}>Fuel Rate ($/unit)</label>
                  <input
                    type="number"
                    name="fuelRate"
                    value={newMachinery.fuelRate}
                    onChange={handleMachineryInputChange}
                    style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid #ddd', background: '#fff', boxShadow: 'inset 0 1px 3px rgba(0, 0, 0, 0.1)' }}
                  />
                </div>
                <div style={{ flex: '1 1 200px', minWidth: '200px' }}>
                  <label style={{ color: '#34495e', fontWeight: 500 }}>Advance/Beta Pay ($)</label>
                  <input
                    type="number"
                    name="advancePay"
                    value={newMachinery.advancePay}
                    onChange={handleMachineryInputChange}
                    style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid #ddd', background: '#fff', boxShadow: 'inset 0 1px 3px rgba(0, 0, 0, 0.1)' }}
                  />
                </div>
                <div style={{ flex: '1 1 200px', minWidth: '200px' }}>
                  <label style={{ color: '#34495e', fontWeight: 500 }}>Owner Name</label>
                  <input
                    type="text"
                    name="owner.name"
                    value={newMachinery.owner.name}
                    onChange={handleMachineryInputChange}
                    style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid #ddd', background: '#fff', boxShadow: 'inset 0 1px 3px rgba(0, 0, 0, 0.1)' }}
                  />
                </div>
                <div style={{ flex: '1 1 200px', minWidth: '200px' }}>
                  <label style={{ color: '#34495e', fontWeight: 500 }}>Owner Contact</label>
                  <input
                    type="text"
                    name="owner.contact"
                    value={newMachinery.owner.contact}
                    onChange={handleMachineryInputChange}
                    style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid #ddd', background: '#fff', boxShadow: 'inset 0 1px 3px rgba(0, 0, 0, 0.1)' }}
                  />
                </div>
                <div style={{ flex: '1 1 200px', minWidth: '200px' }}>
                  <button
                    type="submit"
                    style={{ padding: '12px 30px', background: 'linear-gradient(135deg, #e74c3c, #c0392b)', color: '#fff', border: 'none', borderRadius: '8px', cursor: 'pointer', fontWeight: 600, transition: 'transform 0.3s, box-shadow 0.3s' }}
                    onMouseOver={(e) => { e.target.style.transform = 'scale(1.05)'; e.target.style.boxShadow = '0 5px 15px rgba(231, 76, 60, 0.4)'; }}
                    onMouseOut={(e) => { e.target.style.transform = 'scale(1)'; e.target.style.boxShadow = 'none'; }}
                  >
                    Add Machinery
                  </button>
                </div>
              </form>
              <h5 className="card-title mt-5 mb-4" style={{ color: '#e74c3c', fontWeight: 600, borderBottom: '2px solid #e74c3c', paddingBottom: '10px' }}>Machinery List</h5>
              <table style={{ width: '100%', borderCollapse: 'separate', borderSpacing: '0 10px' }}>
                <thead>
                  <tr style={{ background: 'linear-gradient(135deg, #2c3e50, #34495e)', color: '#fff', borderRadius: '10px' }}>
                    <th style={{ padding: '12px', borderTopLeftRadius: '10px' }}>Type</th>
                    <th style={{ padding: '12px' }}>Vehicle</th>
                    <th style={{ padding: '12px' }}>Date</th>
                    <th style={{ padding: '12px' }}>Start</th>
                    <th style={{ padding: '12px' }}>End</th>
                    <th style={{ padding: '12px' }}>Duration</th>
                    <th style={{ padding: '12px' }}>Owner</th>
                    <th style={{ padding: '12px' }}>Fuel Rate ($)</th>
                    <th style={{ padding: '12px' }}>Advance Pay ($)</th>
                    <th style={{ padding: '12px', borderTopRightRadius: '10px' }}>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {machinery
                    .filter((item) => item.projectId === parseInt(projectId))
                    .map((item) => (
                      <tr key={item.id} style={{ background: '#fff', boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)', borderRadius: '10px', marginBottom: '10px' }}>
                        {editingMachineryId === item.id ? (
                          <>
                            <td style={{ padding: '10px' }}>
                              <select
                                name="type"
                                value={editMachineryForm.type}
                                onChange={handleEditMachineryChange}
                                style={{ width: '100%', padding: '8px', borderRadius: '8px', border: '1px solid #ddd', background: '#fff' }}
                              >
                                {machineryTypes.map((type) => (
                                  <option key={type} value={type}>{type}</option>
                                ))}
                              </select>
                            </td>
                            <td style={{ padding: '10px' }}>
                              <input
                                type="text"
                                name="vehicleName"
                                value={editMachineryForm.vehicleName}
                                onChange={handleEditMachineryChange}
                                style={{ width: '100%', padding: '8px', borderRadius: '8px', border: '1px solid #ddd' }}
                              />
                            </td>
                            <td style={{ padding: '10px' }}>
                              <input
                                type="date"
                                name="dateOfEntry"
                                value={editMachineryForm.dateOfEntry}
                                onChange={handleEditMachineryChange}
                                style={{ width: '100%', padding: '8px', borderRadius: '8px', border: '1px solid #ddd' }}
                              />
                            </td>
                            {['Excavator', 'Bulldozer', 'Loader'].includes(editMachineryForm.type) && (
                              <>
                                <td style={{ padding: '10px' }}>
                                  <input
                                    type="time"
                                    name="startHours"
                                    value={editMachineryForm.startHours}
                                    onChange={handleEditMachineryChange}
                                    style={{ width: '100%', padding: '8px', borderRadius: '8px', border: '1px solid #ddd' }}
                                  />
                                </td>
                                <td style={{ padding: '10px' }}>
                                  <input
                                    type="time"
                                    name="endHours"
                                    value={editMachineryForm.endHours}
                                    onChange={handleEditMachineryChange}
                                    style={{ width: '100%', padding: '8px', borderRadius: '8px', border: '1px solid #ddd' }}
                                  />
                                </td>
                              </>
                            )}
                            <td style={{ padding: '10px' }}>{editMachineryForm.workDuration}</td>
                            <td style={{ padding: '10px' }}>
                              <input
                                type="text"
                                name="owner.name"
                                value={editMachineryForm.owner.name}
                                onChange={handleEditMachineryChange}
                                style={{ width: '100%', padding: '8px', borderRadius: '8px', border: '1px solid #ddd' }}
                              />
                            </td>
                            <td style={{ padding: '10px' }}>
                              <input
                                type="number"
                                name="fuelRate"
                                value={editMachineryForm.fuelRate}
                                onChange={handleEditMachineryChange}
                                style={{ width: '100%', padding: '8px', borderRadius: '8px', border: '1px solid #ddd' }}
                              />
                            </td>
                            <td style={{ padding: '10px' }}>
                              <input
                                type="number"
                                name="advancePay"
                                value={editMachineryForm.advancePay}
                                onChange={handleEditMachineryChange}
                                style={{ width: '100%', padding: '8px', borderRadius: '8px', border: '1px solid #ddd' }}
                              />
                            </td>
                            <td style={{ padding: '10px' }}>
                              <button
                                onClick={() => saveMachineryEdit(item.id)}
                                style={{ padding: '8px 15px', background: '#2ecc71', color: '#fff', border: 'none', borderRadius: '8px', cursor: 'pointer' }}
                              >
                                Save
                              </button>
                              <button
                                onClick={() => setEditingMachineryId(null)}
                                style={{ marginLeft: '10px', padding: '8px 15px', background: '#e74c3c', color: '#fff', border: 'none', borderRadius: '8px', cursor: 'pointer' }}
                              >
                                Cancel
                              </button>
                            </td>
                          </>
                        ) : (
                          <>
                            <td style={{ padding: '10px' }}>{item.type}</td>
                            <td style={{ padding: '10px' }}>{item.vehicleName}</td>
                            <td style={{ padding: '10px' }}>{item.dateOfEntry}</td>
                            <td style={{ padding: '10px' }}>{item.startHours || 'N/A'}</td>
                            <td style={{ padding: '10px' }}>{item.endHours || 'N/A'}</td>
                            <td style={{ padding: '10px' }}>{item.workDuration}</td>
                            <td style={{ padding: '10px' }}>{item.owner.name}</td>
                            <td style={{ padding: '10px' }}>{item.fuelRate}</td>
                            <td style={{ padding: '10px' }}>{item.advancePay}</td>
                            <td style={{ padding: '10px' }}>
                              <button
                                onClick={() => startEditingMachinery(item)}
                                style={{ padding: '8px 15px', background: '#3498db', color: '#fff', border: 'none', borderRadius: '8px', cursor: 'pointer' }}
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