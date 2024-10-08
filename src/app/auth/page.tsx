'use client';
import {
  Box,
  Button,
  Card,
  CardContent,
  CircularProgress,
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  TextField,
  Typography,
} from '@mui/material';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import { useEffect, useState } from 'react';
import { RESPONSE } from '@/types/interfaces';
import { loginUser } from '@/api/apiService';
import { useDispatch, useSelector } from 'react-redux';
import { loginValidator } from '@/util/validator';
import { setUserInfo } from '@/store/store';
import theme from '@/components/theme';
import { usePathname, useRouter } from 'next/navigation';
import Link from 'next/link';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

export default function Login() {
  const dispatch = useDispatch();
  const router = useRouter();
  const path = usePathname();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string[]>([]);
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async () => {
    try {
      const body = { devEmail: email, password };
      const validation = loginValidator(body);
      if (!validation.isValid) {
        setError(validation.errors);
        return;
      } else {
        setError([]);
      }
      setIsLoading(true);
      const response: RESPONSE = await loginUser(body);
      setIsLoading(false);
      if (response?.isSuccess) {
        dispatch(setUserInfo(response.developer));
        setError([]);
        router.replace('/');
      } else {
        setError([response.message]);
      }
    } catch (error) {
      setIsLoading(false);
      console.log(error);
    }
  };
  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === 'Enter') {
      handleLogin();
    }
  };
  return (
    <Box>
      <Typography variant="h4" sx={{ textAlign: 'center' }}></Typography>
      <Box display="flex" justifyContent="center" mt={4}>
        <Card sx={{ maxWidth: 300, boxShadow: 3, pb: 5 }}>
          <CardContent>
            <Typography variant="h5" sx={{ textAlign: 'center' }}>
              Login to <br />
              KCAuthenticator
            </Typography>
            <Box component="form">
              <TextField
                label="Email"
                variant="outlined"
                fullWidth
                margin="dense"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                onKeyDownCapture={handleKeyDown}
              />
              <FormControl sx={{ mt: 1, width: '100%' }} variant="outlined">
                <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
                <OutlinedInput
                  label="Password"
                  id="outlined-adornment-password"
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  onKeyDownCapture={handleKeyDown}
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton aria-label="toggle password visibility" onClick={() => setShowPassword(!showPassword)} edge="end">
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  }
                />
              </FormControl>
              {error.length > 0 &&
                error.map((message, index) => (
                  <Box
                    key={index}
                    sx={{
                      display: 'flex',
                      color: 'red',
                      justifyContent: 'start',
                    }}
                  >
                    <InfoOutlinedIcon fontSize="small" />
                    <Typography sx={{ pl: 0.5, mb: 1 }}>{message}</Typography>
                  </Box>
                ))}
              <Box display="flex" justifyContent="space-between" alignItems="center" mt={1}>
                <Link href={path + '/forgot-password'}>
                  <Typography sx={{ textDecoration: 'underline', color: theme.palette.primary.main }} variant="body2">
                    Forgot Password?
                  </Typography>
                </Link>
                {isLoading ? (
                  <Box pr={2}>
                    <CircularProgress size={30} variant="indeterminate" />
                  </Box>
                ) : (
                  <Button variant="contained" color="primary" onClick={handleLogin}>
                    Login
                  </Button>
                )}
              </Box>
            </Box>
          </CardContent>
          <Box textAlign="center" mt={1}>
            <Link href={path + '/register'}>
              <Typography sx={{ textDecoration: 'underline', color: theme.palette.primary.main }} variant="body2">
                Don&apos;t have an account? Sign Up
              </Typography>
            </Link>
          </Box>
        </Card>
      </Box>
    </Box>
  );
}
