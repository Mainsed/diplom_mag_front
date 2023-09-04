import {
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  FormControlLabel,
  Grid,
  IconButton,
  InputAdornment,
  Menu,
  MenuItem,
  PaletteColorOptions,
  Paper,
  Switch,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  ThemeProvider,
  Typography,
  createTheme
} from '@mui/material';
import React, { useState } from 'react';
import { IStaffProps } from '../../Containers/state.interfaces';
import {
  MoreHoriz as MoreHorizIcon,
  Check as CheckIcon,
  Clear as ClearIcon,
  Visibility as VisibilityIcon,
  VisibilityOff as VisibilityOffIcon
} from '@mui/icons-material';
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';
import './Staff.css';

// declaring new color names
declare module '@mui/material/styles' {
  interface CustomPalette {
    button: PaletteColorOptions;
  }
  interface Palette extends CustomPalette {}
  interface PaletteOptions extends CustomPalette {}
}

declare module '@mui/material/Button' {
  interface ButtonPropsColorOverrides {
    button: true;
  }
}

declare module '@mui/material/Switch' {
  interface SwitchPropsColorOverrides {
    button: true;
  }
}

// creating new colors
const { palette } = createTheme();
const { augmentColor } = palette;
const createColor = (mainColor: string) =>
  augmentColor({ color: { main: mainColor } });
const theme = createTheme({
  palette: {
    button: createColor('#78C091'),
  },
});

const Staff = (props: IStaffProps): JSX.Element => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const menuOpen = Boolean(anchorEl);

  const [validation, setValidation] = useState({
    email: '',
    name: '',
    isAdmin: false,
    password: '',
    position: '',
  });

  const [showPassword, setShowPassword] = useState(false);

  const handleMenuClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleEdit = () => {
    handleMenuClose();
  };

  const handleDelete = () => {
    handleMenuClose();
  };

  const handleMakeAdmin = () => {
    handleMenuClose();
  };

  const handleMouseSwitchShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleCreateStaff = () => {
    setValidation({
      email: '',
      name: '',
      isAdmin: false,
      password: '',
      position: '',
    });
    handleDialogClose();
  };

  const [dialogOpen, setOpen] = React.useState(false);

  const handleClickDialogOpen = () => {
    setOpen(true);
  };

  const handleDialogClose = () => {
    setValidation({
      email: '',
      name: '',
      isAdmin: false,
      password: '',
      position: '',
    });
    setOpen(false);
  };

  const handleChangeText = (event: any) => {
    if (event.target.type === 'checkbox') {
      setValidation({
        ...validation,
        [event.target.name]: event.target.checked,
        password: event.target.checked ? validation.password : '',
      });
    } else {
      setValidation({
        ...validation,
        [event.target.name]: event.target.value,
      });
    }
  };

  const { email, isAdmin, name, password, position } = validation;

  return (
    <TableContainer component={Paper}>
      <ThemeProvider theme={theme}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell align="center">Обліковий номер</TableCell>
              <TableCell align="center">Електронна пошта</TableCell>
              <TableCell align="center">ПІБ</TableCell>
              <TableCell align="center">Чи є адміністратором</TableCell>
              <TableCell align="center">Час останнього оновлення</TableCell>
              <TableCell align="center">Хто останній раз оновив</TableCell>
              <TableCell align="center">
                <Button
                  color="button"
                  variant="contained"
                  className="createButton"
                  onClick={handleClickDialogOpen}
                >
                  <Typography variant="caption" fontWeight={'bold'}>
                    Створити
                  </Typography>
                </Button>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {props.staff.map((staff) =>
              <TableRow key={staff.id}>
                <TableCell align="center">{staff.id}</TableCell>
                <TableCell align="center">{staff.email}</TableCell>
                <TableCell align="center">{staff.name}</TableCell>
                <TableCell align="center">
                  {staff.isAdmin ?
                    <CheckIcon color="success" />
                    :
                    <ClearIcon color="error" />
                  }
                </TableCell>
                <TableCell align="center">{staff.updatedAt}</TableCell>
                <TableCell align="center">{staff.updatedBy}</TableCell>
                <TableCell align="center">
                  <IconButton onClick={handleMenuClick}>
                    <MoreHorizIcon />
                  </IconButton>
                  <Menu
                    id="basic-menu"
                    anchorEl={anchorEl}
                    open={menuOpen}
                    onClose={handleMenuClose}
                    MenuListProps={{
                      'aria-labelledby': 'basic-button',
                    }}
                    disableScrollLock={true}
                  >
                    <MenuItem onClick={handleMakeAdmin}>
                      Зробити адміністратором
                    </MenuItem>
                    <MenuItem onClick={handleEdit}>Редагувати</MenuItem>
                    <MenuItem onClick={handleDelete}>Видалити</MenuItem>
                  </Menu>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
        <Dialog
          onClose={handleDialogClose}
          open={dialogOpen}
          className="dialog"
          fullWidth
        >
          <DialogTitle>
            <Typography align="center" fontSize={'20px'}>
              Створити працівника
            </Typography>
          </DialogTitle>
          <DialogContent className="dialogContent">
            <ValidatorForm onSubmit={handleCreateStaff}>
              <TextValidator
                fullWidth
                variant={'outlined'}
                label="Електронна пошта"
                onChange={handleChangeText}
                name="email"
                color="button"
                value={email}
                validators={['isEmail', 'required']}
                errorMessages={[
                  'Це має бути електронна пошта',
                  "Це поле обов'язкове",
                ]}
                className="formElem"
              />
              <TextValidator
                fullWidth
                variant={'outlined'}
                label="Прізвище Ім'я Побатькові"
                onChange={handleChangeText}
                name="name"
                color="button"
                value={name}
                validators={['minStringLength:2']}
                errorMessages={['Мінімальна дозволена довжена - 2 символи']}
                className="formElem"
              />
              <TextValidator
                fullWidth
                variant={'outlined'}
                label="Посада"
                onChange={handleChangeText}
                name="position"
                color="button"
                value={position}
                validators={['minStringLength:2']}
                errorMessages={['Мінімальна дозволена довжена - 2 символи']}
                className="formElem"
              />
              <FormControlLabel
                value={isAdmin}
                onChange={handleChangeText}
                control={<Switch color="button" />}
                label="Зробити адміністратором"
                labelPlacement="end"
                name="isAdmin"
                className="formElem"
              />
              {isAdmin ?
                <TextValidator
                  fullWidth
                  variant={'outlined'}
                  label="Пароль"
                  onChange={handleChangeText}
                  name="password"
                  color="button"
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  validators={['minStringLength:8']}
                  errorMessages={['Мінімальна довжина паролю - 8 символів']}
                  className="formElem"
                  InputProps={{
                    // <-- This is where the toggle button is added.
                    endAdornment:
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onMouseDown={handleMouseSwitchShowPassword}
                          onMouseUp={handleMouseSwitchShowPassword}
                        >
                          {showPassword ?
                            <VisibilityIcon />
                            :
                            <VisibilityOffIcon />
                          }
                        </IconButton>
                      </InputAdornment>
                    ,
                  }}
                />
                :
                ''
              }
              <Grid
                container
                justifyContent={'space-evenly'}
                className="controllButtons"
              >
                <Button
                  color="button"
                  variant="contained"
                  onClick={handleDialogClose}
                >
                  Відмінити
                </Button>
                <Button type={'submit'} color="button" variant="contained">
                  Створити
                </Button>
              </Grid>
            </ValidatorForm>
          </DialogContent>
        </Dialog>
      </ThemeProvider>
    </TableContainer>
  );
};

export default Staff;
