import { useState} from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useEmployees } from './EmployeeContext.jsx';

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { FaCalendarAlt, FaUser, FaCheck, FaTimes, FaChartBar, FaChartPie } from 'react-icons/fa';
import './AttendanceManagement.css';

const AttendanceManagement = () => {

  


  // Sample employee data
  const { employees } = useEmployees();


  // Sample initial attendance records
  const initialAttendance = [
    { id: 1, employeeId: 1, employeeName: 'Sarah Johnson', date: '2023-06-01', status: 'Present' },
    { id: 2, employeeId: 2, employeeName: 'Michael Chen', date: '2023-06-01', status: 'Absent' },
    { id: 3, employeeId: 3, employeeName: 'Lisa Rodriguez', date: '2023-06-01', status: 'Present' },
  ];

  // State
  // const [employees] = useState(initialEmployees);
  const [attendance, setAttendance] = useState(initialAttendance);
  const [formData, setFormData] = useState({
    employeeId: '',
    date: new Date().toISOString().split('T')[0],
    status: 'Present'
  });
  const [chartView, setChartView] = useState('bar');
  const [filterDate, setFilterDate] = useState('');

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.employeeId) return;

    const selectedEmployee = employees.find(emp => emp.id === parseInt(formData.employeeId));
    const newRecord = {
      id: attendance.length + 1,
      employeeId: parseInt(formData.employeeId),
      employeeName: selectedEmployee.name,
      date: formData.date,
      status: formData.status
    };

    setAttendance([newRecord, ...attendance]);
    setFormData({
      employeeId: '',
      date: new Date().toISOString().split('T')[0],
      status: 'Present'
    });
  };

  // Prepare data for charts
  const getStatusData = () => {
    const presentCount = attendance.filter(a => a.status === 'Present').length;
    const absentCount = attendance.filter(a => a.status === 'Absent').length;
    return [
      { name: 'Present', value: presentCount },
      { name: 'Absent', value: absentCount }
    ];
  };

  const getDailyData = () => {
    const dateMap = {};
    attendance.forEach(record => {
      if (!dateMap[record.date]) {
        dateMap[record.date] = { present: 0, absent: 0 };
      }
      if (record.status === 'Present') {
        dateMap[record.date].present++;
      } else {
        dateMap[record.date].absent++;
      }
    });

    return Object.keys(dateMap).map(date => ({
      date,
      present: dateMap[date].present,
      absent: dateMap[date].absent
    })).sort((a, b) => new Date(a.date) - new Date(b.date));
  };

  // Filter attendance records by date if filter is applied
  const filteredAttendance = filterDate 
    ? attendance.filter(record => record.date === filterDate)
    : attendance;

  // Chart colors
  const COLORS = ['#4CAF50', '#F44336'];

  return (
    <div className="attendance-management">
      <header className="attendance-header">
        <h1><FaCalendarAlt /> Employee Attendance</h1>
      </header>

      <div className="attendance-container">
        {/* Attendance Form */}
        <motion.section 
          className="attendance-form"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h2>Mark Attendance</h2>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="employeeId"><FaUser /> Employee</label>
              <select
                id="employeeId"
                name="employeeId"
                value={formData.employeeId}
                onChange={handleInputChange}
                required
              >
                <option value="">Select Employee</option>
                {employees.map(employee => (
                  <option key={employee.id} value={employee.id}>
                    {employee.name} ({employee.department})
                  </option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="date"><FaCalendarAlt /> Date</label>
              <input
                type="date"
                id="date"
                name="date"
                value={formData.date}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className="form-group status-group">
              <label>Status</label>
              <div className="status-options">
                <button
                  type="button"
                  className={`status-btn ${formData.status === 'Present' ? 'active' : ''}`}
                  onClick={() => setFormData({...formData, status: 'Present'})}
                >
                  <FaCheck /> Present
                </button>
                <button
                  type="button"
                  className={`status-btn ${formData.status === 'Absent' ? 'active' : ''}`}
                  onClick={() => setFormData({...formData, status: 'Absent'})}
                >
                  <FaTimes /> Absent
                </button>
              </div>
            </div>

            <button type="submit" className="submit-btn">
              Save Attendance
            </button>
          </form>
        </motion.section>

        {/* Charts Section */}
        <section className="charts-section">
          <div className="chart-header">
            <h2>Attendance Overview</h2>
            <div className="chart-toggle">
              <button
                className={`toggle-btn ${chartView === 'bar' ? 'active' : ''}`}
                onClick={() => setChartView('bar')}
              >
                <FaChartBar /> Bar
              </button>
              <button
                className={`toggle-btn ${chartView === 'pie' ? 'active' : ''}`}
                onClick={() => setChartView('pie')}
              >
                <FaChartPie /> Pie
              </button>
            </div>
          </div>

          <div className="chart-container">
            {chartView === 'bar' ? (
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={getDailyData()}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="present" fill="#4CAF50" name="Present" />
                  <Bar dataKey="absent" fill="#F44336" name="Absent" />
                </BarChart>
              </ResponsiveContainer>
            ) : (
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={getStatusData()}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                    label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                  >
                    {getStatusData().map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            )}
          </div>
        </section>
      </div>

      {/* Attendance Records */}
      <section className="attendance-records">
        <div className="records-header">
          <h2>Attendance Records</h2>
          <div className="date-filter">
            <label htmlFor="filterDate">Filter by Date:</label>
            <input
              type="date"
              id="filterDate"
              value={filterDate}
              onChange={(e) => setFilterDate(e.target.value)}
            />
            {filterDate && (
              <button className="clear-filter" onClick={() => setFilterDate('')}>
                Clear
              </button>
            )}
          </div>
        </div>

        <div className="records-table">
          <div className="table-header">
            <div className="header-cell">Employee</div>
            <div className="header-cell">Date</div>
            <div className="header-cell">Status</div>
          </div>

          <div className="table-body">
            <AnimatePresence>
              {filteredAttendance.length > 0 ? (
                filteredAttendance.map(record => (
                  <motion.div
                    key={record.id}
                    className="table-row"
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="table-cell">{record.employeeName}</div>
                    <div className="table-cell">{record.date}</div>
                    <div className="table-cell">
                      <span className={`status-badge ${record.status.toLowerCase()}`}>
                        {record.status}
                      </span>
                    </div>
                  </motion.div>
                ))
              ) : (
                <motion.div
                  className="no-records"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                >
                  No attendance records found
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AttendanceManagement;