import styles from './ToDoPage.module.css';
import '../../data/data';
import { initialUsersData } from '../../data/data';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

function ToDoPage() { 
  const loggedInUser = JSON.parse(localStorage.getItem('logged_in_user') || '{}');
  const userEmail = loggedInUser.email || '';
  const userPass = loggedInUser.password || '';

  const currentUser = initialUsersData.find(u => u.userEmail == userEmail && u.password == userPass);

  const [todos, setToDos] = useState<string[]>(() => {
    const saved = localStorage.getItem(`user_todos_${userEmail}`);
    return saved ? JSON.parse(saved) : (currentUser?.todos || []);
  });

  const [newToDo, setNewToDo] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    if (userEmail) {
      localStorage.setItem(`user_todos_${userEmail}`, JSON.stringify(todos));
    }
  }, [todos, userEmail]);
  
  useEffect(() => {
    if (!currentUser) {
      navigate('/login');
    }
  }, [currentUser, navigate]);

  const handleAddClick = () => {

    if (newToDo.trim() === "") return;

    console.log(newToDo);
    
    const newTask = newToDo.trim();

    setToDos([...todos, newTask]);

    setNewToDo('');
  }

  const handleLogOut = () => {
    localStorage.removeItem('logged_in_user');
    navigate('/login');
  }

  return (

    <div className={styles.ToDoPage}>
      
      <button className={styles.BtnLogout} onClick={handleLogOut}>
        Logout
      </button>

      <div className={styles.toDo}> 
        <h1>My To Do List</h1>
        <ul>
          {todos.map( (todo: string, index: number) => (
            <li  key={index} className={todo.includes('completed') ? styles.completed : ''}>
              <span>{todo}</span>

               <button className={styles.BtnComplete} onClick={() => {
                  const updatedToDos = [...todos];
                  updatedToDos[index] = todo.includes('completed') ? todo.replace(' (completed)', '') : `${todo} (completed)`;
                  setToDos(updatedToDos);
                }}>
                </button>
                <button className={styles.BtnDelete} onClick={() => {
                  const updatedToDos = todos.filter((_, i) => i !== index);
                  setToDos(updatedToDos);
                }}>
                </button>
            </li>
          ))}
        </ul>
      </div>

      <div className={styles.addTodo}>
        <h2>Add New To Do</h2>
        <input 
          type='text' 
          placeholder='Enter new to do'
          value = {newToDo}
          onChange={(v) => setNewToDo(v.target.value)}>
        </input>
        <button className={styles.BtnAdd} onClick={handleAddClick}>Add</button>
      </div>
      
    </div>
  )
}

export default ToDoPage;