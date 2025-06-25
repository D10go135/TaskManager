import React, { useEffect, useState } from 'react';
import { List, ListItem, ListItemText, Checkbox, IconButton, Typography } from '@mui/material';
import { Delete, Edit } from '@mui/icons-material';
import api from '../api';
import { useNavigate } from 'react-router-dom';

const TaskList = () => {
  const [tasks, setTasks] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const response = await api.get('/tasks');
      setTasks(response.data);
    } catch (error) {
      console.error('Erro ao buscar tarefas:', error);
    }
  };

  const handleToggleComplete = async (taskId, completed) => {
    try {
      await api.patch(`/tasks/${taskId}`, { completed: !completed });
      setTasks(tasks.map(task => 
        task.id === taskId ? { ...task, completed: !completed } : task
      ));
    } catch (error) {
      console.error('Erro ao atualizar tarefa:', error);
    }
  };

  const handleDelete = async (taskId) => {
    try {
      await api.delete(`/tasks/${taskId}`);
      setTasks(tasks.filter(task => task.id !== taskId));
    } catch (error) {
      console.error('Erro ao deletar tarefa:', error);
    }
  };

  const handleEdit = (taskId) => {
    navigate(`/tasks/${taskId}/edit`);
  };

  return (
    <List>
      {tasks.length === 0 ? (
        <Typography variant="body1">Nenhuma tarefa encontrada</Typography>
      ) : (
        tasks.map((task) => (
          <ListItem key={task.id}>
            <Checkbox
              checked={task.completed}
              onChange={() => handleToggleComplete(task.id, task.completed)}
            />
            <ListItemText
              primary={task.title}
              secondary={`${task.subject} - ${new Date(task.dueDate).toLocaleDateString()}`}
            />
            <IconButton edge="end" aria-label="edit" onClick={() => handleEdit(task.id)}>
              <Edit />
            </IconButton>
            <IconButton edge="end" aria-label="delete" onClick={() => handleDelete(task.id)}>
              <Delete />
            </IconButton>
          </ListItem>
        ))
      )}
    </List>
  );
};

export default TaskList;
