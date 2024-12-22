import React, {useState, useEffect, useContext } from "react";
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
import { UserContext } from "./UserContext";
import { useNavigate } from "react-router-dom";
import NotificationPage from "./components/NotificationPage";


// const API_URL="http://localhost:8000/api";
const API_URL= "https://ignatius5.pythonanywhere.com/api"
axios.defaults.baseURL = API_URL;
axios.defaults.withCredentials = true;

function App() {
  const [currentPage, setCurrentPage] = useState('home');

  const { ready, redirect } = useContext(UserContext);
  const navigate = useNavigate();

    useEffect(() => {
        if (redirect) {
            navigate(redirect);
        }
    }, [redirect, navigate]);

    if (!ready) return <div>Loading...</div>;

  return (
      <div className="flex flex-col min-h-screen dark-mode">
      <Header />
      <main className="flex-grow bg-gray-100">
      <Routes>
        <Route path="/" element={<HomePage setCurrentPage={setCurrentPage} />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/projects" element={<ProjectList />} />
        <Route path="/projects/view/:projectId" element={<ProjectView />} />
        <Route path="/projects/edit/:projectId" element={<EditProject />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/notifications" element={<NotificationPage />} />
        
        <Route path="/create-project" element={<ProjectForm />} />
      </Routes>
      </main>
      </div>
  );
}

export default App;
