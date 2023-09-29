import {
  Avatar,
  Button,
  Grid,
  Menu,
  MenuItem,
  Typography,
} from '@mui/material';
import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import './Header.css';
import { IHeaderProps } from '../../Redux/interfaces/header.interface';

const Header = (props: IHeaderProps) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleLogout = () => {
    props.logoutThunk();
    handleClose();
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <Grid
      container
      justifyContent={'space-between'}
      alignItems={'center'}
      className="header"
    >
      <Grid item xs={3} className="headerElem">
        <NavLink to={'/'}>
          <img src="favicon.ico" alt="Logo" className="logo" />
        </NavLink>
      </Grid>
      <Grid item xs={3} className="headerElem">
        <Typography align="center" variant="h4">
          Company name
        </Typography>
      </Grid>
      <Grid item xs={3} className="headerElem">
        {props.isAuthorized ? (
          <Grid container justifyContent={'flex-end'}>
            <Button onClick={handleClick}>
              <Avatar alt="Person img" sx={{ width: 56, height: 56 }}>{props.name && props.name[0]}</Avatar>
            </Button>
            <Menu
              id="basic-menu"
              anchorEl={anchorEl}
              open={open}
              onClose={handleClose}
              MenuListProps={{
                'aria-labelledby': 'basic-button',
              }}
              disableScrollLock={true}
            >
              <MenuItem onClick={handleLogout}>Вийти</MenuItem>
            </Menu>
          </Grid>
        ) : (
          ''
        )}
      </Grid>
    </Grid>
  );
};

export default Header;
