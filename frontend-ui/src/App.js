import './App.css';
import { Route,Routes } from 'react-router-dom';
import Login from './components/login';
import {useState} from "react";
import SignUp from "./components/signup";
function App() {
  const [val,setVal]=useState(false);
  return (
    <div className="App">
     
     <Routes>
     <Route  path="/" element={<Login/>} />
     

      
         
     </Routes>
   
    </div>
  );
}

export default App;
