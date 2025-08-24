import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
<<<<<<< HEAD
import machineryService from '../services/machineryService';

function Machinery() {
  const { projectId } = useParams();
  const [machinery, setMachinery] = useState([]);
  const [machineryTypes, setMachineryTypes] = useState(['Excavator', 'Bulldozer', 'Crane', 'Loader']);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const [showPopup, setShowPopup] = useState(false); // New state for popup visibility
  const [popupMessage, setPopupMessage] = useState(''); // New state for popup message
=======

function Machinery() {
  const { projectId } = useParams();
  const [machinery, setMachinery] = useState([
    {
      id: 1,
      projectId: parseInt(projectId),
      type: 'Excavator',
      vehicleName: 'EXC-001',
      dateOfEntry: '2025-08-24',
      startHours: '08:00',
      endHours: '16:00',
      workDuration: '8h',
      owner: { name: 'John Doe', contact: '123-456-7890' },
      fuelRate: 350,
      advancePay: 8000,
    },
  ]);
  const [machineryTypes, setMachineryTypes] = useState(['Excavator', 'Bulldozer', 'Crane', 'Loader']);
>>>>>>> origin/main
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
  const [showAddTypeModal, setShowAddTypeModal] = useState(false);
  const [newType, setNewType] = useState('');
  const [editingMachineryId, setEditingMachineryId] = useState(null);
  const [editMachineryForm, setEditMachineryForm] = useState({});

<<<<<<< HEAD
    // Dynamically calculate work duration for new machinery form
  useEffect(() => {
    const { startHours, endHours, type } = newMachinery;
    const duration = calculateWorkDuration(startHours, endHours, type);
    setNewMachinery((prev) => ({ ...prev, workDuration: duration }));
  }, [newMachinery.startHours, newMachinery.endHours, newMachinery.type]);

  // Dynamically calculate work duration for edit machinery form
  useEffect(() => {
    const { startHours, endHours, type } = editMachineryForm;
    const duration = calculateWorkDuration(startHours, endHours, type);
    setEditMachineryForm((prev) => ({ ...prev, workDuration: duration }));
  }, [editMachineryForm.startHours, editMachineryForm.endHours, editMachineryForm.type]);

  // Fetch machinery data on component mount
  useEffect(() => {
    fetchMachinery();
    fetchMachineryTypes();
  }, [projectId]);

  // Fetch machinery for the project
  const fetchMachinery = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await machineryService.getMachineryByProject(projectId);
      setMachinery(data);
      setShowPopup(false); // Hide popup on success
    } catch (err) {
      console.error('Error fetching machinery:', err);
      setError(err.message);
      setPopupMessage(err.message || 'Failed to fetch machinery');
      setShowPopup(true);
      setMachinery([]);
    } finally {
      setLoading(false);
    }
  };

  // Fetch machinery types
  const fetchMachineryTypes = async () => {
    try {
      const types = await machineryService.getMachineryTypes();
      if (types.length > 0) {
        setMachineryTypes([...new Set([...machineryTypes, ...types])]);
      }
    } catch (err) {
      console.error('Error fetching machinery types:', err);
      setPopupMessage(err.message || 'Failed to fetch machinery types');
      setShowPopup(true);
      // Keep default types if API fails
    }
  };

=======
>>>>>>> origin/main
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
      setShowAddTypeModal(false);
    }
  };

  // Add new machinery
