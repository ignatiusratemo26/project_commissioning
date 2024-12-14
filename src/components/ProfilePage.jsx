import React, { useContext } from 'react';
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
import { UserContext } from '../UserContext';


const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(4),
  marginTop: theme.spacing(4),
  [theme.breakpoints.down('sm')]: {
    padding: theme.spacing(2),
  },
}));



const ProfilePage = () => {
    // const { user } = useContext(UserContext);
    const user = JSON.parse(localStorage.getItem('userDetails'));

  return (
    <Container maxWidth="md">
      <StyledPaper elevation={3}>
        <Box display="flex" flexDirection="column" alignItems="center">
          {/* Profile Picture */}
          <Avatar
            alt={user.first_name[0] + user.last_name[0]}
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
                defaultValue={user.first_name}
                variant="outlined"
              />
            </Grid2>
            {/* Last Name */}
            <Grid2 item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Last Name"
                defaultValue={user.last_name}
                variant="outlined"
              />
            </Grid2>
            {/* Email */}
            <Grid2 item xs={12}>
              <TextField
                fullWidth
                label="Email"
                defaultValue={user.username}
                variant="outlined"
              />
            </Grid2>
            {/* Phone Number */}
            <Grid2 item xs={12}>
              <TextField
                fullWidth
                label="Phone Number"
                defaultValue={user.phone_number}
                variant="outlined"
              />
            </Grid2>
          </Grid2>

          {/* Save Button */}
          <Box mt={4} textAlign="center">
            <Button variant="contained" color="primary" size="large">
              Save Changes
            </Button>
          </Box>
        </Box>
      </StyledPaper>
    </Container>
  );
};

export default ProfilePage;
