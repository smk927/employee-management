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
    <Paper sx={{ p: 2 }}>
      <TextField
        fullWidth
        label="Filter by name or department"
        value={filter}
        onChange={(e) => setFilter(e.target.value)}
        margin="normal"
      />
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Department</TableCell>
              <TableCell>Address</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {employees.map((employee) => (
              <TableRow key={employee.id}>
                <TableCell>{employee.name}</TableCell>
                <TableCell>{employee.departmentName}</TableCell>
                <TableCell>{employee.address}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
};

export default EmployeeList;