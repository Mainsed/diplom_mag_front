import React from 'react';
import { Grid } from '@mui/material';
import './App.css';
import HeaderContainer from './Containers/HeaderContainer';
import SideBarContainer from './Containers/SideBarContainer';
import MainContentContainer from './Containers/MainContentContainer';
import FooterContainer from './Containers/FooterContainer';

const App = () => {
  return (
    <Grid
      container
      justifyContent={'space-between'}
      direction={'column'}
      className="app"
    >
      <Grid container>
        <Grid item className="appElem">
          <HeaderContainer />
        </Grid>
        <Grid item className="appElem">
          <Grid container>
            <Grid item xs={3} sm={2} lg={1}>
              <SideBarContainer />
            </Grid>
            <Grid item xs={9} sm={10} lg={11}>
              <MainContentContainer />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      <Grid item className="appElem">
        <FooterContainer />
      </Grid>
    </Grid>
  );
};

export default App;
