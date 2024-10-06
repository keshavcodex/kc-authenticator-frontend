'use client';

import { deleteApp, deleteUser, getUsersByAppId } from '@/api/apiService';
import StickyHeadTable from '@/components/table/StickyHeadTable';
import theme from '@/components/theme';
import { ENDUSER, RESPONSE, USER } from '@/types/interfaces';
import { Box, Button, CircularProgress, Typography, useMediaQuery } from '@mui/material';
import { redirect, useParams, usePathname, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import Link from 'next/link';
import { TimeFormatter } from '@/util/timeFormatter';
import { useRouter } from 'next/navigation';
import { DeleteModal } from '@/components/DeleteModal';

export default function App() {
  const [userList, setUserList] = useState<Array<ENDUSER>>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [deleteId, setDeleteId] = useState('');
  const [open, setOpen] = useState(false);
  const mdScreen = useMediaQuery(theme.breakpoints.down('md'));
  const router = useRouter();
  const path = usePathname();
  const params = useSearchParams();

  const appId = params.get('appId') || '';
  const appName = params.get('appName') || '';
  const user: USER = useSelector((state: any) => state.user.userInfo);
  if (user === null) redirect('/auth');

  const columns = { id: 'UserId', name: 'Name', phone: 'Phone', email: 'Email', createdAt: 'Created At' };

  useEffect(() => {
    fetchUserList();
  }, []);

  const DataFormatter = (userData: ENDUSER[]) => {
    const data = userData.map((usr) => ({
      id: usr.id,
      appId: usr.appId,
      name: usr.firstName + ' ' + usr.lastName,
      phone: usr.phone,
      email: usr.email,
      createdAt: TimeFormatter(usr.createdAt || ''),
    }));
    return data;
  };

  const fetchUserList = async () => {
    try {
      setIsLoading(true);
      const response: RESPONSE = await getUsersByAppId(appId);
      if (response?.isSuccess) {
        setUserList(DataFormatter(response.users));
      }
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      console.log(error);
    }
  };

  const handleEdit = (id: string) => {
    router.push(`${path}/edit?id=${id}&appId=${appId}`);
  };

  const handleDelete = (id: string) => {
    setOpen(true);
    setDeleteId(id);
  };

  const confirmDelete = async () => {
    try {
      setOpen(false);
      await deleteUser(deleteId);
      fetchUserList();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Box>
      <DeleteModal title={'Do want to delete this user?'} open={open}>
        <Button variant="outlined" color="success" onClick={() => setOpen(false)}>
          Cancle
        </Button>
        <Button variant="outlined" color="error" onClick={confirmDelete}>
          Delete
        </Button>
      </DeleteModal>
      <Box sx={{ display: 'flex', justifyContent: 'center', flexDirection: 'column', alignItems: 'center' }}>
        <Typography sx={{ color: theme.palette.primary.contrastText, fontFamily: 'cursive', fontSize: 40, textDecorationLine: 'underline' }}>
          {appName}
        </Typography>
        <Typography sx={{ color: theme.palette.primary.contrastText, fontSize: 25, mb: 2 }}>AppId: {appId}</Typography>
      </Box>
      <Box sx={{ display: 'flex', justifyContent: 'center' }}>
        <Typography sx={{ color: theme.palette.primary.contrastText, fontSize: 20 }}>Add new user</Typography>
        <Link href={`/application/users/create?appId=${appId}&appName=${appName}`}>
          <Button variant="outlined" color="primary" sx={{ color: '#fff', borderColor: '#fff', mx: 5 }}>
            add
          </Button>
        </Link>
      </Box>
      {isLoading ? (
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mt: 10, color: theme.palette.primary.contrastText }}>
          <CircularProgress size={50} variant="indeterminate" sx={{ my: 2, color: theme.palette.primary.contrastText }} />
          <Typography>Fetching Application list</Typography>
        </Box>
      ) : (
        <Box sx={{ p: mdScreen ? 0 : 2 }}>
          {userList.length > 0 ? (
            <StickyHeadTable
              columns={columns}
              data={userList}
              handleEdit={handleEdit}
              handleDelete={handleDelete}
              // handleBody={}
            ></StickyHeadTable>
          ) : (
            <Typography sx={{ color: '#fff', display: 'flex', justifyContent: 'center', fontSize: 20 }}>
              Currently there are no users for this app
            </Typography>
          )}
        </Box>
      )}
    </Box>
  );
}
