import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import CssBaseline from '@mui/material/CssBaseline';
import theme from './styles/theme';
import HomePage from './pages/HomePage';
import TaskCreate from './pages/TaskCreate';
import TaskEdit from './pages/TaskEdit';
import TaskView from './pages/TaskView';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <CssBaseline />
        <Router>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/tasks/new" element={<TaskCreate />} />
            <Route path="/tasks/:id/edit" element={<TaskEdit />} />
            <Route path="/tasks/:id" element={<TaskView />} />
          </Routes>
        </Router>
      </LocalizationProvider>
    </ThemeProvider>
  );
}

export default App;