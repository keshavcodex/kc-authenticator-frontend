'use client';

import { animated, useSpring } from '@react-spring/web';
import Navbar from '@/components/Navbar';
import { ThemeProvider, useMediaQuery } from '@mui/material';
import theme from './theme';
import { Provider } from 'react-redux';
import store, { persistor } from '@/store/store';
import { PersistGate } from 'redux-persist/integration/react';
// import heroBg from '../../public/images/heroBg1.jpg';
import heroBg from '../../public/images/heroBg2.jpg';
// import heroBg from '../../public/images/heroBg3.jpg';

export default function Main({ children }: any) {
  const smScreen = useMediaQuery(theme.breakpoints.down('sm'));

  const gradientAnimation = useSpring(
    smScreen
      ? {
          to: { backgroundPosition: '0% 50%' },
          from: { backgroundPosition: '50% 100%' },
          config: { duration: 60000 },
          loop: { reverse: true },
        }
      : {
          to: { backgroundPosition: '50% 0%' },
          from: { backgroundPosition: '0% 100%' },
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
              backgroundImage: `url(${heroBg.src})`,
              backgroundSize: smScreen? '': '100% 400%',
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
