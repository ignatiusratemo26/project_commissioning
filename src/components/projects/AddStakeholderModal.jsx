import React, { useState } from "react";
import {
  Modal,
  Box,
  Button,
  TextField,
  Typography,
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

const AddStakeholderModal = ({ open, onClose, projectId }) => {
  const [formData, setFormData] = useState({
    name: "",
    role: "",
    practicing_number: "",
    certificate: null,
  });

  // Handle text input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle file input change
  const handleFileChange = (e) => {
    setFormData({ ...formData, certificate: e.target.files[0] });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    const dataToSend = new FormData();
    Object.keys(formData).forEach((key) => {
      if (formData[key]) {
        dataToSend.append(key, formData[key]);
      }
    });

    // Append project ID explicitly
    dataToSend.append("project", projectId);

    try {
      await axios.post(`/stakeholders/`, dataToSend, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      onClose(); // Close modal after submitting
    } catch (error) {
      console.error("Error adding stakeholder:", error);
    }
  };

  return (
    <Modal open={open} onClose={onClose}>
      <Box sx={style}>
        <Typography variant="h6" gutterBottom>
          Add Stakeholder
        </Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            name="name"
            label="Name"
            fullWidth
            margin="normal"
            onChange={handleChange}
            required
          />
          <TextField
            name="role"
            label="Role"
            fullWidth
            margin="normal"
            onChange={handleChange}
            required
          />
          <TextField
            name="practicing_number"
            label="Practicing Number"
            fullWidth
            margin="normal"
            onChange={handleChange}
            required
          />
          <Typography variant="body1" gutterBottom>
            Certificate
          </Typography>
          <TextField
            name="certificate"
            type="file"
            fullWidth
            margin="normal"
            onChange={handleFileChange}
            inputProps={{ accept: ".pdf,.doc,.docx" }}
            required
          />
          <Box mt={2}>
            <Button type="submit" variant="contained" color="primary">
              Add Stakeholder
            </Button>
          </Box>
        </form>
      </Box>
    </Modal>
  );
};

export default AddStakeholderModal;
