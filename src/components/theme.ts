// src/theme.ts
import { createTheme } from '@mui/material/styles';

const theme = createTheme({
	palette: {
		primary: {
			main: '#009688', // Primary color
			light: '#4db6ac', // 300
			dark: '#00796b', // 700
			contrastText: '#ffffff' // Adjust for better readability
		},
		secondary: {
			main: '#e0f2f1', // 50
			light: '#b2dfdb', // 100
			dark: '#004d40', // 900
			contrastText: '#000000' // Adjust for better readability
		}
	},
	typography: {
		fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif'
	}
});

export default theme;
