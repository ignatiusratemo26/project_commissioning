import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { Paper, Typography, Button, TextField, Box } from "@mui/material";

const EditProject = () => {
  const { projectId } = useParams();
  const [formData, setFormData] = useState({
    name: "",
    scope: "",
    location: {
      county: "",
      constituency: "",
      plot_number: "",
    },
    approved_docs: {},
  });
  const [loading, setLoading] = useState(true); // Loading state
  const navigate = useNavigate();

  // Fetch project details and set default form values
  useEffect(() => {
    const fetchProjectDetails = async () => {
      try {
        const response = await axios.get(`/projects/${projectId}/`);
        setFormData(response.data); // Populate form with fetched data
      } catch (error) {
        console.error("Error fetching project details:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProjectDetails();
  }, [projectId]);

  // Handle form field changes
  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "county" || name === "constituency" || name === "plot_number") {
      setFormData((prevFormData) => ({
        ...prevFormData,
        location: { ...prevFormData.location, [name]: value },
      }));
    } else {
      setFormData((prevFormData) => ({
        ...prevFormData,
        [name]: value,
      }));
    }
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`/projects/${projectId}/`, formData);
      navigate("/projects"); // Redirect to projects list
    } catch (error) {
      console.error("Error updating project:", error);
    }
  };

  if (loading) return <Typography>Loading...</Typography>; // Show a loader until data is fetched

  return (
    <Paper sx={{ padding: 4 }}>
      <Typography variant="h4" gutterBottom>
        Edit Project
      </Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          name="name"
          label="Project Name"
          variant="outlined"
          fullWidth
          margin="normal"
          value={formData.name || ""}
          onChange={handleChange}
          required
        />
        <TextField
          name="scope"
          label="Scope"
          variant="outlined"
          fullWidth
          margin="normal"
          value={formData.scope || ""}
          onChange={handleChange}
          required
        />
        <TextField
          name="county"
          label="County"
          variant="outlined"
          fullWidth
          margin="normal"
          value={formData.location.county || ""}
          onChange={handleChange}
          required
        />
        <TextField
          name="constituency"
          label="Constituency"
          variant="outlined"
          fullWidth
          margin="normal"
          value={formData.location.constituency || ""}
          onChange={handleChange}
          required
        />
        <TextField
          name="plot_number"
          label="Plot Number"
          variant="outlined"
          fullWidth
          margin="normal"
          value={formData.location.plot_number || ""}
          onChange={handleChange}
        />
        <Box mt={2}>
          <Button type="submit" variant="contained" color="primary">
            Update Project
          </Button>
        </Box>
      </form>
    </Paper>
  );
};

export default EditProject;
