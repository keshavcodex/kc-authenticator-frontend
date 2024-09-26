import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import AccountCircle from '@mui/icons-material/AccountCircle';
import MenuItem from '@mui/material/MenuItem';
import DashboardIcon from '@mui/icons-material/Dashboard';
import ArticleIcon from '@mui/icons-material/Article';
import Menu from '@mui/material/Menu';
import { Drawer, List, ListItem, ListItemIcon, ListItemText, useMediaQuery, useTheme } from '@mui/material';
import { MouseEvent, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '@/store/store';
import { redirect, usePathname, useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import kcIcon from '@/../public/images/kc-con-white.png'; // Importing the image

export default function Navbar() {
  const theme = useTheme();
  const dispatch = useDispatch();
  const router = useRouter();
  const path = usePathname();

  const [isDrawerOpen, setDrawerOpen] = useState(false);

  const smScreen = useMediaQuery(theme.breakpoints.down('sm'));
  const isAuthenticated = useSelector((state: any) => state.user.isAuthenticated);

  useEffect(() => {
    if (isAuthenticated && path.startsWith('/auth')) redirect('/');
  }, []);

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleMenu = (event: MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    router.push('/user');
    setAnchorEl(null);
  };
  const handleLogout = () => {
    setAnchorEl(null);
    localStorage.clear();
    dispatch(logout());
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar sx={{ bgcolor: '#181818' }} position="static">
        <Toolbar>
          {isDrawerOpen ? (
            <>
              <Drawer
                anchor="left"
                open={isDrawerOpen}
                onClose={() => setDrawerOpen(false)}
                PaperProps={{
                  sx: {
                    pt: 1,
                    backgroundColor: '#333333',
                    color: '#fff',
                  },
                }}
              >
                <List>
                  <ListItem
                    onClick={() => {
                      router.push('/');
                      setDrawerOpen(false);
                    }}
                    sx={{ cursor: 'pointer' }}
                  >
                    <DashboardIcon sx={{ px: 1 }} />
                    <ListItemText primary="Dashboard" />
                  </ListItem>
                  <ListItem
                    onClick={() => {
                      router.push('/docs');
                      setDrawerOpen(false);
                    }}
                    sx={{ cursor: 'pointer' }}
                  >
                    <ArticleIcon sx={{ px: 1 }} />
                    <ListItemText primary="Docs" />
                  </ListItem>
                </List>
              </Drawer>
            </>
          ) : (
            <>
              {smScreen ? (
                <IconButton size="large" edge="start" color="inherit" aria-label="menu" sx={{ mr: 2 }}>
                  <MenuIcon onClick={() => setDrawerOpen(true)} />
                </IconButton>
              ) : (
                <>
                  <Link href="/" style={{ textDecoration: 'none', color: theme.palette.primary.contrastText, paddingRight: 20 }}>
                    <Image src={kcIcon} alt="KC Icon" width={40} height={40} />
                  </Link>
                  <Link href="/dashboard" style={{ textDecoration: 'none', color: theme.palette.primary.contrastText }}>
                    <Typography sx={{ textDecorationLine: 'none' }} variant="h6">
                      Dashboard
                    </Typography>
                  </Link>
                  <Link href="/docs" style={{ textDecoration: 'none', flex: 110, color: theme.palette.primary.contrastText }}>
                    <Typography sx={{ textDecorationLine: 'none', pl: 3 }} variant="h6">
                      Docs
                    </Typography>
                  </Link>
                </>
              )}
            </>
          )}

          {isAuthenticated ? (
            <Box sx={{ display: 'flex', flex: 1, justifyContent: 'flex-end' }}>
              <IconButton size="large" aria-label="account of current user" aria-controls="menu-appbar" aria-haspopup="true" onClick={handleMenu} color="inherit">
                <AccountCircle />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={Boolean(anchorEl)}
                onClose={handleClose}
              >
                <MenuItem onClick={handleClose}>Profile</MenuItem>
                <MenuItem onClick={handleLogout}>Logout</MenuItem>
              </Menu>
            </Box>
          ) : (
            !path.startsWith('/auth') && (
              <Link
                href="/auth"
                style={{
                  display: 'flex',
                  flex: 1,
                  justifyContent: 'flex-end',
                  color: theme.palette.primary.contrastText,
                  textDecoration: 'none',
                  fontSize: 19,
                }}
              >
                Login
              </Link>
            )
          )}
        </Toolbar>
      </AppBar>
    </Box>
  );
}
