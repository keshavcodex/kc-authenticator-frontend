'use client';

import PartyPopperEffect from '@/components/effects.tsx/ParticleVariants';
import ScaleUp from '@/components/effects.tsx/ScaleUpMotion';
import Intro from '@/components/effects.tsx/UpwardMotion';
import { Box } from '@mui/material';
import React from 'react';

export default function page() {
  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh' }}>
      <ScaleUp>lajdflaf sadfj laksjf</ScaleUp>
      <PartyPopperEffect></PartyPopperEffect>
    </Box>
  );
}
