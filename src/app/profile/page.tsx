'use client';

import { USER } from '@/types/interfaces';
import { Avatar, Box, Button, Typography } from '@mui/material';
import React from 'react';
import { useSelector } from 'react-redux';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import LockResetIcon from '@mui/icons-material/LockReset';
import EditIcon from '@mui/icons-material/Edit';
import { redirect, usePathname } from 'next/navigation';
import Link from 'next/link';

export default function Profile() {
  const Path = usePathname();

  const user: USER = useSelector((state: any) => state.user.userInfo);
  if (user === null) redirect('/auth');

  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', mt: 5 }}>
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          flexDirection: 'column',
          padding: 2,
          backgroundColor: '#f5f5f5', // Light background for better contrast
          borderRadius: 2,
          boxShadow: 3,
          width: '300px', // Set a fixed width for consistency
          textAlign: 'center',
        }}
      >
        {/* <Avatar
          src={user.profilePicture} // Assuming user.profilePicture is a URL to the image
          alt={`${user.firstName} ${user.lastName}`}
          sx={{ width: 100, height: 100, marginBottom: 2 }} // Style for Avatar
        /> */}
        <AccountCircleIcon fontSize="large" />

        <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 1 }}>
          {user?.firstName}&nbsp;{user?.lastName}
        </Typography>
        <Typography variant="body2" sx={{ color: 'gray', mb: 1 }}>
          {user?.phone}
        </Typography>
        <Typography variant="body2" sx={{ color: 'gray', mb: 2 }}>
          {user?.devEmail}
        </Typography>
        <Box sx={{ display: 'flex', flexDirection: 'column' }}>
          <Link href={Path + '/edit'}>
            <Button variant="outlined" fullWidth sx={{ my: 1.5, justifyContent: 'space-evenly' }}>
              <EditIcon fontSize="small" />
              <Typography>Edit Profile</Typography>
            </Button>
          </Link>
          <Link href={'/auth/forgot-password'}>
            <Button variant="outlined" fullWidth sx={{ justifyContent: 'space-evenly' }}>
              <LockResetIcon fontSize="small" />
              <Typography>Change Password</Typography>
            </Button>
          </Link>
        </Box>
      </Box>
    </Box>
  );
}
