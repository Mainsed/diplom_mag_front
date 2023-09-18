import {
  Divider,
  Grid,
  Paper,
  ThemeProvider,
  Typography,
  createTheme,
} from '@mui/material';
import React from 'react';
import { IAuthProps } from '../../Redux/interfaces';
import './Auth.css';

// creating new colors
const { palette } = createTheme();
const { augmentColor } = palette;
const createColor = (mainColor: string) =>
  augmentColor({ color: { main: mainColor } });
const theme = createTheme({
  palette: {
    button: createColor('#78C091'),
  },
});

const Auth = (props: IAuthProps): JSX.Element => {
  return (
    <ThemeProvider theme={theme}>
      <Grid container justifyContent="space-evenly">
        Authorization
      </Grid>
    </ThemeProvider>
  );
};

export default Auth;
