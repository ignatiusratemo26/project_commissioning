import React, { useContext } from 'react';
import {
  Box,
  Typography,
  Button,
  Container,
  Grid2,
  Card,
  CardContent,
  CardMedia,
  Paper,
  Divider,
  styled
} from '@mui/material';
import { useNavigate, Link } from 'react-router-dom';
import { UserContext } from '../UserContext';
import Footer from './shared/Footer';

const HeroSection = styled(Box)(({ theme }) => ({
  height: '70vh',
  background: `linear-gradient(to right, rgba(63, 81, 181, 0.5), rgba(30, 136, 229, 0.5)), url('https://wordpress.bricknbolt.com/wp-content/uploads/2024/07/Low-Cost-House-Construction-1.webp')`,
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  color: '#fff',
  display: 'flex',
  borderRadius: '16px',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  textAlign: 'center',
  padding: theme.spacing(4),
  [theme.breakpoints.down('sm')]: {
    height: '60vh',
  },
}));


const HomePage = () => {
  const { user } = useContext(UserContext);
  const navigate = useNavigate();

  const handleGetStarted = () => {
    navigate('/register');
  };

  return (
    <>

      {/* Hero Section */}
      <HeroSection
      className='px-4 py-8 m-4'
      >
      <Typography
        variant="h2"
        fontWeight="bold"
        gutterBottom
        sx={{
          fontSize: {
            xs: '2rem', // small screens
            sm: '2.5rem', // medium screens
            md: '3rem', // large screens
            lg: '3.5rem', // extra large screens
          },
        }}
      >
        Welcome to NCA Project Commissioning
      </Typography>
      <Typography
        variant="h5"
        fontWeight="bold"
        gutterBottom
        sx={{
          fontSize: {
            xs: '1rem', // small screens
            sm: '1.25rem', // medium screens
            md: '1.5rem', // large screens
            lg: '1.75rem', // extra large screens
          },
        }}
      >
        Get your project approved by NCA in no time.
      </Typography>

        <Button
            variant="contained"
            color="secondary"
            size="large"
            sx={{ mt: 2 }}
            component={Link}
            to={user ? "/projects" : "/register"}
          >
            {user ? "Show My Projects" : "Get Started"}
          </Button>
      </HeroSection>

      {/* Features Section */}
      <Container maxWidth="lg" sx={{ mt: 6 }}>
        <Typography variant="h4" fontWeight="bold" gutterBottom align="center">
          Why Choose Us
        </Typography>
        <Typography variant="body1" color="black" align="center">
          Discover the key features that make our platform unique and effective.
        </Typography>

        <Grid2 container spacing={4} sx={{ mt: 4 }}>
          {/* Feature 1 */}
          <Grid2 item xs={12} sm={6} md={4}>
            <Card elevation={3}>
              <CardMedia
                component="img"
                height="140"
                image="/path/to/feature1.jpg"
                alt="Feature 1"
              />
              <CardContent>
                <Typography variant="h6" fontWeight="bold">
                  Feature 1
                </Typography>
                <Typography variant="body2" color="white">
                  Detailed description of Feature 1 and its benefits.
                </Typography>
              </CardContent>
            </Card>
          </Grid2>

          {/* Feature 2 */}
          <Grid2 item xs={12} sm={6} md={4}>
            <Card elevation={3}>
              <CardMedia
                component="img"
                height="140"
                image="/path/to/feature2.jpg"
                alt="Feature 2"
              />
              <CardContent>
                <Typography variant="h6" fontWeight="bold">
                  Feature 2
                </Typography>
                <Typography variant="body2" color="white">
                  Detailed description of Feature 2 and its benefits.
                </Typography>
              </CardContent>
            </Card>
          </Grid2>

          {/* Feature 3 */}
          <Grid2 item xs={12} sm={6} md={4}>
            <Card elevation={3}>
              <CardMedia
                component="img"
                height="140"
                image="/path/to/feature3.jpg"
                alt="Feature 3"
              />
              <CardContent>
                <Typography variant="h6" fontWeight="bold">
                  Feature 3
                </Typography>
                <Typography variant="body2" color="white">
                  Detailed description of Feature 3 and its benefits.
                </Typography>
              </CardContent>
            </Card>
          </Grid2>
        </Grid2>
      </Container>

      <Footer  />
    </>
  );
};

export default HomePage;
