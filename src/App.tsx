import { HashRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import './App.css'
import Login from './pages/Login/Login';
import ToDoPage from './pages/ToDoPage/ToDoPage';
import SignUp from './pages/SignUp/SignUp';

function App() {
  return (
    <>
      <Router>
        <Routes>
          
          {/* ------------------ Default Path ------------------ */}
          <Route path="/" element={<Navigate to="/login" replace />} />

          {/* ------------------ Paths ------------------ */}
          <Route path="/login" element={<Login />} />
          <Route path="/signUp" element={<SignUp />} />
          <Route path="/toDo" element={<ToDoPage />} />

          <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
      </Router>
    </>
  )
}

export default App
