'use client';
import { Box, Button, Typography, Container, useMediaQuery } from '@mui/material';
import { useRouter } from 'next/navigation';
import Footer from '@/components/Footer';
import theme from '@/components/theme';
import UpwardMotion from '@/components/effects.tsx/UpwardMotion';
import ScaleUpMotion from '@/components/effects.tsx/ScaleUpMotion';
import HoverMotion from '@/components/effects.tsx/HoverMotion';

export default function Page() {
  const router = useRouter();
  const smScreen = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <Box>
      <Box
        sx={{
          minHeight: '90vh',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          color: theme.palette.primary.contrastText,
          textAlign: 'center',
          position: 'relative',
        }}
      >
        <Box sx={{ paddingX: '2rem', borderRadius: '12px', pb: 15 }}>
          <UpwardMotion>
            <Typography
              variant={smScreen ? 'h3' : 'h2'}
              sx={{
                fontWeight: 'bold',
                mb: 2,
                textShadow: `
                  5px 10px 15px rgba(0, 0, 0, 0.8), 
                  0 0 20px rgba(5, 4, 35, 0.8),   
                  0 0 30px rgba(255, 255, 255, 0.4),   
                  0 0 40px rgba(5, 4, 35, 0.5)   
                `,
              }}
            >
              Secure Authentication Made Simple
            </Typography>
          </UpwardMotion>

          <ScaleUpMotion>
            <Typography
              sx={{
                mb: 4,
                fontSize: 23,
                fontWeight: '200',
                textShadow: `
                2px 2px 4px rgba(0, 0, 0, 0.2),   
                4px 4px 8px rgba(0, 0, 0, 0.5),  
                6px 6px 12px rgba(0, 0, 0, 0.3) 
              `,
              }}
            >
              Empower your applications with robust authentication solutions for developers and users.
            </Typography>
          </ScaleUpMotion>
          <Button variant="contained" size="large" color="secondary" sx={{ bgcolor: '#fff', borderRadius: 50 }} onClick={() => router.push('/dashboard')}>
            Get Started
          </Button>
        </Box>
      </Box>

      {/* Features Section */}
      <Container sx={{ py: 6 }}>
        <Typography variant="h4" sx={{ fontWeight: 'bold', textAlign: 'center', mb: 4, color: theme.palette.primary.contrastText }}>
          Why Choose KC Authenticator?
        </Typography>

        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            flexDirection: { xs: 'column', md: 'row' },
            gap: 4,
            textAlign: 'center',
          }}
        >
          {/* Feature 1 */}
          <HoverMotion>
            <Box
              sx={{
                backgroundColor: '#f1f1f1',
                padding: '2rem',
                borderRadius: '12px',
                boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
                flex: 1,
              }}
            >
              {/* <img src="/images/feature-1.svg" alt="Feature 1" style={{ height: 100, marginBottom: '1.5rem' }} /> */}
              <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 1 }}>
                Secure & Reliable
              </Typography>
              <Typography>Best-in-class encryption to keep your data safe.</Typography>
            </Box>
          </HoverMotion>

          {/* Feature 2 */}
          <HoverMotion>
            <Box
              sx={{
                backgroundColor: '#f1f1f1',
                padding: '2rem',
                borderRadius: '12px',
                boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
                flex: 1,
              }}
            >
              {/* <img src="/images/feature-2.svg" alt="Feature 2" style={{ height: 100, marginBottom: '1.5rem' }} /> */}
              <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 1 }}>
                Easy Integration
              </Typography>
              <Typography>Quickly integrate our API into your applications.</Typography>
            </Box>
          </HoverMotion>
          <HoverMotion>
            {/* Feature 3 */}
            <Box
              sx={{
                backgroundColor: '#f1f1f1',
                padding: '2rem',
                borderRadius: '12px',
                boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
                flex: 1,
              }}
            >
              {/* <img src="/images/feature-3.svg" alt="Feature 3" style={{ height: 100, marginBottom: '1.5rem' }} /> */}
              <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 1 }}>
                Multi-Platform Support
              </Typography>
              <Typography>Works seamlessly across web and mobile platforms.</Typography>
            </Box>
          </HoverMotion>
        </Box>
      </Container>

      {/* Footer */}
      <Footer />
    </Box>
  );
}
