import React, { useEffect } from 'react';
import { Grid } from '@mui/material';
import './App.css';
import HeaderContainer from './Containers/HeaderContainer';
import SideBarContainer from './Containers/SideBarContainer';
import MainContentContainer from './Containers/MainContentContainer';
import { IAppProps } from './Redux/interfaces';
import Cookies from 'js-cookie';
import { Navigate } from 'react-router-dom';
import { SnackbarProvider, enqueueSnackbar } from 'notistack';

const App = (props: IAppProps) => {
  useEffect(() => {
    const isAuthorized = Cookies.get('isAuthorized');
    const userName = Cookies.get('userName');
    props.setAuthorized(isAuthorized === 'true', userName);
  }, []);

  useEffect(() => {
    props.errors.forEach((error) => {
      enqueueSnackbar(error, {
        variant: 'error',
        autoHideDuration: 5000,
        anchorOrigin: { vertical: 'top', horizontal: 'right' },
      });
    });
    props.clearError();
  }, [props.errors]);

  return (
    <Grid container className="app" alignContent="baseline">
      <HeaderContainer />
      <Grid container className="mainElem" justifyContent={'center'}>
        {props.auth?.isAuthorized === false ? (
          <Navigate to="/auth" />
        ) : (
          <Grid item xs={4} sm={2.5} lg={1.3}>
            <SideBarContainer />
          </Grid>
        )}
        <Grid item xs={8} sm={9.5} lg={10.7}>
          <MainContentContainer />
        </Grid>
      </Grid>
      <SnackbarProvider maxSnack={10}/>
    </Grid>
  );
};

export default App;
