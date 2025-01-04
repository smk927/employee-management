import React, { useState, useEffect } from 'react';
import { Paper, TextField, Button, Box, MenuItem } from '@mui/material';
import axios from 'axios';

const EmployeeForm = ({ onEmployeeAdded, refreshTrigger }) => {
  const [employee, setEmployee] = useState({ name: '', department: '', address: '' });
  const [departments, setDepartments] = useState([]);

  useEffect(() => {
    const fetchDepartments = async () => {
      const response = await axios.get('http://localhost:8000/api/departments/');
      setDepartments(response.data);
    };
    fetchDepartments();
  }, [refreshTrigger]); // Refresh departments when trigger changes

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:8000/api/employees/', employee);
      setEmployee({ name: '', department: '', address: '' });
      onEmployeeAdded(); // Trigger refresh after adding employee
    } catch (error) {
      console.error('Error adding employee:', error);
    }
  };

  return (
    <Paper sx={{ p: 2 }}>
      <Box component="form" onSubmit={handleSubmit}>
        <TextField
          fullWidth
          label="Name"
          value={employee.name}
          onChange={(e) => setEmployee({ ...employee, name: e.target.value })}
          margin="normal"
        />
        <TextField
          fullWidth
          select
          label="Department"
          value={employee.department}
          onChange={(e) => setEmployee({ ...employee, department: e.target.value })}
          margin="normal"
        >
          {departments.map((dept) => (
            <MenuItem key={dept.id} value={dept.id}>
              {dept.name}
            </MenuItem>
          ))}
        </TextField>
        <TextField
          fullWidth
          label="Address"
          value={employee.address}
          onChange={(e) => setEmployee({ ...employee, address: e.target.value })}
          margin="normal"
        />
        <Button variant="contained" type="submit">
          Add Employee
        </Button>
      </Box>
    </Paper>
  );
};

export default EmployeeForm;