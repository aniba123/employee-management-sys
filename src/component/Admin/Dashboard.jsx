import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaUsers, FaCalendarAlt, FaFileAlt, FaMoneyBillWave, FaStar, FaPlus } from 'react-icons/fa';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from 'recharts';
import { Player } from '@lottiefiles/react-lottie-player';
import { motion } from 'framer-motion';
import './Dashboard.css';

// Sample data
const attendanceData = [
  { day: 'Mon', present: 85, absent: 15 },
  { day: 'Tue', present: 78, absent: 22 },
  { day: 'Wed', present: 92, absent: 8 },
  { day: 'Thu', present: 88, absent: 12 },
  { day: 'Fri', present: 95, absent: 5 },
  { day: 'Sat', present: 65, absent: 35 },
  { day: 'Sun', present: 30, absent: 70 },
];

const payrollData = [
  { month: 'Jan', amount: 125000 },
  { month: 'Feb', amount: 135000 },
  { month: 'Mar', amount: 142000 },
  { month: 'Apr', amount: 148000 },
  { month: 'May', amount: 155000 },
  { month: 'Jun', amount: 162000 },
];

const activities = [
  { id: 1, type: 'clock-in', text: 'Sarah clocked in at 9:01 AM', time: '10 min ago' },
  { id: 2, type: 'new-employee', text: 'New employee John added to Sales department', time: '1 hour ago' },
  { id: 3, type: 'leave', text: 'Michael applied for 2 days leave', time: '3 hours ago' },
  { id: 4, type: 'promotion', text: 'Lisa promoted to Senior Developer', time: '1 day ago' },
  { id: 5, type: 'award', text: 'David received Employee of the Month', time: '2 days ago' },
];

