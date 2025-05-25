import { FaUser, FaLock } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import styles from './Login.module.css';

function Login() {
  return (
    <div className={styles.loginContainer}>
      <div className={styles.loginCard}>
        <h1>Employee Management System</h1>
        <p>Sign in to access your account</p>
        
        <form className={styles.loginForm}>
          <div className={styles.inputGroup}>
            <label htmlFor="username">
              <FaUser className={styles.inputIcon} />
            </label>
            <input 
              type="text" 
              id="username" 
              placeholder="Username or Email" 
              className={styles.inputField}
            />
          </div>
          
          <div className={styles.inputGroup}>
            <label htmlFor="password">
              <FaLock className={styles.inputIcon} />
            </label>
            <input 
              type="password" 
              id="password" 
              placeholder="Password" 
              className={styles.inputField}
            />
          </div>
          
          <div className={styles.rememberForgot}>
            <label className={styles.rememberMe}>
              <input type="checkbox" />
              Remember me
            </label>
            <Link to="/forgot-password" className={styles.forgotPassword}>
              Forgot password?
            </Link>
          </div>
          
          <button type="submit" className={styles.loginButton}>
            Sign In
          </button>
        </form>
        
        <div className={styles.loginFooter}>
          <p>Don't have an account? <Link to="/register" className={styles.registerLink}>Contact HR</Link></p>
        </div>
      </div>
    </div>
  );
}

export default Login;