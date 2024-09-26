'use client';

import { animated, useSpring } from '@react-spring/web';
import Navbar from '@/components/Navbar';
import { ThemeProvider, useMediaQuery } from '@mui/material';
import theme from './theme';
import { Provider } from 'react-redux';
import store, { persistor } from '@/store/store';
import { PersistGate } from 'redux-persist/integration/react';
import heroBg1 from '../../public/images/heroBg1.jpg';
import heroBg2 from '../../public/images/heroBg2.jpg';
// import heroBg from '../../public/images/heroBg3.jpg';

export default function Main({ children }: any) {
  const smScreen = useMediaQuery(theme.breakpoints.down('sm'));

  const gradientAnimation = useSpring(
    smScreen
      ? {
          from: { backgroundPosition: '50% 100%' },
          to: { backgroundPosition: '0% 50%' },
          config: { duration: 80000 },
          loop: { reverse: true },
        }
      : {
          from: { backgroundPosition: '30% 70%' },
          to: { backgroundPosition: '80% 30%' },
          config: { duration: 60000 },
          loop: { reverse: true },
        }
  );

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <ThemeProvider theme={theme}>
          <Navbar />
          <animated.div
            style={{
              ...gradientAnimation,
              backgroundImage: `url(${smScreen ? heroBg2.src : heroBg1.src})`,
              display: 'flex',
              flexDirection: 'column',
              minHeight: '100vh',
            }}
          >
            {children}
          </animated.div>
        </ThemeProvider>
      </PersistGate>
    </Provider>
  );
}
