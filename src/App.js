
import './App.css';
import Login from './Components/Login';
import { Routes, Route } from "react-router-dom"
import Home from './Components/Home';

function App() {
  return (
    <div >
      <Routes>
        <Route path='/' element={<Login/>}/>
        <Route path='/Home' element={<Home/>}/>
      </Routes>
    </div>
  );
}

export default App;
