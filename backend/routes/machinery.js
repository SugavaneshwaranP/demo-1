const express = require('express');
const router = express.Router();
const Machinery = require('../models/Machinery');
const Project = require('../models/Project');

// @desc    Get all machinery for a project
// @route   GET /api/machinery/project/:projectId
// @access  Public
router.get('/project/:projectId', async (req, res) => {
  try {
    // Verify project exists
    const project = await Project.findById(req.params.projectId);
    if (!project) {
      return res.status(404).json({
        success: false,
        message: 'Project not found'
      });
    }

    const machinery = await Machinery.find({ projectId: req.params.projectId })
      .populate('projectId', 'name')
      .sort({ createdAt: -1 });

    res.json({
      success: true,
      count: machinery.length,
      data: machinery
    });
  } catch (error) {
    console.error('Error fetching machinery:', error);
    res.status(500).json({
      success: false,
      message: 'Server Error',
      error: error.message
    });
  }
});

// @desc    Get all machinery
// @route   GET /api/machinery
// @access  Public
router.get('/', async (req, res) => {
  try {
    const { type, status, projectId } = req.query;
    let filter = {};

    if (type) filter.type = type;
    if (status) filter.status = status;
    if (projectId) filter.projectId = projectId;

    const machinery = await Machinery.find(filter)
      .populate('projectId', 'name place')
      .sort({ createdAt: -1 });

    res.json({
      success: true,
      count: machinery.length,
      data: machinery
    });
  } catch (error) {
    console.error('Error fetching machinery:', error);
    res.status(500).json({
      success: false,
      message: 'Server Error',
      error: error.message
    });
  }
});

// @desc    Get single machinery
// @route   GET /api/machinery/:id
// @access  Public
router.get('/:id', async (req, res) => {
  try {
    const machinery = await Machinery.findById(req.params.id)
      .populate('projectId', 'name place');
    
    if (!machinery) {
      return res.status(404).json({
        success: false,
        message: 'Machinery not found'
      });
    }

    res.json({
      success: true,
      data: machinery
    });
  } catch (error) {
    console.error('Error fetching machinery:', error);
    res.status(500).json({
      success: false,
      message: 'Server Error',
      error: error.message
    });
  }
});

// @desc    Create new machinery
// @route   POST /api/machinery
// @access  Public
router.post('/', async (req, res) => {
  try {
    const {
      projectId,
      type,
      vehicleName,
      dateOfEntry,
      startHours,
      endHours,
      owner,
      fuelRate,
      advancePay,
      status
    } = req.body;

    // Verify project exists
    const project = await Project.findById(projectId);
    if (!project) {
      return res.status(404).json({
        success: false,
        message: 'Project not found'
      });
    }

    // Check if machinery with same vehicle name already exists
    const existingMachinery = await Machinery.findOne({ vehicleName: vehicleName.trim() });
    if (existingMachinery) {
      return res.status(400).json({
        success: false,
        message: 'Machinery with this vehicle name already exists'
      });
    }

    const machineryData = {
      projectId,
      type: type.trim(),
      vehicleName: vehicleName.trim(),
      dateOfEntry,
      fuelRate: fuelRate || 0,
      advancePay: advancePay || 0,
      status: status || 'active'
    };

    // Add time fields for time-tracked machinery
    if (['Excavator', 'Bulldozer', 'Loader'].includes(type)) {
      if (startHours) machineryData.startHours = startHours;
      if (endHours) machineryData.endHours = endHours;
    }

    // Add owner information
    if (owner) {
      machineryData.owner = {
        name: owner.name?.trim() || '',
        contact: owner.contact?.trim() || ''
      };
    }

    const machinery = await Machinery.create(machineryData);

    // Populate project info before sending response
    await machinery.populate('projectId', 'name place');

    res.status(201).json({
      success: true,
      message: 'Machinery created successfully',
      data: machinery
    });
  } catch (error) {
    console.error('Error creating machinery:', error);
    
    if (error.name === 'ValidationError') {
      const messages = Object.values(error.errors).map(err => err.message);
      return res.status(400).json({
        success: false,
        message: 'Validation Error',
        errors: messages
      });
    }

    if (error.code === 11000) {
      return res.status(400).json({
        success: false,
        message: 'Machinery with this vehicle name already exists'
      });
    }

    res.status(500).json({
      success: false,
      message: 'Server Error',
      error: error.message
    });
  }
});

