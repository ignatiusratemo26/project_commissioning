import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./components/shared/Navbar";
import Login from "./components/auth/Login";
import Register from "./components/auth/Register";
import ProjectList from "./components/projects/ProjectList";
import ProjectForm from "./components/Projects/ProjectForm";
import axios from "axios";

const API_URL="http://localhost:8000/api";
axios.defaults.baseURL = API_URL;
axios.defaults.withCredentials = true;

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/projects" element={<ProjectList />} />
        <Route path="/create-project" element={<ProjectForm />} />
      </Routes>
    </Router>
  );
}

export default App;
