import {
  Button,
  CircularProgress,
  Dialog,
  DialogContent,
  DialogTitle,
  Drawer,
  FormControl,
  Grid,
  IconButton,
  InputLabel,
  Menu,
  MenuItem,
  Paper,
  Select,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  TableSortLabel,
  TextField,
  ThemeProvider,
  Tooltip,
  Typography,
  createTheme,
} from '@mui/material';
import React, { useState, useEffect } from 'react';
import {
  MoreHoriz as MoreHorizIcon,
  FilterAlt as FilterAltIcon,
} from '@mui/icons-material';
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';
import {
  ClothSizes,
  IClothId,
  IOrder,
  IOrderCreate,
  IOrderProps,
  IOrderUpdate,
  OrderStatuses,
} from '../../Redux/interfaces';
import { EnumSort } from '../../utils/enums/enum.sort';
import './Order.css';

// declaring new color names

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

const Order = (props: IOrderProps): JSX.Element => {
  useEffect(() => {
    props.getOrderThunk({
      page: pagination.page,
      limit: pagination.rows,
      sort: {
        order,
        orderBy,
      },
    });
  }, []);
  const orders = props.order?.order;
  const orderCount = props.order?.orderCount || 0;

  const [loading, setLoading] = useState(false);

  const [createValidation, setCreateValidation] = useState({
    clientId: '',
    status: OrderStatuses.CREATED,
  });

  const [editValidation, setEditValidation] = useState({
    id: NaN,
    clientId: '',
    status: '' as OrderStatuses,
  });

  const [filter, setFilter] = useState({
    id: '',
    clientId: '',
    status: '' as OrderStatuses,
  });

  const [deleteValidation, setDeleteValidation] = useState({
    id: NaN,
  });

  const [showDrawer, setShowDrawer] = useState(false);

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [anchorId, setAnchorId] = useState<null | number>(null);

  const [createDialogOpen, setCreateOpen] = React.useState(false);
  const [deleteDialogOpen, setDeleteOpen] = React.useState(false);
  const [editDialogOpen, setEditOpen] = React.useState(false);
  const [pagination, setPagination] = React.useState({ rows: 10, page: 0 });

  const [orderClothValidation, setOrderClothValidation] = useState<IClothId[]>([
    {
      clothId: 0,
      amount: 0,
      size: ClothSizes.S,
    },
  ]);

  const [order, setOrder] = React.useState<EnumSort>(EnumSort.asc);
  const [orderBy, setOrderBy] = React.useState('id');

  const IsolatedMenu = (order: IOrder) => {
    const menuOpen = Boolean(anchorEl);
    const { id } = order;

    const handleMenuClick =
      (id: number) => (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
        setAnchorId(id);
      };

    const handleMenuClose = () => {
      setAnchorEl(null);
      setAnchorId(null);
    };

    const handleEditClick = (order: IOrder) => () => {
      handleMenuClose();
      handleClickEditDialogOpen(order);
    };

    const handleDeleteClick = (id: number) => () => {
      handleMenuClose();
      handleClickDeleteDialogOpen(id);
    };

    return {
      jsx: (
        <Menu
          id="basic-menu"
          anchorEl={anchorEl}
          open={menuOpen && anchorId === order.id}
          onClose={handleMenuClose}
          MenuListProps={{
            'aria-labelledby': 'basic-button',
          }}
          disableScrollLock={true}
        >
          <MenuItem onClick={handleEditClick(order)}>Редагувати</MenuItem>
          <MenuItem onClick={handleDeleteClick(id)}>Видалити</MenuItem>
        </Menu>
      ),
      handleMenuClick,
    };
  };

  const CreateDialog = () => {
    return (
      <Dialog
        onClose={handleCreateDialogClose}
        open={createDialogOpen}
        className="dialog"
        fullWidth
      >
        <DialogTitle>
          <Typography align="center" fontSize={'20px'}>
            Створити замовлення
          </Typography>
        </DialogTitle>
        <DialogContent>
          <ValidatorForm onSubmit={handleCreateOrder} className="dialogContent">
            <TextValidator
              fullWidth
              variant={'outlined'}
              label="ID клієнта"
              onChange={handleChangeCreateText}
              name="clientId"
              color="button"
              value={clientId}
              validators={['required']}
              errorMessages={["Це поле обов'язкове"]}
              className="formElem"
            />
            {OrderClothSizes()}
            <FormControl fullWidth className="formElem">
              <InputLabel id="demo-simple-select-label" color="button">
                Статус замовлення
              </InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={status}
                label="Статус замовлення"
                color="button"
                name="status"
                onChange={handleChangeCreateText}
              >
                <MenuItem value={OrderStatuses.CREATED}>
                  {OrderStatuses.CREATED}
                </MenuItem>
                <MenuItem value={OrderStatuses.PROCESSING}>
                  {OrderStatuses.PROCESSING}
                </MenuItem>
                <MenuItem value={OrderStatuses.PAYED}>
                  {OrderStatuses.PAYED}
                </MenuItem>
                <MenuItem value={OrderStatuses.SENT}>
                  {OrderStatuses.SENT}
                </MenuItem>
                <MenuItem value={OrderStatuses.DELIVERED}>
                  {OrderStatuses.DELIVERED}
                </MenuItem>
                <MenuItem value={OrderStatuses.COMPLETED}>
                  {OrderStatuses.COMPLETED}
                </MenuItem>
              </Select>
            </FormControl>
            <Grid
              container
              justifyContent={'space-evenly'}
              className="controllButtons"
            >
              <Button
                color="error"
                variant="contained"
                onClick={handleCreateDialogClose}
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
    );
  };

  const EditDialog = () => {
    return (
      <Dialog
        onClose={handleEditDialogClose}
        open={editDialogOpen}
        className="dialog"
        fullWidth
      >
        <DialogTitle>
          <Typography align="center" fontSize={'20px'}>
            Редагувати замовлення
          </Typography>
        </DialogTitle>
        <DialogContent>
          <ValidatorForm onSubmit={handleEditOrder} className="dialogContent">
            <TextValidator
              fullWidth
              variant={'outlined'}
              label="ID клієнта"
              onChange={handleChangeEditText}
              name="clientId"
              color="button"
              value={editClientId}
              validators={['required']}
              errorMessages={["Це поле обов'язкове"]}
              className="formElem"
            />
            {OrderClothSizes()}
            <FormControl fullWidth className="formElem">
              <InputLabel id="demo-simple-select-label" color="button">
                Статус замовлення
              </InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={editStatus}
                label="Статус замовлення"
                color="button"
                name="status"
                onChange={handleChangeEditText}
              >
                <MenuItem value={OrderStatuses.CREATED}>
                  {OrderStatuses.CREATED}
                </MenuItem>
                <MenuItem value={OrderStatuses.PROCESSING}>
                  {OrderStatuses.PROCESSING}
                </MenuItem>
                <MenuItem value={OrderStatuses.PAYED}>
                  {OrderStatuses.PAYED}
                </MenuItem>
                <MenuItem value={OrderStatuses.SENT}>
                  {OrderStatuses.SENT}
                </MenuItem>
                <MenuItem value={OrderStatuses.DELIVERED}>
                  {OrderStatuses.DELIVERED}
                </MenuItem>
                <MenuItem value={OrderStatuses.COMPLETED}>
                  {OrderStatuses.COMPLETED}
                </MenuItem>
                <MenuItem value={OrderStatuses.RETURNED}>
                  {OrderStatuses.RETURNED}
                </MenuItem>
                <MenuItem value={OrderStatuses.CANCELED}>
                  {OrderStatuses.CANCELED}
                </MenuItem>
              </Select>
            </FormControl>
            <Grid
              container
              justifyContent={'space-evenly'}
              className="controllButtons"
            >
              <Button
                color="error"
                variant="contained"
                onClick={handleEditDialogClose}
              >
                Відмінити
              </Button>
              <Button type={'submit'} color="button" variant="contained">
                Змінити
              </Button>
            </Grid>
          </ValidatorForm>
        </DialogContent>
      </Dialog>
    );
  };

  const DeleteDialog = (deleteId: number) => {
    return (
      <Dialog
        onClose={handleDeleteDialogClose}
        open={deleteDialogOpen}
        className="dialog"
        fullWidth
      >
        <DialogTitle>
          <Typography align="center" fontSize={'20px'}>
            {`Видалити замовлення з ID "${deleteId}" ?`}
          </Typography>
        </DialogTitle>
        <DialogContent>
          <Grid
            container
            justifyContent="space-evenly"
            className="dialogContent"
          >
            <Button
              variant="contained"
              color="error"
              onClick={handleDeleteDialogClose}
            >
              Відмінити
            </Button>
            <Button
              variant="contained"
              color="button"
              onClick={handleDeleteOrder(deleteId)}
            >
              Видалити
            </Button>
          </Grid>
        </DialogContent>
      </Dialog>
    );
  };

  const OrderClothSizes = () => {
    console.log(orderClothValidation);
    return (
      <Grid container className="clothDeliverySizesBox">
        {orderClothValidation.map((clothDeliver, i) => {
          return (
            <Grid item xs={4} key={i}>
              <Paper className="orderClothPaper" elevation={3}>
                <TextValidator
                  fullWidth
                  variant={'outlined'}
                  size="small"
                  label="ID одягу"
                  onChange={handleClothDeliverChange(i)}
                  name="clothId"
                  color="button"
                  value={clothDeliver.clothId}
                  validators={['required', 'minNumber:1']}
                  errorMessages={[
                    "Це поле обов'язкове",
                    'Мінімальне значення - 1',
                  ]}
                  className="formElem"
                  onFocus={(event: any) => {
                    event.target.select();
                  }}
                  type="number"
                />
                <TextValidator
                  fullWidth
                  variant={'outlined'}
                  size="small"
                  label="Кількість одягу"
                  onChange={handleClothDeliverChange(i)}
                  name="amount"
                  color="button"
                  value={clothDeliver.amount}
                  validators={['required', 'minNumber:1']}
                  errorMessages={[
                    "Це поле обов'язкове",
                    'Мінімальне значення - 1',
                  ]}
                  className="formElem"
                  onFocus={(event: any) => {
                    event.target.select();
                  }}
                  type="number"
                />
                <FormControl fullWidth className="formElem">
                  <InputLabel id="demo-simple-select-label" color="button">
                    Розмір
                  </InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={clothDeliver.size}
                    label="Розмір"
                    color="button"
                    name="size"
                    onChange={handleClothDeliverChange(i)}
                  >
                    <MenuItem value={ClothSizes.XS}>{ClothSizes.XS}</MenuItem>
                    <MenuItem value={ClothSizes.S}>{ClothSizes.S}</MenuItem>
                    <MenuItem value={ClothSizes.M}>{ClothSizes.M}</MenuItem>
                    <MenuItem value={ClothSizes.L}>{ClothSizes.L}</MenuItem>
                    <MenuItem value={ClothSizes.XL}>{ClothSizes.XL}</MenuItem>
                    <MenuItem value={ClothSizes.XXL}>{ClothSizes.XXL}</MenuItem>
                  </Select>
                </FormControl>
                <Grid container justifyContent="space-evenly">
                  {orderClothValidation.length === i + 1 ? (
                    <Button color="button" onClick={handleAddClothDeliver(i)}>
                      Додати товар
                    </Button>
                  ) : (
                    ''
                  )}
                  <Button color="error" onClick={handleRemoveClothDeliver(i)}>
                    Видалити
                  </Button>
                </Grid>
              </Paper>
            </Grid>
          );
        })}
      </Grid>
    );
  };

  const handleSetLoading = (loading: boolean) => {
    setLoading(loading);
  };

  const handleClothDeliverChange = (id: number) => (event: any) => {
    setOrderClothValidation(
      orderClothValidation.map((clothDeliver, i) => {
        if (i === id) {
          return {
            ...clothDeliver,
            [event.target.name]: ['status', 'size'].includes(event.target.name)
              ? event.target.value
              : parseInt(event.target.value),
          };
        }

        return clothDeliver;
      }),
    );
  };

  const handleAddClothDeliver = (id: number) => () => {
    if (orderClothValidation.length !== id + 1) {
      return;
    }
    setOrderClothValidation([
      ...orderClothValidation,
      {
        clothId: 0,
        amount: 0,
        size: ClothSizes.S,
      },
    ]);
  };

  const handleRemoveClothDeliver = (id: number) => () => {
    if (orderClothValidation.length === 1) {
      return;
    }
    setOrderClothValidation([
      ...orderClothValidation.filter((clothDeliver, i) => {
        if (i === id) {
          return false;
        }
        return true;
      }),
    ]);
  };

  const updateOrderList = async (
    rows: number,
    page: number,
    orderString = order,
    orderByString = orderBy,
  ) => {
    await props.getOrderThunk({
      limit: rows,
      page: page,
      filter: {
        id: parseInt(filter.id) || undefined,
        clientId: filter.clientId || undefined,
        status: filter.status || undefined,
      },
      sort: {
        order: orderString,
        orderBy: orderByString,
      },
    });
  };

  const handleDrawerOpenToggle = () => {
    console.log('123');
    setShowDrawer(!showDrawer);
  };

  const handleCreateOrder = async () => {
    handleSetLoading(true);
    const createOrderData = {
      clientId: createValidation.clientId,
      clothIdList: orderClothValidation.map((clothId) => ({
        amount: clothId.amount,
        clothId: clothId.clothId,
        size: clothId.size,
      })),
      status: createValidation.status,
    } as IOrderCreate;

    await props.createOrderThunk(createOrderData);
    updateOrderList(pagination.rows, pagination.page);
    handleSetLoading(false);
    handleCreateDialogClose();
  };

  const handleEditOrder = async () => {
    handleSetLoading(true);
    const OrderChanged = orders.find((order) => order.id === editValidation.id);

    if (!OrderChanged) {
      handleEditDialogClose();
      return;
    }

    let isClothIdListChanged =
      OrderChanged.clothIdList.length !== orderClothValidation.length;

    if (!isClothIdListChanged) {
      isClothIdListChanged = orderClothValidation.reduce((prev, cur) => {
        if (prev) {
          return prev;
        }

        if (
          OrderChanged.clothIdList.find(
            (clothId) =>
              clothId.amount !== cur.amount ||
              clothId.clothId !== cur.clothId ||
              clothId.size !== cur.size,
          )
        ) {
          return true;
        }
        return false;
      }, false);
    }

    const editOrderData = {
      id: editValidation.id,
      clientid:
        editValidation.clientId !== OrderChanged.clientId
          ? editValidation.clientId
          : undefined,
      clothIdList: isClothIdListChanged ? orderClothValidation : undefined,
      status:
        editValidation.status !== OrderChanged.status
          ? editValidation.status
          : undefined,
    } as IOrderUpdate;

    await props.updateOrderThunk(editOrderData);
    updateOrderList(pagination.rows, pagination.page);
    handleSetLoading(false);
    handleEditDialogClose();
  };

  const handleClickCreateDialogOpen = () => {
    setCreateOpen(true);
  };

  const handleCreateDialogClose = () => {
    setCreateOpen(false);
    setCreateValidation({
      clientId: '',
      status: OrderStatuses.CREATED,
    });
    setOrderClothValidation([
      {
        clothId: 0,
        amount: 0,
        size: ClothSizes.S,
      },
    ]);
  };

  const handleClickEditDialogOpen = (order: IOrder) => {
    setEditValidation({
      id: order.id,
      clientId: order.clientId,
      status: order.status,
    });
    setOrderClothValidation(order.clothIdList);
    setEditOpen(true);
  };

  const handleEditDialogClose = () => {
    setEditOpen(false);
    setEditValidation({
      id: NaN,
      clientId: '',
      status: '' as OrderStatuses,
    });
    setOrderClothValidation([
      {
        clothId: 0,
        amount: 0,
        size: ClothSizes.S,
      },
    ]);
  };

  const handleClickDeleteDialogOpen = (id: number) => {
    setDeleteValidation({ id });
    setDeleteOpen(true);
  };

  const handleDeleteDialogClose = () => {
    setDeleteOpen(false);
    setDeleteValidation({ id: NaN });
  };

  const handleDeleteOrder = (id: number) => async () => {
    handleSetLoading(true);
    await props.deleteOrderThunk({ id });
    updateOrderList(pagination.rows, pagination.page);
    handleSetLoading(false);
    handleDeleteDialogClose();
  };

  const handleChangeCreateText = (event: any) => {
    setCreateValidation({
      ...createValidation,
      [event.target.name]: event.target.value,
    });
  };

  const handleChangeEditText = (event: any) => {
    if (event.target.name === 'clothIdList') {
      setEditValidation({
        ...editValidation,
        [event.target.name]:
          event.target.value?.trim()?.split(',') || event.target.value,
      });
      return;
    }

    setEditValidation({
      ...editValidation,
      [event.target.name]: event.target.value,
    });
  };

  const handleChangeFilterText = (event: any) => {
    setFilter({
      ...filter,
      [event.target.name]: event.target.value,
    });
  };

  const handleChangePage = (
    event: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number,
  ) => {
    setPagination({ ...pagination, page: newPage });
    updateOrderList(pagination.rows, newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setPagination({ rows: parseInt(event.target.value, 10), page: 0 });

    updateOrderList(parseInt(event.target.value, 10), 0);
  };

  const handleFilterOrder = async () => {
    handleSetLoading(true);
    setPagination({ ...pagination, page: 0 });
    await updateOrderList(pagination.rows, 0);
    handleSetLoading(false);
    handleDrawerOpenToggle();
  };

  const handleClearFilterOrder = () => {
    setFilter({
      id: '',
      clientId: '',
      status: '' as OrderStatuses,
    });
  };

  const handleSort = (property: string) => () => {
    const orderString =
      orderBy === property && order === 'asc' ? EnumSort.desc : EnumSort.asc;
    setOrder(orderString);
    setOrderBy(property);
    setPagination({ rows: pagination.rows, page: 0 });
    updateOrderList(pagination.rows, 0, orderString, property);
  };

  const { clientId, status } = createValidation;

  const { id: deleteId } = deleteValidation;
  const { clientId: editClientId, status: editStatus } = editValidation;

  const {
    id: filterId,
    clientId: filterClientId,
    status: filterStatus,
  } = filter;

  return (
    <TableContainer component={Paper}>
      <ThemeProvider theme={theme}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell align="center">
                <TableSortLabel
                  active={orderBy === 'id'}
                  direction={orderBy === 'id' ? order : 'asc'}
                  onClick={handleSort('id')}
                >
                  Обліковий номер
                </TableSortLabel>
              </TableCell>
              <TableCell align="center">
                <TableSortLabel
                  active={orderBy === 'clientId'}
                  direction={orderBy === 'clientId' ? order : 'asc'}
                  onClick={handleSort('clientId')}
                >
                  ID клієнта
                </TableSortLabel>
              </TableCell>
              <TableCell align="center">
                <TableSortLabel
                  active={orderBy === 'clothIdList'}
                  direction={orderBy === 'clothIdList' ? order : 'asc'}
                  onClick={handleSort('clothIdList')}
                >
                  ID замовлених товарів
                </TableSortLabel>
              </TableCell>
              <TableCell align="center">
                <TableSortLabel
                  active={orderBy === 'status'}
                  direction={orderBy === 'status' ? order : 'asc'}
                  onClick={handleSort('status')}
                >
                  Статус замовлення
                </TableSortLabel>
              </TableCell>
              <TableCell align="center">
                <TableSortLabel
                  active={orderBy === 'price'}
                  direction={orderBy === 'price' ? order : 'asc'}
                  onClick={handleSort('price')}
                >
                  Ціна замовлення
                </TableSortLabel>
              </TableCell>
              <TableCell align="center">Час останнього оновлення</TableCell>
              <TableCell align="center">Хто останній раз оновив</TableCell>
              <TableCell align="center">
                <Grid container justifyContent="space-between">
                  <Button
                    color="button"
                    variant="contained"
                    className="createButton"
                    onClick={handleClickCreateDialogOpen}
                  >
                    <Typography variant="caption" fontWeight={'bold'}>
                      Створити
                    </Typography>
                  </Button>
                  <Tooltip title="Фільтрація">
                    <span>
                      <IconButton
                        onClick={handleDrawerOpenToggle}
                        aria-label="Фільтрація"
                      >
                        <FilterAltIcon />
                      </IconButton>
                    </span>
                  </Tooltip>
                </Grid>
                <Drawer
                  anchor="right"
                  open={showDrawer}
                  onClose={handleDrawerOpenToggle}
                  PaperProps={{
                    sx: { width: '25%' },
                  }}
                >
                  <Grid
                    container
                    justifyContent="space-between"
                    className="drawerContainer"
                    alignContent="space-evenly"
                  >
                    <div>
                      <Typography
                        variant="h5"
                        align="center"
                        className="drawerFilterTitle"
                      >
                        Фільтрація
                      </Typography>
                      <TextField
                        fullWidth
                        label="Обліковий номер"
                        className="drawerFilterElem"
                        value={filterId}
                        onChange={handleChangeFilterText}
                        name="id"
                        color="button"
                      />
                      <TextField
                        fullWidth
                        label="ID клієнта"
                        className="drawerFilterElem"
                        value={filterClientId}
                        onChange={handleChangeFilterText}
                        name="clientId"
                        color="button"
                      />
                      <FormControl fullWidth className="drawerFilterElem">
                        <InputLabel
                          id="demo-simple-select-label"
                          color="button"
                        >
                          Статус замовлення
                        </InputLabel>
                        <Select
                          labelId="demo-simple-select-label"
                          id="demo-simple-select"
                          value={filterStatus}
                          label="Статус замовлення"
                          color="button"
                          name="status"
                          onChange={handleChangeFilterText}
                        >
                          <MenuItem value={OrderStatuses.CREATED}>
                            {OrderStatuses.CREATED}
                          </MenuItem>
                          <MenuItem value={OrderStatuses.PROCESSING}>
                            {OrderStatuses.PROCESSING}
                          </MenuItem>
                          <MenuItem value={OrderStatuses.PAYED}>
                            {OrderStatuses.PAYED}
                          </MenuItem>
                          <MenuItem value={OrderStatuses.SENT}>
                            {OrderStatuses.SENT}
                          </MenuItem>
                          <MenuItem value={OrderStatuses.DELIVERED}>
                            {OrderStatuses.DELIVERED}
                          </MenuItem>
                          <MenuItem value={OrderStatuses.COMPLETED}>
                            {OrderStatuses.COMPLETED}
                          </MenuItem>
                          <MenuItem value={OrderStatuses.RETURNED}>
                            {OrderStatuses.RETURNED}
                          </MenuItem>
                          <MenuItem value={OrderStatuses.CANCELED}>
                            {OrderStatuses.CANCELED}
                          </MenuItem>
                        </Select>
                      </FormControl>
                    </div>
                    <Grid
                      container
                      justifyContent="space-evenly"
                      alignContent="center"
                    >
                      <Button
                        color="button"
                        variant="contained"
                        onClick={handleFilterOrder}
                        className="filterButton"
                        disabled={loading}
                      >
                        Застосувати
                        {loading ? (
                          <CircularProgress size={24} color="button" />
                        ) : (
                          ''
                        )}
                      </Button>
                      <Button
                        color="button"
                        variant="contained"
                        onClick={handleClearFilterOrder}
                        className="filterButton"
                        disabled={loading}
                      >
                        Очистити
                      </Button>
                    </Grid>
                  </Grid>
                </Drawer>
              </TableCell>
            </TableRow>
          </TableHead>
          {!orders ? <CircularProgress color="button" /> : ''}
          <TableBody>
            {orders?.map((order) => {
              const menu = IsolatedMenu(order);
              return (
                <TableRow key={order.id}>
                  <TableCell align="center">{order.id}</TableCell>
                  <TableCell align="center">{order.clientId}</TableCell>
                  <TableCell align="center">
                    <Grid container justifyContent="center">
                      {order.clothIdList.map((clothId) => (
                        <span key={clothId.clothId} className="sizeSpan">
                          {clothId.clothId}
                        </span>
                      ))}
                    </Grid>
                  </TableCell>
                  <TableCell align="center">{order.status}</TableCell>
                  <TableCell align="center">{order.price}</TableCell>
                  <TableCell align="center">
                    {order.updatedAt || order.createdAt}
                  </TableCell>
                  <TableCell align="center">
                    {order.deletedBy || order.updatedBy || order.createdBy}
                  </TableCell>
                  <TableCell align="center">
                    <IconButton onClick={menu.handleMenuClick(order.id)}>
                      <MoreHorizIcon />
                    </IconButton>
                    {menu.jsx}
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
        {CreateDialog()}
        {EditDialog()}
        {DeleteDialog(deleteId)}
        <TablePagination
          component="div"
          count={orderCount || 0}
          page={pagination.page}
          onPageChange={handleChangePage}
          rowsPerPage={pagination.rows}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </ThemeProvider>
    </TableContainer>
  );
};

export default Order;
