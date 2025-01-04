import React, { useState } from 'react';
import { Paper, TextField, Button, Box } from '@mui/material';
import axios from 'axios';

const DepartmentForm = ({ onDepartmentAdded }) => {
  const [department, setDepartment] = useState({ name: '', description: '' });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:8000/api/departments/', department);
      setDepartment({ name: '', description: '' });
      onDepartmentAdded(); // Trigger refresh after adding department
    } catch (error) {
      console.error('Error adding department:', error);
    }
  };

  return (
    <Paper sx={{ p: 2 }}>
      <Box component="form" onSubmit={handleSubmit}>
        <TextField
          fullWidth
          label="Name"
          value={department.name}
          onChange={(e) => setDepartment({ ...department, name: e.target.value })}
          margin="normal"
        />
        <TextField
          fullWidth
          label="Description"
          value={department.description}
          onChange={(e) => setDepartment({ ...department, description: e.target.value })}
          margin="normal"
        />
        <Button variant="contained" type="submit">
          Add Department
        </Button>
      </Box>
    </Paper>
  );
};

export default DepartmentForm;