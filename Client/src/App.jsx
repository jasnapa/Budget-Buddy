import { BrowserRouter, Route, Routes } from "react-router-dom";
import UserRouter from "./Routes/UserRouter"
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import axios from "axios";

function App() {
  axios.defaults.baseURL ="http://localhost:3000" ;
  axios.defaults.withCredentials = true;
  return (
    <BrowserRouter>
    <Routes>
    <Route path='/*' element={<UserRouter/>}/>
    
    </Routes>
    <ToastContainer /> 
    </BrowserRouter>
  )
}

export default App
