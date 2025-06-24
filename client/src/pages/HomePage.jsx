import React, { useState } from 'react';
import { 
  Container, 
  Typography, 
  Button, 
  Box, 
  AppBar, 
  Toolbar,
  Tabs,
  Tab
} from '@mui/material';
import { Add } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import TaskList from '../components/TaskList';

const HomePage = () => {
  const navigate = useNavigate();
  const [refresh, setRefresh] = useState(false);
  const [tabValue, setTabValue] = useState('all');

  const handleEdit = (taskId) => {
    navigate(`/tasks/${taskId}/edit`);
  };

  const handleRefresh = () => {
    setRefresh(prev => !prev);
  };

  return (
    <>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Gerenciador de Tarefas Escolares
          </Typography>
          <Button 
            color="inherit" 
            startIcon={<Add />} 
            onClick={() => navigate('/tasks/new')}
          >
            Nova Tarefa
          </Button>
        </Toolbar>
      </AppBar>
      <Container maxWidth="md" sx={{ mt: 4 }}>
        <Tabs 
          value={tabValue} 
          onChange={(e, newValue) => setTabValue(newValue)}
          sx={{ mb: 3 }}
        >
          <Tab label="Todas" value="all" />
          <Tab label="Pendentes" value="pending" />
          <Tab label="Concluídas" value="completed" />
        </Tabs>
        
        <TaskList 
          refresh={refresh} 
          onEdit={handleEdit} 
        />
      </Container>
    </>
  );
};

export default HomePage;