'use client';

import { animated, useSpring } from '@react-spring/web';
import Navbar from '@/components/Navbar';
import { ThemeProvider } from '@mui/material';
import theme from './theme';
import { Provider } from 'react-redux';
import store, { persistor } from '@/store/store';
import { PersistGate } from 'redux-persist/integration/react';

export default function Main({ children }: { children: any }) {
  const gradientAnimation = useSpring({
    from: { backgroundPosition: '0% 50%' },
    to: { backgroundPosition: '100% 50%' },
    config: { duration: 2500 },
    loop: { reverse: true },
  });

  const gradientBackground = `linear-gradient(to bottom right, ${theme.palette.primary.main}, ${theme.palette.primary.light}, ${theme.palette.secondary.dark})`;

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <ThemeProvider theme={theme}>
          <Navbar />
          <animated.div
            style={{
              ...gradientAnimation,
              backgroundImage: gradientBackground,
              backgroundSize: '100% 400%',
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
