import React, { useState, useContext } from "react";
import axios from "axios";
import { Link, Navigate } from 'react-router-dom';
import {
    TextField,
    Button,
    Typography,
    Box,
    Link as MuiLink,
    CircularProgress
} from '@mui/material';
import { UserContext } from "../../UserContext";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false); // Loading state
  const { user, login } = useContext(UserContext);

  const handleLogin = async (e) => {
    e.preventDefault(); // Prevent default form submission
    setLoading(true); // Set loading state to true

    try {
      await login({ username, password }); // Attempt to log in
      setLoading(false); // Reset loading state
    } catch (error) {
      setLoading(false); // Reset loading state on error
      console.error("Login failed:", error.message || error);
    }
  };

  // Redirect if user is logged in
  if (user) {
    return <Navigate to="/projects" />;
  }

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '100vh',
        background: 'gray.700',
        padding: 2,
      }}
    >
      <Box
        sx={{
          width: '100%',
          maxWidth: 400,
          backgroundColor: 'white',
          padding: 4,
          borderRadius: 2,
          boxShadow: 3,
        }}
      >
        <Typography variant="h4" align="center" fontWeight="bold" gutterBottom>
          Login
        </Typography>
        <Typography align="center" sx={{ mb: 2 }}>
          Don't have an account yet?{' '}
          <MuiLink component={Link} to="/register" underline="hover" color="primary">
            Register now
          </MuiLink>
        </Typography>
        <form onSubmit={handleLogin}>
          <TextField
            label="Email"
            type="email"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            fullWidth
            margin="normal"
            required
          />
          <TextField
            label="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            fullWidth
            margin="normal"
            required
          />
          <Button
            type="submit" // Ensure this button submits the form
            disabled={loading} // Disable button while loading
            fullWidth
            variant="contained"
            sx={{
              backgroundColor: '#845ec2',
              '&:hover': { backgroundColor: '#6d48a8' },
              py: 1.5,
              mt: 2,
            }}
          >
            {loading ? <CircularProgress size={24} color="inherit" /> : "Login"}
          </Button>
        </form>
        <Typography
          variant="body2"
          align="center"
          sx={{ mt: 2, color: 'text.secondary' }}
        >
          By logging in, you agree to our{' '}
          <MuiLink href="#" underline="hover">
            terms of service
          </MuiLink>{' '}
          and{' '}
          <MuiLink href="#" underline="hover">
            privacy policy
          </MuiLink>.
        </Typography>
      </Box>
    </Box>
  );
};

export default Login;
