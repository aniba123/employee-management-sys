// EmployeeContext.js
import { createContext, useState, useContext, useEffect } from 'react';

const EmployeeContext = createContext();

export const EmployeeProvider = ({ children }) => {
  // Load employees from localStorage on initial render
  const loadEmployees = () => {
    const savedEmployees = localStorage.getItem('employees');
    return savedEmployees ? JSON.parse(savedEmployees) : [
      {
        id: 1,
        name: 'Sarah Johnson',
        position: 'Senior Developer',
        department: 'Engineering',
        email: 'sarah@example.com',
        phone: '(555) 123-4567'
      },
      {
        id: 2,
        name: 'Michael Chen',
        position: 'HR Manager',
        department: 'Human Resources',
        email: 'michael@example.com',
        phone: '(555) 987-6543'
      },
      {
        id: 3,
        name: 'Lisa Rodriguez',
        position: 'Marketing Specialist',
        department: 'Marketing',
        email: 'lisa@example.com',
        phone: '(555) 456-7890'
      }
    ];
  };

  const [employees, setEmployees] = useState(loadEmployees());

  // Save to localStorage whenever employees change
  useEffect(() => {
    localStorage.setItem('employees', JSON.stringify(employees));
  }, [employees]);

  const addEmployee = (employee) => {
    const employeeToAdd = {
      ...employee,
      id: employees.length > 0 ? Math.max(...employees.map(e => e.id)) + 1 : 1
    };
    setEmployees([...employees, employeeToAdd]);
  };

  const deleteEmployee = (id) => {
    setEmployees(employees.filter(employee => employee.id !== id));
  };

  return (
    <EmployeeContext.Provider value={{ employees, addEmployee, deleteEmployee }}>
      {children}
    </EmployeeContext.Provider>
  );
};



export const useEmployees = () => useContext(EmployeeContext);