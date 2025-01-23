import Login from "./components/Login"

import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import AdminPanel from "./components/AdminPanel";
import SignUp from "./components/SignUp";

function App() {
  

  return (
    <>
      
      <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/admin" element={<AdminPanel />} />
        <Route path="/signup" element={<SignUp />} />
      </Routes>
    </Router>
    </>
  )
}

export default App
