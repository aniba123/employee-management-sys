import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaUserEdit, FaCalendarAlt, FaPhone, FaEnvelope, FaBuilding, FaChartLine, FaCheckCircle, FaTimesCircle, FaUpload, FaSun, FaMoon } from 'react-icons/fa';
import { FiClock, FiUser, FiAward, FiActivity } from 'react-icons/fi';
// import './EmployeeProfile.css';

const EmployeeProfile = () => {
  // Sample employee data
  const initialEmployee = {
    id: 1,
    name: 'Sarah Johnson',
    role: 'Senior Developer',
    department: 'Engineering',
    email: 'sarah.johnson@company.com',
    phone: '(555) 123-4567',
    joiningDate: '2022-01-15',
    profilePic: 'https://randomuser.me/api/portraits/women/44.jpg',
    stats: {
      totalDaysPresent: 215,
      averageAttendance: 95,
      performanceScore: 92
    },
    activities: [
      { id: 1, type: 'attendance', action: 'Checked in', time: 'Today, 9:05 AM', status: 'present' },
      { id: 2, type: 'report', action: 'Viewed monthly report', time: 'Yesterday, 3:30 PM' },
      { id: 3, type: 'attendance', action: 'Checked out', time: 'Yesterday, 6:15 PM', status: 'present' },
      { id: 4, type: 'leave', action: 'Leave request approved', time: '2 days ago' },
      { id: 5, type: 'achievement', action: 'Employee of the month', time: '1 week ago' }
    ]
  };

  // State
  const [employee, setEmployee] = useState(initialEmployee);
  const [isEditing, setIsEditing] = useState(false);
  const [editForm, setEditForm] = useState(initialEmployee);
  const [profilePic, setProfilePic] = useState(initialEmployee.profilePic);
  const [darkMode, setDarkMode] = useState(false);
  const [counters, setCounters] = useState({
    daysPresent: 0,
    attendance: 0,
    performance: 0
  });

  // Animate counters
  useEffect(() => {
    const duration = 2000; // 2 seconds
    const increment = employee.stats.totalDaysPresent / (duration / 16); // 60fps

    const animate = () => {
      setCounters(prev => ({
        daysPresent: Math.min(prev.daysPresent + increment, employee.stats.totalDaysPresent),
        attendance: Math.min(prev.attendance + increment, employee.stats.averageAttendance),
        performance: Math.min(prev.performance + increment, employee.stats.performanceScore)
      }));

      if (counters.daysPresent < employee.stats.totalDaysPresent) {
        requestAnimationFrame(animate);
      }
    };

    animate();
  }, [employee]);

  // Handle edit form changes
  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditForm(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Handle profile picture upload
  const handlePicUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfilePic(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    setEmployee({
      ...employee,
      ...editForm,
      profilePic: profilePic
    });
    setIsEditing(false);
  };

  // Toggle dark mode
  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  return (
    <div className={`employee-profile ${darkMode ? 'dark-mode' : ''}`}>
      {/* Dark Mode Toggle */}
      <button className="dark-mode-toggle" onClick={toggleDarkMode}>
        {darkMode ? <FaSun /> : <FaMoon />}
      </button>

      {/* Header */}
      <header className="profile-header">
        <h1><FiUser /> Employee Profile</h1>
      </header>

      <div className="profile-container">
        {/* Profile Card */}
        <motion.section 
          className="profile-card"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="profile-pic-section">
            <div className="pic-container">
              <img src={profilePic} alt={employee.name} />
              <label className="upload-btn">
                <FaUpload /> Change Photo
                <input 
                  type="file" 
                  accept="image/*" 
                  onChange={handlePicUpload}
                  style={{ display: 'none' }}
                />
              </label>
            </div>
            <button 
              className="edit-btn"
              onClick={() => {
                setIsEditing(true);
                setEditForm(employee);
              }}
            >
              <FaUserEdit /> Edit Profile
            </button>
          </div>

          <div className="profile-info">
            <h2>{employee.name}</h2>
            <p className="role">{employee.role}</p>
            
            <div className="info-grid">
              <div className="info-item">
                <FaBuilding className="icon" />
                <div>
                  <p className="label">Department</p>
                  <p className="value">{employee.department}</p>
                </div>
              </div>
              <div className="info-item">
                <FaEnvelope className="icon" />
                <div>
                  <p className="label">Email</p>
                  <p className="value">{employee.email}</p>
                </div>
              </div>
              <div className="info-item">
                <FaPhone className="icon" />
                <div>
                  <p className="label">Phone</p>
                  <p className="value">{employee.phone}</p>
                </div>
              </div>
              <div className="info-item">
                <FaCalendarAlt className="icon" />
                <div>
                  <p className="label">Joining Date</p>
                  <p className="value">{employee.joiningDate}</p>
                </div>
              </div>
            </div>
          </div>
        </motion.section>

        {/* Stats Cards */}
        <section className="stats-section">
          <motion.div 
            className="stat-card"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <div className="stat-icon">
              <FiClock />
            </div>
            <div className="stat-content">
              <h3>Days Present</h3>
              <p>{Math.floor(counters.daysPresent)}</p>
            </div>
          </motion.div>

          <motion.div 
            className="stat-card"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div className="stat-icon">
              <FaChartLine />
            </div>
            <div className="stat-content">
              <h3>Attendance</h3>
              <p>{Math.floor(counters.attendance)}%</p>
            </div>
          </motion.div>

          <motion.div 
            className="stat-card"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <div className="stat-icon">
              <FiAward />
            </div>
            <div className="stat-content">
              <h3>Performance</h3>
              <p>{Math.floor(counters.performance)}</p>
            </div>
          </motion.div>
        </section>

        {/* Activity Timeline */}
        <section className="activity-section">
          <h2><FiActivity /> Recent Activity</h2>
          <div className="timeline">
            {employee.activities.map(activity => (
              <motion.div 
                key={activity.id}
                className="timeline-item"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3 }}
              >
                <div className="timeline-icon">
                  {activity.type === 'attendance' && (
                    activity.status === 'present' ? <FaCheckCircle className="present" /> : <FaTimesCircle className="absent" />
                  )}
                  {activity.type === 'report' && <FaChartLine />}
                  {activity.type === 'leave' && <FaCalendarAlt />}
                  {activity.type === 'achievement' && <FiAward />}
                </div>
                <div className="timeline-content">
                  <p className="activity-action">{activity.action}</p>
                  <p className="activity-time">{activity.time}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </section>
      </div>

      {/* Edit Profile Modal */}
      <AnimatePresence>
        {isEditing && (
          <motion.div 
            className="modal-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsEditing(false)}
          >
            <motion.div 
              className="edit-modal"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
            >
              <h2>Edit Profile</h2>
              <form onSubmit={handleSubmit}>
                <div className="form-group">
                  <label>Full Name</label>
                  <input
                    type="text"
                    name="name"
                    value={editForm.name}
                    onChange={handleEditChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Role</label>
                  <input
                    type="text"
                    name="role"
                    value={editForm.role}
                    onChange={handleEditChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Department</label>
                  <input
                    type="text"
                    name="department"
                    value={editForm.department}
                    onChange={handleEditChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Email</label>
                  <input
                    type="email"
                    name="email"
                    value={editForm.email}
                    onChange={handleEditChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Phone</label>
                  <input
                    type="tel"
                    name="phone"
                    value={editForm.phone}
                    onChange={handleEditChange}
                    required
                  />
                </div>
                <div className="form-actions">
                  <button type="submit" className="save-btn">Save Changes</button>
                  <button 
                    type="button" 
                    className="cancel-btn"
                    onClick={() => setIsEditing(false)}
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default EmployeeProfile;

// CSS Styles
const styles = `
.employee-profile {
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
  color: #333;
  background-color: #f8f9fa;
  min-height: 100vh;
  transition: all 0.3s ease;
}

.employee-profile.dark-mode {
  background-color: #1a1a1a;
  color: #f0f0f0;
}

.dark-mode-toggle {
  position: fixed;
  top: 20px;
  right: 20px;
  background: #3498db;
  color: white;
  border: none;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  z-index: 100;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
}

.profile-header {
  text-align: center;
  margin-bottom: 30px;
  margin-top: 7%;
}

.profile-header h1 {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  color: #2c3e50;
  font-size: 2rem;
}

.dark-mode .profile-header h1 {
  color: #f0f0f0;
}

.profile-container {
  display: flex;
  flex-direction: column;
  gap: 30px;
}

/* Profile Card */
.profile-card {
  background-color: white;
  border-radius: 15px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);
  overflow: hidden;
  display: flex;
  flex-direction: column;
}

.dark-mode .profile-card {
  background-color: #2d2d2d;
}

.profile-pic-section {
  padding: 30px;
  display: flex;
  flex-direction: column;
  align-items: center;
  background: linear-gradient(135deg, #3498db 0%, #2c3e50 100%);
}

.pic-container {
  position: relative;
  margin-bottom: 20px;
}

.pic-container img {
  width: 150px;
  height: 150px;
  border-radius: 50%;
  object-fit: cover;
  border: 5px solid white;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
}

.upload-btn {
  position: absolute;
  bottom: 10px;
  right: -10px;
  background: white;
  color: #3498db;
  border: none;
  padding: 5px 10px;
  border-radius: 20px;
  font-size: 0.8rem;
  display: flex;
  align-items: center;
  gap: 5px;
  cursor: pointer;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
}

.edit-btn {
  background: white;
  color: #3498db;
  border: none;
  padding: 10px 20px;
  border-radius: 30px;
  font-weight: 500;
  display: flex;
  align-items: center;
  gap: 8px;
  cursor: pointer;
  transition: all 0.3s;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

.edit-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.15);
}

.profile-info {
  padding: 30px;
}

.profile-info h2 {
  margin: 0 0 5px 0;
  color: #2c3e50;
  font-size: 1.8rem;
}

.dark-mode .profile-info h2 {
  color: #f0f0f0;
}

.profile-info .role {
  color: #7f8c8d;
  margin: 0 0 20px 0;
  font-size: 1.1rem;
}

.info-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 20px;
}

.info-item {
  display: flex;
  gap: 15px;
  align-items: center;
}

.info-item .icon {
  font-size: 1.2rem;
  color: #3498db;
  min-width: 30px;
}

.info-item .label {
  margin: 0;
  font-size: 0.9rem;
  color: #7f8c8d;
}

.info-item .value {
  margin: 5px 0 0 0;
  font-weight: 500;
  color: #2c3e50;
}

.dark-mode .info-item .value {
  color: #f0f0f0;
}

/* Stats Section */
.stats-section {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 20px;
}

.stat-card {
  background-color: white;
  border-radius: 10px;
  padding: 20px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);
  display: flex;
  gap: 15px;
  align-items: center;
  transition: all 0.3s;
}

.dark-mode .stat-card {
  background-color: #2d2d2d;
}

.stat-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
}

.stat-icon {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background-color: #f0f8ff;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.2rem;
  color: #3498db;
}

.stat-content h3 {
  margin: 0 0 5px 0;
  font-size: 1rem;
  color: #7f8c8d;
}

.stat-content p {
  margin: 0;
  font-size: 1.5rem;
  font-weight: 600;
  color: #2c3e50;
}

.dark-mode .stat-content p {
  color: #f0f0f0;
}

/* Activity Timeline */
.activity-section {
  background-color: white;
  border-radius: 15px;
  padding: 30px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);
}

.dark-mode .activity-section {
  background-color: #2d2d2d;
}

.activity-section h2 {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-top: 0;
  margin-bottom: 20px;
  color: #2c3e50;
}

.dark-mode .activity-section h2 {
  color: #f0f0f0;
}

.timeline {
  position: relative;
  padding-left: 30px;
}

.timeline::before {
  content: '';
  position: absolute;
  left: 10px;
  top: 0;
  bottom: 0;
  width: 2px;
  background-color: #eee;
}

.dark-mode .timeline::before {
  background-color: #444;
}

.timeline-item {
  position: relative;
  padding-bottom: 20px;
  display: flex;
  gap: 15px;
}

.timeline-item:last-child {
  padding-bottom: 0;
}

.timeline-icon {
  width: 30px;
  height: 30px;
  border-radius: 50%;
  background-color: #f0f8ff;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #3498db;
  flex-shrink: 0;
  z-index: 1;
}

.timeline-icon .present {
  color: #4CAF50;
}

.timeline-icon .absent {
  color: #F44336;
}

.timeline-content {
  flex: 1;
}

.activity-action {
  margin: 0 0 5px 0;
  font-weight: 500;
  color: #2c3e50;
}

.dark-mode .activity-action {
  color: #f0f0f0;
}

.activity-time {
  margin: 0;
  font-size: 0.9rem;
  color: #7f8c8d;
}

/* Edit Modal */
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
}

.edit-modal {
  background-color: white;
  border-radius: 10px;
  padding: 30px;
  width: 100%;
  max-width: 500px;
  box-shadow: 0 5px 30px rgba(0, 0, 0, 0.2);
}

.dark-mode .edit-modal {
  background-color: #2d2d2d;
}

.edit-modal h2 {
  margin-top: 0;
  margin-bottom: 20px;
  color: #2c3e50;
}

.dark-mode .edit-modal h2 {
  color: #f0f0f0;
}

.form-group {
  margin-bottom: 15px;
}

.form-group label {
  display: block;
  margin-bottom: 5px;
  font-weight: 500;
  color: #2c3e50;
}

.dark-mode .form-group label {
  color: #f0f0f0;
}

.form-group input {
  width: 100%;
  padding: 10px 15px;
  border: 1px solid #ddd;
  border-radius: 5px;
  font-size: 1rem;
}

.dark-mode .form-group input {
  background-color: #3d3d3d;
  border-color: #444;
  color: #f0f0f0;
}

.form-actions {
  display: flex;
  gap: 10px;
  margin-top: 20px;
}

.save-btn, .cancel-btn {
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  font-size: 1rem;
  cursor: pointer;
  transition: all 0.3s;
}

.save-btn {
  background-color: #3498db;
  color: white;
}

.save-btn:hover {
  background-color: #2980b9;
}

.cancel-btn {
  background-color: #e74c3c;
  color: white;
}

.cancel-btn:hover {
  background-color: #c0392b;
}

/* Responsive Styles */
@media (max-width: 768px) {
  .profile-card {
    flex-direction: column;
  }

  .profile-pic-section {
    padding: 20px;
  }

  .profile-info {
    padding: 20px;
  }

  .stats-section {
    grid-template-columns: 1fr;
  }
    .profile-header {
    margin-top: 13%;
    }

  .activity-section {
    padding: 20px;
  }
}

@media (max-width: 480px) {
  .info-grid {
    grid-template-columns: 1fr;
  }

  .edit-modal {
    padding: 20px;
    margin: 0 15px;
  }
      .profile-header {
    margin-top: 20%;
    }
}
`;

// Inject styles
document.head.insertAdjacentHTML('beforeend', `<style>${styles}</style>`);