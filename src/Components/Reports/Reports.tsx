import {
  Divider,
  Grid,
  Paper,
  ThemeProvider,
  Typography,
  createTheme,
} from '@mui/material';
import React, { useEffect } from 'react';
import { IReportsProps } from '../../Redux/interfaces';
import {
  KeyboardDoubleArrowUp as KeyboardDoubleArrowUpIcon,
  KeyboardDoubleArrowDown as KeyboardDoubleArrowDownIcon,
} from '@mui/icons-material';
import './Reports.css';
import { MonthNumber } from '../../utils/enums/month-number.enum';

declare module '@mui/material/SvgIcon' {
  interface SvgIconPropsColorOverrides {
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

const Reports = (props: IReportsProps): JSX.Element => {
  useEffect(() => {
    props.getReportsThunk();
  }, []);
  return (
    <ThemeProvider theme={theme}>
      <Grid container justifyContent="space-evenly">
        <Grid item xs={4}>
          <Paper className="reportPaper" elevation={5}>
            <Typography
              align="center"
              variant="h6"
              className="reportPaperTitle"
            >
              Топ 5 магазинів за продажами за пів року
            </Typography>
            <Grid container justifyContent="space-evenly" className="reportRow">
              <Grid item xs={4}>
                <Typography align="center" fontWeight="bold">
                  Номер магазину
                </Typography>
              </Grid>
              <Grid item xs={4}>
                <Typography align="center" fontWeight="bold">Кількість продажів</Typography>
              </Grid>
              <Grid item xs={4}>
                <Typography align="center" fontWeight="bold">Зміна продажів</Typography>
              </Grid>
            </Grid>
            <Divider
              sx={{
                'border-color': '#78C091',
              }}
            />
            {(props.reports?.reports?.storesBySales || []).map((store) => {
              return (
                <Grid key={store.storeId}>
                  <Grid
                    container
                    justifyContent="space-evenly"
                    className="reportRow"
                  >
                    <Grid item xs={4}>
                      <Typography align="center">{store.storeId}</Typography>
                    </Grid>
                    <Grid item xs={4}>
                      <Typography align="center">
                        {store.numberOfSales} шт.
                      </Typography>
                    </Grid>
                    <Grid item xs={4}>
                      <Typography align="center">
                        <Grid
                          container
                          justifyContent="center"
                          alignItems="center"
                        >
                          {store.change > 0 ? (
                            <KeyboardDoubleArrowUpIcon color="button" />
                          ) : (
                            <KeyboardDoubleArrowDownIcon color="error" />
                          )}
                          {store.change} шт.
                        </Grid>
                      </Typography>
                    </Grid>
                  </Grid>
                  <Divider
                    sx={{
                      'border-color': '#78C091',
                    }}
                  />
                </Grid>
              );
            })}
          </Paper>
        </Grid>
        <Grid item xs={4}>
          <Paper className="reportPaper" elevation={5}>
            <Typography
              align="center"
              variant="h6"
              className="reportPaperTitle"
            >
              Топ 5 товарів за продажами за пів року
            </Typography>
            <Grid container justifyContent="space-evenly" className="reportRow">
              <Grid item xs={4}>
                <Typography align="center" fontWeight="bold">Номер товару</Typography>
              </Grid>
              <Grid item xs={4}>
                <Typography align="center" fontWeight="bold">Кількість продажів</Typography>
              </Grid>
              <Grid item xs={4}>
                <Typography align="center" fontWeight="bold">Зміна продажів</Typography>
              </Grid>
            </Grid>
            <Divider
              sx={{
                'border-color': '#78C091',
              }}
            />
            {(props.reports?.reports?.clothesBySales || []).map((cloth) => {
              return (
                <Grid key={cloth.clothId}>
                  <Grid
                    container
                    justifyContent="space-evenly"
                    className="reportRow"
                  >
                    <Grid item xs={4}>
                      <Typography align="center">{cloth.clothId}</Typography>
                    </Grid>
                    <Grid item xs={4}>
                      <Typography align="center">
                        {cloth.numberOfSales} шт.
                      </Typography>
                    </Grid>
                    <Grid item xs={4}>
                      <Typography align="center">
                        <Grid
                          container
                          justifyContent="center"
                          alignItems="center"
                        >
                          {cloth.change > 0 ? (
                            <KeyboardDoubleArrowUpIcon color="button" />
                          ) : (
                            <KeyboardDoubleArrowDownIcon color="error" />
                          )}
                          {cloth.change} шт.
                        </Grid>
                      </Typography>
                    </Grid>
                  </Grid>
                  <Divider
                    sx={{
                      'border-color': '#78C091',
                    }}
                  />
                </Grid>
              );
            })}
          </Paper>
        </Grid>
        <Grid item xs={4}>
          <Paper className="reportPaper" elevation={5}>
            <Typography
              align="center"
              variant="h6"
              className="reportPaperTitle"
            >
              Топ 5 розмірів за популярністю за пів року
            </Typography>
            <Grid container justifyContent="space-evenly" className="reportRow">
              <Grid item xs={4}>
                <Typography align="center" fontWeight="bold">Розмір</Typography>
              </Grid>
              <Grid item xs={4}>
                <Typography align="center" fontWeight="bold">Кількість продажів</Typography>
              </Grid>
              <Grid item xs={4}>
                <Typography align="center" fontWeight="bold">Зміна продажів</Typography>
              </Grid>
            </Grid>
            <Divider
              sx={{
                'border-color': '#78C091',
              }}
            />
            {(props.reports?.reports?.sizePopularity || []).map((size) => {
              return (
                <Grid key={size.size}>
                  <Grid
                    container
                    justifyContent="space-evenly"
                    className="reportRow"
                  >
                    <Grid item xs={4}>
                      <Typography align="center">{size.size}</Typography>
                    </Grid>
                    <Grid item xs={4}>
                      <Typography align="center">
                        {size.numberOfSales} шт.
                      </Typography>
                    </Grid>
                    <Grid item xs={4}>
                      <Typography align="center">
                        <Grid
                          container
                          justifyContent="center"
                          alignItems="center"
                        >
                          {size.change > 0 ? (
                            <KeyboardDoubleArrowUpIcon color="button" />
                          ) : (
                            <KeyboardDoubleArrowDownIcon color="error" />
                          )}
                          {size.change} шт.
                        </Grid>
                      </Typography>
                    </Grid>
                  </Grid>
                  <Divider
                    sx={{
                      'border-color': '#78C091',
                    }}
                  />
                </Grid>
              );
            })}
          </Paper>
        </Grid>
        <Grid item xs={4}>
          <Paper className="reportPaper" elevation={5}>
            <Typography
              align="center"
              variant="h6"
              className="reportPaperTitle"
            >
              Кількість нових та звільнених працівників за пів року
            </Typography>
            <Grid container justifyContent="space-evenly" className="reportRow">
              <Grid item xs={4}>
                <Typography align="center" fontWeight="bold">Місяць</Typography>
              </Grid>
              <Grid item xs={4}>
                <Typography align="center" fontWeight="bold">Найнято</Typography>
              </Grid>
              <Grid item xs={4}>
                <Typography align="center" fontWeight="bold">Звільнено</Typography>
              </Grid>
            </Grid>
            <Divider
              sx={{
                'border-color': '#78C091',
              }}
            />
            {(
              props.reports?.reports?.staffChanges.staffChangesByMonth || []
            ).map((income) => {
              return (
                <Grid key={income.monthNumber}>
                  <Grid
                    container
                    justifyContent="space-evenly"
                    className="reportRow"
                  >
                    <Grid item xs={4}>
                      <Typography align="center">
                        {MonthNumber[income.monthNumber]}
                      </Typography>
                    </Grid>
                    <Grid item xs={4}>
                      <Typography align="center">
                        {income.hiredStaffCount} чол.
                      </Typography>
                    </Grid>
                    <Grid item xs={4}>
                      <Typography align="center">
                        {income.firedStaffCount} чол.
                      </Typography>
                    </Grid>
                  </Grid>
                  <Divider
                    sx={{
                      'border-color': '#78C091',
                    }}
                  />
                </Grid>
              );
            })}
            <Grid container justifyContent="space-evenly" className="reportRow">
              <Grid item xs={8}>
                <Typography align="center" variant="h6">
                  Загальна кількість працівників
                </Typography>
              </Grid>
              <Grid item xs={4}>
                <Typography align="center" variant="h6">
                  {props.reports?.reports?.staffChanges.totalStaffNumber} чол.
                </Typography>
              </Grid>
            </Grid>
          </Paper>
        </Grid>
        <Grid item xs={4}>
          <Paper className="reportPaper" elevation={5}>
            <Typography
              align="center"
              variant="h6"
              className="reportPaperTitle"
            >
              Дохід за останні пів року
            </Typography>
            <Grid container justifyContent="space-evenly" className="reportRow">
              <Grid item xs={4}>
                <Typography align="center" fontWeight="bold">Місяць</Typography>
              </Grid>
              <Grid item xs={4}>
                <Typography align="center" fontWeight="bold">Дохід</Typography>
              </Grid>
            </Grid>
            <Divider
              sx={{
                'border-color': '#78C091',
              }}
            />
            {(props.reports?.reports?.halfYearIncome.incomeByMonth || []).map(
              (income) => {
                return (
                  <Grid key={income.monthNumber}>
                    <Grid
                      container
                      justifyContent="space-evenly"
                      className="reportRow"
                    >
                      <Grid item xs={4}>
                        <Typography align="center">
                          {MonthNumber[income.monthNumber]}
                        </Typography>
                      </Grid>
                      <Grid item xs={4}>
                        <Typography align="center">
                          {income.income} грн.
                        </Typography>
                      </Grid>
                    </Grid>
                    <Divider
                      sx={{
                        'border-color': '#78C091',
                      }}
                    />
                  </Grid>
                );
              }
            )}
            <Grid container justifyContent="space-evenly" className="reportRow">
              <Grid item xs={4}>
                <Typography align="center" variant="h6">
                  Загальний дохід
                </Typography>
              </Grid>
              <Grid item xs={4}>
                <Typography align="center" variant="h6">
                  {props.reports?.reports?.halfYearIncome.totalIncome} грн.
                </Typography>
              </Grid>
            </Grid>
          </Paper>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
};

export default Reports;