// @desc    Update machinery
// @route   PUT /api/machinery/:id
// @access  Public
router.put('/:id', async (req, res) => {
  try {
    const {
      type,
      vehicleName,
      dateOfEntry,
      startHours,
      endHours,
      owner,
      fuelRate,
      advancePay,
      status
    } = req.body;

    // Check if machinery exists
    let machinery = await Machinery.findById(req.params.id);
    if (!machinery) {
      return res.status(404).json({
        success: false,
        message: 'Machinery not found'
      });
    }

    // Check if another machinery with same vehicle name exists (excluding current machinery)
    if (vehicleName && vehicleName.trim() !== machinery.vehicleName) {
      const existingMachinery = await Machinery.findOne({ 
        vehicleName: vehicleName.trim(),
        _id: { $ne: req.params.id }
      });
      if (existingMachinery) {
        return res.status(400).json({
          success: false,
          message: 'Machinery with this vehicle name already exists'
        });
      }
    }

    const updateData = {};
    if (type) updateData.type = type.trim();
    if (vehicleName) updateData.vehicleName = vehicleName.trim();
    if (dateOfEntry) updateData.dateOfEntry = dateOfEntry;
    if (fuelRate !== undefined) updateData.fuelRate = fuelRate;
    if (advancePay !== undefined) updateData.advancePay = advancePay;
    if (status) updateData.status = status;

    // Handle time fields for time-tracked machinery
    const machineryType = type || machinery.type;
    if (['Excavator', 'Bulldozer', 'Loader'].includes(machineryType)) {
      if (startHours !== undefined) updateData.startHours = startHours;
      if (endHours !== undefined) updateData.endHours = endHours;
    }

    // Handle owner information
    if (owner) {
      updateData.owner = {
        name: owner.name?.trim() || '',
        contact: owner.contact?.trim() || ''
      };
    }

    machinery = await Machinery.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true, runValidators: true }
    ).populate('projectId', 'name place');

    res.json({
      success: true,
      message: 'Machinery updated successfully',
      data: machinery
    });
  } catch (error) {
    console.error('Error updating machinery:', error);
    
    if (error.name === 'ValidationError') {
      const messages = Object.values(error.errors).map(err => err.message);
      return res.status(400).json({
        success: false,
        message: 'Validation Error',
        errors: messages
      });
    }

    if (error.code === 11000) {
      return res.status(400).json({
        success: false,
        message: 'Machinery with this vehicle name already exists'
      });
    }

    res.status(500).json({
      success: false,
      message: 'Server Error',
      error: error.message
    });
  }
});

// @desc    Delete machinery
// @route   DELETE /api/machinery/:id
// @access  Public
router.delete('/:id', async (req, res) => {
  try {
    const machinery = await Machinery.findById(req.params.id);
    
    if (!machinery) {
      return res.status(404).json({
        success: false,
        message: 'Machinery not found'
      });
    }

    await Machinery.findByIdAndDelete(req.params.id);

    res.json({
      success: true,
      message: 'Machinery deleted successfully'
    });
  } catch (error) {
    console.error('Error deleting machinery:', error);
    res.status(500).json({
      success: false,
      message: 'Server Error',
      error: error.message
    });
  }
});

// @desc    Get machinery types
// @route   GET /api/machinery/types
// @access  Public
router.get('/types/all', async (req, res) => {
  try {
    const types = await Machinery.distinct('type');
    
    res.json({
      success: true,
      data: types
    });
  } catch (error) {
    console.error('Error fetching machinery types:', error);
    res.status(500).json({
      success: false,
      message: 'Server Error',
      error: error.message
    });
  }
});

// @desc    Get machinery statistics
// @route   GET /api/machinery/stats
// @access  Public
router.get('/stats/all', async (req, res) => {
  try {
    const totalMachinery = await Machinery.countDocuments();
    
    const statusStats = await Machinery.aggregate([
      { $group: { _id: '$status', count: { $sum: 1 } } }
    ]);

    const typeStats = await Machinery.aggregate([
      { $group: { _id: '$type', count: { $sum: 1 } } }
    ]);

    const financialStats = await Machinery.aggregate([
      {
        $group: {
          _id: null,
          totalFuelRate: { $sum: '$fuelRate' },
          totalAdvancePay: { $sum: '$advancePay' },
          avgFuelRate: { $avg: '$fuelRate' },
          avgAdvancePay: { $avg: '$advancePay' }
        }
      }
    ]);

    res.json({
      success: true,
      data: {
        totalMachinery,
        statusStats,
        typeStats,
        financialStats: financialStats[0] || {
          totalFuelRate: 0,
          totalAdvancePay: 0,
          avgFuelRate: 0,
          avgAdvancePay: 0
        }
      }
    });
  } catch (error) {
    console.error('Error fetching machinery stats:', error);
    res.status(500).json({
      success: false,
      message: 'Server Error',
      error: error.message
    });
  }
});

module.exports = router;