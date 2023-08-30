import { Button, Grid } from '@mui/material';
import React from 'react';
import { NavLink } from 'react-router-dom';

const SideBar = (): JSX.Element => {
  return (
    <Grid container>
      <Grid xs={12}>
        <NavLink to="/">
          <Button></Button>
        </NavLink>
      </Grid>
      <Grid xs={12}>
        <NavLink to="/">2</NavLink>
      </Grid>
      <Grid xs={12}>
        <NavLink to="/">3</NavLink>
      </Grid>
      <Grid xs={12}>
        <NavLink to="/">4</NavLink>
      </Grid>
    </Grid>
  );
};

export default SideBar;
