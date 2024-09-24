'use client';
import { setUserInfo } from '@/store/store';
import { Box } from '@mui/material';
import { redirect } from 'next/navigation';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

export default function Page() {

  return (
    <Box>
      <Box>Hello1</Box>
      <Box>Hello2</Box>
      <Box>Hello3</Box>
      <Box>Hello4</Box>
      <Box>Hello5</Box>
      <Box>Hello6</Box>
    </Box>
  );
}
