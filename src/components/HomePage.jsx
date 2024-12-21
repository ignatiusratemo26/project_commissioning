import React, { useContext } from 'react';
import {Box,  Typography,Button,Container,Grid2,Card,CardContent,CardMedia,Paper,Divider,styled} from '@mui/material';
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

  const cardData = [
    {
      image:
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcShPDwADwRUJWEKOwVPIbocdbJ-KqabOYYOXA&s',
      title: 'Manage your Projects',
      description: 'Seamlessly organize and track your projects from start to finish.',
    },
    {
      image:
        'https://acropolis-wp-content-uploads.s3.us-west-1.amazonaws.com/what-does-a-construction-project-manager-do-hero.webp',
      title: 'Verify your Project Staff',
      description: 'Verify and manage your staff with ease.',
    },
    {
      image:
        'https://www.shutterstock.com/image-photo/management-approval-project-concepts-business-600nw-2489017175.jpg',
      title: 'Fast Project Approvals',
      description: 'Accelerate your project approvals like never before.',
    },
  ];

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

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 mt-8">
        {cardData.map((card, index) => (
          <div
            key={index}
            className="rounded-xl overflow-hidden shadow-lg transform transition-transform duration-300 hover:scale-105"
          >
            {/* Card Media */}
            <div
              className="h-36 bg-cover bg-center transition-transform duration-500 hover:scale-110"
              style={{ backgroundImage: `url('${card.image}')` }}
            ></div>

            {/* Card Content */}
            <div className="bg-gradient-to-r from-purple-600 to-purple-400 text-white p-4">
              <h3 className="text-lg font-bold">{card.title}</h3>
              <p className="text-sm mt-2">{card.description}</p>
            </div>
          </div>
        ))}
      </div>

      </Container>

      <Footer  />
    </>
  );
};

export default HomePage;