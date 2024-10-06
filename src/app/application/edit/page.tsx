'use client';
import { checkAppName, editApp } from '@/api/apiService';
import { EDITAPP } from '@/types/interfaces';
import { Box, Button, Card, CardContent, CircularProgress, TextField, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import AddIcon from '@mui/icons-material/Add';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import AddTaskIcon from '@mui/icons-material/AddTask';
import theme from '@/components/theme';
import { redirect, useRouter } from 'next/navigation';
import { MessageList } from '@/components/MessageList';
import { sleep } from '@/util/helper';

export default function EditApp() {
  const [id, setId] = useState('');
  const [appName, setAppName] = useState<string>('');
  const [message, setMessage] = useState<Array<string>>([]);
  const [isAvailable, setIsAvailable] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();
  const user = useSelector((state: any) => state.user.userInfo);

  const handleAppEdit = async () => {
    try {
      if (appName === '') {
        setMessage(['App name can not be empty']);
        return;
      } else if (!isAvailable) {
        setMessage(['App name is already in use']);
        return;
      }
      setIsLoading(true);
      const body: EDITAPP = { id, appName };
      const response = await editApp(body);
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
      if (e.target.value.trim() === '') {
        setIsAvailable(true);
        setMessage([]);
        return;
      }
      const response = await checkAppName(user.id, e.target.value.trim());
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
    if (event.key === 'Enter') {
      handleAppEdit();
    }
  };

  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', mt: 5 }}>
      <Card sx={{ width: 300, boxShadow: 3 }}>
        <CardContent>
          <Typography variant="h5" sx={{ textAlign: 'center' }}>
            Edit App Details
          </Typography>
          <TextField
            label="Application Id"
            variant="outlined"
            fullWidth
            margin="dense"
            size="small"
            value={id}
            onChange={(e) => setId(e.target.value)}
            onKeyDownCapture={handleKeyDown}
          />
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
            <Button disabled={!isAvailable} variant="contained" color="primary" fullWidth sx={{ mt: 2 }} onClick={handleAppEdit}>
              Save
            </Button>
          )}
        </CardContent>
      </Card>
    </Box>
  );
}
