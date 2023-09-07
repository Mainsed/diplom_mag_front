import React from 'react';
import { Grid } from '@mui/material';
import './App.css';
import HeaderContainer from './Containers/HeaderContainer';
import SideBarContainer from './Containers/SideBarContainer';
import MainContentContainer from './Containers/MainContentContainer';

const App = () => {
  return (
    <Grid container className="app" justifyContent={'stretch'}>
      <HeaderContainer />
      <Grid container className="mainElem">
        <Grid item xs={4} sm={2.5} lg={1.3}>
          <SideBarContainer />
        </Grid>
        <Grid item xs={8} sm={9.5} lg={10.7}>
          <MainContentContainer />
        </Grid>
      </Grid>
    </Grid>
  );
};

export default App;
