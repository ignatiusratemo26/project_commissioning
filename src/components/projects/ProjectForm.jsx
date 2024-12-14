import React, { useState } from "react";
import axios from "axios";

const ProjectForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    location: "",
    scope: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("/projects/", formData);
      alert("Project submitted successfully!");
    } catch (error) {
      alert("Error submitting project");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        name="name"
        placeholder="Project Name"
        value={formData.name}
        onChange={handleChange}
      />
      <input
        type="text"
        name="location"
        placeholder="Location"
        value={formData.location}
        onChange={handleChange}
      />
      <select name="scope" value={formData.scope} onChange={handleChange}>
        <option value="">Select Scope</option>
        <option value="Residential">Residential</option>
        <option value="Commercial">Commercial</option>
        <option value="Mixed-use">Mixed-use</option>
      </select>
      <button type="submit">Submit</button>
    </form>
  );
};

export default ProjectForm;
