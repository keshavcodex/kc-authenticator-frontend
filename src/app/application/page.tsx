'use client';

import { deleteApp, getAllApps, getApps } from '@/api/apiService';
import StickyHeadTable from '@/components/table/StickyHeadTable';
import theme from '@/components/theme';
import { APPDATA, USER } from '@/types/interfaces';
import { sleep } from '@/util/helper';
import { Box, Button, CircularProgress, Typography, useMediaQuery } from '@mui/material';
import { redirect, usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import AddIcon from '@mui/icons-material/Add';
import Link from 'next/link';
import { TimeFormatter } from '@/util/timeFormatter';
import { useRouter } from 'next/navigation';
import DeleteModal from '@/components/DeleteModal';

export default function App() {
  const [appList, setAppList] = useState<Array<APPDATA>>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [deleteId, setDeleteId] = useState('');
  const [open, setOpen] = useState(false);

  const smScreen = useMediaQuery(theme.breakpoints.down('sm'));
  const router = useRouter();
  const path = usePathname();
  const user: USER = useSelector((state: any) => state.user.userInfo);
  if (user === null) redirect('/auth');

  const columns = { id: 'ApplicationId', appName: 'Application', updatedAt: 'Last Modified', createdAt: 'Created At', userCount: 'User Count' };

  useEffect(() => {
    fetchAppList();
  }, []);

  const DataFormatter = (appData: APPDATA[]) => {
    const data = appData.map((app) => ({
      appName: app.appName,
      createdAt: TimeFormatter(app.createdAt),
      updatedAt: TimeFormatter(app.updatedAt),
      devId: app.devId,
      id: app.id,
      userCount: app.userCount,
    }));
    return data;
  };

  const fetchAppList = async () => {
    try {
      setIsLoading(true);
      const response = await getApps(user.id);
      console.log(response.apps);
      // setAppList(response.apps);
      setAppList(DataFormatter(response.apps));
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      console.log(error);
    }
  };

  const handleEdit = (id: string) => {
    router.push(`${path}/edit/${id}`);
  };

  const handleDelete = (id: string) => {
    setOpen(true);
    setDeleteId(id);
  };

  const confirmDelete = async () => {
    try {
      const response = await deleteApp(deleteId);
      if (response.isSuccess) {
        setOpen(false);
        fetchAppList();
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Box>
      <DeleteModal title={'Are you surely want to delete this app?'} open={open}>
        <Box sx={{ display: 'flex', justifyContent: 'space-around', mt: 3 }}>
          <Button variant="outlined" color="success" onClick={() => setOpen(false)}>
            Cancle
          </Button>
          <Button variant="outlined" color="error" onClick={confirmDelete}>
            Delete
          </Button>
        </Box>
      </DeleteModal>
      <Box sx={{ display: 'flex', justifyContent: 'center' }}>
        <Typography sx={{ color: theme.palette.primary.contrastText, fontSize: 25 }}>Create a new app</Typography>
        <Link href="/application/create">
          <Button variant="outlined" color="primary" sx={{ color: '#fff', borderColor: '#fff', mx: 5 }}>
            Create <AddIcon fontSize="small" />
          </Button>
        </Link>
      </Box>
      {isLoading ? (
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mt: 10, color: theme.palette.primary.contrastText }}>
          <CircularProgress size={50} variant="indeterminate" sx={{ my: 2, color: theme.palette.primary.contrastText }} />
          <Typography>Fetching Application list</Typography>
        </Box>
      ) : (
        <Box sx={{ p: smScreen ? 0 : 2 }}>
          {appList.length > 0 && (
            <StickyHeadTable columns={columns} data={appList} handleEdit={handleEdit} handleDelete={handleDelete}></StickyHeadTable>
          )}
        </Box>
      )}
    </Box>
  );
}
