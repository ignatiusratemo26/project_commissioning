import React, { useState, useContext } from "react";
import axios from "axios";
import { Link, Navigate } from 'react-router-dom';
import {
    TextField,
    Button,
    Typography,
    Box,
    Link as MuiLink,
  } from '@mui/material';
import { UserContext } from "../../UserContext";


  
const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { user, login, logout } = useContext(UserContext);

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
        <form>
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
            onClick={()=>
              login({username, password})
            }
            fullWidth
            variant="contained"
            sx={{
              backgroundColor: '#845ec2',
              '&:hover': { backgroundColor: '#6d48a8' },
              py: 1.5,
              mt: 2,
            }}
          >
            Login
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
