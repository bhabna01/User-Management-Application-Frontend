import Login from "./components/Login"

import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import AdminPanel from "./components/AdminPanel";
import SignUp from "./components/SignUp";
// import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Toaster } from "react-hot-toast";
function App() {
  

  return (
    <>
      
      <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/admin" element={<AdminPanel />} />
        <Route path="/signup" element={<SignUp />} />
      
      </Routes>
    </Router>
    <Toaster />
    </>
  )
}

export default App
