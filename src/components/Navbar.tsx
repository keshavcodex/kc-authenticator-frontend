import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import AccountCircle from '@mui/icons-material/AccountCircle';
import AndroidIcon from '@mui/icons-material/Android';
import GroupsIcon from '@mui/icons-material/Groups';
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
import kcIcon from '/public/images/kc-con-white.png'; // Importing the image
import Logo from './Logo';

export default function Navbar() {
  const theme = useTheme();
  const dispatch = useDispatch();
  const router = useRouter();
  const path = usePathname();

  const [isDrawerOpen, setDrawerOpen] = useState(false);

  const smScreen = useMediaQuery(theme.breakpoints.down('sm'));
  const isAuthenticated = useSelector((state: any) => state.user.isAuthenticated);

  useEffect(() => {
    //exception is new password page
    if (path.match('/auth/new-password')) return;
    if (isAuthenticated && path.startsWith('/auth')) redirect('/');
  }, []);

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleMenu = (event: MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    router.push('/profile');
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
            <Drawer
              anchor="left"
              open={isDrawerOpen}
              onClose={() => setDrawerOpen(false)}
              PaperProps={{
                sx: { pt: 1, backgroundColor: '#333333', color: '#fff' },
              }}
            >
              <Logo />
              <List>
                {[
                  { label: 'Dashboard', icon: <DashboardIcon sx={{ px: 1 }} />, path: '/dashboard' },
                  { label: 'Docs', icon: <ArticleIcon sx={{ px: 1 }} />, path: '/docs' },
                  { label: 'Apps', icon: <AndroidIcon sx={{ px: 1 }} />, path: '/application' },
                ].map(({ label, icon, path }) => (
                  <ListItem
                    key={label}
                    onClick={() => {
                      router.push(path);
                      setDrawerOpen(false);
                    }}
                    sx={{ cursor: 'pointer' }}
                  >
                    {icon}
                    <ListItemText primary={label} />
                  </ListItem>
                ))}
              </List>
            </Drawer>
          ) : smScreen ? (
            <IconButton size="large" edge="start" color="inherit" aria-label="menu" sx={{ mr: 2 }}>
              <MenuIcon onClick={() => setDrawerOpen(true)} />
            </IconButton>
          ) : (
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <Logo />
              {[
                { label: 'Dashboard', path: '/dashboard' },
                { label: 'Docs', path: '/docs' },
                { label: 'Apps', path: '/application', flex: 110 },
              ].map(({ label, path, flex }) => (
                <Link
                  key={label}
                  href={path}
                  style={{
                    textDecoration: 'none',
                    color: theme.palette.primary.contrastText,
                    paddingLeft: 20,
                    flex: flex || 'auto',
                  }}
                >
                  <Typography variant="h6">{label}</Typography>
                </Link>
              ))}
            </Box>
          )}

          {isAuthenticated ? (
            <Box sx={{ display: 'flex', flex: 1, justifyContent: 'flex-end' }}>
              <IconButton size="large" aria-label="account of current user" aria-controls="menu-appbar" aria-haspopup="true" onClick={handleMenu} color="inherit">
                <AccountCircle />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
                keepMounted
                transformOrigin={{ vertical: 'top', horizontal: 'right' }}
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
