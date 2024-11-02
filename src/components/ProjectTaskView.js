import React, { useState, useEffect } from 'react';
import { ProjectService } from '../services/projectService';
import { TodoService } from '../services/todoService';

const ProjectTaskView = () => {
  const [projects, setProjects] = useState([]);
  const [selectedProject, setSelectedProject] = useState(null);
  const [newTaskDescription, setNewTaskDescription] = useState(''); 
  const [newProjectTitle, setNewProjectTitle] = useState('');
  const [newTasks, setNewTasks] = useState([{ description: '', status: 'Pending' }]);

  useEffect(() => {
    const fetchProjects = async () => {
      const response = await ProjectService.getAllProjects();
      setProjects(response.data);
    };

    fetchProjects();
  }, []);

  const fetchTasks = async (projectId) => {
    const project = projects.find(p => p.id === projectId);
    if (project && project.todos) {
      setSelectedProject(project);
    } else {
      console.warn(`No tasks found for project ID ${projectId}`);
      setSelectedProject(null);
    }
  };

  const handleEditProject = async (projectId) => {
    const updatedTitle = prompt("Enter the new project title:");
    if (!updatedTitle) return;
    try {
      await ProjectService.updateProject(projectId, { title: updatedTitle });
      setProjects(prevProjects => 
        prevProjects.map(project => 
          project.id === projectId ? { ...project, title: updatedTitle } : project
        )
      );
    } catch (error) {
      console.error("Error updating project:", error);
    }
  };

  const handleDeleteProject = async (projectId) => {
    try {
      await ProjectService.deleteProject(projectId);
      setProjects(prevProjects => prevProjects.filter(project => project.id !== projectId));
      if (selectedProject && selectedProject.id === projectId) {
        setSelectedProject(null);
      }
    } catch (error) {
      console.error("Error deleting project:", error);
    }
  };

  const handleAddProject = async () => {
    if (!newProjectTitle || newTasks.some(task => !task.description)) {
      alert('Please provide a project title and at least one task description.');
      return;
    }
    try {
      const projectData = {
        title: newProjectTitle,
        todos: newTasks.map(task => ({
          description: task.description,
          status: task.status
        }))
      };
      
      await ProjectService.createProject(projectData);
      const updatedProjects = await ProjectService.getAllProjects();
      setProjects(updatedProjects.data);
      setNewProjectTitle('');
      setNewTasks([{ description: '', status: 'Pending' }]);
    } catch (error) {
      console.error("Error adding project:", error);
    }
  };

  const handleAddTaskInput = () => {
    setNewTasks([...newTasks, { description: '', status: 'Pending' }]);
  };

  const handleTaskInputChange = (index, field, value) => {
    const updatedTasks = [...newTasks];
    updatedTasks[index][field] = value;
    setNewTasks(updatedTasks);
  };

 
  const handleEditTask = async (taskId) => {
  const updatedDescription = prompt("Enter the new task description:");
  if (!updatedDescription) return;
  
  try {
   
    await TodoService.updateTask(taskId, { description: updatedDescription });
    
    
    setSelectedProject(prev => ({
      ...prev,
      todos: prev.todos.map(task =>
        task.id === taskId ? { ...task, description: updatedDescription } : task
      )
    }));
  } catch (error) {
    console.error("Error updating task:", error);
  }
};
  

  const handleDeleteTask = async (taskId) => {
    try {
      await TodoService.deleteTask(taskId);
      setSelectedProject(prev => ({
        ...prev,
        todos: prev.todos.filter(task => task.id !== taskId)
      }));
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };

  const handleChangeStatus = async (taskId, newStatus) => {
  try {
    
    await TodoService.updateTask(taskId, { status: newStatus });

    
    setSelectedProject(prev => ({
      ...prev,
      todos: prev.todos.map(task =>
        task.id === taskId ? { ...task, status: newStatus } : task
      )
    }));
  } catch (error) {
    console.error("Error updating task status:", error);
  }
};

  
  

 
  const handleAddTaskToProject = async () => {
    if (!newTaskDescription || !selectedProject) return;

    try {
      const response = await TodoService.createTask(selectedProject.id, {
        description: newTaskDescription,
        status: 'Pending',
      });
      const newTask = response.data;
      setSelectedProject(prev => ({
        ...prev,
        todos: [...prev.todos, newTask]
      }));
      setNewTaskDescription('');
    } catch (error) {
      console.error("Error adding task to project:", error);
    }
  };

   
   const formatDate = (dateString) => {
    const date = new Date(dateString);
    return isNaN(date.getTime()) ? 'Invalid Date' : date.toLocaleDateString();
  };

  return (
    <div>
      <h1>Project List</h1>
      <input
        type="text"
        value={newProjectTitle}
        onChange={(e) => setNewProjectTitle(e.target.value)}
        placeholder="New Project Title"
      />
      <h2>Add Tasks for New Project</h2>
      {newTasks.map((task, index) => (
        <div key={index}>
          <input
            type="text"
            value={task.description}
            onChange={(e) => handleTaskInputChange(index, 'description', e.target.value)}
            placeholder="Task Description"
          />
        <select
          value={task.status}
          onChange={(e) => handleChangeStatus(task.id, e.target.value)}
        >
          <option value="Pending">Pending</option>
          <option value="Done">Done</option>
        </select>
        </div>
      ))}
      <button onClick={handleAddTaskInput}>Add Another Task</button>
      <button onClick={handleAddProject}>Add Project</button>

      <table style={{ border: '1px solid black', width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr>
            <th style={{ border: '1px solid black' }}>ID</th>
            <th style={{ border: '1px solid black' }}>Title</th>
            <th style={{ border: '1px solid black' }}>Created Date</th>
            <th style={{ border: '1px solid black' }}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {projects.map((project) => (
            <tr key={project.id}>
              <td style={{ border: '1px solid black' }}>{project.id}</td>
              <td style={{ border: '1px solid black' }}>
                <button onClick={() => fetchTasks(project.id)}>{project.title}</button>
              </td>
              <td style={{ border: '1px solid black' }}>{new Date(project.createdDate).toLocaleDateString()}</td>
              <td style={{ border: '1px solid black' }}>
                <button onClick={() => handleEditProject(project.id)}>Edit</button>
                <button onClick={() => handleDeleteProject(project.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {selectedProject && (
        <div>
          <h2>Tasks for {selectedProject.title}</h2>

          {}
          <input 
            type="text"
            value={newTaskDescription}
            onChange={(e) => setNewTaskDescription(e.target.value)}
            placeholder="New Task Description"
          />
          <button onClick={handleAddTaskToProject}>Add Task</button>

          <table style={{ border: '1px solid black', width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr>
                <th style={{ border: '1px solid black' }}>ID</th>
                <th style={{ border: '1px solid black' }}>Description</th>
                <th style={{ border: '1px solid black' }}>Status</th>
                <th style={{ border: '1px solid black' }}>Created Date</th>
                <th style={{ border: '1px solid black' }}>Updated Date</th>
                <th style={{ border: '1px solid black' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {selectedProject.todos.map((task) => (
                <tr key={task.id}>
                  <td style={{ border: '1px solid black' }}>{task.id}</td>
                  <td style={{ border: '1px solid black' }}>{task.description}</td>
                  <td style={{ border: '1px solid black' }}>
                    <select 
                      value={task.status} 
                      onChange={(e) => handleChangeStatus(task.id, e.target.value)}
                    >
                      <option value="Pending">Pending</option>
                      <option value="Done">Done</option>
                    </select>
                  </td>
                  <td style={{ border: '1px solid black' }}>{new Date(task.createdDate).toLocaleDateString()}</td>
                  <td style={{ border: '1px solid black' }}>{new Date(task.updatedDate).toLocaleDateString()}</td>
                  <td style={{ border: '1px solid black' }}>
                    <button onClick={() => handleEditTask(task.id)}>Edit</button>
                    <button onClick={() => handleDeleteTask(task.id)}>Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default ProjectTaskView;
