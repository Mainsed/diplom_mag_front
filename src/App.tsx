import React from 'react';
import { Grid } from '@mui/material';
import './App.css';
import HeaderContainer from './Containers/HeaderContainer';
import SideBarContainer from './Containers/SideBarContainer';
import MainContentContainer from './Containers/MainContentContainer';
import FooterContainer from './Containers/FooterContainer';

const App = () => {
  return (
    <Grid container>
      <Grid item xs={12}>
        <HeaderContainer />
      </Grid>
      <Grid item xs={12}>
        <Grid container>
          <Grid item xs={3}>
            <SideBarContainer />
          </Grid>
          <Grid item xs={9}>
            <MainContentContainer />
          </Grid>
        </Grid>
      </Grid>
      <Grid item xs={12}>
        <FooterContainer />
      </Grid>
    </Grid>
  );
};

export default App;
