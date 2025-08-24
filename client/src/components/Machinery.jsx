import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
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
    }
  };

  // Start editing
  const startEditingMachinery = (item) => {
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
                              <select
                                name="type"
                                value={editMachineryForm.type}
                                onChange={handleEditMachineryChange}
                                className="form-input-modern"
                              >
                                {machineryTypes.map((type) => (
                                  <option key={type} value={type}>{type}</option>
                                ))}
                              </select>
                            </td>
                            <td>
                              <input
                                type="text"
                                name="vehicleName"
                                value={editMachineryForm.vehicleName}
                                onChange={handleEditMachineryChange}
                                className="form-input-modern"
                                placeholder="Vehicle name"
                                disabled={submitting}
                              />
                            </td>
                            <td>
                              <input
                                type="date"
                                name="dateOfEntry"
                                value={editMachineryForm.dateOfEntry}
                                onChange={handleEditMachineryChange}
                                className="form-input-modern"
                              />
                            </td>
                            {['Excavator', 'Bulldozer', 'Loader'].includes(editMachineryForm.type) ? (
                              <>
                                <td>
                                  <input
                                    type="time"
                                    name="startHours"
                                    value={editMachineryForm.startHours}
                                    onChange={handleEditMachineryChange}
                                    className="form-input-modern"
                                  />
                                </td>
                                <td>
                                  <input
                                    type="time"
                                    name="endHours"
                                    value={editMachineryForm.endHours}
                                    onChange={handleEditMachineryChange}
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
                              <input
                                type="text"
                                name="owner.name"
                                value={editMachineryForm.owner.name}
                                onChange={handleEditMachineryChange}
                                className="form-input-modern"
                                placeholder="Owner name"
                              />
                            </td>
                            <td>
                              <input
                                type="number"
                                name="fuelRate"
                                value={editMachineryForm.fuelRate}
                                onChange={handleEditMachineryChange}
                                className="form-input-modern"
                                placeholder="Rate"
                              />
                            </td>
                            <td>
                              <input
                                type="number"
                                name="advancePay"
                                value={editMachineryForm.advancePay}
                                onChange={handleEditMachineryChange}
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
                            </td>
                          </>
                        ) : (
                          <>
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
                            </td>
                          </>
                        )}
                      </tr>
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
    </div>
  );
}

export default Machinery;