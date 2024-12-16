import React from 'react';
import { Container, Grid, Typography, Divider, Box } from '@mui/material';
import { FaFacebookF, FaTwitter, FaLinkedinIn } from 'react-icons/fa';

const Footer = () => {
  return (
    <Box
        sx={{
            background: 'linear-gradient(135deg, rgba(98, 0, 234, 0.8) 10%, rgba(55, 0, 179, 0.8) 50%)',
            color: '#fff',
            borderRadius: '16px',
            padding: 4,
            marginTop: 6,
            boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.5)', // Dark shadow effect
        }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={4}>
          {/* About Section */}
          <Grid item xs={12} sm={4}>
            <Typography variant="h6" fontWeight="bold" gutterBottom>
              About Us
            </Typography>
            <Typography variant="body2" color="white">
              NCAPC is a platform designed to make your project management efficient, streamlined, and collaborative.
            </Typography>
          </Grid>

          {/* Quick Links */}
          <Grid item xs={12} sm={4}>
            <Typography variant="h6" fontWeight="bold" gutterBottom>
              Quick Links
            </Typography>
            <Typography variant="body2" color="white">
              <a href="/" style={{ color: 'white', textDecoration: 'none' }}>Home</a><br />
              <a href="/features" style={{ color: 'white', textDecoration: 'none' }}>Features</a><br />
              <a href="/contact" style={{ color: 'white', textDecoration: 'none' }}>Contact</a>
            </Typography>
          </Grid>

          {/* Contact Section */}
          <Grid item xs={12} sm={4}>
            <Typography variant="h6" fontWeight="bold" gutterBottom>
              Contact Us
            </Typography>
            <Typography variant="body2" color="white">
              Email: support@ncapc.com<br />
              Phone: +254 700 11 22 33
            </Typography>
          </Grid>
        </Grid>

        <Divider sx={{ my: 4 }} />

        {/* Social Media Links */}
        <Box display="flex" justifyContent="center" gap={2} mb={2}>
          <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
            <FaFacebookF size={24} color="#fff" />
          </a>
          <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
            <FaTwitter size={24} color="#fff" />
          </a>
          <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">
            <FaLinkedinIn size={24} color="#fff" />
          </a>
        </Box>

        {/* Copyright Section */}
        <Typography variant="body2" color="white" align="center">
          &copy; {new Date().getFullYear()} NCAPC. All rights reserved.
        </Typography>
      </Container>
    </Box>
  );
};

export default Footer;
