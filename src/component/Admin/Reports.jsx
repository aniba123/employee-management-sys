import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line } from 'recharts';
import { FaUsers, FaChartBar, FaChartPie, FaChartLine, FaSearch, FaFilter, FaUser, FaCalendarAlt, FaTrophy, FaStar } from 'react-icons/fa';
// import './EmployeeReports.css';

const EmployeeReports = () => {
  // Dummy employee data
  const initialEmployees = [
    { id: 1, name: 'Sarah Johnson', department: 'Engineering', joiningDate: '2022-01-15', attendance: 95, performance: [85, 88, 90, 92, 94, 96] },
    { id: 2, name: 'Michael Chen', department: 'HR', joiningDate: '2021-11-10', attendance: 98, performance: [78, 82, 85, 88, 90, 92] },
    { id: 3, name: 'Lisa Rodriguez', department: 'Marketing', joiningDate: '2023-03-22', attendance: 89, performance: [90, 89, 91, 93, 92, 94] },
    { id: 4, name: 'David Wilson', department: 'Engineering', joiningDate: '2022-06-05', attendance: 92, performance: [82, 85, 87, 89, 91, 93] },
    { id: 5, name: 'Emma Thompson', department: 'Sales', joiningDate: '2023-01-30', attendance: 91, performance: [88, 90, 89, 91, 93, 95] }
  ];

  // State
  const [employees] = useState(initialEmployees);
  const [filteredEmployees, setFilteredEmployees] = useState(initialEmployees);
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState({
    department: 'all',
    dateRange: 'all',
    performanceThreshold: 0
  });

  // Departments for filter dropdown
  const departments = ['all', ...new Set(employees.map(emp => emp.department))];

  // Performance data for line chart (last 6 months)
  const performanceData = employees[0].performance.map((_, index) => {
    return {
      month: `Month ${index + 1}`,
      ...employees.reduce((acc, emp) => {
        acc[emp.name] = emp.performance[index];
        return acc;
      }, {})
    };
  });

  // Calculate department averages for bar chart
  const departmentAverages = departments.filter(d => d !== 'all').map(dept => {
    const deptEmployees = employees.filter(emp => emp.department === dept);
    const avgAttendance = deptEmployees.reduce((sum, emp) => sum + emp.attendance, 0) / deptEmployees.length;
    return { department: dept, attendance: avgAttendance };
  });

  // Calculate department counts for pie chart
  const departmentCounts = departments.filter(d => d !== 'all').map(dept => {
    const count = employees.filter(emp => emp.department === dept).length;
    return { name: dept, value: count };
  });

  // Calculate KPIs
  const totalEmployees = employees.length;
  const highestAttendance = Math.max(...employees.map(emp => emp.attendance));
  const topPerformer = [...employees].sort((a, b) => 
    Math.max(...b.performance) - Math.max(...a.performance))[0];
  const avgPerformance = employees.reduce((sum, emp) => 
    sum + Math.max(...emp.performance), 0) / employees.length;

  // Colors for charts
  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8'];

  // Apply filters
  useEffect(() => {
    let result = [...employees];
    
    // Apply department filter
    if (filters.department !== 'all') {
      result = result.filter(emp => emp.department === filters.department);
    }
    
    // Apply search filter
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      result = result.filter(emp => 
        emp.name.toLowerCase().includes(term) || 
        emp.department.toLowerCase().includes(term)
      );
    }
    
    // Apply performance threshold filter
    if (filters.performanceThreshold > 0) {
      result = result.filter(emp => 
        Math.max(...emp.performance) >= filters.performanceThreshold
      );
    }

    setFilteredEmployees(result);
  }, [employees, searchTerm, filters]);

  // Handle filter changes
  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <div className="employee-reports">
      {/* Header */}
      <header className="reports-header">
        <h1><FaChartBar /> Employee Reports</h1>
        <p>Comprehensive analytics and insights about your workforce</p>
      </header>

      {/* KPI Cards */}
      <section className="kpi-cards">
        <motion.div 
          className="kpi-card"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.1 }}
        >
          <div className="kpi-icon">
            <FaUsers />
          </div>
          <div className="kpi-content">
            <h3>Total Employees</h3>
            <p>{totalEmployees}</p>
          </div>
        </motion.div>

        <motion.div 
          className="kpi-card"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.2 }}
        >
          <div className="kpi-icon">
            <FaUser />
          </div>
          <div className="kpi-content">
            <h3>Highest Attendance</h3>
            <p>{highestAttendance}%</p>
          </div>
        </motion.div>

        <motion.div 
          className="kpi-card"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.3 }}
        >
          <div className="kpi-icon">
            <FaTrophy />
          </div>
          <div className="kpi-content">
            <h3>Top Performer</h3>
            <p>{topPerformer.name}</p>
          </div>
        </motion.div>

        <motion.div 
          className="kpi-card"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.4 }}
        >
          <div className="kpi-icon">
            <FaStar />
          </div>
          <div className="kpi-content">
            <h3>Avg Performance</h3>
            <p>{avgPerformance.toFixed(1)}</p>
          </div>
        </motion.div>
      </section>

      {/* Filters */}
      <section className="filters-section">
        <div className="search-filter">
          <FaSearch className="search-icon" />
          <input
            type="text"
            placeholder="Search employees..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="dropdown-filters">
          <div className="filter-group">
            <label htmlFor="department"><FaUser /> Department</label>
            <select
              id="department"
              name="department"
              value={filters.department}
              onChange={handleFilterChange}
            >
              {departments.map(dept => (
                <option key={dept} value={dept}>
                  {dept === 'all' ? 'All Departments' : dept}
                </option>
              ))}
            </select>
          </div>

          <div className="filter-group">
            <label htmlFor="performanceThreshold"><FaStar /> Min Performance</label>
            <input
              type="range"
              id="performanceThreshold"
              name="performanceThreshold"
              min="0"
              max="100"
              value={filters.performanceThreshold}
              onChange={handleFilterChange}
            />
            <span>{filters.performanceThreshold}</span>
          </div>
        </div>
      </section>

      {/* Charts Section */}
      <section className="charts-section">
        <motion.div 
          className="chart-container"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <h3><FaChartBar /> Attendance by Department</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={departmentAverages}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="department" />
              <YAxis domain={[0, 100]} />
              <Tooltip />
              <Legend />
              <Bar dataKey="attendance" fill="#4e73df" name="Attendance %" />
            </BarChart>
          </ResponsiveContainer>
        </motion.div>

        <motion.div 
          className="chart-container"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <h3><FaChartPie /> Employees by Department</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={departmentCounts}
                cx="50%"
                cy="50%"
                labelLine={false}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
                label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
              >
                {departmentCounts.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </motion.div>

        <motion.div 
          className="chart-container full-width"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.6 }}
        >
          <h3><FaChartLine /> Performance Trends (Last 6 Months)</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={performanceData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis domain={[0, 100]} />
              <Tooltip />
              <Legend />
              {employees.map((emp, index) => (
                <Line 
                  key={emp.id}
                  type="monotone"
                  dataKey={emp.name}
                  stroke={COLORS[index % COLORS.length]}
                  activeDot={{ r: 8 }}
                />
              ))}
            </LineChart>
          </ResponsiveContainer>
        </motion.div>
      </section>

      {/* Employee Table */}
      <section className="employee-table-section">
        <h2>Employee Performance Data</h2>
        
        <div className="table-container">
          <div className="table-header">
            <div className="header-cell">Employee</div>
            <div className="header-cell">Department</div>
            <div className="header-cell">Joining Date</div>
            <div className="header-cell">Attendance %</div>
            <div className="header-cell">Performance</div>
          </div>

          <div className="table-body">
            <AnimatePresence>
              {filteredEmployees.length > 0 ? (
                filteredEmployees.map(employee => (
                  <motion.div
                    key={employee.id}
                    className="table-row"
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="table-cell">{employee.name}</div>
                    <div className="table-cell">{employee.department}</div>
                    <div className="table-cell">{employee.joiningDate}</div>
                    <div className="table-cell">
                      <div className="attendance-bar">
                        <div 
                          className="bar-fill"
                          style={{ width: `${employee.attendance}%` }}
                        ></div>
                        <span>{employee.attendance}%</span>
                      </div>
                    </div>
                    <div className="table-cell">
                      <div className="performance-score">
                        {Math.max(...employee.performance)}
                      </div>
                    </div>
                  </motion.div>
                ))
              ) : (
                <motion.div
                  className="no-results"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                >
                  No employees match your filters
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </section>
    </div>
  );
};

export default EmployeeReports;

// CSS Styles
const styles = `
.employee-reports {
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  max-width: 1200px;
  margin: 5% auto;
  padding: 20px;
  color: #333;
}

.reports-header {
  margin-bottom: 30px;
}

.reports-header h1 {
  display: flex;
  align-items: center;
  gap: 10px;
  color: #2c3e50;
  font-size: 2rem;
  margin-bottom: 10px;
}

.reports-header p {
  color: #7f8c8d;
  margin: 0;
}

/* KPI Cards */
.kpi-cards {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 20px;
  margin-bottom: 30px;
}

.kpi-card {
  background-color: white;
  border-radius: 10px;
  padding: 20px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);
  display: flex;
  align-items: center;
  gap: 15px;
}

.kpi-icon {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background-color: #f8f9fa;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.2rem;
  color: #3498db;
}

.kpi-content h3 {
  margin: 0 0 5px 0;
  font-size: 1rem;
  color: #6c757d;
  font-weight: 500;
}

.kpi-content p {
  margin: 0;
  font-size: 1.5rem;
  font-weight: 600;
  color: #2c3e50;
}

/* Filters */
.filters-section {
  background-color: white;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);
  margin-bottom: 30px;
}

.search-filter {
  position: relative;
  margin-bottom: 20px;
}

.search-icon {
  position: absolute;
  left: 15px;
  top: 50%;
  transform: translateY(-50%);
  color: #7f8c8d;
}

.search-filter input {
  width: 100%;
  padding: 12px 20px 12px 45px;
  border: 1px solid #ddd;
  border-radius: 30px;
  font-size: 1rem;
  transition: all 0.3s;
}

.search-filter input:focus {
  outline: none;
  border-color: #3498db;
  box-shadow: 0 0 0 3px rgba(52, 152, 219, 0.2);
}

.dropdown-filters {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
}

.filter-group {
  flex: 1;
  min-width: 200px;
}

.filter-group label {
  display: block;
  margin-bottom: 8px;
  font-weight: 500;
  display: flex;
  align-items: center;
  gap: 8px;
}

.filter-group select, 
.filter-group input[type="range"] {
  width: 100%;
}

.filter-group select {
  padding: 10px 15px;
  border: 1px solid #ddd;
  border-radius: 5px;
  font-size: 1rem;
}

.filter-group input[type="range"] {
  -webkit-appearance: none;
  height: 8px;
  background: #ddd;
  border-radius: 5px;
  margin-right: 10px;
}

.filter-group input[type="range"]::-webkit-slider-thumb {
  -webkit-appearance: none;
  width: 20px;
  height: 20px;
  background: #3498db;
  border-radius: 50%;
  cursor: pointer;
}

.filter-group span {
  font-weight: 600;
  color: #2c3e50;
}

/* Charts */
.charts-section {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
  gap: 30px;
  margin-bottom: 40px;
}

.chart-container {
  background-color: white;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);
}

.chart-container h3 {
  margin-top: 0;
  margin-bottom: 20px;
  display: flex;
  align-items: center;
  gap: 10px;
  color: #2c3e50;
}

.chart-container.full-width {
  grid-column: 1 / -1;
}

/* Employee Table */
.employee-table-section {
  background-color: white;
  padding: 25px;
  border-radius: 10px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);
  margin-bottom: 30px;
}

.employee-table-section h2 {
  margin-top: 0;
  color: #2c3e50;
}

.table-container {
  border: 1px solid #eee;
  border-radius: 5px;
  overflow: hidden;
}

.table-header {
  display: grid;
  grid-template-columns: 2fr 1.5fr 1.5fr 1.5fr 1fr;
  background-color: #f8f9fa;
  font-weight: 500;
  border-bottom: 1px solid #eee;
}

.header-cell {
  padding: 15px;
  text-align: left;
}

.table-body {
  max-height: 500px;
  overflow-y: auto;
}

.table-row {
  display: grid;
  grid-template-columns: 2fr 1.5fr 1.5fr 1.5fr 1fr;
  border-bottom: 1px solid #eee;
  transition: all 0.3s;
}

.table-row:last-child {
  border-bottom: none;
}

.table-cell {
  padding: 15px;
  display: flex;
  align-items: center;
}

.attendance-bar {
  width: 100%;
  height: 25px;
  background-color: #f0f0f0;
  border-radius: 5px;
  position: relative;
  overflow: hidden;
}

.bar-fill {
  height: 100%;
  background-color: #4CAF50;
  transition: width 0.5s ease;
}

.attendance-bar span {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  font-size: 0.8rem;
  color: white;
  font-weight: 500;
}

.performance-score {
  background-color: #3498db;
  color: white;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 600;
  margin: 0 auto;
}

.no-results {
  padding: 30px;
  text-align: center;
  color: #7f8c8d;
  grid-column: 1 / -1;
}

/* Responsive Styles */
@media (max-width: 992px) {
  .charts-section {
    grid-template-columns: 1fr;
  }
    .employee-reports {
    margin: 5% auto;}
}

@media (max-width: 768px) {
  .table-header,
  .table-row {
    grid-template-columns: 2fr 1fr 1fr;
  }
    .employee-reports {
    margin: 15% auto;}

  .table-header .header-cell:nth-child(3),
  .table-row .table-cell:nth-child(3),
  .table-header .header-cell:nth-child(5),
  .table-row .table-cell:nth-child(5) {
    display: none;
  }

  .kpi-cards {
    grid-template-columns: 1fr 1fr;
  }
}

@media (max-width: 576px) {
  .kpi-cards {
    grid-template-columns: 1fr;
  }
.employee-reports {
    margin: 15% auto;
    }

  .table-header,
  .table-row {
    grid-template-columns: 2fr 1fr;
  }

  .table-header .header-cell:nth-child(2),
  .table-row .table-cell:nth-child(2) {
    display: none;
  }
}
`;

// Inject styles
document.head.insertAdjacentHTML('beforeend', `<style>${styles}</style>`);