'use client';

import { Box, Typography, Link } from '@mui/material';

export default function Footer() {
  return (
    <Box
      component="footer"
      sx={{
        backgroundColor: '#333333', // Dark grey color
        color: '#FFFFFF',
        p: 3,
        mt: 'auto', // margin on top
        textAlign: 'center',
      }}
    >
      <Typography variant="h6" sx={{ mb: 2 }}>
        © 2024 KC Authenticator. All rights reserved.
      </Typography>

      <Box sx={{ display: 'flex', justifyContent: 'center', gap: 5, mb: 2 }}>
        <Link href="/privacy-policy" underline="hover" sx={{ color: '#FFFFFF' }}>
          Privacy Policy
        </Link>
        <Link href="/terms" underline="hover" sx={{ color: '#FFFFFF' }}>
          Terms of Service
        </Link>
        <Link href="mailto:keshavcodex@gmail.com?subject=KC-Auth%20Inquiry" underline="hover" sx={{ color: '#FFFFFF' }}>
          Contact Us
        </Link>
      </Box>
    </Box>
  );
}
