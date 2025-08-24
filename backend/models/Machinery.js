const mongoose = require('mongoose');

const MachinerySchema = new mongoose.Schema({
  projectId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Project',
    required: [true, 'Project ID is required']
  },
  type: {
    type: String,
    required: [true, 'Machinery type is required'],
    trim: true
  },
  vehicleName: {
    type: String,
    required: [true, 'Vehicle name is required'],
    trim: true,
    unique: true
  },
  dateOfEntry: {
    type: Date,
    required: [true, 'Date of entry is required']
  },
  startHours: {
    type: String,
    validate: {
      validator: function(v) {
        // Only validate if the machinery type requires time tracking
        if (['Excavator', 'Bulldozer', 'Loader'].includes(this.type)) {
          return v && /^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/.test(v);
        }
        return true;
      },
      message: 'Start hours must be in HH:MM format'
    }
  },
  endHours: {
    type: String,
    validate: {
      validator: function(v) {
        // Only validate if the machinery type requires time tracking
        if (['Excavator', 'Bulldozer', 'Loader'].includes(this.type)) {
          return v && /^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/.test(v);
        }
        return true;
      },
      message: 'End hours must be in HH:MM format'
    }
  },
  workDuration: {
    type: String,
    default: ''
  },
  owner: {
    name: {
      type: String,
      trim: true,
      maxlength: [100, 'Owner name cannot exceed 100 characters']
    },
    contact: {
      type: String,
      trim: true,
      validate: {
        validator: function(v) {
          return !v || /^[\+]?[1-9][\d]{0,15}$/.test(v);
        },
        message: 'Please enter a valid contact number'
      }
    }
  },
  fuelRate: {
    type: Number,
    min: [0, 'Fuel rate cannot be negative'],
    default: 0
  },
  advancePay: {
    type: Number,
    min: [0, 'Advance pay cannot be negative'],
    default: 0
  },
  status: {
    type: String,
    enum: ['active', 'maintenance', 'inactive'],
    default: 'active'
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

// Calculate work duration before saving
MachinerySchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  
  // Calculate work duration for time-tracked machinery
  if (['Excavator', 'Bulldozer', 'Loader'].includes(this.type) && this.startHours && this.endHours) {
    const start = new Date(`1970-01-01T${this.startHours}:00`);
    const end = new Date(`1970-01-01T${this.endHours}:00`);
    const diff = (end - start) / (1000 * 60 * 60);
    this.workDuration = diff >= 0 ? `${diff}h` : 'Invalid';
  }
  
  next();
});

// Update the updatedAt field before updating
MachinerySchema.pre('findOneAndUpdate', function(next) {
  this.set({ updatedAt: Date.now() });
  next();
});

// Index for better query performance
MachinerySchema.index({ projectId: 1, vehicleName: 1 });
MachinerySchema.index({ type: 1 });
MachinerySchema.index({ status: 1 });

module.exports = mongoose.model('Machinery', MachinerySchema);