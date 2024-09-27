'use client';

import { getAllApps, getApps } from '@/api/apiService';
import StickyHeadTable from '@/components/table/StickyHeadTable';
import theme from '@/components/theme';
import { USER } from '@/types/interfaces';
import { sleep } from '@/util/helper';
import { Box, CircularProgress, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

export default function Dashboard() {
  const [appList, setAppList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const columns = { id: 'ApplicationId', appName: 'Application' };

  const user: USER = useSelector((state: any) => state.user.userInfo);

  useEffect(() => {
    fetchAppList();
  }, []);

  const fetchAppList = async () => {
    try {
      setIsLoading(true);
      const response = await getApps(user.id);
      setAppList(response.apps);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      console.log(error);
    }
  };

  return (
    <Box>
      {isLoading ? (
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mt: 10, color: theme.palette.primary.contrastText }}>
          <CircularProgress size={50} variant="indeterminate" sx={{ my: 2, color: theme.palette.primary.contrastText }} />
          <Typography>Fetching Application list</Typography>
        </Box>
      ) : (
        <Box sx={{ p: 2 }}>{appList.length > 0 && <StickyHeadTable columns={columns} data={appList}></StickyHeadTable>}</Box>
      )}
    </Box>
  );
}
