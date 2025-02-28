import React from 'react';
import { Box, Typography, Container } from '@mui/material';
import { styled } from '@mui/material/styles';

const FeatureBox = styled(Box)(({ theme }) => ({
  padding: theme.spacing(4),
  borderRadius: theme.shape.borderRadius,
  background: 'transparent',
  textAlign: 'center',
  flex: 1,
}));

const Footer: React.FC = () => {
  return (
    <Box sx={{ py: 8, background: 'linear-gradient(90deg, #f0f8ff, #ffffff)' }}>
      <Container>
        <Typography variant="h4" component="h2" align="center" gutterBottom>
          Features
        </Typography>
        <Box
          sx={{
            display: 'flex',
            flexDirection: { xs: 'column', md: 'row' },
            gap: 4,
          }}
        >
          <FeatureBox>
            <Typography variant="h6" gutterBottom>
              Seamless Scheduling
            </Typography>
            <Typography color="text.secondary">
              Easily book appointments with doctors at your convenience.
            </Typography>
          </FeatureBox>
          <FeatureBox>
            <Typography variant="h6" gutterBottom>
              Video Consultations
            </Typography>
            <Typography color="text.secondary">
              Connect with healthcare professionals from the comfort of your home.
            </Typography>
          </FeatureBox>
          <FeatureBox>
            <Typography variant="h6" gutterBottom>
              AI-Powered Diagnostics
            </Typography>
            <Typography color="text.secondary">
              Get accurate and quick health assessments using advanced AI.
            </Typography>
          </FeatureBox>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer;
