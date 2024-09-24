'use client';
import { signupValidation } from '@/api/apiService';
import theme from '@/components/theme';
import { setUserInfo } from '@/store/store';
import { RESPONSE } from '@/types/interfaces';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import { Box, Button, Card, CardContent, CircularProgress, Link, TextField, Typography } from '@mui/material';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useDispatch } from 'react-redux';

export default function Register() {
  const dispatch = useDispatch();

  const router = useRouter();
  const [otp, setOtp] = useState('');
  const [error, setError] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const referenceId = localStorage.getItem('referenceId') || '';

  const handleSignupValidation = async () => {
    try {
      setIsLoading(true);
      const body = {
        referenceId,
        otp,
      };
      const response: RESPONSE = await signupValidation(body);
      console.log(response);
      if (response?.isSuccess) {
        dispatch(setUserInfo(response.developer));
        localStorage.setItem('referenceId', response?.developer?.id);
        setError([]);
        router.replace('/');
      }else {
        setError([response.message]);
      }
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      console.log(error);
    }
  };
  return (
    <Box>
      <Typography variant="h4" sx={{ textAlign: 'center' }}></Typography>
      <Box display="flex" justifyContent="center" mt={4}>
        <Card sx={{ maxWidth: 300, boxShadow: 3, pb: 5 }}>
          <CardContent>
            <Typography variant="h5" sx={{ textAlign: 'center' }}>
              OTP sent on your email
            </Typography>
            <Box>
              <TextField
                label="otp"
                variant="outlined"
                fullWidth
                size="small"
                margin="dense"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
              />
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
              {isLoading ? (
                <Box sx={{ display: 'flex', justifyContent: 'center', mt: 1 }}>
                  <CircularProgress size={30} variant="indeterminate" />
                </Box>
              ) : (
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleSignupValidation}
                  fullWidth
                  size="small"
                  sx={{ mt: 1 }}
                >
                  Confirm
                </Button>
              )}
            </Box>
          </CardContent>
          <Box textAlign="center">
            <Typography
              onClick={() => router.push('/auth')}
              sx={{ textDecoration: 'underline', color: theme.palette.primary.main }}
              variant="body2"
            >
              Already have an account? Login
            </Typography>
          </Box>
        </Card>
      </Box>
    </Box>
  );
}
