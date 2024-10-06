'use client';
import { checkAppName, createApp, createUser } from '@/api/apiService';
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
import { useState } from 'react';
import { useSelector } from 'react-redux';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import theme from '@/components/theme';
import { useRouter, useSearchParams } from 'next/navigation';
import { MessageList } from '@/components/MessageList';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { signUpValidator } from '@/util/validator';

export default function CreateUser() {
  const router = useRouter();
  const params = useSearchParams();
  const user = useSelector((state: any) => state.user.userInfo);

  const appId = params.get('appId') || '';
  const appName = params.get('appName') || '';

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [cnfPassword, setCnfPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [message, setMessage] = useState<Array<string>>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleUserCreate = async () => {
    try {
      const body = { appId, firstName, lastName, phone, devEmail: email, email, password, cnfPassword };
      const validation = signUpValidator(body);
      if (!validation.isValid) {
        setMessage(validation.errors);
        return;
      } else {
        setMessage([]);
      }
      setIsLoading(true);
      const response = await createUser(body);
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
      handleUserCreate();
    }
  };
  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', mt: 5 }}>
      <Card sx={{ width: 300, boxShadow: 3 }}>
        <CardContent>
          <Typography variant="h5" sx={{ textAlign: 'center' }}>
            Create New User For
          </Typography>
          <Typography variant="h5" sx={{ textAlign: 'center', mb: 2, fontFamily: 'cursive' }}>
            {appName}
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
          <FormControl sx={{ mt: 1, width: '100%' }} variant="outlined">
            <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
            <OutlinedInput
              label="Password"
              id="outlined-adornment-password"
              size="small"
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
          {message.length > 0 && <MessageList messages={message} icon={InfoOutlinedIcon} color={'red'} />}
          {isLoading ? (
            <Box display="flex" justifyContent="center" mt={1}>
              <CircularProgress size={30} />
            </Box>
          ) : (
            <Button variant="contained" color="primary" fullWidth sx={{ mt: 2 }} onClick={handleUserCreate}>
              Create
            </Button>
          )}
        </CardContent>
      </Card>
    </Box>
  );
}
