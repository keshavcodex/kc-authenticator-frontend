import dynamic from 'next/dynamic';
import { Box } from '@mui/material';

// Dynamically import the LottiePlayer without SSR
const LottiePlayer = dynamic(() => import('lottie-react'), {
  ssr: false,
});

import animationData from '@/../public/videos/shield-animation.json';

export default function MainAnimation() {
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
      }}
    >
      <LottiePlayer
        autoplay
        loop
        src={'/public/videos/shield-animation.json'}
        animationData={animationData}
        style={{
          height: '300px',
          width: '300px',
        }}
      />
    </Box>
  );
}
