import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const frontURL = 'http://localhost:5100/api/task/getTasks';

const Dashboard = () => {
  const navigate = useNavigate();
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState({ title: '', description: '' });
  const [editingTask, setEditingTask] = useState(null);

  const fetchTasks = async () => {
    try {
      const response = await fetch(frontURL, {
        credentials: 'include'
      });
      if (response.ok) {
        const data = await response.json();
        setTasks(data);
      } else if (response.status === 401) {
        navigate('/');
      }
    } catch (err) {
      console.error('Error fetching tasks:', err);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const handleAddTask = async () => {
    try {
      const response = await fetch(frontURL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify(newTask),
      });
      if (response.ok) {
        setNewTask({ title: '', description: '' });
        fetchTasks();
      }
    } catch (err) {
      console.error('Error adding task:', err);
    }
  };

  const handleUpdateTask = async (taskId, updates) => {
    try {
      const response = await fetch(frontURL, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ taskId, ...updates }),
      });
      if (response.ok) {
        setEditingTask(null);
        fetchTasks();
      }
    } catch (err) {
      console.error('Error updating task:', err);
    }
  };

  const handleDeleteTask = async (taskId) => {
    try {
      const response = await fetch(frontURL, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ taskId }),
      });
      if (response.ok) {
        fetchTasks();
      }
    } catch (err) {
      console.error('Error deleting task:', err);
    }
  };

  return (
    <div>
      <div className="card">
        <h2 style={{ marginBottom: '1rem' }}>Add New Task</h2>
        <div className="form-group">
          <input
            type="text"
            className="input"
            placeholder="Task Title"
            value={newTask.title}
            onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
          />
        </div>
        <div className="form-group">
          <input
            type="text"
            className="input"
            placeholder="Task Description"
            value={newTask.description}
            onChange={(e) => setNewTask({ ...newTask, description: e.target.value })}
          />
        </div>
        <button onClick={handleAddTask} className="btn btn-primary">
          Add Task
        </button>
      </div>

      <div className="task-grid">
        {tasks.map((task) => (
          <div key={task._id} className="card task-card">
            {editingTask === task._id ? (
              <div>
                <input
                  type="text"
                  className="input"
                  defaultValue={task.title}
                  onChange={(e) => handleUpdateTask(task._id, { title: e.target.value })}
                />
                <input
                  type="text"
                  className="input"
                  defaultValue={task.description}
                  onChange={(e) => handleUpdateTask(task._id, { description: e.target.value })}
                />
                <select
                  className="input"
                  defaultValue={task.progress}
                  onChange={(e) => handleUpdateTask(task._id, { progress: e.target.value })}
                >
                  <option value="To Do">To Do</option>
                  <option value="In Progress">In Progress</option>
                  <option value="Done">Done</option>
                </select>
                <button 
                  className="btn btn-primary"
                  onClick={() => setEditingTask(null)}
                >
                  Save
                </button>
              </div>
            ) : (
              <>
                <div className="actions">
                  <button 
                    className="btn btn-ghost"
                    onClick={() => setEditingTask(task._id)}
                  >
                    Edit
                  </button>
                  <button 
                    className="btn btn-ghost"
                    onClick={() => handleDeleteTask(task._id)}
                  >
                    Delete
                  </button>
                </div>
                <h3 style={{ marginBottom: '0.5rem' }}>{task.title}</h3>
                <p style={{ color: 'var(--text-secondary)', marginBottom: '1rem' }}>
                  {task.description}
                </p>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span className={`status-badge status-${task.progress.toLowerCase().replace(' ', '')}`}>
                    {task.progress}
                  </span>
                  <span style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>
                    {new Date(task.createdAt).toLocaleDateString()}
                  </span>
                </div>
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;