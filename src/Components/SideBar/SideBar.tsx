import { Grid, Paper } from '@mui/material';
import React from 'react';
import { NavLink } from 'react-router-dom';
import './SideBar.css';

const SideBar = (): JSX.Element => {
  return (
    <Paper elevation={5} className="sideBar">
      <Grid container>
        <NavLink
          to="/clients"
          className={({ isActive }) =>
            isActive ? 'sideBarLink sideBarLinkActive' : 'sideBarLink'
          }
        >
          Клієнти
        </NavLink>
        <NavLink
          to="/cloth"
          className={({ isActive }) =>
            isActive ? 'sideBarLink sideBarLinkActive' : 'sideBarLink'
          }
        >
          Товари
        </NavLink>
        <NavLink
          to="/orders"
          className={({ isActive }) =>
            isActive ? 'sideBarLink sideBarLinkActive' : 'sideBarLink'
          }
        >
          Замовлення
        </NavLink>
        <NavLink
          to="/stores"
          className={({ isActive }) =>
            isActive ? 'sideBarLink sideBarLinkActive' : 'sideBarLink'
          }
        >
          Магазини
        </NavLink>
        <NavLink
          to="/delivery"
          className={({ isActive }) =>
            isActive ? 'sideBarLink sideBarLinkActive' : 'sideBarLink'
          }
        >
          Поставки
        </NavLink>
        <NavLink
          to="/reports"
          className={({ isActive }) =>
            isActive ? 'sideBarLink sideBarLinkActive' : 'sideBarLink'
          }
        >
          Звіти
        </NavLink>
      </Grid>
    </Paper>
  );
};

export default SideBar;
