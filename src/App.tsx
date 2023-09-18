import React, { useEffect } from 'react';
import { Grid } from '@mui/material';
import './App.css';
import HeaderContainer from './Containers/HeaderContainer';
import SideBarContainer from './Containers/SideBarContainer';
import MainContentContainer from './Containers/MainContentContainer';
import { IAppProps } from './Redux/interfaces';
import Cookies from 'js-cookie';
import { Navigate } from 'react-router-dom';

const App = (props: IAppProps) => {
  useEffect(() => {
    const isAuthorized = Cookies.get('username');

    props.setAuthorized(isAuthorized === 'true');
  }, []);

  return (
    <Grid container className="app">
      <HeaderContainer />
      <Grid container className="mainElem" justifyContent={'center'}>
        {props.auth?.isAuthorized === false ? <Navigate to="/auth" /> : <Grid item xs={4} sm={2.5} lg={1.3}>
          <SideBarContainer />
        </Grid>}
        <Grid item xs={8} sm={9.5} lg={10.7}>
          <MainContentContainer />
        </Grid>
      </Grid>
    </Grid>
  );
};

export default App;
