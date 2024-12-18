import React, {useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes, useLocation } from "react-router-dom";
import Login from "./components/auth/Login";
import Register from "./components/auth/Register";
import ProjectList from "./components/projects/ProjectList";
import ProjectForm from "./components/Projects/ProjectForm";
import axios from "axios";
import HomePage from "./components/HomePage";
import Header from "./components/shared/Header";
import ProfilePage from "./components/ProfilePage";
import EditProject from "./components/projects/EditProject";
import ProjectView from "./components/projects/ProjectView";
import ContactPage from "./components/ContactPage";


const API_URL="http://localhost:8000/api";
axios.defaults.baseURL = API_URL;
axios.defaults.withCredentials = true;

function App() {
  const [currentPage, setCurrentPage] = useState('home');

  return (
    <Router>
      <div className="flex flex-col min-h-screen dark-mode">
      <Header />
      <main className="flex-grow bg-gray-200 px-4 py-4">
      <Routes>
        <Route path="/" element={<HomePage setCurrentPage={setCurrentPage} />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/projects" element={<ProjectList />} />
        <Route path="/projects/view/:projectId" element={<ProjectView />} />
        <Route path="/projects/edit/:projectId" element={<EditProject />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/contact" element={<ContactPage />} />
        
        <Route path="/create-project" element={<ProjectForm />} />
      </Routes>
      </main>
      </div>
    </Router>
  );
}

export default App;
