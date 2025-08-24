# Project Management System

A modern project management system built with React, Node.js, Express, and MongoDB featuring glass morphism design and real-time data management.

## 🚀 Features

- **Project Management**: Create, edit, and manage projects
- **Machinery Tracking**: Track machinery, work hours, fuel rates, and advance payments
- **Modern UI**: Glass morphism design with red theme
- **Responsive Design**: Works on all devices
- **Real-time Updates**: Live data synchronization
- **Database Integration**: MongoDB with Mongoose ODM

## 🛠️ Tech Stack

### Frontend
- React 19.1.1
- Vite 7.1.3
- Bootstrap 5.3.7
- Sass 1.90.0
- React Router DOM 7.8.2

### Backend
- Node.js
- Express 5.1.0
- MongoDB with Mongoose 8.18.0
- CORS enabled
- Environment variables with dotenv

## 📋 Prerequisites

Before running this application, make sure you have the following installed:

- Node.js (v16 or higher)
- MongoDB (local installation or MongoDB Atlas)
- npm or yarn package manager

## 🔧 Installation & Setup

### 1. Clone the Repository
```bash
git clone <repository-url>
cd demo-1
```

### 2. Backend Setup
```bash
cd backend
npm install
```

Create a `.env` file in the backend directory:
```env
NODE_ENV=development
PORT=5000
MONGODB_URI=mongodb://localhost:27017/project-management
CLIENT_URL=http://localhost:5173
```

### 3. Frontend Setup
```bash
cd ../client
npm install
```

Create a `.env` file in the client directory:
```env
VITE_API_URL=http://localhost:5000/api
VITE_APP_NAME=Project Management System
VITE_APP_VERSION=1.0.0
```

### 4. Database Setup

#### Option A: Local MongoDB
1. Install MongoDB locally
2. Start MongoDB service:
   ```bash
   # Windows
   net start MongoDB
   
   # macOS/Linux
   sudo systemctl start mongod
   ```

#### Option B: MongoDB Atlas (Cloud)
1. Create a MongoDB Atlas account
2. Create a new cluster
3. Get your connection string
4. Update `MONGODB_URI` in backend `.env` file

## 🚀 Running the Application

### Development Mode

#### Start Backend Server
```bash
cd backend
npm run dev
```
The backend will run on `http://localhost:5000`

#### Start Frontend Development Server
```bash
cd client
npm run dev
```
The frontend will run on `http://localhost:5173`

### Production Mode

#### Build Frontend
```bash
cd client
npm run build
```

#### Start Backend in Production
```bash
cd backend
npm start
```

## 📚 API Endpoints

### Projects
- `GET /api/projects` - Get all projects
- `GET /api/projects/:id` - Get single project
- `POST /api/projects` - Create new project
- `PUT /api/projects/:id` - Update project
- `DELETE /api/projects/:id` - Delete project
- `GET /api/projects/:id/stats` - Get project statistics

### Machinery
- `GET /api/machinery` - Get all machinery
- `GET /api/machinery/project/:projectId` - Get machinery by project
- `GET /api/machinery/:id` - Get single machinery
- `POST /api/machinery` - Create new machinery
- `PUT /api/machinery/:id` - Update machinery
- `DELETE /api/machinery/:id` - Delete machinery
- `GET /api/machinery/types/all` - Get all machinery types
- `GET /api/machinery/stats/all` - Get machinery statistics

### Health Check
- `GET /api/health` - Server health check

## 🎨 Design Features

- **Glass Morphism UI**: Modern translucent design elements
- **Red Theme**: Consistent red color scheme throughout
- **Responsive Tables**: Mobile-friendly data tables
- **Animated Components**: Smooth transitions and hover effects
- **Form Validation**: Client and server-side validation
- **Error Handling**: Comprehensive error management

## 📱 Responsive Design

The application is fully responsive and works on:
- Desktop computers
- Tablets
- Mobile phones
- Different screen orientations

## 🔒 Security Features

- Input validation and sanitization
- MongoDB injection protection
- CORS configuration
- Environment variable protection
- Error handling without sensitive data exposure

## 🧪 Testing

### Backend API Testing
You can test the API endpoints using tools like:
- Postman
- Insomnia
- curl commands

Example API test:
```bash
# Health check
curl http://localhost:5000/api/health

# Get all projects
curl http://localhost:5000/api/projects
```

## 📁 Project Structure

```
demo-1/
├── backend/
│   ├── config/
│   │   └── db.js
│   ├── middleware/
│   │   └── errorHandler.js
│   ├── models/
│   │   ├── Project.js
│   │   └── Machinery.js
│   ├── routes/
│   │   ├── projects.js
│   │   └── machinery.js
│   ├── .env
│   ├── server.js
│   └── package.json
├── client/
│   ├── src/
│   │   ├── components/
│   │   ├── context/
│   │   ├── services/
│   │   ├── App.jsx
│   │   ├── App.css
│   │   └── main.jsx
│   ├── .env
│   └── package.json
└── README.md
```

## 🚨 Troubleshooting

### Common Issues

1. **MongoDB Connection Error**
   - Ensure MongoDB is running
   - Check connection string in `.env`
   - Verify network connectivity

2. **Port Already in Use**
   - Change PORT in backend `.env`
   - Kill existing processes on the port

3. **CORS Errors**
   - Verify CLIENT_URL in backend `.env`
   - Check frontend API URL configuration

4. **Build Errors**
   - Clear node_modules and reinstall
   - Check Node.js version compatibility

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is licensed under the ISC License.

## 👥 Support

For support and questions:
- Create an issue in the repository
- Check existing documentation
- Review API endpoints and examples

---

**Happy Coding! 🚀**