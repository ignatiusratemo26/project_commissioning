import React, { useState, useContext } from 'react';
import { AppBar, Toolbar, Typography, IconButton, Menu, MenuItem, Box, Button } from '@mui/material';
import { FaBars, FaShoppingCart, FaUser } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { UserContext } from '../../UserContext';
import { Construction } from 'lucide-react';

const Header = ({ toggleCart }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const { user, logout } = useContext(UserContext);
  
  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  return (
    <AppBar position="static" sx={{ bgcolor: '#6200ea', boxShadow: '0 4px 10px rgba(0, 0, 0, 0.2)' }}>
      <Toolbar>
        {/* Logo and Title */}
        <Box display="flex" alignItems="center" sx={{ flexGrow: 1 }}>
          <Link to="/" style={{ textDecoration: 'none', color: 'white', display: 'flex', alignItems: 'center' }}>
            <Construction style={{ width: 32, height: 32, marginRight: 8 }} />
            <Typography variant="h6" component="div" fontWeight="bold">
              Project Commissioning
            </Typography>
          </Link>
        </Box>

        {/* Navigation Links */}
        <Box sx={{ display: { xs: 'none', md: 'flex' }, gap: 2 }}>
          <Button 
            color="inherit" 
            component={Link} 
            to="/projects" 
            sx={{
              '&:hover': {
                bgcolor: '#3700b3',
                transition: 'background-color 0.3s',
              }
            }}
          >
            Projects
          </Button>
          <Button 
            color="inherit" 
            component={Link} 
            to="/contact"
            sx={{
              '&:hover': {
                bgcolor: '#3700b3',
                transition: 'background-color 0.3s',
              }
            }}
          >
            Contact
          </Button>
        </Box>

        {/* User Menu */}
        <Box display="flex" alignItems="center" gap={2}>
          <IconButton
            color="inherit"
            onClick={handleMenuOpen}
          >
            <FaUser />
          </IconButton>
          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleMenuClose}
          >
            {user ? (
              <>
                <MenuItem component={Link} to="/profile">Profile</MenuItem>
                <MenuItem onClick={logout}>Logout</MenuItem>
              </>
            ) : (
              <MenuItem component={Link} to="/login">Login</MenuItem>
            )}
          </Menu>
        </Box>

        {/* Mobile Menu */}
        <IconButton
          color="inherit"
          edge="end"
          sx={{ display: { md: 'none' } }}
          onClick={handleMenuOpen}
        >
          <FaBars />
        </IconButton>
        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleMenuClose}
          sx={{ display: { md: 'none' } }}
        >
          <MenuItem component={Link} to="/contact" onClick={handleMenuClose}>
            Contact
          </MenuItem>
          <MenuItem component={Link} to={user ? '/profile' : '/login'} onClick={handleMenuClose}>
            Profile
          </MenuItem>
          {user ? (
            <>
              <MenuItem component={Link} to="/projects" onClick={handleMenuClose}>
                Projects
              </MenuItem>
              <MenuItem
                onClick={() => {
                  logout();
                  handleMenuClose();
                }}
              >
                Logout
              </MenuItem>
            </>
          ) : null}
        </Menu>
        {/* <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleMenuClose}
          sx={{ display: { md: 'none' } }}
        >
          
          <MenuItem component={Link} to="/contact" onClick={handleMenuClose}>Contact</MenuItem>
          <MenuItem component={Link} to={user ? '/profile' : '/login'} onClick={handleMenuClose}>Profile</MenuItem>
          {user ?  (
            <>
          <MenuItem component={Link} to="/projects" onClick={handleMenuClose}>Projects</MenuItem>
          <MenuItem onClick={logout}>Logout</MenuItem>            
            </>
          )
          : 
          null   
          }
        </Menu> */}
      </Toolbar>
    </AppBar>
  );
};

export default Header;
