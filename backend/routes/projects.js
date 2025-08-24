const express = require('express');
const router = express.Router();
const Project = require('../models/Project');
const Machinery = require('../models/Machinery');

// @desc    Get all projects
// @route   GET /api/projects
// @access  Public
router.get('/', async (req, res) => {
  try {
    const projects = await Project.find().sort({ createdAt: -1 });
    res.json({
      success: true,
      count: projects.length,
      data: projects
    });
  } catch (error) {
    console.error('Error fetching projects:', error);
    res.status(500).json({
      success: false,
      message: 'Server Error',
      error: error.message
    });
  }
});

// @desc    Get single project
// @route   GET /api/projects/:id
// @access  Public
router.get('/:id', async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);
    
    if (!project) {
      return res.status(404).json({
        success: false,
        message: 'Project not found'
      });
    }

    res.json({
      success: true,
      data: project
    });
  } catch (error) {
    console.error('Error fetching project:', error);
    res.status(500).json({
      success: false,
      message: 'Server Error',
      error: error.message
    });
  }
});

// @desc    Create new project
// @route   POST /api/projects
// @access  Public
router.post('/', async (req, res) => {
  try {
    const { name, date, place, description, status } = req.body;

    // Check if project with same name already exists
    const existingProject = await Project.findOne({ name: name.trim() });
    if (existingProject) {
      return res.status(400).json({
        success: false,
        message: 'Project with this name already exists'
      });
    }

    const project = await Project.create({
      name: name.trim(),
      date,
      place: place.trim(),
      description: description?.trim(),
      status: status || 'active'
    });

    res.status(201).json({
      success: true,
      message: 'Project created successfully',
      data: project
    });
  } catch (error) {
    console.error('Error creating project:', error);
    
    if (error.name === 'ValidationError') {
      const messages = Object.values(error.errors).map(err => err.message);
      return res.status(400).json({
        success: false,
        message: 'Validation Error',
        errors: messages
      });
    }

    res.status(500).json({
      success: false,
      message: 'Server Error',
      error: error.message
    });
  }
});

// @desc    Update project
// @route   PUT /api/projects/:id
// @access  Public
router.put('/:id', async (req, res) => {
  try {
    const { name, date, place, description, status } = req.body;

    // Check if project exists
    let project = await Project.findById(req.params.id);
    if (!project) {
      return res.status(404).json({
        success: false,
        message: 'Project not found'
      });
    }

    // Check if another project with same name exists (excluding current project)
    if (name && name.trim() !== project.name) {
      const existingProject = await Project.findOne({ 
        name: name.trim(),
        _id: { $ne: req.params.id }
      });
      if (existingProject) {
        return res.status(400).json({
          success: false,
          message: 'Project with this name already exists'
        });
      }
    }

    const updateData = {};
    if (name) updateData.name = name.trim();
    if (date) updateData.date = date;
    if (place) updateData.place = place.trim();
    if (description !== undefined) updateData.description = description?.trim();
    if (status) updateData.status = status;

    project = await Project.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true, runValidators: true }
    );

    res.json({
      success: true,
      message: 'Project updated successfully',
      data: project
    });
  } catch (error) {
    console.error('Error updating project:', error);
    
    if (error.name === 'ValidationError') {
      const messages = Object.values(error.errors).map(err => err.message);
      return res.status(400).json({
        success: false,
        message: 'Validation Error',
        errors: messages
      });
    }

    res.status(500).json({
      success: false,
      message: 'Server Error',
      error: error.message
    });
  }
});

// @desc    Delete project
// @route   DELETE /api/projects/:id
// @access  Public
router.delete('/:id', async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);
    
    if (!project) {
      return res.status(404).json({
        success: false,
        message: 'Project not found'
      });
    }

    // Delete all machinery associated with this project
    await Machinery.deleteMany({ projectId: req.params.id });

    // Delete the project
    await Project.findByIdAndDelete(req.params.id);

    res.json({
      success: true,
      message: 'Project and associated machinery deleted successfully'
    });
  } catch (error) {
    console.error('Error deleting project:', error);
    res.status(500).json({
      success: false,
      message: 'Server Error',
      error: error.message
    });
  }
});

// @desc    Get project statistics
// @route   GET /api/projects/:id/stats
// @access  Public
router.get('/:id/stats', async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);
    
    if (!project) {
      return res.status(404).json({
        success: false,
        message: 'Project not found'
      });
    }

    const machineryStats = await Machinery.aggregate([
      { $match: { projectId: project._id } },
      {
        $group: {
          _id: '$status',
          count: { $sum: 1 },
          totalFuelRate: { $sum: '$fuelRate' },
          totalAdvancePay: { $sum: '$advancePay' }
        }
      }
    ]);

    const totalMachinery = await Machinery.countDocuments({ projectId: req.params.id });
    const machineryByType = await Machinery.aggregate([
      { $match: { projectId: project._id } },
      { $group: { _id: '$type', count: { $sum: 1 } } }
    ]);

    res.json({
      success: true,
      data: {
        project,
        totalMachinery,
        machineryStats,
        machineryByType
      }
    });
  } catch (error) {
    console.error('Error fetching project stats:', error);
    res.status(500).json({
      success: false,
      message: 'Server Error',
      error: error.message
    });
  }
});

module.exports = router;