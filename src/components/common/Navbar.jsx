import React, { useState } from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  Container,
  Avatar,
  Menu,
  MenuItem,
  IconButton,
  useMediaQuery,
  useTheme,
  styled,
} from '@mui/material';
import {
  AccountCircle,
  ExitToApp,
  Menu as MenuIcon,
} from '@mui/icons-material';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { logout } from '../../redux/slices/authSlice';

const StyledAppBar = styled(AppBar)({
  background: 'linear-gradient(to right, #2193b0, #6dd5ed)',
  boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
});

const StyledAvatar = styled(Avatar)(({ theme }) => ({
  width: 35,
  height: 35,
  cursor: 'pointer',
  backgroundColor: 'rgba(255, 255, 255, 0.2)',
  transition: 'transform 0.2s ease-in-out',
  '&:hover': {
    transform: 'scale(1.1)',
  },
}));

const Navbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const [anchorEl, setAnchorEl] = useState(null);

  const handleProfileClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    dispatch(logout());
    navigate('/login');
    handleMenuClose();
  };

  return (
    <StyledAppBar position="sticky">
      <Container maxWidth="lg">
        <Toolbar sx={{ padding: isMobile ? 1 : 2 }}>
          {isMobile && (
            <IconButton
              edge="start"
              color="inherit"
              sx={{ mr: 2 }}
            >
              <MenuIcon />
            </IconButton>
          )}

          <Box sx={{ 
            display: 'flex', 
            alignItems: 'center', 
            gap: 1,
            flexGrow: 1 
          }}>
            <Typography 
              variant="h5" 
              sx={{
                fontWeight: 600,
                display: { xs: 'none', sm: 'block' }
              }}
            >
              User Management
            </Typography>
          </Box>

          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            {!isMobile && (
              <Typography variant="body2" sx={{ opacity: 0.9 }}>
                Welcome, eve.holt
              </Typography>
            )}
            
            <StyledAvatar onClick={handleProfileClick}>
              <AccountCircle />
            </StyledAvatar>

            <Menu
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={handleMenuClose}
              PaperProps={{
                elevation: 3,
                sx: {
                  mt: 1.5,
                  minWidth: 200,
                  borderRadius: 2,
                  overflow: 'visible',
                  filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.15))',
                },
              }}
            >
              <Box sx={{ px: 2, py: 1.5 }}>
                <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                  eve.holt
                </Typography>
                <Typography variant="body2" color="text.secondary">
                eve.holt@reqres.in
                </Typography>
              </Box>
              
              <MenuItem onClick={handleLogout} sx={{ 
                color: 'error.main',
                gap: 1,
                py: 1.5
              }}>
                <ExitToApp fontSize="small" />
                Logout
              </MenuItem>
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </StyledAppBar>
  );
};

export default Navbar;