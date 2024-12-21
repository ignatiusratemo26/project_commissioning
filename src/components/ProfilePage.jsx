import React, { useState } from 'react';
import {
  Box,
  Container,
  Typography,
  Avatar,
  Grid2,
  TextField,
  Button,
  Paper,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import axios from 'axios';

const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(4),
  marginTop: theme.spacing(4),
  [theme.breakpoints.down('sm')]: {
    padding: theme.spacing(2),
  },
}));

const ProfilePage = () => {
  const user = JSON.parse(localStorage.getItem('userDetails'));

  // State for form fields
  const [formData, setFormData] = useState({
    first_name: user.first_name || '',
    last_name: user.last_name || '',
    username: user.username || '',
    phone_number: user.phone_number || '',
  });

  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  // Handle save changes
  const handleSave = async () => {
    try {
      const response = await axios.patch(
        '/users/update_profile/', // Replace with your actual endpoint
        formData,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('accessToken')}`, // If authorization is needed
          },
        }
      );

      // Optionally update localStorage or inform the user
      localStorage.setItem('userDetails', JSON.stringify(response.data));
      alert('Profile updated successfully!');
    } catch (error) {
      console.error('Error updating profile:', error);
      alert('Failed to update profile. Please try again.');
    }
  };

  return (
    <Container maxWidth="md">
      <StyledPaper elevation={3}>
        <Box display="flex" flexDirection="column" alignItems="center">
          {/* Profile Picture */}
          <Avatar
            alt={`${user.first_name?.[0] || ''}${user.last_name?.[0] || ''}`}
            src="/path/to/profile-pic.jpg"
            sx={{
              width: 100,
              height: 100,
              marginBottom: 2,
              boxShadow: 3,
            }}
          />
          <Typography variant="h5" fontWeight="bold" gutterBottom>
            {user.first_name} {user.last_name}
          </Typography>
          <Typography variant="subtitle1" color="textSecondary">
            {user.username}
          </Typography>
        </Box>

        {/* Form Section */}
        <Box mt={4}>
          <Typography variant="h6" gutterBottom>
            Update Profile
          </Typography>
          <Grid2 container spacing={2}>
            {/* First Name */}
            <Grid2 item xs={12} sm={6}>
              <TextField
                fullWidth
                label="First Name"
                name="first_name"
                value={formData.first_name}
                onChange={handleChange}
                variant="outlined"
              />
            </Grid2>
            {/* Last Name */}
            <Grid2 item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Last Name"
                name="last_name"
                value={formData.last_name}
                onChange={handleChange}
                variant="outlined"
              />
            </Grid2>
            {/* Email */}
            <Grid2 item xs={12}>
              <TextField
                fullWidth
                label="Email"
                name="username"
                value={formData.username}
                onChange={handleChange}
                variant="outlined"
              />
            </Grid2>
            {/* Phone Number */}
            <Grid2 item xs={12}>
              <TextField
                fullWidth
                label="Phone Number"
                name="phone_number"
                value={formData.phone_number}
                onChange={handleChange}
                variant="outlined"
              />
            </Grid2>
          </Grid2>

          {/* Save Button */}
          <Box mt={4} textAlign="center">
            <Button variant="contained" color="secondary" size="large" onClick={handleSave}>
              Save Changes
            </Button>
          </Box>
        </Box>
      </StyledPaper>
    </Container>
  );
};

export default ProfilePage;