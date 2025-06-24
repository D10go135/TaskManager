import React from 'react';
import { useParams } from 'react-router-dom';
import { Container, Typography, Box } from '@mui/material';
import TaskForm from '../components/TaskForm';

const TaskEdit = () => {
  const { id } = useParams();

  return (
    <Container maxWidth="md">
      <Box sx={{ mt: 4, mb: 4 }}>
        <Typography variant="h4" gutterBottom>
          Editar Tarefa
        </Typography>
        <TaskForm taskId={id} />
      </Box>
    </Container>
  );
};

export default TaskEdit;