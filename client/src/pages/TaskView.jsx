import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  Container, 
  Typography, 
  Box, 
  Button, 
  Chip, 
  Paper,
  Divider
} from '@mui/material';
import { Edit, ArrowBack } from '@mui/icons-material';
import api from '../api';

const TaskView = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [task, setTask] = useState(null);

  useEffect(() => {
    const fetchTask = async () => {
      try {
        const response = await api.get(`/tasks/${id}`);
        setTask(response.data);
      } catch (error) {
        console.error('Error fetching task:', error);
      }
    };
    fetchTask();
  }, [id]);

  if (!task) {
    return (
      <Container maxWidth="md">
        <Box sx={{ mt: 4, textAlign: 'center' }}>
          <Typography variant="h6">Carregando tarefa...</Typography>
        </Box>
      </Container>
    );
  }

  const priorityColors = {
    high: 'error',
    medium: 'warning',
    low: 'success'
  };

  return (
    <Container maxWidth="md">
      <Box sx={{ mt: 4 }}>
        <Button 
          startIcon={<ArrowBack />} 
          onClick={() => navigate('/')}
          sx={{ mb: 2 }}
        >
          Voltar
        </Button>
        
        <Paper elevation={3} sx={{ p: 3 }}>
          <Box display="flex" justifyContent="space-between" alignItems="center">
            <Typography variant="h4" component="h1">
              {task.title}
            </Typography>
            <Button 
              variant="contained" 
              startIcon={<Edit />}
              onClick={() => navigate(`/tasks/${id}/edit`)}
            >
              Editar
            </Button>
          </Box>

          <Box display="flex" gap={2} sx={{ my: 2 }}>
            <Chip 
              label={task.subject} 
              color="primary" 
              variant="outlined" 
            />
            <Chip 
              label={task.priority} 
              color={priorityColors[task.priority]} 
            />
            <Chip 
              label={new Date(task.dueDate).toLocaleDateString()} 
            />
          </Box>

          <Divider sx={{ my: 2 }} />

          <Typography variant="h6" gutterBottom>
            Descrição:
          </Typography>
          <Typography paragraph>
            {task.description || 'Nenhuma descrição fornecida.'}
          </Typography>

          <Typography variant="body2" color="text.secondary">
            Tipo: {task.type === 'homework' ? 'Tarefa de Casa' : 
                  task.type === 'test' ? 'Prova' : 
                  task.type === 'project' ? 'Projeto' : 'Leitura'}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Status: {task.completed ? 'Concluída' : 'Pendente'}
          </Typography>
        </Paper>
      </Box>
    </Container>
  );
};

export default TaskView;