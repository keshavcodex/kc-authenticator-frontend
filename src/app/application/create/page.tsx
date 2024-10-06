'use client';
import { checkAppName, createApp } from '@/api/apiService';
import { CREATEAPP } from '@/types/interfaces';
import { Box, Button, Card, CardContent, CircularProgress, TextField, Typography } from '@mui/material';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import theme from '@/components/theme';
import { useRouter } from 'next/navigation';
import { MessageList } from '@/components/MessageList';

export default function CreateApp() {
  const [appName, setAppName] = useState<string>('');
  const [message, setMessage] = useState<Array<string>>([]);
  const [isAvailable, setIsAvailable] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();
  const user = useSelector((state: any) => state.user.userInfo);

  const handleAppCreate = async () => {
    try {
      if (appName === '') return;
      setIsLoading(true);
      const body: CREATEAPP = { devId: user.id, appName };
      const response = await createApp(body);
      if (response.isSuccess) router.back();
      else {
        setMessage([response.message]);
        setIsAvailable(response.isSuccess);
        setIsLoading(false);
      }
    } catch (error) {
      setIsLoading(false);
      console.log(error);
    }
  };

  const handleChange = async (e: any) => {
    setAppName(e.target.value);
    try {
      if (e.target.value === '') {
        setIsAvailable(true);
        setMessage([]);
        return;
      }
      const response = await checkAppName(user.id, e.target.value);
      setIsAvailable(!response.isSuccess);
      if (response.isSuccess) {
        setMessage(['App name is already in use']);
      } else {
        setMessage(['App name is available']);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (isAvailable && event.key === 'Enter') {
      handleAppCreate();
    }
  };
  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', mt: 5 }}>
      <Card sx={{ width: 300, boxShadow: 3 }}>
        <CardContent>
          <Typography variant="h5" sx={{ textAlign: 'center' }}>
            Create new app
          </Typography>
          <TextField
            label="Application Name"
            variant="outlined"
            fullWidth
            margin="dense"
            size="small"
            value={appName}
            onChange={handleChange}
            onKeyDownCapture={handleKeyDown}
          />
          {message.length > 0 && (
            <MessageList
              messages={message}
              icon={isAvailable ? CheckCircleOutlineIcon : InfoOutlinedIcon}
              color={isAvailable ? theme.palette.primary.main : 'red'}
            />
          )}
          {isLoading ? (
            <Box display="flex" justifyContent="center" mt={1}>
              <CircularProgress size={30} />
            </Box>
          ) : (
            <Button disabled={!isAvailable} variant="contained" color="primary" fullWidth sx={{ mt: 2 }} onClick={handleAppCreate}>
              Create
            </Button>
          )}
        </CardContent>
      </Card>
    </Box>
  );
}
