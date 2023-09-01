import { Grid, Typography } from '@mui/material';
import React from 'react';
import './Footer.css';

const Footer = (): JSX.Element => {
  return (
    <Grid
      container
      justifyContent={'space-between'}
      alignItems={'center'}
      className="footer"
    >
      <Grid item xs={6} className="footerElem">
        <Typography align="center">rights reserved</Typography>
      </Grid>
      <Grid item xs={6} className="footerElem">
        <Typography align="center">contacts</Typography>
      </Grid>
    </Grid>
  );
};

export default Footer;
