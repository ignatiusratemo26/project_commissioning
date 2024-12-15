import React, { useState } from "react";
import {
  Modal,
  Box,
  Button,
  TextField,
  Typography,
  InputLabel,
  CircularProgress,
  Snackbar,
} from "@mui/material";
import axios from "axios";
import MuiAlert from '@mui/material/Alert';

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

const AddApprovedDocumentModal = ({ open, onClose, projectId }) => {
  const [formData, setFormData] = useState({
    architectural: null,
    structural: null,
    proposed_sewer: null,
    proposed_water: null,
    proposed_electricity: null,
  });
  
  const [loading, setLoading] = useState(false);
  const [successOpen, setSuccessOpen] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.files[0] });
  };

  const validateFiles = () => { const validFormats = [ 
    'application/pdf', 
    'image/png', 
    'image/jpeg', 
    'application/msword', 
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document' ]; 
    return Object.values(formData).every(file => file ? validFormats.includes(file.type) : true ); 
    }; 
    const handleSubmit = async (e) => { 
        e.preventDefault(); 
        if (!validateFiles()) 
            { alert("Please upload files in PDF, PNG, JPEG, DOC, or DOCX format.");
                return;
            }

    const formDataToSend = new FormData();
    Object.keys(formData).forEach((key) => {
      if (formData[key]) {
        formDataToSend.append(key, formData[key]);
      }
    });
    
    formDataToSend.append("project", projectId); // Append project ID to the FormData

    setLoading(true); // Start loading state

    try {
      // Use axios.post to send FormData
      await axios.post("/approved-drawings/", formDataToSend, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      // Update project with new approved docs
      const updatedDocs = { approved_docs: { ...formData } }; // Assuming all uploaded docs are stored here
      await axios.patch(`/projects/${projectId}/`, updatedDocs);

      setSuccessOpen(true); // Open success notification
      onClose(); // Close modal after submitting
    } catch (error) {
      console.error("Error adding approved document:", error);
    } finally {
      setLoading(false); // Reset loading state
    }

  };

  const documentLabels = {
    architectural: "Architectural Document",
    structural: "Structural Document",
    proposed_sewer: "Proposed Sewer Document",
    proposed_water: "Proposed Water Document",
    proposed_electricity: "Proposed Electricity Document",
  };

  const handleSnackbarClose = () => {
    setSuccessOpen(false);
  };

  return (
    <Modal open={open} onClose={onClose}>
      <Box sx={style}>
        <Typography variant="h6" gutterBottom>Add Approved Document</Typography>
        <form onSubmit={handleSubmit}>
          {Object.keys(documentLabels).map((docType) => (
            <Box key={docType} marginBottom={2}>
              <InputLabel htmlFor={docType}>{documentLabels[docType]}</InputLabel>
              <TextField
                id={docType}
                name={docType}
                type="file"
                onChange={handleChange}
                fullWidth
                margin="normal"
                InputLabelProps={{ shrink: true }}
                required
              />
            </Box>
          ))}
          <Button type="submit" variant="contained" color="primary" fullWidth disabled={loading}>
            {loading ? <CircularProgress size={24} color="inherit" /> : "Add Document"}
          </Button>
        </form>

        {/* Snackbar for success message */}
        <Snackbar open={successOpen} autoHideDuration={3000} onClose={handleSnackbarClose}>
          <MuiAlert elevation={6} severity="success" onClose={handleSnackbarClose}>
            Documents added successfully!
          </MuiAlert>
        </Snackbar>
      </Box>
    </Modal>
  );
};

export default AddApprovedDocumentModal;
