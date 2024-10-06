'use client';
import { editEndUser, getEndUser } from '@/api/apiService';
import { CREATEAPP, ENDUSER } from '@/types/interfaces';
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
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import theme from '@/components/theme';
import { redirect, useRouter, useSearchParams } from 'next/navigation';
import { MessageList } from '@/components/MessageList';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { profileEditValidator, signUpValidator } from '@/util/validator';

export default function EditUser() {
  const router = useRouter();
  const params = useSearchParams();
  const user = useSelector((state: any) => state.user.userInfo);
  if (user === null) redirect('/');

  const id = params.get('id') || '';
  const appId = params.get('appId') || '';

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState<Array<string>>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  useEffect(() => {
    fetchEndUser();
  }, []);

  const fetchEndUser = async () => {
    try {
      setIsLoading(true);
      const response = await getEndUser(id);
      if (response.isSuccess) {
        const user = response.user;
        setFirstName(user.firstName);
        setLastName(user.lastName);
        setPhone(user.phone);
        setEmail(user.email)
      } else {
        setMessage([response.message]);
      }
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      console.log(error);
    }
  };

  const handleUserEdit = async () => {
    try {
      const body = { id, firstName, lastName, phone, devEmail: email, email };
      const validation = profileEditValidator(body);
      if (!validation.isValid) {
        setMessage(validation.errors);
        return;
      } else {
        setMessage([]);
      }
      setIsLoading(true);
      const response = await editEndUser(body);
      setIsSuccess(response.isSuccess);
      if (response.isSuccess) router.back();
      else {
        setMessage([response.message]);
        setIsLoading(false);
      }
    } catch (error) {
      setIsLoading(false);
      console.log(error);
    }
  };

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === 'Enter') {
      handleUserEdit();
    }
  };
  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', mt: 5 }}>
      <Card sx={{ width: 300, boxShadow: 3 }}>
        <CardContent>
          <Typography variant="h5" sx={{ textAlign: 'center', mb: 2 }}>
            Edit user details
          </Typography>
          <TextField
            label="First Name"
            variant="outlined"
            fullWidth
            margin="dense"
            size="small"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            onKeyDownCapture={handleKeyDown}
          />
          <TextField
            label="Last Name"
            variant="outlined"
            fullWidth
            margin="dense"
            size="small"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            onKeyDownCapture={handleKeyDown}
          />
          <TextField
            label="Phone"
            variant="outlined"
            fullWidth
            margin="dense"
            size="small"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            onKeyDownCapture={handleKeyDown}
          />
          <TextField
            label="Email"
            variant="outlined"
            fullWidth
            margin="dense"
            size="small"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            onKeyDownCapture={handleKeyDown}
          />
          {message.length > 0 && <MessageList messages={message} icon={InfoOutlinedIcon} color={'red'} />}
          {isLoading ? (
            <Box display="flex" justifyContent="center" mt={1}>
              <CircularProgress size={30} />
            </Box>
          ) : (
            <Button variant="contained" color="primary" fullWidth sx={{ mt: 2 }} onClick={handleUserEdit}>
              Save
            </Button>
          )}
        </CardContent>
      </Card>
    </Box>
  );
}
