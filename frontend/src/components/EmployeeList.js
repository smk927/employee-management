// components/EmployeeList.js
import React, { useState, useEffect } from 'react';
import { Paper, TextField, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import axios from 'axios';

const EmployeeList = ({ refreshTrigger }) => {
  const [employees, setEmployees] = useState([]);
  const [filter, setFilter] = useState('');

  useEffect(() => {
    fetchEmployees();
  }, [filter, refreshTrigger]); // Refresh when filter changes or refresh is triggered

  const fetchEmployees = async () => {
    try {
      const response = await axios.get(`http://localhost:8000/api/employees/?search=${filter}`);
      const employeesWithDepartments = await Promise.all(
        response.data.map(async (employee) => {
          const deptResponse = await axios.get(`http://localhost:8000/api/departments/${employee.department}/`);
          return { ...employee, departmentName: deptResponse.data.name };
        })
      );
      setEmployees(employeesWithDepartments);
    } catch (error) {
      console.error('Error fetching employees:', error);
    }
  };

  return (
    <Paper sx={{ p: 3, borderRadius: 2 }}>
      {/* Filter input */}
      <TextField
        fullWidth
        label="Filter by name or department"
        value={filter}
        onChange={(e) => setFilter(e.target.value)}
        margin="normal"
        variant="outlined"
        sx={{ input: { color: 'white' }, marginBottom: 2 }}
      />
      
      {/* Employee Table */}
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Name</TableCell>
              <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Department</TableCell>
              <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Address</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {/* Render employees */}
            {employees.map((employee) => (
              <TableRow key={employee.id} sx={{ '&:hover': { backgroundColor: '#333' } }}>
                <TableCell sx={{ color: 'white' }}>{employee.name}</TableCell>
                <TableCell sx={{ color: 'white' }}>{employee.departmentName}</TableCell>
                <TableCell sx={{ color: 'white' }}>{employee.address}</TableCell>
              </TableRow>
            ))}
            {/* No data message */}
            {employees.length === 0 && (
              <TableRow>
                <TableCell colSpan={3} sx={{ textAlign: 'center', color: 'gray' }}>
                  No employees found
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
};

export default EmployeeList;
