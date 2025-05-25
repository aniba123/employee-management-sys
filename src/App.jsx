import { BrowserRouter as Router, Routes, Route, BrowserRouter } from 'react-router-dom';
import Navbar from './component/Shared/Navbar';
import Home from './component/Shared/Home';
import Dashboard from './component/Admin/Dashboard';
import Employees from './component/Admin/AddEmployee';
import Attendance from './component/Admin/AttendanceManagement';
import Reports from './component/Admin/Reports';
import Profile from './component/Admin/EmployeeProfile';
// import './styles/navbar.css';
import { EmployeeProvider } from './component/Admin/EmployeeContext';

// Dummy page components
// const Dashboard = () => <div className="page">Dashboard Page</div>;
// const Employees = () => <div className="page">Employees Page</div>;
// const Attendance = () => <div className="page">Attendance Page</div>;
// const Reports = () => <div className="page">Reports Page</div>;
// const Profile = () => <div className="page">Profile Page</div>;

function App() {
  return (
    // <Router>
    // <>
    // <BrowserRouter>
    <EmployeeProvider>
     <Navbar />
      <Routes>
         <Route path="/" element={<Home/>} />
          <Route path="/dashboard" element={<Dashboard/>} />
<Route path="/employees" element={<Employees />} />
<Route path="/attendance" element={<Attendance />} />
<Route path="/reports" element={<Reports />} />
<Route path="/profile" element={<Profile />} />
       
      </Routes>
      </EmployeeProvider>
      // </BrowserRouter>
      // </>
     
    // </Router>
  );
}

export default App;