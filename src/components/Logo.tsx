import Link from 'next/link';
import theme from './theme';
import Image from 'next/image';
import kcIcon from '/public/images/kc-icon.png';
import { Box, Typography } from '@mui/material';
import { useRouter } from 'next/navigation';

export default function Logo() {
  const router = useRouter();

  return (
    <Box onClick={() => router.replace('/')} sx={{ pl: 1.5, m: 1, display: 'flex', flexDirection: 'row', alignItems: 'center', cursor: 'pointer' }}>
      <Image src={kcIcon} alt="KC Icon" width={25} height={25} />
      <Typography variant="h6" mx={0.5}>
        KC Auth
      </Typography>
    </Box>
  );
}