<<<<<<< HEAD
  const addMachinery = async (e) => {
    e.preventDefault();
    if (newMachinery.vehicleName && newMachinery.dateOfEntry) {
      try {
        setSubmitting(true);
        setError(null);
        
        const machineryData = {
          projectId,
          type: newMachinery.type,
          vehicleName: newMachinery.vehicleName,
          dateOfEntry: newMachinery.dateOfEntry,
          startHours: newMachinery.startHours || undefined,
          endHours: newMachinery.endHours || undefined,
          owner: {
            name: newMachinery.owner.name || '',
            contact: newMachinery.owner.contact || ''
          },
          fuelRate: parseFloat(newMachinery.fuelRate) || 0,
          advancePay: parseFloat(newMachinery.advancePay) || 0,
        };

        const createdMachinery = await machineryService.createMachinery(machineryData);
        setMachinery(prev => [createdMachinery, ...prev]);
        
        // Reset form
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
        setShowPopup(false); // Hide popup on success
      } catch (err) {
        console.error('Error adding machinery:', err);
        setError(err.message);
        setPopupMessage(err.message || 'Failed to add machinery');
        setShowPopup(true);
      } finally {
        setSubmitting(false);
      }
=======
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
>>>>>>> origin/main
    }
  };

  // Start editing
  const startEditingMachinery = (item) => {
<<<<<<< HEAD
    setEditingMachineryId(item._id);
    setEditMachineryForm({ 
      ...item,
      dateOfEntry: item.dateOfEntry ? item.dateOfEntry.split('T')[0] : ''
    });
  };

  // Save edited machinery
  const saveMachineryEdit = async (id) => {
    try {
      setSubmitting(true);
      setError(null);
      
      const updateData = {
        type: editMachineryForm.type,
        vehicleName: editMachineryForm.vehicleName,
        dateOfEntry: editMachineryForm.dateOfEntry,
        startHours: editMachineryForm.startHours || undefined,
        endHours: editMachineryForm.endHours || undefined,
        owner: {
          name: editMachineryForm.owner?.name || '',
          contact: editMachineryForm.owner?.contact || ''
        },
        fuelRate: parseFloat(editMachineryForm.fuelRate) || 0,
        advancePay: parseFloat(editMachineryForm.advancePay) || 0,
      };

      const updatedMachinery = await machineryService.updateMachinery(id, updateData);
      setMachinery(prev => 
        prev.map(item => 
          item._id === id ? updatedMachinery : item
        )
      );
      setEditingMachineryId(null);
      setShowPopup(false); // Hide popup on success
    } catch (err) {
      console.error('Error updating machinery:', err);
      setError(err.message);
      setPopupMessage(err.message || 'Failed to update machinery');
      setShowPopup(true);
    } finally {
      setSubmitting(false);
    }
  };

  // Delete machinery
  const deleteMachinery = async (id) => {
    if (window.confirm('Are you sure you want to delete this machinery?')) {
      try {
        setSubmitting(true);
        setError(null);
        await machineryService.deleteMachinery(id);
        setMachinery(prev => prev.filter(item => item._id !== id));
        setShowPopup(false); // Hide popup on success
      } catch (err) {
        console.error('Error deleting machinery:', err);
        setError(err.message);
        setPopupMessage(err.message || 'Failed to delete machinery');
        setShowPopup(true);
      } finally {
        setSubmitting(false);
      }
    }
=======
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
>>>>>>> origin/main
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
<<<<<<< HEAD
    <div className="container-fluid py-4">
      <div className="animate-fade-in">
        <h1 className="main-title">
          <i className="fas fa-cogs me-3"></i>
          Machinery Details
        </h1>

        {/* Error Display (using the new popup) */}
        {/* {error && (
          <div className="alert-modern alert-warning-modern mb-4">
            <i className="fas fa-exclamation-triangle"></i>
            {error}
          </div>
        )} */}

        {/* Add New Machinery Form */}
        <div className="glass-card mb-5">
          <h2 className="section-title">
            <i className="fas fa-plus-circle"></i>
            Add New Machinery
          </h2>
          
          <form onSubmit={addMachinery}>
            <div className="form-modern">
              <div className="form-group-modern">
                <label className="form-label-modern" style={{margin: '-1rem 0 0 2rem'}}>
                  <i className="fas fa-cog"></i>
                  Machinery Type
                </label>
                
                <select
                  name="type"
                  value={newMachinery.type}
                  onChange={handleMachineryInputChange}
                  className="form-input-modern"
                  style={{margin: '0 0 0 2rem'}}
                >
                  {machineryTypes.map((type) => (
                    <option key={type} value={type}>{type}</option>
                  ))}
                </select>
                <button
                  type="button"
                  onClick={() => setShowAddTypeModal(true)}
                  className="btn-modern btn-outline-modern mt-2"
                  style={{ fontSize: '0.85rem', padding: '0.5rem 1rem', margin: '0 0 0 2rem' }}
                >
                  <i className="fas fa-plus me-2"></i>Add New Type
                </button>
              </div>

              <div className="form-group-modern">
                <label className="form-label-modern">
                  <i className="fas fa-truck"></i>
                  Vehicle Unique Name
                </label>
                <input
                  type="text"
                  name="vehicleName"
                  value={newMachinery.vehicleName}
                  onChange={handleMachineryInputChange}
                  placeholder="Enter vehicle name"
                  disabled={submitting}
                  required
                  className="form-input-modern"
                />
              </div>

              <div className="form-group-modern">
                <label className="form-label-modern">
                  <i className="fas fa-calendar-alt"></i>
                  Date of Entry
                </label>
                <input
                  type="date"
                  name="dateOfEntry"
                  value={newMachinery.dateOfEntry}
                  onChange={handleMachineryInputChange}
                  required
                  className="form-input-modern"
                />
              </div>

              {['Excavator', 'Bulldozer', 'Loader'].includes(newMachinery.type) && (
                <>
                  <div className="form-group-modern">
                    <label className="form-label-modern">
                      <i className="fas fa-clock"></i>
                      Starting Hours
                    </label>
                    <input
                      type="time"
                      name="startHours"
                      value={newMachinery.startHours}
                      onChange={handleMachineryInputChange}
                      className="form-input-modern"
                    />
                  </div>

                  <div className="form-group-modern">
                    <label className="form-label-modern">
                      <i className="fas fa-clock"></i>
                      Ending Hours
                    </label>
                    <input
                      type="time"
                      name="endHours"
                      value={newMachinery.endHours}
                      onChange={handleMachineryInputChange}
                      className="form-input-modern"
                    />
                  </div>
                </>
              )}

              <div className="form-group-modern">
                <label className="form-label-modern">
                  <i className="fas fa-stopwatch"></i>
                  Working Duration
                </label>
                <input
                  type="text"
                  name="workDuration"
                  value={newMachinery.workDuration}
                  placeholder="Auto-calculated"
                  readOnly
                  className="form-input-modern"
                  style={{ opacity: 0.7 }}
                />
              </div>

              <div className="form-group-modern">
                <label className="form-label-modern">
                  <i className="fas fa-gas-pump"></i>
                  Fuel Rate (₹/unit)
                </label>
                <input
                  type="number"
                  name="fuelRate"
                  value={newMachinery.fuelRate}
                  onChange={handleMachineryInputChange}
                  placeholder="Enter fuel rate"
                  className="form-input-modern"
                />
              </div>

              <div className="form-group-modern">
                <label className="form-label-modern">
                  <i className="fas fa-money-bill-wave"></i>
                  Advance/Beta Pay (₹)
                </label>
                <input
                  type="number"
                  name="advancePay"
                  value={newMachinery.advancePay}
                  onChange={handleMachineryInputChange}
                  placeholder="Enter advance payment"
                  className="form-input-modern"
                />
              </div>

              <div className="form-group-modern">
                <label className="form-label-modern">
                  <i className="fas fa-user"></i>
                  Owner Name
                </label>
                <input
                  type="text"
                  name="owner.name"
                  value={newMachinery.owner.name}
                  onChange={handleMachineryInputChange}
                  placeholder="Enter owner name"
                  className="form-input-modern"
                />
              </div>

              <div className="form-group-modern">
                <label className="form-label-modern">
                  <i className="fas fa-phone"></i>
                  Owner Contact
                </label>
                <input
                  type="text"
                  name="owner.contact"
                  value={newMachinery.owner.contact}
                  onChange={handleMachineryInputChange}
                  placeholder="Enter contact number"
                  className="form-input-modern"
                />
              </div>
            </div>
            
            <div className="form-button-container">
              <button 
                type="submit" 
                className="btn-modern btn-primary-modern"
                disabled={submitting}
              >
                {submitting ? (
                  <>
                    <i className="fas fa-spinner fa-spin me-2"></i>
                    Adding...
                  </>
                ) : (
                  <>
                    <i className="fas fa-plus me-2"></i>
                    Add Machinery
                  </>
                )}
              </button>
            </div>
          </form>
        </div>

        {/* Machinery List */}
        <div className="glass-card">
          <h2 className="section-title">
            <i className="fas fa-list"></i>
            Machinery List
          </h2>
          
          {loading ? (
            <div className="text-center py-5">
              <i className="fas fa-spinner fa-spin fa-2x text-danger mb-3"></i>
              <p className="text-muted">Loading machinery...</p>
            </div>
          ) : (
            <div className="table-container">
              <table className="table-modern">
                <thead>
                  <tr>
                    <th><i className="fas fa-cog me-1"></i>Type</th>
                    <th><i className="fas fa-truck me-1"></i>Vehicle</th>
                    <th><i className="fas fa-calendar me-1"></i>Date</th>
                    <th><i className="fas fa-play me-1"></i>Start</th>
                    <th><i className="fas fa-stop me-1"></i>End</th>
                    <th><i className="fas fa-stopwatch me-1"></i>Duration</th>
                    <th><i className="fas fa-user me-1"></i>Owner</th>
                    <th><i className="fas fa-gas-pump me-1"></i>Fuel Rate</th>
                    <th><i className="fas fa-money-bill me-1"></i>Advance</th>
                    <th><i className="fas fa-tools me-1"></i>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {machinery.length === 0 ? (
                  <tr>
                    <td colSpan="10" className="text-center text-muted py-4">
                      <i className="fas fa-cogs fa-2x mb-3 d-block"></i>
                      No machinery added yet. Add your first machinery above.
                    </td>
                  </tr>
                  ) : (
                    machinery.map((item) => (
                      <tr key={item._id}>
                        {editingMachineryId === item._id ? (
                          <>
                            <td>
=======
    <div className="container-fluid mt-4" style={{ fontFamily: 'Arial, sans-serif', position: 'relative' }}>
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
                    style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid #ddd', background: '#fff', boxShadow: 'inset 0 1px 3px rgba(0, 0, 0, 0.1)' }}
                  >
                    {machineryTypes.map((type) => (
                      <option key={type} value={type}>{type}</option>
                    ))}
                  </select>
                  <button
                    type="button"
                    onClick={() => setShowAddTypeModal(true)}
                    style={{ marginTop: '5px', padding: '8px 15px', background: '#e74c3c', color: '#fff', border: 'none', borderRadius: '8px', cursor: 'pointer', transition: 'background 0.3s' }}
                    onMouseOver={(e) => (e.target.style.background = '#c0392b')}
                    onMouseOut={(e) => (e.target.style.background = '#e74c3c')}
                  >
                    Add New Type
                  </button>
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
                  <label style={{ color: '#34495e', fontWeight: 500 }}>Fuel Rate (₹/unit)</label>
                  <input
                    type="number"
                    name="fuelRate"
                    value={newMachinery.fuelRate}
                    onChange={handleMachineryInputChange}
                    style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid #ddd', background: '#fff', boxShadow: 'inset 0 1px 3px rgba(0, 0, 0, 0.1)' }}
                  />
                </div>
                <div style={{ flex: '1 1 200px', minWidth: '200px' }}>
                  <label style={{ color: '#34495e', fontWeight: 500 }}>Advance/Beta Pay (₹)</label>
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
                    <th className="bg-danger" 
                    style={{ padding: '12px', borderTopLeftRadius: '10px' }}>Type</th>
                    <th className="bg-danger" style={{ padding: '12px' }}>Vehicle</th>
                    <th className="bg-danger" style={{ padding: '12px' }}>Date</th>
                    <th className="bg-danger" style={{ padding: '12px' }}>Start</th>
                    <th className="bg-danger" style={{ padding: '12px' }}>End</th>
                    <th className="bg-danger" style={{ padding: '12px' }}>Duration</th>
                    <th className="bg-danger" style={{ padding: '12px' }}>Owner</th>
                    <th className="bg-danger" style={{ padding: '12px' }}>Fuel Rate (₹)</th>
                    <th className="bg-danger" style={{ padding: '12px' }}>Advance Pay (₹)</th>
                    <th className="bg-danger" style={{ padding: '12px', borderTopRightRadius: '10px' }}>Actions</th>
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
>>>>>>> origin/main
                              <select
                                name="type"
                                value={editMachineryForm.type}
                                onChange={handleEditMachineryChange}
<<<<<<< HEAD
                                className="form-input-modern"
=======
                                style={{ width: '100%', padding: '8px', borderRadius: '8px', border: '1px solid #ddd', background: '#fff' }}
>>>>>>> origin/main
                              >
                                {machineryTypes.map((type) => (
                                  <option key={type} value={type}>{type}</option>
                                ))}
                              </select>
                            </td>
<<<<<<< HEAD
                            <td>
=======
                            <td style={{ padding: '10px' }}>
>>>>>>> origin/main
                              <input
                                type="text"
                                name="vehicleName"
                                value={editMachineryForm.vehicleName}
                                onChange={handleEditMachineryChange}
<<<<<<< HEAD
                                className="form-input-modern"
                                placeholder="Vehicle name"
                                disabled={submitting}
                              />
                            </td>
                            <td>
=======
                                style={{ width: '100%', padding: '8px', borderRadius: '8px', border: '1px solid #ddd' }}
                              />
                            </td>
                            <td style={{ padding: '10px' }}>
>>>>>>> origin/main
                              <input
                                type="date"
                                name="dateOfEntry"
                                value={editMachineryForm.dateOfEntry}
                                onChange={handleEditMachineryChange}
<<<<<<< HEAD
                                className="form-input-modern"
                              />
                            </td>
                            {['Excavator', 'Bulldozer', 'Loader'].includes(editMachineryForm.type) ? (
                              <>
                                <td>
=======
                                style={{ width: '100%', padding: '8px', borderRadius: '8px', border: '1px solid #ddd' }}
                              />
                            </td>
                            {['Excavator', 'Bulldozer', 'Loader'].includes(editMachineryForm.type) && (
                              <>
                                <td style={{ padding: '10px' }}>
>>>>>>> origin/main
                                  <input
                                    type="time"
                                    name="startHours"
                                    value={editMachineryForm.startHours}
                                    onChange={handleEditMachineryChange}
<<<<<<< HEAD
                                    className="form-input-modern"
                                  />
                                </td>
                                <td>
=======
                                    style={{ width: '100%', padding: '8px', borderRadius: '8px', border: '1px solid #ddd' }}
                                  />
                                </td>
                                <td style={{ padding: '10px' }}>
>>>>>>> origin/main
                                  <input
                                    type="time"
                                    name="endHours"
                                    value={editMachineryForm.endHours}
                                    onChange={handleEditMachineryChange}
<<<<<<< HEAD
                                    className="form-input-modern"
                                  />
                                </td>
                              </>
                            ) : (
                              <>
                                <td className="text-muted">N/A</td>
                                <td className="text-muted">N/A</td>
                              </>
                            )}
                            <td className="fw-semibold">
                              {editMachineryForm.workDuration && !isNaN(parseFloat(editMachineryForm.workDuration)) 
                                ? `${parseFloat(editMachineryForm.workDuration).toFixed(2)}h` 
                                : 'Auto'}
                            </td>
                            <td>
=======
                                    style={{ width: '100%', padding: '8px', borderRadius: '8px', border: '1px solid #ddd' }}
                                  />
                                </td>
                              </>
                            )}
                            <td style={{ padding: '10px' }}>{editMachineryForm.workDuration}</td>
                            <td style={{ padding: '10px' }}>
>>>>>>> origin/main
                              <input
                                type="text"
                                name="owner.name"
                                value={editMachineryForm.owner.name}
                                onChange={handleEditMachineryChange}
<<<<<<< HEAD
                                className="form-input-modern"
                                placeholder="Owner name"
                              />
                            </td>
                            <td>
=======
                                style={{ width: '100%', padding: '8px', borderRadius: '8px', border: '1px solid #ddd' }}
                              />
                            </td>
                            <td style={{ padding: '10px' }}>
>>>>>>> origin/main
                              <input
                                type="number"
                                name="fuelRate"
                                value={editMachineryForm.fuelRate}
                                onChange={handleEditMachineryChange}
<<<<<<< HEAD
                                className="form-input-modern"
                                placeholder="Rate"
                              />
                            </td>
                            <td>
=======
                                style={{ width: '100%', padding: '8px', borderRadius: '8px', border: '1px solid #ddd' }}
                              />
                            </td>
                            <td style={{ padding: '10px' }}>
>>>>>>> origin/main
                              <input
                                type="number"
                                name="advancePay"
                                value={editMachineryForm.advancePay}
                                onChange={handleEditMachineryChange}
<<<<<<< HEAD
                                className="form-input-modern"
                                placeholder="Amount"
                              />
                            </td>
                            <td>
                              <div className="table-actions">
                                <button
                                  onClick={() => saveMachineryEdit(item._id)}
                                  className="btn-modern btn-success-modern"
                                  disabled={submitting}
                                >
                                  {submitting ? (
                                    <i className="fas fa-spinner fa-spin me-1"></i>
                                  ) : (
                                    <i className="fas fa-save me-1"></i>
                                  )}
                                  Save
                                </button>
                                <button
                                  onClick={() => setEditingMachineryId(null)}
                                  className="btn-modern btn-outline-modern"
                                  disabled={submitting}
                                >
                                  <i className="fas fa-times me-1"></i>Cancel
                                </button>
                              </div>
=======
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
>>>>>>> origin/main
                            </td>
                          </>
                        ) : (
                          <>
<<<<<<< HEAD
                            <td className="fw-semibold text-gradient">{item.type}</td>
                            <td className="fw-medium">{item.vehicleName}</td>
                            <td>{new Date(item.dateOfEntry).toLocaleDateString()}</td>
                            <td>{item.startHours || <span className="text-muted">N/A</span>}</td>
                            <td>{item.endHours || <span className="text-muted">N/A</span>}</td>
                            <td className="fw-semibold">
                              {item.workDuration && !isNaN(parseFloat(item.workDuration))
                                ? `${parseFloat(item.workDuration).toFixed(2)}h` 
                                : <span className="text-muted">N/A</span>}
                            </td>
                            <td>{item.owner?.name || <span className="text-muted">Not set</span>}</td>
                            <td className="fw-medium">₹{item.fuelRate || 0}</td>
                            <td className="fw-medium">₹{item.advancePay || 0}</td>
                            <td>
                              <div className="table-actions">
                                <button
                                  onClick={() => startEditingMachinery(item)}
                                  className="btn-modern btn-outline-modern"
                                  disabled={submitting}
                                >
                                  <i className="fas fa-edit me-1"></i>Edit
                                </button>
                                <button
                                  onClick={() => deleteMachinery(item._id)}
                                  className="btn-modern btn-danger-modern"
                                  disabled={submitting}
                                >
                                  <i className="fas fa-trash me-1"></i>Delete
                                </button>
                              </div>
=======
                            <td style={{ padding: '10px' }}>{item.type}</td>
                            <td style={{ padding: '10px' }}>{item.vehicleName}</td>
                            <td style={{ padding: '10px' }}>{item.dateOfEntry}</td>
                            <td style={{ padding: '10px' }}>{item.startHours || 'N/A'}</td>
                            <td style={{ padding: '10px' }}>{item.endHours || 'N/A'}</td>
                            <td style={{ padding: '10px' }}>{item.workDuration}</td>
                            <td style={{ padding: '10px' }}>{item.owner.name}</td>
                            <td style={{ padding: '10px' }}>{item.fuelRate} ₹</td>
                            <td style={{ padding: '10px' }}>{item.advancePay} ₹</td>
                            <td style={{ padding: '10px' }}>
                              <button
                                onClick={() => startEditingMachinery(item)}
                                style={{ padding: '8px 15px', background: '#3498db', color: '#fff', border: 'none', borderRadius: '8px', cursor: 'pointer' }}
                              >
                                Edit
                              </button>
>>>>>>> origin/main
                            </td>
                          </>
                        )}
                      </tr>
<<<<<<< HEAD
                        ))
                  )}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Add New Type Modal */}
        {showAddTypeModal && (
          <div 
            className="position-fixed top-0 start-0 w-100 h-100 d-flex align-items-center justify-content-center"
            style={{ 
              backgroundColor: 'rgba(0, 0, 0, 0.7)', 
              backdropFilter: 'blur(5px)',
              zIndex: 1050 
            }}
          >
            <div className="glass-card" style={{ width: '90%', maxWidth: '500px' }}>
              <h3 className="section-title">
                <i className="fas fa-plus-circle"></i>
                Add New Machinery Type
              </h3>
              
              <form onSubmit={addMachineryType}>
                <div className="form-group-modern mb-4" style={{margin: '0 0 2rem 2rem'}}>
                  <input
                    type="text"
                    value={newType}
                    onChange={(e) => setNewType(e.target.value)}
                    placeholder="Enter new machinery type"
                    className="form-input-modern"
                    required
                  />
                </div>
                
                <div className="d-flex gap-3 justify-content-end" style={{margin: '0 2rem 2rem 2rem'}}>
                  <button type="submit" className="btn-modern btn-success-modern">
                    <i className="fas fa-save me-2"></i>Save
                  </button>
                  <button
                    type="button"
                    onClick={() => { setShowAddTypeModal(false); setNewType(''); }}
                    className="btn-modern btn-outline-modern"
                  >
                    <i className="fas fa-times me-2"></i>Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Error Popup for machinery errors */}
        {showPopup && (
          <div className="popup-overlay">
            <div className="popup-content">
              <h4 className="popup-title">Error</h4>
              <p className="popup-message">{popupMessage}</p>
              <button
                className="btn-modern btn-primary-modern"
                onClick={() => setShowPopup(false)}
              >
                Close
              </button>
            </div>
          </div>
        )}
      </div>
=======
                    ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      {/* Add New Type Modal */}
      {showAddTypeModal && (
        <div style={{
          position: 'fixed',
          top: '0',
          left: '0',
          width: '100%',
          height: '100%',
          background: 'rgba(0, 0, 0, 0.5)',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          zIndex: 1000,
        }}>
          <div style={{
            background: '#fff',
            padding: '20px',
            borderRadius: '15px',
            boxShadow: '0 5px 20px rgba(0, 0, 0, 0.2)',
            width: '400px',
            animation: 'slideIn 0.3s ease-out',
          }}>
            <h4 style={{ color: '#e74c3c', fontWeight: 600, marginBottom: '15px' }}>Add New Machinery Type</h4>
            <form onSubmit={addMachineryType} style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <input
                type="text"
                value={newType}
                onChange={(e) => setNewType(e.target.value)}
                placeholder="Enter new type"
                style={{ padding: '10px', borderRadius: '8px', border: '1px solid #ddd', width: '100%' }}
                required
              />
              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px' }}>
                <button
                  type="submit"
                  style={{ padding: '10px 20px', background: '#2ecc71', color: '#fff', border: 'none', borderRadius: '8px', cursor: 'pointer' }}
                >
                  Save
                </button>
                <button
                  type="button"
                  onClick={() => { setShowAddTypeModal(false); setNewType(''); }}
                  style={{ padding: '10px 20px', background: '#e74c3c', color: '#fff', border: 'none', borderRadius: '8px', cursor: 'pointer' }}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <style>
        {`
          @keyframes slideIn {
            from { transform: translateY(-50px); opacity: 0; }
            to { transform: translateY(0); opacity: 1; }
          }
        `}
      </style>
>>>>>>> origin/main
    </div>
  );
}

export default Machinery;