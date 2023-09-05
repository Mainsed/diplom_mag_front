import { Grid, Paper, Typography } from '@mui/material';
import React from 'react';
import { NavLink } from 'react-router-dom';
import './SideBar.css';
import {
  Checkroom,
  Hail,
  LocalShipping,
  Person,
  ReceiptLong,
  ShoppingCart,
  Store,
} from '@mui/icons-material';

const SideBar = (): JSX.Element => {
  return (
    <Paper elevation={15} className="sideBar">
      <Grid container>
        <NavLink
          to="/staff"
          className={({ isActive }) =>
            isActive ? 'sideBarLink sideBarLinkActive' : 'sideBarLink'
          }
        >
          <Typography variant="h6" alignItems="end">
            <Grid container alignItems="center">
              <Hail />
              Працівники
            </Grid>
          </Typography>
        </NavLink>
        <NavLink
          to="/clients"
          className={({ isActive }) =>
            isActive ? 'sideBarLink sideBarLinkActive' : 'sideBarLink'
          }
        >
          <Typography variant="h6">
            <Grid container alignItems="center">
              <Person />
              Клієнти
            </Grid>
          </Typography>
        </NavLink>
        <NavLink
          to="/cloth"
          className={({ isActive }) =>
            isActive ? 'sideBarLink sideBarLinkActive' : 'sideBarLink'
          }
        >
          <Typography variant="h6">
            <Grid container alignItems="center">
              <Checkroom />
              Товари
            </Grid>
          </Typography>
        </NavLink>
        <NavLink
          to="/orders"
          className={({ isActive }) =>
            isActive ? 'sideBarLink sideBarLinkActive' : 'sideBarLink'
          }
        >
          <Typography variant="h6">
            <Grid container alignItems="center">
              <ShoppingCart />
              Замовлення
            </Grid>
          </Typography>
        </NavLink>
        <NavLink
          to="/stores"
          className={({ isActive }) =>
            isActive ? 'sideBarLink sideBarLinkActive' : 'sideBarLink'
          }
        >
          <Typography variant="h6">
            <Grid container alignItems="center">
              <Store />
              Магазини
            </Grid>
          </Typography>
        </NavLink>
        <NavLink
          to="/delivery"
          className={({ isActive }) =>
            isActive ? 'sideBarLink sideBarLinkActive' : 'sideBarLink'
          }
        >
          <Typography variant="h6">
            <Grid container alignItems="center">
              <LocalShipping />
              Поставки
            </Grid>
          </Typography>
        </NavLink>
        <NavLink
          to="/reports"
          className={({ isActive }) =>
            isActive ? 'sideBarLink sideBarLinkActive' : 'sideBarLink'
          }
        >
          <Typography variant="h6">
            <Grid container alignItems="center">
              <ReceiptLong />
              Звіти
            </Grid>
          </Typography>
        </NavLink>
      </Grid>
    </Paper>
  );
};

export default SideBar;
