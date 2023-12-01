import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Register from './components/login-signup/register';
import Login from './components/login-signup/login';
import Chat from './components/home/chat';
import SetAvatar from './components/avatar/setAvatar';
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/register" element={<Register />} />
        <Route path='/login' element={<Login />} />
        <Route exact path='/' element={<Chat />} />
        <Route path='/setAvatar' element={<SetAvatar />} />
      </Routes>
    </Router>
  );
}

export default App;
