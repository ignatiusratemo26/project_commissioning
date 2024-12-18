import React, { useState } from "react";
import {
  Modal,
  Box,
  Button,
  TextField,
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem,

} from "@mui/material";
import axios from "axios";

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  borderRadius: '8px',
  boxShadow: 24,
  p: 4,
};

const CreateProjectModal = ({ open, handleClose }) => {
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

  const handleChange = (e) => {
    const { name, value } = e.target;

    // Check if the field belongs to location
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Send structured data to backend
      await axios.post("/projects/", formData);
      handleClose(); // Close modal after submitting
      // Optionally refresh project list or show success message
    } catch (error) {
      console.error("Error creating project:", error);
    }
  };

  return (
    <Modal open={open} onClose={handleClose}>
      <Box sx={style}>
        <Typography variant="h6" gutterBottom>Create New Project</Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            name="name"
            label="Project Name"
            variant="outlined"
            fullWidth
            margin="normal"
            value={formData.name}
            onChange={handleChange}
            required
          />
          {/* <TextField
            name="scope"
            label="Scope"
            variant="outlined"
            fullWidth
            margin="normal"
            value={formData.scope}
            onChange={handleChange}
            required
          /> */}
          <FormControl fullWidth required>
            <InputLabel id="scope-label">Scope</InputLabel>
            <Select
              labelId="scope-label"
              name="scope"
              value={formData.scope}
              onChange={handleChange}
              label="Scope"
            >
              <MenuItem value="Residential">Residential</MenuItem>
              <MenuItem value="Commercial">Commercial</MenuItem>
              <MenuItem value="Mixed-use">Mixed-use</MenuItem>
            </Select>
          </FormControl>
          <TextField
            name="county"
            label="County"
            variant="outlined"
            fullWidth
            margin="normal"
            value={formData.location.county}
            onChange={handleChange}
            required
          />
          <TextField
            name="constituency"
            label="Constituency"
            variant="outlined"
            fullWidth
            margin="normal"
            value={formData.location.constituency}
            onChange={handleChange}
            required
          />
          <TextField
            name="plot_number"
            label="Plot Number"
            variant="outlined"
            fullWidth
            margin="normal"
            value={formData.plot_number}
            onChange={handleChange}
          />
          <Button type="submit" variant="contained" color="primary">
            Create Project
          </Button>
        </form>
      </Box>
    </Modal>
  );
};

export default CreateProjectModal;
