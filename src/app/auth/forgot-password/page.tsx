'use client';

import { passwordReset } from '@/api/apiService';
import theme from '@/components/theme';
import { setUserInfo } from '@/store/store';
import { RESPONSE } from '@/types/interfaces';
import { sleep } from '@/util/helper';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import MarkEmailReadRoundedIcon from '@mui/icons-material/MarkEmailReadRounded';
import { Box, Button, Card, CardContent, CircularProgress, Link, TextField, Typography } from '@mui/material';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';

export default function ForgotPassword() {
  const dispatch = useDispatch();
  const router = useRouter();

  const [email, setEmail] = useState('');
  const [message, setMessage] = useState<string[]>([]);
  const [isSuccess, setIsSucess] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [counter, setCounter] = useState(30);
  const [isWaiting, setIsWaiting] = useState(false);

  useEffect(() => {
    let timer: any;
    if (isSuccess && counter > 0) {
      setIsWaiting(true); // Start waiting when resetClicked is true
      timer = setInterval(() => {
        setCounter((prevCounter) => prevCounter - 1);
      }, 1000);
    }

    if (counter === 0) {
      setIsWaiting(false);
      clearInterval(timer);
    }

    return () => clearInterval(timer);
  }, [isSuccess, counter]);

  const handlePasswordReset = async () => {
    try {
      setIsLoading(true);
      setCounter(30);
      const body = {
        email: email.trim(),
        frontendUrl: window.location.href.split('/auth')[0] + '/auth/new-password',
      };
      console.log(body);
      const response: RESPONSE = await passwordReset(body);
      console.log(response);
      setIsSucess(response.isSuccess);
      setMessage([response.message]);
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
              Reset your password
            </Typography>

            {isSuccess && message.length > 0 ? (
              <Box mt={2}>
                {message.length > 0 &&
                  message.map((text, index) => (
                    <Box
                      key={index}
                      sx={{
                        display: 'flex',
                        color: theme.palette.primary.main,
                        justifyContent: 'start',
                      }}
                    >
                      <MarkEmailReadRoundedIcon fontSize="small" />
                      <Typography sx={{ pl: 0.5, mb: 1 }}>{text}</Typography>
                    </Box>
                  ))}
                <Button
                  variant="contained"
                  color="primary"
                  fullWidth
                  onClick={() => router.replace('/')}
                  size="small"
                  sx={{ mt: 2 }}
                >
                  Ok
                </Button>
              </Box>
            ) : (
              <Box>
                <TextField
                  label="Email"
                  variant="outlined"
                  fullWidth
                  size="small"
                  margin="normal"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                {message.length > 0 &&
                  message.map((text, index) => (
                    <Box
                      key={index}
                      sx={{
                        display: 'flex',
                        color: 'red',
                        justifyContent: 'start',
                      }}
                    >
                      <InfoOutlinedIcon fontSize="small" />
                      <Typography sx={{ pl: 0.5, mb: 1 }}>{text}</Typography>
                    </Box>
                  ))}

                {isLoading ? (
                  <Box sx={{ display: 'flex', justifyContent: 'center', mt: 1 }}>
                    <CircularProgress size={30} variant="indeterminate" />
                  </Box>
                ) : (
                  <Box>
                    {isSuccess && (
                      <Typography
                        sx={{
                          mt: 1,
                          textAlign: 'center',
                          color: theme.palette.primary.main,
                        }}
                        variant="body2"
                      >
                        {`Resend the email in ${counter}s`}
                      </Typography>
                    )}
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={handlePasswordReset}
                      fullWidth
                      disabled={isWaiting}
                      size="small"
                      sx={{ mt: 1 }}
                    >
                      reset
                    </Button>
                  </Box>
                )}
              </Box>
            )}
          </CardContent>
        </Card>
      </Box>
    </Box>
  );
}
