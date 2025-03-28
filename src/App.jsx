import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import theme from './theme';
import Login from './components/auth/Login';
import UserList from './components/users/UserList';
import ProtectedRoute from './components/common/ProtectedRoute';
import ErrorBoundary from './components/common/ErrorBoundary';
import Navbar from './components/common/Navbar';
import Footer from './components/common/Footer';
import NotFound from './components/common/NotFound';
import { ROUTES } from './utils/constants';
import { Box } from '@mui/material';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <ErrorBoundary>
        <BrowserRouter>
          <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
            <Box sx={{ flex: 1 }}>
              <Routes>
                <Route path={ROUTES.LOGIN} element={<Login />} />
                <Route
                  path={ROUTES.USERS}
                  element={
                    <ProtectedRoute>
                      <>
                        <Navbar />
                        <UserList />
                      </>
                    </ProtectedRoute>
                  }
                />
                <Route path="/" element={<Navigate to={ROUTES.USERS} replace />} />
                <Route path={ROUTES.NOT_FOUND} element={<NotFound />} />
              </Routes>
            </Box>
            <Footer />
            <ToastContainer/>
          </Box>
        </BrowserRouter>
      </ErrorBoundary>
    </ThemeProvider>
  );
}

export default App;