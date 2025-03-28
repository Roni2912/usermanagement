import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Container,
  Grid,
  Typography,
  Pagination,
  TextField,
  Box,
  InputAdornment,
  Paper,
  Fade,
  styled,
  useTheme,
  useMediaQuery,
} from '@mui/material';
import { Search, People } from '@mui/icons-material';
import { fetchUsers } from '../../redux/slices/userSlice';
import UserCard from './UserCard';
import LoadingSpinner from '../common/LoadingSpinner';

const StyledContainer = styled(Container)(({ theme }) => ({
  paddingTop: theme.spacing(4),
  paddingBottom: theme.spacing(4),
  [theme.breakpoints.down('sm')]: {
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(2),
  },
}));

const HeaderPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(3),
  marginBottom: theme.spacing(4),
  borderRadius: 12,
  background: 'linear-gradient(135deg, #fff 0%, #f8f9fa 100%)',
  boxShadow: '0 2px 12px rgba(0,0,0,0.05)',
  [theme.breakpoints.down('sm')]: {
    padding: theme.spacing(2),
  },
}));

const SearchTextField = styled(TextField)(({ theme }) => ({
  '& .MuiOutlinedInput-root': {
    borderRadius: 12,
    backgroundColor: '#fff',
    transition: 'all 0.2s ease-in-out',
    '&:hover': {
      backgroundColor: '#f8f9fa',
    },
    '&.Mui-focused': {
      backgroundColor: '#fff',
      boxShadow: '0 0 0 2px rgba(25, 118, 210, 0.2)',
    },
  },
}));

const UserList = () => {
  const dispatch = useDispatch();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const { users, totalPages, loading, error } = useSelector((state) => state.users);
  const [page, setPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    dispatch(fetchUsers(page));
  }, [dispatch, page]);

  const filteredUsers = users.filter(
    (user) =>
      user.first_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.last_name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <StyledContainer maxWidth="lg">
      <Fade in timeout={500}>
        <HeaderPaper elevation={0}>
          <Box sx={{ 
            display: 'flex', 
            alignItems: 'center', 
            gap: 2,
            mb: 3,
          }}>
            <People 
              sx={{ 
                fontSize: isMobile ? 32 : 40,
                color: 'primary.main',
              }} 
            />
            <Typography
              variant={isMobile ? "h5" : "h4"}
              component="h1"
              sx={{
                fontWeight: 600,
                background: 'linear-gradient(45deg, #1976d2, #64b5f6)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}
            >
              Users List
            </Typography>
          </Box>

          <SearchTextField
            fullWidth
            variant="outlined"
            placeholder="Search users by name..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Search color="action" />
                </InputAdornment>
              ),
            }}
          />
        </HeaderPaper>
      </Fade>

      {loading ? (
        <Box sx={{ 
          display: 'flex', 
          justifyContent: 'center',
          alignItems: 'center',
          minHeight: '400px' 
        }}>
          <LoadingSpinner />
        </Box>
      ) : error ? (
        <Paper 
          sx={{ 
            p: 3, 
            textAlign: 'center',
            borderRadius: 2,
            backgroundColor: '#fff3f3' 
          }}
        >
          <Typography color="error.main">{error}</Typography>
        </Paper>
      ) : (
        <Fade in timeout={500}>
          <Box>
            <Grid container spacing={3} justifyContent="center">
                {filteredUsers.map((user) => (
                  <Grid
                    item
                    xs={12}
                    sm={6}
                    md={4}
                    lg={3}
                    key={user.id}
                    display="flex"
                    justifyContent="center"
                  >
                    <UserCard user={user} />
                  </Grid>
                ))}
            </Grid>

            {filteredUsers.length === 0 && (
              <Box 
                sx={{ 
                  textAlign: 'center',
                  py: 8,
                  color: 'text.secondary'
                }}
              >
                <Typography variant="h6">
                  No users found
                </Typography>
                <Typography variant="body2">
                  Try adjusting your search
                </Typography>
              </Box>
            )}

            {filteredUsers.length > 0 && (
              <Box sx={{ 
                mt: 6, 
                mb: 2,
                display: 'flex', 
                justifyContent: 'center' 
              }}>
                <Pagination
                  count={totalPages}
                  page={page}
                  onChange={(_, value) => setPage(value)}
                  color="primary"
                  size={isMobile ? "small" : "medium"}
                  sx={{
                    '& .MuiPaginationItem-root': {
                      borderRadius: 1,
                    },
                  }}
                />
              </Box>
            )}
          </Box>
        </Fade>
      )}
    </StyledContainer>
  );
};

export default UserList;