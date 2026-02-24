import { useState } from "react";
import { useNavigate } from 'react-router-dom'
import styles from './SignUp.module.css'

function SignUp() {
    const [user, setUser] = useState({
        email: '',
        password: ''
    })

    const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (user.email.trim() === '' || user.password.trim() === '') {
        return alert('Please fill in all fields');
    }

    console.log('Registered User:', user);

    const userData = { email: user.email, password: user.password };
    localStorage.setItem('logged_in_user', JSON.stringify(userData))

    setUser({ email: '', password: '' });
    navigate('/toDo');
  };

  return (
    <div className={styles.SignUpPage}>
        <div className={styles.signupCard}>
        <h1>Sign Up</h1>
        <form className={styles.signupForm} onSubmit={handleSubmit}>
            <input 
                type='email' 
                placeholder='User Email' 
                className={styles.emailInput}
                value={user.email} 
                name={user.email}
                onChange={(e) => setUser({...user, email: e.target.value})}>
            </input>
            <input 
            type="password" 
            placeholder="Password" 
            className={styles.passwordInput}
            required
            value={user.password}
            onChange={(e) => setUser({...user, password: e.target.value})}
            />
            <button type="submit" className={styles.BtnSignUp}>Register</button>
        </form>

        <p>Already have an account? <a onClick={() => navigate('/login')}>Log In</a></p>
        </div>
    </div>
  );
}

export default SignUp;