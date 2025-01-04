// components/DepartmentForm.js
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
    <Paper sx={{ p: 3, borderRadius: 2 }}>
      <Box component="form" onSubmit={handleSubmit}>
        <TextField
          fullWidth
          label="Department Name"
          value={department.name}
          onChange={(e) => setDepartment({ ...department, name: e.target.value })}
          margin="normal"
          variant="outlined"
          sx={{ input: { color: 'white' }, marginBottom: 2 }}
        />
        <TextField
          fullWidth
          label="Description"
          value={department.description}
          onChange={(e) => setDepartment({ ...department, description: e.target.value })}
          margin="normal"
          variant="outlined"
          sx={{ input: { color: 'white' }, marginBottom: 2 }}
        />
        <Button
          variant="contained"
          type="submit"
          sx={{
            backgroundColor: 'primary.main',
            '&:hover': { backgroundColor: 'primary.dark' },
          }}
        >
          Add Department
        </Button>
      </Box>
    </Paper>
  );
};

export default DepartmentForm;
