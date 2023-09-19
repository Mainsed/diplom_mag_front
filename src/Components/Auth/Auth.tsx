import {
  Button,
  Divider,
  Grid,
  IconButton,
  InputAdornment,
  Paper,
  ThemeProvider,
  Typography,
  createTheme,
} from '@mui/material';
import React, { useState } from 'react';
import { IAuthProps } from '../../Redux/interfaces';
import './Auth.css';
import { TextValidator, ValidatorForm } from 'react-material-ui-form-validator';
import { Navigate } from 'react-router-dom';
import {
  Visibility as VisibilityIcon,
  VisibilityOff as VisibilityOffIcon,
} from '@mui/icons-material';

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

const Auth = (props: IAuthProps): JSX.Element => {
  const [authValidation, setAuthValidation] = useState({
    login: '',
    password: '',
  });

  const [showPassword, setShowPassword] = useState(false);

  const handleChangeLoginText = (event: any) => {
    setAuthValidation({
      ...authValidation,
      [event.target.name]: event.target.value,
    });
  };

  const handleMouseSwitchShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleLogin = () => {
    props.authorizeThunk({ nameOrEmail: login, password });
  };

  const { login, password } = authValidation;

  return props.auth?.auth?.isAuthorized ? (
    <Navigate to="/staff" />
  ) : (
    <ThemeProvider theme={theme}>
      <Grid container justifyContent="space-evenly">
        <Paper className="authPaper" elevation={5}>
          <Typography align="center" variant="h5">
            Для подальшої роботи необхідно авторизуватися
          </Typography>
          <ValidatorForm onSubmit={handleLogin} className="dialogContent">
            <TextValidator
              fullWidth
              variant={'outlined'}
              label="Електронна пошта"
              onChange={handleChangeLoginText}
              name="login"
              color="button"
              value={login}
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
              label="Пароль"
              onChange={handleChangeLoginText}
              name="password"
              color="button"
              type={showPassword ? 'text' : 'password'}
              value={password}
              validators={['minStringLength:8']}
              errorMessages={['Мінімальна довжина паролю - 8 символів']}
              className="formElem"
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onMouseDown={handleMouseSwitchShowPassword}
                      onMouseUp={handleMouseSwitchShowPassword}
                    >
                      {showPassword ? (
                        <VisibilityIcon />
                      ) : (
                        <VisibilityOffIcon />
                      )}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
            <Grid
              container
              justifyContent={'space-evenly'}
              className="controllButtons"
            >
              <Button type={'submit'} color="button" variant="contained">
                Авторизуватися
              </Button>
            </Grid>
          </ValidatorForm>
          {props.auth?.auth?.error ? (
            <Typography
              align="center"
              color="error"
              className="authErrorText"
              fontWeight="bold"
            >
              {props.auth.auth.error}
            </Typography>
          ) : (
            ''
          )}
        </Paper>
      </Grid>
    </ThemeProvider>
  );
};

export default Auth;
