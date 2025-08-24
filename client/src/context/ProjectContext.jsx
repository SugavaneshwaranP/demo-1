import { createContext, useState } from 'react';

export const ProjectContext = createContext();

export const ProjectProvider = ({ children }) => {
<<<<<<< HEAD
  const [projects, setProjects] = useState([]);
=======
  const [projects, setProjects] = useState([
    { id: 1, name: 'Project A', date: '2025-08-23', place: 'Erode' },
    { id: 2, name: 'Project B', date: '2025-08-20', place: 'Salem' },
  ]);
>>>>>>> origin/main

  return (
    <ProjectContext.Provider value={{ projects, setProjects }}>
      {children}
    </ProjectContext.Provider>
  );
};