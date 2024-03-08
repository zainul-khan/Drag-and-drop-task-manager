import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Login from './pages/Login/Login';
import Task from './pages/Task/Task';


function App() {

  return (

      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/user-tasks" element={<Task />} />
        </Routes>
      </Router>

  );
}

export default App;
