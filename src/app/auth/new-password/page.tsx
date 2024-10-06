'use client';
import { register, updatePassword } from '@/api/apiService';
import theme from '@/components/theme';
import { setUserInfo } from '@/store/store';
import { PASSWORDRESET, RESPONSE, UPDATEPASSWORD } from '@/types/interfaces';
import { passwordValidator, signUpValidator } from '@/util/validator';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import MarkEmailReadRoundedIcon from '@mui/icons-material/MarkEmailReadRounded';
import { Box, Button, Card, CardContent, CircularProgress, FormControl, IconButton, InputAdornment, InputLabel, OutlinedInput, TextField, Typography } from '@mui/material';
import Link from 'next/link';
import { redirect, usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

export default function Register() {
  const router = useRouter();
  const searchParam = useSearchParams();

  const [password, setPassword] = useState('');
  const [cnfPassword, setCnfPassword] = useState('');
  const [error, setError] = useState<string[]>([]);
  const [isSuccess, setIsSucess] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handlePasswordUpdate = async () => {
    try {
      const body: UPDATEPASSWORD = {
        token: searchParam.get('token') || '',
        password,
      };
      console.log(body)
      const validation = passwordValidator({ password, cnfPassword });
      if (!validation.isValid) {
        setError(validation.errors);
        return;
      } else {
        setError([]);
      }
      setIsLoading(true);
      const response: RESPONSE = await updatePassword(body);
      console.log(response);
      setIsSucess(response.isSuccess);
      if (response?.isSuccess) {
        setError([response.message]);
      } else {
        setError(['Link has expired, please resend the new link', response.message]);
      }
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      console.log(error);
    }
  };

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === 'Enter') {
      handlePasswordUpdate();
    }
  };
  return (
    <Box>
      <Box display="flex" justifyContent="center" mt={4}>
        <Card sx={{ maxWidth: 300, boxShadow: 3, pb: 1 }}>
          <CardContent>
            <Typography variant="h5" sx={{ textAlign: 'center' }}>
              KC Authenticator <br />
            </Typography>
            {isSuccess ? (
              <Box mt={2}>
                {error.length > 0 &&
                  error.map((text, index) => (
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
                <Button variant="contained" color="primary" fullWidth onClick={() => router.replace('/')} size="small" sx={{ mt: 2 }}>
                  Ok
                </Button>
              </Box>
            ) : (
              <Box>
                <FormControl sx={{ mt: 1, width: '100%' }} variant="outlined">
                  <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
                  <OutlinedInput
                    label="Password"
                    id="outlined-adornment-password"
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    onKeyDown={handleKeyDown}
                    endAdornment={
                      <InputAdornment position="end">
                        <IconButton aria-label="toggle password visibility" onClick={() => setShowPassword(!showPassword)} edge="end">
                          {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    }
                  />
                </FormControl>
                <FormControl sx={{ my: 1.5, width: '100%' }} variant="outlined">
                  <InputLabel htmlFor="outlined-adornment-cnfassword">Confirm Password</InputLabel>
                  <OutlinedInput
                    label="Confirm Password"
                    id="outlined-adornment-cnfpassword"
                    margin="dense"
                    type={showPassword ? 'text' : 'password'}
                    value={cnfPassword}
                    onChange={(e) => setCnfPassword(e.target.value)}
                    onKeyDown={handleKeyDown}
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
                {isLoading ? (
                  <Box sx={{ display: 'flex', justifyContent: 'center', mt: 1 }}>
                    <CircularProgress size={30} variant="indeterminate" />
                  </Box>
                ) : (
                  <Button variant="contained" color="primary" onClick={handlePasswordUpdate} fullWidth sx={{ mt: 1 }}>
                    confirm
                  </Button>
                )}
              </Box>
            )}
          </CardContent>
        </Card>
      </Box>
    </Box>
  );
}
