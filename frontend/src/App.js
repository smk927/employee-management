// App.js
import React, { useState } from 'react';
import { Container, Box, Typography, CssBaseline, ThemeProvider, createTheme } from '@mui/material';
import DepartmentForm from './components/DepartmentForm';
import EmployeeForm from './components/EmployeeForm';
import EmployeeList from './components/EmployeeList';

// Create a dark theme
const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#90caf9',
    },
    secondary: {
      main: '#f48fb1',
    },
    background: {
      default: '#121212',
      paper: '#1e1e1e',
    },
    text: {
      primary: '#e0e0e0',
      secondary: '#b0b0b0',
    },
  },
  typography: {
    fontFamily: 'Roboto, sans-serif',
  },
});

function App() {
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  const triggerRefresh = () => {
    setRefreshTrigger(prev => prev + 1);
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Container maxWidth="lg">
        <Typography variant="h4" component="h1" gutterBottom align="center">
          Employee Management System
        </Typography>
        <Box display="flex" flexDirection="column" gap={4} mb={4}>
          <DepartmentForm onDepartmentAdded={triggerRefresh} />
          <EmployeeForm onEmployeeAdded={triggerRefresh} refreshTrigger={refreshTrigger} />
        </Box>
        <EmployeeList refreshTrigger={refreshTrigger} />
      </Container>
    </ThemeProvider>
  );
}

export default App;
