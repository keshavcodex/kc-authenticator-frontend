'use client';
import { register } from '@/api/apiService';
import theme from '@/components/theme';
import { setUserInfo } from '@/store/store';
import { RESPONSE } from '@/types/interfaces';
import { signUpValidator } from '@/util/validator';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
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
import Link from 'next/link';
import { redirect, usePathname, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

export default function Register() {
  const router = useRouter();
  const path = usePathname();

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [cnfPassword, setCnfPassword] = useState('');
  const [phone, setPhone] = useState('');
  const [error, setError] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleRegister = async () => {
    try {
      const body = {
        firstName: firstName.trim(),
        lastName: lastName.trim(),
        phone: phone.trim(),
        devEmail: email.trim().toLowerCase(),
        password: password,
        cnfPassword: cnfPassword,
      };
      const validation = signUpValidator(body);
      if (!validation.isValid) {
        setError(validation.errors);
        return;
      } else {
        setError([]);
      }
      setIsLoading(true);
      const response: RESPONSE = await register(body);
      console.log(response);
      if (response?.isSuccess) {
        localStorage.setItem('referenceId', response?.developer?.id);
        setError([]);
        router.push(path + '/validate');
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
        <Card sx={{ maxWidth: 300, boxShadow: 3, pb: 5 }}>
          <CardContent>
            <Typography variant="h5" sx={{ textAlign: 'center' }}>
              Register to <br />
              KCAuthenticator
            </Typography>
            <Box>
              <TextField
                label="First Name"
                variant="outlined"
                fullWidth
                margin="dense"
                size="small"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
              />
              <TextField
                label="Last Name"
                variant="outlined"
                fullWidth
                margin="dense"
                size="small"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
              />
              <TextField
                label="Phone"
                variant="outlined"
                fullWidth
                margin="dense"
                size="small"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
              <TextField
                label="Email"
                variant="outlined"
                fullWidth
                margin="dense"
                size="small"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <FormControl sx={{ mt: 1, width: '100%' }} variant="outlined">
                <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
                <OutlinedInput
                  label="Password"
                  id="outlined-adornment-password"
                  size="small"
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={() => setShowPassword(!showPassword)}
                        edge="end"
                      >
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
                  size="small"
                  type={showPassword ? 'text' : 'password'}
                  value={cnfPassword}
                  onChange={(e) => setCnfPassword(e.target.value)}
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={() => setShowPassword(!showPassword)}
                        edge="end"
                      >
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
                <Button variant="contained" color="primary" onClick={handleRegister} fullWidth sx={{ mt: 1 }}>
                  Signup
                </Button>
              )}
            </Box>
          </CardContent>
          <Box textAlign="center" mt={2}>
            <Link href={'/auth'}>
              <Typography sx={{ textDecoration: 'underline', color: theme.palette.primary.main }} variant="body2">
                Already have an account? Login
              </Typography>
            </Link>
          </Box>
        </Card>
      </Box>
    </Box>
  );
}
