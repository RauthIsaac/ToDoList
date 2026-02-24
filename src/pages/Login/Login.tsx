import { useState } from 'react'
import styles from './Login.module.css'
import '../../data/data.ts'
import { useNavigate } from 'react-router-dom'
import { initialUsersData } from '../../data/data.ts';


function isUserExist({ email, password }: { email: string; password: string }) {
  return initialUsersData.some(
    (user) => user.userEmail === email && user.password === password
  );
}  

function Login() {
  const [user, setUser] = useState({
    email: '',
    password: ''
  })
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    console.log('User:', user.email);
    console.log('Password:', user.password);

    if (!isUserExist(user)) {
      alert('Invalid email or password. Please try again.');
      setUser({ email: '', password: '' });
      return;
    }
    
    const userData = { email: user.email, password: user.password };
    localStorage.setItem('logged_in_user', JSON.stringify(userData))

    setUser({ email: '', password: '' });
    navigate('/toDo');
  };

  
  return (
    <div className={styles.loginPage}>
      <div className={styles.loginCard}>
        <h1>Log In</h1>
        <div>
          <form onSubmit={handleSubmit}>
            <input 
              type='email' 
              placeholder='User Email' 
              className={styles.emailInput}
              value={user.email} 
              name={user.email}
              onChange={(e) => setUser({...user, email: e.target.value})}>
            </input>

            <input 
              type='password' 
              placeholder='Password' 
              className={styles.passwordInput}
              value={user.password} 
              name={user.password}
              onChange={(e) => setUser({...user, password: e.target.value})}>
            </input>

            <button type='submit' className={styles.BtnLogin}>
                Login
            </button>

          </form>

          <p>Don't have an account? <a onClick={() => navigate('/signUp')}>Sign Up</a></p>
        </div>
      </div>
    </div>
    
  )     
}


export default Login;