const Dashboard = () => {
  const [counts, setCounts] = useState({
    employees: 0,
    attendance: 0,
    leaves: 0,
    payroll: 0
  });

  // Count-up animation effect
  useEffect(() => {
    const targetCounts = { employees: 210, attendance: 185, leaves: 8, payroll: 162000 };
    const duration = 2000; // 2 seconds
    const increment = targetCounts.employees / (duration / 16); // 60fps
    let animationFrame;
    let currentCounts = { ...counts };

    const animate = () => {
      currentCounts = {
        employees: Math.min(currentCounts.employees + increment, targetCounts.employees),
        attendance: Math.min(currentCounts.attendance + increment, targetCounts.attendance),
        leaves: Math.min(currentCounts.leaves + increment, targetCounts.leaves),
        payroll: Math.min(currentCounts.payroll + increment * 1000, targetCounts.payroll)
      };
      setCounts({ ...currentCounts });

      if (currentCounts.employees < targetCounts.employees) {
        animationFrame = requestAnimationFrame(animate);
      }
    };

    animate();

    return () => {
      if (animationFrame) {
        cancelAnimationFrame(animationFrame);
      }
    };
  }, );

  // Format number with commas
  const formatNumber = (num) => {
    return Math.floor(num).toLocaleString();
  };

  // Format currency
  const formatCurrency = (num) => {
    return '$' + formatNumber(num);
  };

  return (
    <div className="dashboard">
      {/* Welcome Header */}
      <motion.header 
        className="dashboard-header"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="header-content">
          <h1>Welcome back, Admin 👋</h1>
          <p>{new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</p>
          <Link to="/employees" className="add-employee-btn">
            <FaPlus /> Add New Employee
          </Link>
        </div>
        <div className="header-animation">
          <Player
            autoplay
            loop
            src="https://assets5.lottiefiles.com/packages/lf20_vybwn7df.json"
            style={{ height: '200px', width: '200px' }}
          />
        </div>
      </motion.header>

      {/* Summary Cards */}
      <section className="summary-cards">
        <motion.div 
          className="summary-card"
          whileHover={{ y: -5, boxShadow: '0 10px 20px rgba(0,0,0,0.1)' }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <div className="card-icon">
            <FaUsers />
          </div>
          <h3>Total Employees</h3>
          <p className="card-value">{formatNumber(counts.employees)}</p>
        </motion.div>

        <motion.div 
          className="summary-card"
          whileHover={{ y: -5, boxShadow: '0 10px 20px rgba(0,0,0,0.1)' }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <div className="card-icon">
            <FaCalendarAlt />
          </div>
          <h3>Today's Attendance</h3>
          <p className="card-value">{formatNumber(counts.attendance)}</p>
        </motion.div>

        <motion.div 
          className="summary-card"
          whileHover={{ y: -5, boxShadow: '0 10px 20px rgba(0,0,0,0.1)' }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <div className="card-icon">
            <FaFileAlt />
          </div>
          <h3>Pending Leaves</h3>
          <p className="card-value">{formatNumber(counts.leaves)}</p>
        </motion.div>

        <motion.div 
          className="summary-card"
          whileHover={{ y: -5, boxShadow: '0 10px 20px rgba(0,0,0,0.1)' }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <div className="card-icon">
            <FaMoneyBillWave />
          </div>
          <h3>Monthly Payroll</h3>
          <p className="card-value">{formatCurrency(counts.payroll)}</p>
        </motion.div>
      </section>

      {/* Charts Section */}
      <section className="charts-section">
        <motion.div 
          className="chart-container"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.5 }}
        >
          <h3>Weekly Attendance</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={attendanceData}>
              <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
              <XAxis dataKey="day" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="present" fill="#4e73df" name="Present" />
              <Bar dataKey="absent" fill="#e74a3b" name="Absent" />
            </BarChart>
          </ResponsiveContainer>
        </motion.div>

        <motion.div 
          className="chart-container"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.7 }}
        >
          <h3>Payroll Growth</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={payrollData}>
              <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip formatter={(value) => ['$' + value.toLocaleString()]} />
              <Line type="monotone" dataKey="amount" stroke="#36b9cc" strokeWidth={2} dot={{ r: 4 }} />
            </LineChart>
          </ResponsiveContainer>
        </motion.div>
      </section>

      {/* Activity and Employee of the Month */}
      <section className="bottom-section">
        <motion.div 
          className="activity-feed"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.9 }}
        >
          <h3>Recent Activity</h3>
          <ul className="activity-list">
            {activities.map(activity => (
              <li key={activity.id} className="activity-item">
                <div className="activity-icon">
                  {activity.type === 'clock-in' && <FaCalendarAlt />}
                  {activity.type === 'new-employee' && <FaUsers />}
                  {activity.type === 'leave' && <FaFileAlt />}
                  {activity.type === 'promotion' && <FaStar />}
                  {activity.type === 'award' && <FaStar />}
                </div>
                <div className="activity-content">
                  <p>{activity.text}</p>
                  <span className="activity-time">{activity.time}</span>
                </div>
              </li>
            ))}
          </ul>
        </motion.div>

        <motion.div 
          className="employee-month"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.9 }}
        >
          <h3>Employee of the Month</h3>
          <div className="employee-card">
            <div className="employee-photo">
              <img src="https://randomuser.me/api/portraits/women/44.jpg" alt="Employee of the Month" />
              <div className="confetti-animation">
                <Player
                  autoplay
                  loop
                  src="https://assets1.lottiefiles.com/packages/lf20_obhph3sh.json"
                  style={{ height: '150px', width: '150px', position: 'absolute', top: '-50px', left: '-50px' }}
                />
              </div>
            </div>
            <div className="employee-details">
              <h4>Sarah Johnson</h4>
              <p>Senior Developer</p>
              <div className="stars">
                <FaStar />
                <FaStar />
                <FaStar />
                <FaStar />
                <FaStar />
              </div>
              <p className="achievement">Exceeded all KPIs this month with 120% productivity</p>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Quick Links */}
      <motion.footer 
        className="quick-links"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 1.1 }}
      >
        <h3>Quick Links</h3>
        <div className="links-grid">
          <Link to="/employees" className="quick-link">
            <FaUsers className="link-icon" />
            <span>Employees</span>
          </Link>
          <Link to="/attendance" className="quick-link">
            <FaCalendarAlt className="link-icon" />
            <span>Attendance</span>
          </Link>
          <Link to="/payroll" className="quick-link">
            <FaMoneyBillWave className="link-icon" />
            <span>Payroll</span>
          </Link>
          <Link to="/reports" className="quick-link">
            <FaFileAlt className="link-icon" />
            <span>Reports</span>
          </Link>
        </div>
      </motion.footer>
    </div>
  );
};

export default Dashboard;