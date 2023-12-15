
import './App.css'
import KanbanBoard from './components/KanbanBoard'
import { Routes, Route} from "react-router-dom"
import Login2 from './components/Login2';
import Singup from './components/Singup';
import Home from './components/Home';
import { Toaster } from "react-hot-toast";
import Register from './components/Register';

function App() {
  return (
    <>
      <Routes>
        <Route path="/login" element={ <Login2/>} />
        <Route path="/register" element={<Register />} />
        <Route path="/" element={<Home />} />
      </Routes>
      <Toaster />
    </>
  );
}

export default App
