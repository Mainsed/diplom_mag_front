import { Grid, Paper, Typography } from '@mui/material';
import React from 'react';
import { NavLink } from 'react-router-dom';
import './SideBar.css';

const SideBar = (): JSX.Element => {
  return (
    <Paper elevation={5} className="sideBar">
      <Grid container>
        <NavLink
          to="/staff"
          className={({ isActive }) =>
            isActive ? 'sideBarLink sideBarLinkActive' : 'sideBarLink'
          }
        >
          <Typography variant="h6">Працівники</Typography>
        </NavLink>
        <NavLink
          to="/clients"
          className={({ isActive }) =>
            isActive ? 'sideBarLink sideBarLinkActive' : 'sideBarLink'
          }
        >
          <Typography variant="h6">Клієнти</Typography>
        </NavLink>
        <NavLink
          to="/cloth"
          className={({ isActive }) =>
            isActive ? 'sideBarLink sideBarLinkActive' : 'sideBarLink'
          }
        >
          <Typography variant="h6">Товари</Typography>
        </NavLink>
        <NavLink
          to="/orders"
          className={({ isActive }) =>
            isActive ? 'sideBarLink sideBarLinkActive' : 'sideBarLink'
          }
        >
          <Typography variant="h6">Замовлення</Typography>
        </NavLink>
        <NavLink
          to="/stores"
          className={({ isActive }) =>
            isActive ? 'sideBarLink sideBarLinkActive' : 'sideBarLink'
          }
        >
          <Typography variant="h6">Магазини</Typography>
        </NavLink>
        <NavLink
          to="/delivery"
          className={({ isActive }) =>
            isActive ? 'sideBarLink sideBarLinkActive' : 'sideBarLink'
          }
        >
          <Typography variant="h6">Поставки</Typography>
        </NavLink>
        <NavLink
          to="/reports"
          className={({ isActive }) =>
            isActive ? 'sideBarLink sideBarLinkActive' : 'sideBarLink'
          }
        >
          <Typography variant="h6">Звіти</Typography>
        </NavLink>
      </Grid>
    </Paper>
  );
};

export default SideBar;
