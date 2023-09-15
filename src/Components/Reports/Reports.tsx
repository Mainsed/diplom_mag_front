import {
  Grid,
  PaletteColorOptions,
  Paper,
  ThemeProvider,
  createTheme,
} from '@mui/material';
import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import {
  IClientProps,
} from '../../Redux/interfaces';

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

declare module '@mui/material/InputBase' {
  interface InputBasePropsColorOverrides {
    button: true;
  }
}

declare module '@mui/material/FormLabel' {
  interface FormLabelPropsColorOverrides {
    button: true;
  }
}

declare module '@mui/material/TextField' {
  interface TextFieldPropsColorOverrides {
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

const Reports = (props: IClientProps): JSX.Element => {
  useEffect(() => {
    props.getClientThunk();
  }, []);

  return <ThemeProvider theme={theme}>
    <Grid container>
      <Grid item xs={4}>
        <Paper>Топ 5 магазинів за продажами</Paper>
      </Grid>
      <Grid item xs={4}>
        <Paper>Топ 5 товарів за продажами</Paper>
      </Grid>
      <Grid item xs={4}>
        <Paper>Дохід за останні пів року\рік</Paper>
      </Grid>
      <Grid item xs={4}>
        <Paper>Кількість нових та звільнених працівників</Paper>
      </Grid>
      <Grid item xs={4}>
        <Paper>Топ 5 розмірів за популярністю</Paper>
      </Grid>
    </Grid>
  </ThemeProvider>;
};

export default Reports;
