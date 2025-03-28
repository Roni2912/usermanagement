import React, { useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Box,
  CircularProgress,
} from '@mui/material';
import { useDispatch } from 'react-redux';
import { updateUser } from '../../redux/slices/userSlice';
import { showSuccess, showError } from '../../utils/toast';

const EditUserModal = ({ open, onClose, user }) => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [userData, setUserData] = useState({
    first_name: user.first_name,
    last_name: user.last_name,
    email: user.email,
  });
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};
    if (!userData.first_name.trim()) {
      newErrors.first_name = 'First name is required';
    }
    if (!userData.last_name.trim()) {
      newErrors.last_name = 'Last name is required';
    }
    if (!userData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(userData.email)) {
      newErrors.email = 'Please enter a valid email';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    setUserData({
      ...userData,
      [e.target.name]: e.target.value,
    });
    if (errors[e.target.name]) {
      setErrors({
        ...errors,
        [e.target.name]: '',
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      setLoading(true);
      try {
        await dispatch(updateUser({ id: user.id, userData })).unwrap();
        showSuccess('User updated successfully!');
        onClose();
      } catch (error) {
        showError('Failed to update user. Please try again.');
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle sx={{ pb: 1 }}>Edit User</DialogTitle>
      <form onSubmit={handleSubmit}>
        <DialogContent>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <TextField
              name="first_name"
              label="First Name"
              value={userData.first_name}
              onChange={handleChange}
              fullWidth
              required
              error={!!errors.first_name}
              helperText={errors.first_name}
            />
            <TextField
              name="last_name"
              label="Last Name"
              value={userData.last_name}
              onChange={handleChange}
              fullWidth
              required
              error={!!errors.last_name}
              helperText={errors.last_name}
            />
            <TextField
              name="email"
              label="Email"
              type="email"
              value={userData.email}
              onChange={handleChange}
              fullWidth
              required
              error={!!errors.email}
              helperText={errors.email}
            />
          </Box>
        </DialogContent>
        <DialogActions sx={{ px: 3, pb: 2 }}>
          <Button 
            onClick={onClose}
            disabled={loading}
          >
            Cancel
          </Button>
          <Button 
            type="submit"
            variant="contained"
            disabled={loading}
            startIcon={loading && <CircularProgress size={20} />}
          >
            {loading ? 'Saving...' : 'Save Changes'}
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default EditUserModal;