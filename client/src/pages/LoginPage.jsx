import React, { useState } from 'react';
import {
  Container,
  TextField,
  Typography,
  Button,
  Box,
  AppBar,
  Toolbar,
  Paper
} from '@mui/material';
import { useNavigate } from 'react-router-dom';

const LoginPage = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [erro, setErro] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();
    
    // Simulação de login
    if (email === 'admin@escola.com' && senha === '123456') {
      navigate('/home');
    } else {
      setErro('E-mail ou senha inválidos.');
    }
  };

  return (
    <>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            Gerenciador de Tarefas Escolares
          </Typography>
        </Toolbar>
      </AppBar>

      <Container maxWidth="sm">
        <Paper elevation={3} sx={{ p: 4, mt: 8 }}>
          <Typography variant="h5" gutterBottom>
            Login
          </Typography>
          <form onSubmit={handleLogin}>
            <TextField
              fullWidth
              label="E-mail"
              type="email"
              margin="normal"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <TextField
              fullWidth
              label="Senha"
              type="password"
              margin="normal"
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
              required
            />
            {erro && (
              <Typography color="error" sx={{ mt: 1 }}>
                {erro}
              </Typography>
            )}
            <Box mt={3}>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                fullWidth
              >
                Entrar
              </Button>
            </Box>
          </form>
        </Paper>
      </Container>
    </>
  );
};

export default LoginPage;
