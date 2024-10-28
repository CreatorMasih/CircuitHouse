
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Main from './components/Main'
import BookRoom  from "./components/BookRoom.js";
import Admin from "./components/Admin";
import Login from "./components/Login";

function App (){
  return (
    <Router>
      <Routes>

        <Route path="/" element={<Main/>} />
        <Route path="/bookroom" element={<BookRoom />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </Router>


    
  )
}


export default App

