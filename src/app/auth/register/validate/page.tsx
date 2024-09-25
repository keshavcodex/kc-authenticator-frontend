'use client';
import { otpValidation, resendOtp } from '@/api/apiService';
import theme from '@/components/theme';
import { setUserInfo } from '@/store/store';
import { RESPONSE } from '@/types/interfaces';
import { sleep } from '@/util/helper';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import { Box, Button, Card, CardContent, CircularProgress, Link, TextField, Typography } from '@mui/material';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';

export default function ValidateRegistration() {
  const dispatch = useDispatch();
  const router = useRouter();
  const [otp, setOtp] = useState('');
  const [error, setError] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [counter, setCounter] = useState(60); // 60 seconds countdown
  const [isWaiting, setIsWaiting] = useState(true);
  const referenceId = localStorage.getItem('referenceId') || '';
  
  useEffect(() => {
    let timer: any;
    if (isWaiting && counter > 0) {
      timer = setInterval(() => {
        setCounter((prevCounter) => prevCounter - 1);
      }, 1000);
    }
    
    if (counter === 0) {
      setIsWaiting(false);
      clearInterval(timer);
    }
    
    return () => clearInterval(timer);
  }, [isWaiting, counter]);
  
  const handleOtpValidation = async () => {
    try {
      setIsLoading(true);
      const body = {
        referenceId,
        otp,
      };
      const response: RESPONSE = await otpValidation(body);
      console.log(response);
      if (response?.isSuccess) {
        dispatch(setUserInfo(response.developer));
        setError([]);
        router.replace('/');
      } else {
        setError([response.message]);
      }
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      console.log(error);
    }
  };
  
  const handleResendOtp = async () => {
    try {
      setIsLoading(true);
      console.log('Resending OTP...');
      
      // Start countdown
      setCounter(60);
      setIsWaiting(true);
      sleep(15);
      console.log("referenceId", referenceId);
      const response: RESPONSE = await resendOtp(referenceId);
      console.log(response);
      if (response?.isSuccess) {
        dispatch(setUserInfo(response.developer));
        setError([]);
        router.replace('/');
      } else {
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
        <Card sx={{ maxWidth: 300, boxShadow: 3 }}>
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
              <Typography
                onClick={isWaiting ? undefined : handleResendOtp}
                sx={{
                  mt: 1,
                  textAlign: 'center',
                  color: theme.palette.primary.main,
                  cursor: isWaiting ? 'default' : 'pointer',
                  textDecoration: isWaiting ? 'none' : 'underline',
                }}
                variant="body2"
              >
                {isWaiting ? `Resend OTP in ${counter}s` : 'Resend OTP'}
              </Typography>
              {isLoading ? (
                <Box sx={{ display: 'flex', justifyContent: 'center', mt: 1 }}>
                  <CircularProgress size={30} variant="indeterminate" />
                </Box>
              ) : (
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleOtpValidation}
                  fullWidth
                  size="small"
                  sx={{ mt: 2 }}
                >
                  Confirm
                </Button>
              )}
            </Box>
          </CardContent>
        </Card>
      </Box>
    </Box>
  );
}
