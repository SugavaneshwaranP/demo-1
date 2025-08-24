const dotenv = require('dotenv');
const mongoose = require('mongoose');
const Project = require('./models/Project');
const Machinery = require('./models/Machinery');

dotenv.config();

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

connectDB();

const projectsData = [
  {
    name: 'Project Alpha',
    date: new Date('2023-01-15'),
    place: 'Site A',
    description: 'First major construction project.',
    status: 'active',
  },
  {
    name: 'Project Beta',
    date: new Date('2023-03-10'),
    place: 'Site B',
    description: 'Infrastructure development.',
    status: 'on-hold',
  },
  {
    name: 'Project Gamma',
    date: new Date('2023-05-20'),
    place: 'Site C',
    description: 'Residential complex build.',
    status: 'active',
  },
];

const machineryData = [
  {
    type: 'Excavator',
    vehicleName: 'Excavator 101',
    dateOfEntry: new Date('2023-01-20'),
    startHours: '10:00',
    endHours: '15:00',
    fuelRate: 50,
    advancePay: 1000,
    status: 'active',
    owner: {
      name: 'John Doe',
      contact: '+11234567890',
    },
  },
  {
    type: 'Bulldozer',
    vehicleName: 'Bulldozer 202',
    dateOfEntry: new Date('2023-03-15'),
    startHours: '08:00',
    endHours: '12:00',
    fuelRate: 60,
    advancePay: 1200,
    status: 'maintenance',
    owner: {
      name: 'Jane Smith',
      contact: '+10987654321',
    },
  },
  {
    type: 'Loader',
    vehicleName: 'Loader 303',
    dateOfEntry: new Date('2023-05-25'),
    startHours: '07:00',
    endHours: '09:00',
    fuelRate: 40,
    advancePay: 800,
    status: 'active',
    owner: {
      name: 'Bob Johnson',
      contact: '+15551234567',
    },
  },
];

const importData = async () => {
  try {
    await Project.deleteMany();
    await Machinery.deleteMany();

    const createdProjects = await Project.insertMany(projectsData);

    // Assign machinery to projects
    const projectAlphaId = createdProjects[0]._id;
    const projectBetaId = createdProjects[1]._id;
    const projectGammaId = createdProjects[2]._id;

    const machineryWithProject = machineryData.map((mach) => {
      if (mach.vehicleName === 'Excavator 101') {
        return { ...mach, projectId: projectAlphaId };
      } else if (mach.vehicleName === 'Bulldozer 202') {
        return { ...mach, projectId: projectBetaId };
      } else if (mach.vehicleName === 'Loader 303') {
        return { ...mach, projectId: projectGammaId };
      }
      return mach;
    });

    await Machinery.insertMany(machineryWithProject);

    console.log('Data Imported!');
    process.exit();
  } catch (error) {
    console.error(`${error}`);
    process.exit(1);
  }
};

const destroyData = async () => {
  try {
    await Project.deleteMany();
    await Machinery.deleteMany();

    console.log('Data Destroyed!');
    process.exit();
  } catch (error) {
    console.error(`${error}`);
    process.exit(1);
  }
};

if (process.argv[2] === '-d') {
  destroyData();
} else {
  importData();
}
