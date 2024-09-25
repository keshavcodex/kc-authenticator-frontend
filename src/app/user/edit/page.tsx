'use client';
import { editUser, register } from '@/api/apiService';
import theme from '@/components/theme';
import { setUserInfo } from '@/store/store';
import { RESPONSE, USER } from '@/types/interfaces';
import { profileEditValidator, signUpValidator } from '@/util/validator';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import { Box, Button, Card, CardContent, CircularProgress, FormControl, IconButton, InputAdornment, InputLabel, OutlinedInput, TextField, Typography } from '@mui/material';
import Link from 'next/link';
import { redirect, usePathname, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

export default function Register() {
  const router = useRouter();
  const dispatch = useDispatch();

  const user: USER = useSelector((state: any) => state.user.userInfo);

  const [firstName, setFirstName] = useState(user.firstName || '');
  const [lastName, setLastName] = useState(user.lastName || '');
  const [email, setEmail] = useState(user.devEmail || '');
  const [phone, setPhone] = useState(user.phone || '');
  const [error, setError] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleEditUser = async () => {
    try {
      const body = {
        id: user.id,
        firstName: firstName.trim(),
        lastName: lastName.trim(),
        phone: phone.trim(),
      };
      const validation = profileEditValidator(body);
      if (!validation.isValid) {
        setError(validation.errors);
        return;
      } else {
        setError([]);
      }
      setIsLoading(true);
      const response: RESPONSE = await editUser(body);
      console.log(response);
      if (response?.isSuccess) {
        dispatch(setUserInfo(response.developer));
        setError([]);
        router.back();
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
        <Card sx={{ maxWidth: 300, boxShadow: 3, pb: 1 }}>
          <CardContent>
            <Typography variant="h5" sx={{ textAlign: 'center' }}>
              Edit Profile
            </Typography>
            <Box>
              <TextField label="First Name" variant="outlined" fullWidth margin="normal" size="small" value={firstName} onChange={(e) => setFirstName(e.target.value)} />
              <TextField label="Last Name" variant="outlined" fullWidth margin="normal" size="small" value={lastName} onChange={(e) => setLastName(e.target.value)} />
              <TextField label="Phone" variant="outlined" fullWidth margin="normal" size="small" value={phone} onChange={(e) => setPhone(e.target.value)} />
              <TextField disabled label="Email" variant="outlined" fullWidth margin="normal" size="small" value={email} />

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
                <Button variant="contained" color="primary" onClick={handleEditUser} fullWidth sx={{ mt: 1 }}>
                  save
                </Button>
              )}
            </Box>
          </CardContent>
        </Card>
      </Box>
    </Box>
  );
}
