'use client';

import {
  AppBar,
  Box,
  Button,
  Collapse,
  CssBaseline,
  Divider,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Paper,
  Toolbar,
  Typography,
} from '@mui/material';
import BookIcon from '@mui/icons-material/Book';
import MenuIcon from '@mui/icons-material/Menu';
import StarIcon from '@mui/icons-material/Star';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import CodeIcon from '@mui/icons-material/Code';
import WebIcon from '@mui/icons-material/Web';
import SettingsInputAntennaIcon from '@mui/icons-material/SettingsInputAntenna';
import ErrorIcon from '@mui/icons-material/Error';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import QuestionAnswerIcon from '@mui/icons-material/QuestionAnswer';
import Image from 'next/image';
import kcIcon from '/public/images/kc-con-white.png';

import { useRouter } from 'next/navigation';
import theme from '@/components/theme';
import { useState } from 'react';
import { APIREQUEST } from '@/types/interfaces';
import Footer from '@/components/Footer';
import CodeSnippet from '@/components/CodeSnippet';
import { useSelector } from 'react-redux';
import Logo from '@/components/Logo';

const drawerWidth = 240;

interface Props {
  window?: () => Window;
}

const NavItem = ({ text, icon, onClick }: { text: string; icon: JSX.Element; onClick: () => void }) => (
  <ListItem disablePadding>
    <ListItemButton onClick={onClick}>
      <ListItemIcon sx={{ color: theme.palette.primary.contrastText }}>{icon}</ListItemIcon>
      <ListItemText primary={text} />
    </ListItemButton>
  </ListItem>
);

const ApiRequestExample = ({ title, endpoint, description, requestBody, requestMethod }: APIREQUEST) => {
  const [open, setOpen] = useState(false);
  const methodColors: Record<string, string> = {
    GET: '#00e040',
    POST: 'yellow',
    PUT: '#0d55ff',
    DELETE: 'red',
  };

  return (
    <ListItem sx={{ border: `1px solid ${theme.palette.secondary.main}`, borderRadius: '5px', mb: 1 }}>
      <Box flex={1}>
        <ListItemText primary={title} sx={{ color: theme.palette.secondary.main }} />
        <Box sx={{ display: 'flex', flexDirection: 'row' }}>
          <Typography variant="body2" sx={{ color: methodColors[requestMethod], pr: 1 }}>
            {requestMethod}
          </Typography>
          <Typography variant="body2" sx={{ color: theme.palette.primary.light }}>
            {endpoint}
          </Typography>
        </Box>
      </Box>
      <Collapse in={open}>
        <pre
          style={{
            color: theme.palette.secondary.main,
            backgroundColor: '#333',
            padding: '8px',
            borderRadius: '4px',
            marginTop: '8px',
          }}
          contentEditable
        >
          {requestBody}
        </pre>
      </Collapse>
      {requestBody && (
        <Button sx={{ ml: 2 }} size="small" onClick={() => setOpen(!open)} color="primary" variant="outlined">
          {open ? 'Hide Request' : 'Show Request'}
        </Button>
      )}
    </ListItem>
  );
};

