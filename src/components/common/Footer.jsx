import React from 'react';
import {
  Box,
  Container,
  Grid,
  Typography,
  Link,
  Divider,
  Stack,
  IconButton,
  useTheme,
  useMediaQuery,
  styled,
} from '@mui/material';
import {
  LinkedIn,
  Twitter,
  Facebook,
  Instagram,
  Email,
  Phone,
  LocationOn,
} from '@mui/icons-material';

const StyledFooter = styled(Box)(({ theme }) => ({
  backgroundColor: '#fff',
  borderTop: '1px solid',
  borderColor: theme.palette.divider,
  paddingTop: theme.spacing(4),
  paddingBottom: theme.spacing(4),
  [theme.breakpoints.down('sm')]: {
    paddingTop: theme.spacing(3),
    paddingBottom: theme.spacing(3),
  },
}));

const FooterLink = styled(Link)({
  color: 'inherit',
  textDecoration: 'none',
  '&:hover': {
    textDecoration: 'underline',
  },
});

const Footer = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const currentYear = new Date().getFullYear();

  return (
    <StyledFooter>
      <Container maxWidth="lg">
        <Grid container spacing={4}>
          <Grid item xs={12} sm={4}>
            <Typography variant="h6" color="primary" gutterBottom>
              User Management
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
              Providing innovative solutions for your business needs.
            </Typography>
            <Stack direction="row" spacing={1}>
              <IconButton size="small" color="primary">
                <LinkedIn />
              </IconButton>
              <IconButton size="small" color="primary">
                <Twitter />
              </IconButton>
              <IconButton size="small" color="primary">
                <Facebook />
              </IconButton>
              <IconButton size="small" color="primary">
                <Instagram />
              </IconButton>
            </Stack>
          </Grid>

          <Grid item xs={12} sm={4}>
            <Typography variant="h6" gutterBottom>
              Quick Links
            </Typography>
            <Stack spacing={1}>
              <FooterLink href="/about">About Us</FooterLink>
              <FooterLink href="/services">Services</FooterLink>
              <FooterLink href="/contact">Contact</FooterLink>
              <FooterLink href="/privacy">Privacy Policy</FooterLink>
            </Stack>
          </Grid>

          <Grid item xs={12} sm={4}>
            <Typography variant="h6" gutterBottom>
              Contact Us
            </Typography>
            <Stack spacing={2}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <LocationOn color="action" fontSize="small" />
                <Typography variant="body2" color="text.secondary">
                  123 Business Street, City, Country
                </Typography>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <Email color="action" fontSize="small" />
                <FooterLink href="mailto:info@company.com" variant="body2">
                  info@company.com
                </FooterLink>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <Phone color="action" fontSize="small" />
                <FooterLink href="tel:+1234567890" variant="body2">
                  +1 (234) 567-890
                </FooterLink>
              </Box>
            </Stack>
          </Grid>
        </Grid>

        <Divider sx={{ my: 4 }} />

        <Box
          sx={{
            display: 'flex',
            flexDirection: isMobile ? 'column' : 'row',
            justifyContent: 'space-between',
            alignItems: isMobile ? 'center' : 'flex-start',
            gap: 2,
            textAlign: isMobile ? 'center' : 'left',
          }}
        >
          <Typography variant="body2" color="text.secondary">
            © {currentYear} User Management. All rights reserved.
          </Typography>
          <Stack
            direction={isMobile ? 'column' : 'row'}
            spacing={2}
            alignItems="center"
          >
            <FooterLink href="/terms" variant="body2" color="text.secondary">
              Terms of Service
            </FooterLink>
            <FooterLink href="/privacy" variant="body2" color="text.secondary">
              Privacy Policy
            </FooterLink>
            <FooterLink href="/cookies" variant="body2" color="text.secondary">
              Cookie Policy
            </FooterLink>
          </Stack>
        </Box>
      </Container>
    </StyledFooter>
  );
};

export default Footer;