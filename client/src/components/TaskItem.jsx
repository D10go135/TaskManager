import React from 'react';
import { 
  ListItem, 
  ListItemText, 
  Checkbox, 
  IconButton, 
  Typography, 
  Chip 
} from '@mui/material';
import { Edit, Delete } from '@mui/icons-material';

const TaskItem = ({ task, onToggleComplete, onEdit, onDelete }) => {
  const priorityColors = {
    high: 'error',
    medium: 'warning',
    low: 'success'
  };
  const handleEdit = () => {
    onEdit(task.id);
  };

  const handleDelete = () => {
    if (window.confirm('Tem certeza que deseja excluir esta tarefa?')) {
      onDelete(task.id);
    }
  };

  return (
    <ListItem
      secondaryAction={
        <>
          <IconButton edge="end" onClick={handleEdit} aria-label="edit">
            <Edit />
          </IconButton>
          <IconButton edge="end" onClick={handleDelete} aria-label="delete">
            <Delete />
          </IconButton>
        </>
      }
    >
      <Checkbox
        checked={task.completed}
        onChange={() => onToggleComplete(task.id, task.completed)}
      />
      <ListItemText
        primary={
          <Typography 
            variant="body1" 
            style={{ 
              textDecoration: task.completed ? 'line-through' : 'none',
              color: task.completed ? 'text.secondary' : 'text.primary'
            }}
          >
            {task.title}
          </Typography>
        }
        secondary={
          <>
            <Typography component="span" display="block">
              {task.description}
            </Typography>
            <Typography component="span" display="block" variant="caption">
              {new Date(task.dueDate).toLocaleDateString()} • {task.subject}
            </Typography>
            <Chip 
              label={task.priority} 
              size="small" 
              color={priorityColors[task.priority]} 
              style={{ marginTop: 4 }}
            />
          </>
        }
      />
    </ListItem>
  );
};

export default TaskItem;