const ResponsiveDrawer = (props: any) => {
  const { window } = props;
  const [mobileOpen, setMobileOpen] = useState(false);
  const router = useRouter();
  const textColor = theme.palette.secondary.main;

  const isAuthenticated = useSelector((state: any) => state.user.isAuthenticated);
  const apiRequests = [
    { title: 'Get User by Id', requestMethod: 'GET', endpoint: '/user/getUser?id:123abc', description: 'Retrieve information about a specific user by ID.' },
    {
      title: 'Login User',
      requestMethod: 'POST',
      endpoint: '/users/login',
      description: 'Authenticate a user.',
      requestBody: `{
    "email": "user@example.com",
    "password": "securepassword"
}`,
    },
    {
      title: 'Signup User',
      requestMethod: 'POST',
      endpoint: '/users/signup',
      description: 'Register a new user.',
      requestBody: `{
    "appId": "66f75fb27846bcdbc6c",
    "firstName": "Rahul",
    "lastName": "Kumar",
    "phone": "9123456789",
    "email": "usermail@example.com",
    "password": "123abc"
}`,
    },
    {
      title: 'Validate Signup',
      requestMethod: 'POST',
      endpoint: '/user/validate-signup',
      description: 'Validates the OTP for a user signup.',
      requestBody: `{
    "referenceId": "670002bc5013c27fa2a4d9",
    "otp": "455067"
}`,
    },
    {
      title: 'Password Reset Link',
      requestMethod: 'POST',
      endpoint: '/user/password-reset-link',
      description: "Sends a password reset link to the user's email.",
      requestBody: `{
    "appId": "66f79765fb2786c",
    "email": "usermail@example.com",
    "frontendUrl": "new-password form page"
}`,
    },
    {
      title: 'Update Password',
      requestMethod: 'POST',
      endpoint: '/user/update-password',
      description: "Updates the user's password using a reset token.",
      requestBody: `{
    "token": "k9tOzb+KI3J//ODaLxOMTXy2W",
    "password": "123password"
}`,
    },
    {
      title: 'Edit User',
      requestMethod: 'PUT',
      endpoint: '/user/editUser',
      description: "Updates the user's profile information.",
      requestBody: `{
    "id": "6700030f5013c27fa2a2a4dd",
    "firstName": "Keshav",
    "lastName": "Kumar",
    "phone": "9939528009"
}`,
    },
    {
      title: 'Delete User',
      requestMethod: 'DELETE',
      endpoint: '/user/deleteUser?id=123abc',
      description: 'Deletes a user from the system by ID.',
      requestBody: '',
    },
  ];

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };
  const handleTopicClick = (text: string) => {
    setMobileOpen(false);
    router.push(`#${text.toLowerCase().replace(' ', '-')}`);
  };

  const drawer = (
    <Box sx={{ bgcolor: '#333', color: theme.palette.primary.contrastText, flex: 1 }}>
      <Logo />
      <Divider style={{ backgroundColor: theme.palette.primary.contrastText }} />
      <List>
        {[
          { text: 'Introduction', icon: <BookIcon /> },
          { text: 'Features', icon: <StarIcon /> },
          { text: 'API Reference', icon: <CodeIcon /> },
          { text: 'Frontend Integration', icon: <WebIcon /> },
          { text: 'Backend Integration', icon: <SettingsInputAntennaIcon /> },
          { text: 'Error Handling', icon: <ErrorIcon /> },
          { text: 'Best Practices', icon: <ThumbUpIcon /> },
          { text: 'FAQs', icon: <QuestionAnswerIcon /> },
        ].map(({ text, icon }) => (
          <NavItem key={text} text={text} icon={icon} onClick={() => handleTopicClick(text)} />
        ))}
      </List>
    </Box>
  );

  return (
    <Box sx={{ display: { md: 'flex' }, color: '#181818', bgcolor: '#212121' }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{
          width: { md: `calc(100% - ${drawerWidth}px)` },
          ml: { sm: `${drawerWidth}px` },
          backgroundColor: '#181818',
        }}
      >
        <Toolbar>
          <IconButton color="inherit" aria-label="open drawer" edge="start" onClick={handleDrawerToggle} sx={{ mr: 2, display: { md: 'none' } }}>
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div" sx={{ flex: 1, color: '#fff' }}>
            Documentation
          </Typography>
          {isAuthenticated ? (
            <Typography variant="h6" noWrap component="div" sx={{ color: '#fff' }} onClick={() => router.push('/application')}>
              Apps
            </Typography>
          ): (
            <Typography variant="h6" noWrap component="div" sx={{ color: '#fff' }} onClick={() => router.push('/auth')}>
              Login
            </Typography>
          )}
        </Toolbar>
      </AppBar>
      <Box component="nav" sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }} aria-label="mailbox folders">
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true,
          }}
          sx={{
            display: { xs: 'block' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
          }}
        >
          {drawer}
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: 'none', md: 'block' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>
      <Box component="main" sx={{ flexGrow: 1, px: 3, width: { md: `calc(100% - ${drawerWidth}px)` } }}>
        <Typography id="introduction" mb={5}>
          &nbsp;
        </Typography>
        <Typography variant="h5" gutterBottom sx={{ color: '#fff', fontWeight: 'bold' }}>
          Introduction
        </Typography>
        <Typography color={textColor}>
          Welcome to the KC Authenticator documentation. This guide provides an overview of the app, how to integrate it, and details on its API.
        </Typography>
        <Typography component="ul" color={textColor} gutterBottom>
          <li>
            <Typography variant="h6" color={textColor}>
              What is KC Authenticator?
            </Typography>
            <Typography color={textColor}>
              KC Authenticator is a comprehensive authentication tool designed to help developers securely manage user identities across multiple applications. Whether you&aps;re
              developing mobile apps, web apps, or backend systems, KC Authenticator provides a seamless solution to handle user authentication, authorization, and session
              management.
            </Typography>
          </li>

          <li>
            <Typography variant="h6" color={textColor}>
              Why Use KC Authenticator?
            </Typography>
            <Typography color={textColor}>
              With KC Authenticator, you no longer need to implement complex authentication protocols on your own. The app supports popular standards such as OAuth2, OpenID
              Connect, and JWT, ensuring that user data remains secure while providing a smooth experience. It also integrates easily with existing development environments,
              helping you to get up and running quickly.
            </Typography>
          </li>
        </Typography>

        <Typography id="features">&nbsp;</Typography>
        <Divider sx={{ my: 4, bgcolor: theme.palette.primary.contrastText }} />
        <Typography variant="h5" gutterBottom sx={{ color: '#fff', fontWeight: 'bold' }}>
          Features
        </Typography>
        <List sx={{ color: textColor }}>
          <ListItem>
            <ListItemText primary="Multi-Application Support: Developers can create and manage multiple applications." />
          </ListItem>
          <ListItem>
            <ListItemText primary="Token-Based Authentication: Secure JWT tokens for authenticating users." />
          </ListItem>
          <ListItem>
            <ListItemText primary="Email-Based OTP Verification: Send OTP for secure sign-in." />
          </ListItem>
          <ListItem>
            <ListItemText primary="RESTful API: Simple, well-structured API for managing users and applications." />
          </ListItem>
        </List>
        <Typography color={textColor}></Typography>
        <Typography id="api-reference">&nbsp;</Typography>
        <Divider sx={{ my: 4, bgcolor: theme.palette.primary.contrastText }} />
        <Typography variant="h5" id="" gutterBottom sx={{ color: '#fff', fontWeight: 'bold' }}>
          API Reference
        </Typography>
        <Typography color={textColor} sx={{ mb: 2 }}>
          Explore the API endpoints available for developers.
        </Typography>

        <Typography variant="h6" sx={{ color: textColor, fontWeight: 'bold', mb: 1 }}>
          Base URL
        </Typography>
        <Typography variant="body1" sx={{ color: textColor, mb: 3 }}>
          <code>https://api.kc-authenticator.com/v1</code>
        </Typography>

        <Typography variant="h6" sx={{ color: textColor, fontWeight: 'bold', mb: 1 }}>
          User API Endpoints
        </Typography>
        {apiRequests.map((request, index) => (
          <ApiRequestExample
            key={index}
            title={request.title}
            requestMethod={request.requestMethod}
            endpoint={request.endpoint}
            description={request.description}
            requestBody={request.requestBody}
          />
        ))}
        <Typography id="frontend-integration">&nbsp;</Typography>
        <Divider sx={{ my: 4, bgcolor: theme.palette.primary.contrastText }} />
        <Typography variant="h5" gutterBottom sx={{ color: '#fff', fontWeight: 'bold' }}>
          Frontend Integration
        </Typography>
        <Typography gutterBottom sx={{ color: '#fff' }}>
          To integrate the authentication API into your frontend, you can use Axios or Fetch API to make HTTP requests to the endpoints. For example, you can create a service
          function for login that sends a POST request to `/users/login` and handles the response:
        </Typography>
        <CodeSnippet title={'Frontend code of login page'}>{`    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const appId = "122hfabc3wdf"

    const handleLogin = async () => {
      try {
        const body = { appId, email, password };
        const response = await axios.post('https://www.kc-auth.com/users/login', body);
        if (response?.isSuccess) {
          console.log(response.user);
        } else {
          console.log(response.message);
        }
      } catch (error) {
          console.log(error);
      }
   };`}</CodeSnippet>
        <Typography id="backend-integration">&nbsp;</Typography>
        <Divider sx={{ my: 4, bgcolor: theme.palette.primary.contrastText }} />

        <Typography variant="h5" gutterBottom sx={{ color: '#fff', fontWeight: 'bold' }}>
          Backend Integration
        </Typography>
        <Typography gutterBottom sx={{ color: '#fff' }}>
          On the backend, you&apos;ll need to ensure that your routes and controllers handle the requests properly. For example, here’s a sample Node.js/Express setup for the login
          route:
        </Typography>
        <CodeSnippet title={'Backend code of login api'}>{`    const login = async () => {
      try {
        const body = { appId, email, password };
        const response = await axios.post('https://www.kc-auth.com/users/login', body);
        if (response?.isSuccess) {
          console.log(response.user);
        } else {
          console.log(response.message);
        }
      } catch (error) {
          console.log(error);
      }
   };`}</CodeSnippet>
        <Typography id="error-handling">&nbsp;</Typography>
        <Divider sx={{ my: 4, bgcolor: theme.palette.primary.contrastText }} />

        <Typography variant="h5" gutterBottom sx={{ color: '#fff', fontWeight: 'bold' }}>
          Error Handling
        </Typography>
        <Typography gutterBottom sx={{ color: '#fff' }}>
          Proper error handling is crucial for both frontend and backend. On the frontend, you should display user-friendly error messages when API requests fail. You will receive
          a parameter isSuccess as TRUE or FALSE. if its true you can use the response furture and if its false you can utilise message parameter to show error.
        </Typography>
        <Typography gutterBottom sx={{ color: '#fff' }}>
          If the isSuccess is true and message.length {'>'} 0 then show the error text in red color else you may show the message in green color.
        </Typography>
        <CodeSnippet title={'Error handling example'}>{`      const [message, setMessage] = ([]);
      const [isSuccess, setIsSuccess] = (false);

      const login = async () => {
        try {
          const body = { appId, email, password };
          const response = await axios.post('https://www.kc-auth.com/users/login', body);
          setMessage([response.message]);
          setIsSuccess(response.isSuccess);
          console.log(response);
        } catch (error) {
            console.log(error);
        }
      };`}</CodeSnippet>
        <Typography id="best-practices">&nbsp;</Typography>
        <Divider sx={{ my: 4, bgcolor: theme.palette.primary.contrastText }} />

        <Typography variant="h5" gutterBottom sx={{ color: '#fff', fontWeight: 'bold' }}>
          Best Practices
        </Typography>
        <Typography gutterBottom sx={{ color: '#fff' }}>
          - **Secure your API**: Always use HTTPS and consider token-based authentication (JWT) for security. - **Handle sensitive data carefully**: Avoid logging sensitive
          information like passwords. - **Use consistent status codes**: Ensure your API returns appropriate HTTP status codes for different scenarios (e.g., 200 for success, 400
          for bad requests, 401 for unauthorized access). - **Rate limiting**: Implement rate limiting to protect against abuse.
        </Typography>
        <Typography id="faqs">&nbsp;</Typography>
        <Divider sx={{ my: 4, bgcolor: theme.palette.primary.contrastText }} />

        <Typography variant="h5" gutterBottom sx={{ color: '#fff', fontWeight: 'bold' }}>
          Frequently Asked Questions
        </Typography>
        <List sx={{ color: '#fff' }}>
          <ListItem>
            <Typography variant="body1" sx={{ fontWeight: 'bold' }}>
              Q: How do I securely store tokens on the frontend?
            </Typography>
          </ListItem>
          <ListItem>
            <Typography variant="body2">
              A: It&apos;s recommended to store tokens in HTTP-only cookies. Avoid storing sensitive tokens in <code>localStorage</code> or <code>sessionStorage</code> as they are
              accessible to JavaScript.
            </Typography>
          </ListItem>

          <ListItem>
            <Typography variant="body1" sx={{ fontWeight: 'bold' }}>
              Q: What should I do if a user&apos;s session expires?
            </Typography>
          </ListItem>
          <ListItem>
            <Typography variant="body2">
              A: Implement token expiration and refresh logic. If a user’s token expires, prompt them to log in again or use a refresh token to generate a new access token.
            </Typography>
          </ListItem>

          <ListItem>
            <Typography variant="body1" sx={{ fontWeight: 'bold' }}>
              Q: How do I handle rate limiting on the API?
            </Typography>
          </ListItem>
          <ListItem>
            <Typography variant="body2">
              A: Implement rate limiting on your API server to prevent abuse. On the client side, handle the 429 Too Many Requests status code by informing the user to wait before
              retrying.
            </Typography>
          </ListItem>

          <ListItem>
            <Typography variant="body1" sx={{ fontWeight: 'bold' }}>
              Q: How can I protect against Cross-Site Request Forgery (CSRF) attacks?
            </Typography>
          </ListItem>
          <ListItem>
            <Typography variant="body2">A: Use anti-CSRF tokens in conjunction with HTTP-only cookies to secure your application against CSRF attacks.</Typography>
          </ListItem>

          <ListItem>
            <Typography variant="body1" sx={{ fontWeight: 'bold' }}>
              Q: My issue is not present here, can you help me?
            </Typography>
          </ListItem>
          <ListItem>
            <Typography variant="body2">A: Sure we can try, please contact us by clicking on CONTACT US button from the footer.</Typography>
          </ListItem>
        </List>

        <Box mx={'-24px'}>
          <Footer />
        </Box>
      </Box>
    </Box>
  );
};

export default ResponsiveDrawer;
