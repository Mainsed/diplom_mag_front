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

const Header = (): JSX.Element => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
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
          <img src="" alt="Logo" />
        </NavLink>
      </Grid>
      <Grid item xs={3} className="headerElem">
        <Typography align="center" variant="h5">
          Company name
        </Typography>
      </Grid>
      <Grid item xs={3} className="headerElem">
        <Grid container justifyContent={'flex-end'}>
          <Button onClick={handleClick}>
            <Avatar alt="Person img">U</Avatar>
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
            <MenuItem onClick={handleClose}>Вийти</MenuItem>
          </Menu>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default Header;
