import React, { useState, useEffect } from 'react';
import { 
  TextField, 
  Button, 
  Grid, 
  MenuItem, 
  FormControl, 
  InputLabel, 
  Select, 
  Box 
} from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers';
import { useNavigate } from 'react-router-dom';
import api from '../api';

const TaskForm = ({ taskId }) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    dueDate: new Date(),
    priority: 'medium',
    subject: '',
    type: 'homework',
    completed: false
  });

  const subjects = ['Matemática', 'Português', 'História', 'Geografia', 'Ciências', 'Inglês', 'Artes'];
  const taskTypes = ['homework', 'test', 'project', 'reading'];

  useEffect(() => {
    if (taskId) {
      const fetchTask = async () => {
        try {
          const response = await api.get(`/tasks/${taskId}`);
          setFormData({
            ...response.data,
            dueDate: new Date(response.data.dueDate)
          });
        } catch (error) {
          console.error('Error fetching task:', error);
        }
      };
      fetchTask();
    }
  }, [taskId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleDateChange = (date) => {
    setFormData(prev => ({ ...prev, dueDate: date }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (taskId) {
        await api.patch(`/tasks/${taskId}`, formData);
      } else {
        await api.post('/tasks', formData);
      }
      navigate('/');
    } catch (error) {
      console.error('Error saving task:', error);
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Título"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Descrição"
            name="description"
            value={formData.description}
            onChange={handleChange}
            multiline
            rows={4}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <DatePicker
            label="Data de Entrega"
            value={formData.dueDate}
            onChange={handleDateChange}
            renderInput={(params) => <TextField fullWidth {...params} />}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <FormControl fullWidth>
            <InputLabel>Prioridade</InputLabel>
            <Select
              name="priority"
              value={formData.priority}
              label="Prioridade"
              onChange={handleChange}
            >
              <MenuItem value="low">Baixa</MenuItem>
              <MenuItem value="medium">Média</MenuItem>
              <MenuItem value="high">Alta</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={6}>
          <FormControl fullWidth>
            <InputLabel>Matéria</InputLabel>
            <Select
              name="subject"
              value={formData.subject}
              label="Matéria"
              onChange={handleChange}
              required
            >
              {subjects.map(subject => (
                <MenuItem key={subject} value={subject}>{subject}</MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={6}>
          <FormControl fullWidth>
            <InputLabel>Tipo de Tarefa</InputLabel>
            <Select
              name="type"
              value={formData.type}
              label="Tipo de Tarefa"
              onChange={handleChange}
            >
              {taskTypes.map(type => (
                <MenuItem key={type} value={type}>
                  {type === 'homework' ? 'Tarefa de Casa' : 
                   type === 'test' ? 'Prova' : 
                   type === 'project' ? 'Projeto' : 'Leitura'}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12}>
          <Button type="submit" variant="contained" fullWidth size="large">
            {taskId ? 'Atualizar Tarefa' : 'Criar Tarefa'}
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
};

export default TaskForm;