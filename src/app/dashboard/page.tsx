import theme from '@/components/theme';
import { Box, Typography } from '@mui/material';
import Link from 'next/link';
import React from 'react';

export default function Dashboard() {
  return (
    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', mt: 4 }}>
      <Typography variant="h4" sx={{ color: '#fff', m: 3 }}>
        No data on Dashboard
      </Typography>
      <Link href="/application" style={{ fontSize: 30, color: theme.palette.primary.contrastText }}>
        Go to app section
      </Link>
    </Box>
  );
}
