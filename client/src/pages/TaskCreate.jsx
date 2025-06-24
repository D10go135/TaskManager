import React from 'react';
import { Container, Typography, Box } from '@mui/material';
import TaskForm from '../components/TaskForm';

const TaskCreate = () => {
  return (
    <Container maxWidth="md">
      <Box sx={{ mt: 4, mb: 4 }}>
        <Typography variant="h4" gutterBottom>
          Criar Nova Tarefa
        </Typography>
        <TaskForm />
      </Box>
    </Container>
  );
};

export default TaskCreate;