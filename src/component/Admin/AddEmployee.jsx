import { useState} from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaSearch, FaUserPlus, FaEnvelope, FaBriefcase, FaBuilding, FaTrash } from 'react-icons/fa';
import { useEmployees } from './EmployeeContext.jsx';



// const EmployeeManagement = () => {
//   // Get employees and functions from context
//   const { employees, addEmployee, deleteEmployee } = useEmployees();


const EmployeeManagement = () => {
  // Initial dummy data
    const { employees, addEmployee, deleteEmployee } = useEmployees();


  // State
  const [searchTerm, setSearchTerm] = useState('');
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [newEmployee, setNewEmployee] = useState({
    name: '',
    position: '',
    department: '',
    email: '',
    phone: ''
  });

  // Filter employees based on search term
  const filteredEmployees = employees.filter(employee => {
    const searchLower = searchTerm.toLowerCase();
    return (
      employee.name.toLowerCase().includes(searchLower) ||
      employee.department.toLowerCase().includes(searchLower)
    );
  });

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewEmployee(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Add new employee
 // Update handleAddEmployee
  const handleAddEmployee = (e) => {
    e.preventDefault();
    addEmployee(newEmployee); // Use context function
    // Reset form (keep this part)
    setNewEmployee({
      name: '',
      position: '',
      department: '',
      email: '',
      phone: ''
    });
    setIsFormOpen(false);
  };

  // Delete employee
  // Update handleDeleteEmployee
  const handleDeleteEmployee = (id) => {
    deleteEmployee(id); // Use context function
  };

  return (
    <div className="employee-management">
      <div className="header">
        <h1>Employee Management</h1>
        <div className="controls">
          <div className="search-container">
            <FaSearch className="search-icon" />
            <input
              type="text"
              placeholder="Search by name or department..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <button 
            className="add-button"
            onClick={() => setIsFormOpen(!isFormOpen)}
          >
            <FaUserPlus /> Add Employee
          </button>
        </div>
      </div>

      {/* Add Employee Form */}
      {isFormOpen && (
        <motion.div 
          className="add-form"
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          transition={{ duration: 0.3 }}
        >
          <h2>Add New Employee</h2>
          <form onSubmit={handleAddEmployee}>
            <div className="form-group">
              <label>Full Name</label>
              <input
                type="text"
                name="name"
                value={newEmployee.name}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="form-group">
              <label>Position</label>
              <input
                type="text"
                name="position"
                value={newEmployee.position}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="form-group">
              <label>Department</label>
              <input
                type="text"
                name="department"
                value={newEmployee.department}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="form-group">
              <label>Email</label>
              <input
                type="email"
                name="email"
                value={newEmployee.email}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="form-group">
              <label>Phone</label>
              <input
                type="tel"
                name="phone"
                value={newEmployee.phone}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="form-actions">
              <button type="submit" className="submit-button">Add Employee</button>
              <button 
                type="button" 
                className="cancel-button"
                onClick={() => setIsFormOpen(false)}
              >
                Cancel
              </button>
            </div>
          </form>
        </motion.div>
      )}

      {/* Employee Cards */}
      <div className="employee-grid">
        <AnimatePresence>
          {filteredEmployees.length > 0 ? (
            filteredEmployees.map((employee) => (
              <motion.div
                key={employee.id}
                className="employee-card"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3 }}
                whileHover={{ y: -5, boxShadow: '0 10px 20px rgba(0,0,0,0.1)' }}
              >
                <div className="card-header">
                  <h3>{employee.name}</h3>
                  <button 
                    className="delete-button"
                    onClick={() => handleDeleteEmployee(employee.id)}
                  >
                    <FaTrash />
                  </button>
                </div>
                <div className="card-body">
                  <div className="info-item">
                    <FaBriefcase className="icon" />
                    <span>{employee.position}</span>
                  </div>
                  <div className="info-item">
                    <FaBuilding className="icon" />
                    <span>{employee.department}</span>
                  </div>
                  <div className="info-item">
                    <FaEnvelope className="icon" />
                    <span>{employee.email}</span>
                  </div>
                  <div className="info-item">
                    <FaEnvelope className="icon" />
                    <span>{employee.phone}</span>
                  </div>
                </div>
              </motion.div>
            ))
          ) : (
            <motion.div
              className="no-results"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
            >
              No employees found matching your search.
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default EmployeeManagement;

// CSS Styles
const styles = `
.employee-management {
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  max-width: 1200px;
  margin: 5% auto;
  padding: 20px;
  color: #333;
}

.header {
  margin-bottom: 30px;
}

.header h1 {
  color: #2c3e50;
  margin-bottom: 20px;
  font-size: 2rem;
}

.controls {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  margin-bottom: 20px;
}

.search-container {
  flex: 1;
  min-width: 250px;
  position: relative;
  display: flex;
  align-items: center;
}

.search-icon {
  position: absolute;
  left: 15px;
  color: #7f8c8d;
}

.search-container input {
  width: 100%;
  padding: 12px 20px 12px 45px;
  border: 1px solid #ddd;
  border-radius: 30px;
  font-size: 1rem;
  transition: all 0.3s;
}

.search-container input:focus {
  outline: none;
  border-color: #3498db;
  box-shadow: 0 0 0 3px rgba(52, 152, 219, 0.2);
}

.add-button {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 12px 20px;
  background-color: #3498db;
  color: white;
  border: none;
  border-radius: 30px;
  font-size: 1rem;
  cursor: pointer;
  transition: all 0.3s;
}

.add-button:hover {
  background-color: #2980b9;
  transform: translateY(-2px);
}

.add-form {
  background-color: white;
  padding: 25px;
  border-radius: 10px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);
  margin-bottom: 30px;
  overflow: hidden;
}

.add-form h2 {
  margin-bottom: 20px;
  color: #2c3e50;
}

.form-group {
  margin-bottom: 15px;
}

.form-group label {
  display: block;
  margin-bottom: 5px;
  font-weight: 500;
}

.form-group input {
  width: 100%;
  padding: 10px 15px;
  border: 1px solid #ddd;
  border-radius: 5px;
  font-size: 1rem;
}

.form-group input:focus {
  outline: none;
  border-color: #3498db;
  box-shadow: 0 0 0 3px rgba(52, 152, 219, 0.2);
}

.form-actions {
  display: flex;
  gap: 10px;
  margin-top: 20px;
}

.submit-button, .cancel-button {
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  font-size: 1rem;
  cursor: pointer;
  transition: all 0.3s;
}

.submit-button {
  background-color: #2ecc71;
  color: white;
}

.submit-button:hover {
  background-color: #27ae60;
}

.cancel-button {
  background-color: #e74c3c;
  color: white;
}

.cancel-button:hover {
  background-color: #c0392b;
}

.employee-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 20px;
}

.employee-card {
  background-color: white;
  border-radius: 10px;
  padding: 20px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);
  transition: all 0.3s;
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 15px;
  padding-bottom: 10px;
  border-bottom: 1px solid #eee;
}

.card-header h3 {
  margin: 0;
  color: #2c3e50;
}

.delete-button {
  background: none;
  border: none;
  color: #e74c3c;
  cursor: pointer;
  font-size: 1rem;
  transition: all 0.3s;
}

.delete-button:hover {
  transform: scale(1.1);
}

.card-body {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.info-item {
  display: flex;
  align-items: center;
  gap: 10px;
}

.icon {
  color: #3498db;
  min-width: 20px;
}

.no-results {
  grid-column: 1 / -1;
  text-align: center;
  padding: 40px;
  color: #7f8c8d;
  font-size: 1.1rem;
}

@media (max-width: 768px) {
  .employee-grid {
    grid-template-columns: 1fr;
  }
  
  .controls {
    flex-direction: column;
  }
  
  .search-container {
    min-width: 100%;
  }
    .employee-management {
    margin: 10% auto;
    }
}
`;

// Inject styles
document.head.insertAdjacentHTML('beforeend', `<style>${styles}</style>`);