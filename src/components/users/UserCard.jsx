import React, { useState } from 'react';
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Button,
  Box,
  Dialog,
  IconButton,
  styled,
  alpha,
} from '@mui/material';
import { Edit, Delete, Email } from '@mui/icons-material';
import { useDispatch } from 'react-redux';
import { deleteUser } from '../../redux/slices/userSlice';
import EditUserModal from './EditUserModal';

const StyledCard = styled(Card)(({ theme }) => ({
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  borderRadius: '12px',
  transition: 'transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out',
  backgroundColor: theme.palette.background.paper,
  border: '1px solid',
  borderColor: alpha(theme.palette.divider, 0.1),
  '&:hover': {
    transform: 'translateY(-4px)',
    boxShadow: '0 12px 20px -10px rgba(0,0,0,0.1)',
  },
}));

const StyledCardMedia = styled(CardMedia)(({ theme }) => ({
  height: 200,
  position: 'relative',
  '&::after': {
    content: '""',
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: '30%',
    background: 'linear-gradient(to top, rgba(0,0,0,0.4) 0%, rgba(0,0,0,0) 100%)',
  },
}));

const ActionButton = styled(Button)(({ theme }) => ({
  borderRadius: '8px',
  textTransform: 'none',
  padding: '6px 16px',
  fontWeight: 500,
  fontSize: '0.875rem',
  boxShadow: 'none',
  '&:hover': {
    boxShadow: 'none',
  },
}));

const DeleteDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialog-paper': {
    borderRadius: '12px',
    padding: theme.spacing(2),
    boxShadow: '0 8px 24px rgba(0,0,0,0.12)',
  },
}));

const UserCard = ({ user }) => {
  const dispatch = useDispatch();
  const [openEdit, setOpenEdit] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);

  const handleDelete = async () => {
    await dispatch(deleteUser(user.id));
    setOpenDelete(false);
  };

  return (
    <>
      <StyledCard>
        <StyledCardMedia
          component="img"
          image={user.avatar}
          alt={`${user.first_name} ${user.last_name}`}
        />
        <CardContent sx={{ p: 3 }}>
          <Typography 
            gutterBottom 
            variant="h6" 
            component="h2"
            sx={{ 
              fontWeight: 600,
              mb: 0.5,
            }}
          >
            {`${user.first_name} ${user.last_name}`}
          </Typography>
          
          <Box sx={{ 
            display: 'flex', 
            alignItems: 'center', 
            gap: 1,
            mb: 2,
            color: 'text.secondary'
          }}>
            <Email sx={{ fontSize: 18 }} />
            <Typography variant="body2">
              {user.email}
            </Typography>
          </Box>

          <Box sx={{ 
            display: 'flex', 
            gap: 1.5,
            mt: 'auto' 
          }}>
            <ActionButton
              startIcon={<Edit />}
              variant="outlined"
              onClick={() => setOpenEdit(true)}
              fullWidth
              sx={{
                borderColor: 'primary.light',
                color: 'primary.main',
                '&:hover': {
                  backgroundColor: alpha('#1976d2', 0.04),
                },
              }}
            >
              Edit
            </ActionButton>
            <ActionButton
              startIcon={<Delete />}
              variant="outlined"
              onClick={() => setOpenDelete(true)}
              fullWidth
              sx={{
                borderColor: 'error.light',
                color: 'error.main',
                '&:hover': {
                  backgroundColor: alpha('#f44336', 0.04),
                },
              }}
            >
              Delete
            </ActionButton>
          </Box>
        </CardContent>
      </StyledCard>

      <EditUserModal
        open={openEdit}
        onClose={() => setOpenEdit(false)}
        user={user}
      />

      <DeleteDialog
        open={openDelete}
        onClose={() => setOpenDelete(false)}
        maxWidth="xs"
        fullWidth
      >
        <Box sx={{ p: 1 }}>
          <Typography 
            variant="h6" 
            gutterBottom
            sx={{ 
              fontWeight: 600,
              color: 'error.main',
              mb: 2 
            }}
          >
            Confirm Delete
          </Typography>
          <Typography variant="body1" sx={{ mb: 3 }}>
            Are you sure you want to delete {user.first_name} {user.last_name}?
            This action cannot be undone.
          </Typography>
          <Box sx={{ 
            display: 'flex', 
            gap: 1.5, 
            justifyContent: 'flex-end'
          }}>
            <Button 
              onClick={() => setOpenDelete(false)}
              sx={{ 
                textTransform: 'none',
                fontWeight: 500 
              }}
            >
              Cancel
            </Button>
            <Button 
              onClick={handleDelete} 
              variant="contained" 
              color="error"
              sx={{ 
                textTransform: 'none',
                fontWeight: 500,
                px: 3
              }}
            >
              Delete
            </Button>
          </Box>
        </Box>
      </DeleteDialog>
    </>
  );
};

export default UserCard;