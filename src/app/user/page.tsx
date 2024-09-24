'use client';

import { Typography } from '@mui/material';
import React from 'react';
import { useSelector } from 'react-redux';

export default function page() {
  const user = useSelector((state: any) => state.user.userInfo);
  return (
    <div>
      <h2>User Page</h2>
      <Typography>{JSON.stringify(user)}</Typography>
    </div>
  );
}
