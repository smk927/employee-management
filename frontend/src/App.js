import React, { useState } from 'react';
import { Container, Box, Typography } from '@mui/material';
import DepartmentForm from './components/DepartmentForm';
import EmployeeForm from './components/EmployeeForm';
import EmployeeList from './components/EmployeeList';

function App() {
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  const triggerRefresh = () => {
    setRefreshTrigger(prev => prev + 1);
  };

  return (
    <Container maxWidth="lg">
      <Typography variant="h4" component="h1" gutterBottom>
        Employee Management System
      </Typography>
      <Box display="flex" gap={4} mb={4}>
        <DepartmentForm onDepartmentAdded={triggerRefresh} />
        <EmployeeForm onEmployeeAdded={triggerRefresh} refreshTrigger={refreshTrigger} />
      </Box>
      <EmployeeList refreshTrigger={refreshTrigger} />
    </Container>
  );
}

export default App;