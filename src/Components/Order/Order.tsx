import {
  Button,
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
  IOrder,
  IOrderCreate,
  IOrderProps,
  IOrderUpdate,
  OrderStatuses,
} from '../../Redux/interfaces';
import { EnumSort } from '../../utils/enums/enum.sort';

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
    props.getOrderThunk();
  }, []);
  const orders = props.order?.order || [];
  const orderCount = props.order?.orderCount || 0;

  const [createValidation, setCreateValidation] = useState({
    clientId: '',
    clothIdList: [] as string[],
    status: OrderStatuses.CREATED,
  });

  const [editValidation, setEditValidation] = useState({
    id: NaN,
    clientId: '',
    clothIdList: [] as string[],
    status: '' as OrderStatuses,
  });

  const [filter, setFilter] = useState({
    id: '',
    clientId: '',
    clothIdList: [] as string[],
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
            <Tooltip title='Перелік ID через ","'>
              <span>
                <TextValidator
                  fullWidth
                  variant={'outlined'}
                  label="Список ID товарів"
                  onChange={handleChangeCreateText}
                  name="clothIdList"
                  color="button"
                  value={clothIdList}
                  validators={['required']}
                  errorMessages={["Це поле обов'язкове"]}
                  className="formElem"
                />
              </span>
            </Tooltip>
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
            <Tooltip title='Перелік ID через ","'>
              <span>
                <TextValidator
                  fullWidth
                  variant={'outlined'}
                  label="Список ID товарів"
                  onChange={handleChangeEditText}
                  name="clothIdList"
                  color="button"
                  value={editClothIdList}
                  validators={['required']}
                  errorMessages={["Це поле обов'язкове"]}
                  className="formElem"
                />
              </span>
            </Tooltip>
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

  const updateOrderList = (
    rows: number,
    page: number,
    orderString = order,
    orderByString = orderBy
  ) => {
    props.getOrderThunk({
      limit: rows,
      page: page,
      filter: {
        id: parseInt(filter.id),
        clientId: filter.clientId,
        clothIdList: filter.clothIdList,
        status: filter.status,
      },
      sort: {
        order: orderString,
        orderBy: orderByString,
      },
    });
  };

  const handleDrawerOpenToggle = () => {
    setShowDrawer(!showDrawer);
  };

  const handleCreateOrder = () => {
    const createOrderData = {
      clientId: createValidation.clientId,
      clothIdList: createValidation.clothIdList,
      status: createValidation.status,
    } as IOrderCreate;

    props.createOrderThunk(createOrderData);
    updateOrderList(pagination.rows, pagination.page);
    handleCreateDialogClose();
  };

  const handleEditOrder = () => {
    const OrderChanged = orders.find((order) => order.id === editValidation.id);

    if (!OrderChanged) {
      handleEditDialogClose();
      return;
    }

    let isClothIdListChanged =
      OrderChanged.clothIdList.length !== editValidation.clothIdList.length;

    if (!isClothIdListChanged) {
      isClothIdListChanged = editValidation.clothIdList.reduce((prev, cur) => {
        if (prev) {
          return prev;
        }
        if (OrderChanged.clothIdList.indexOf(cur) === -1) {
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
      clothIdList: isClothIdListChanged
        ? editValidation.clothIdList
        : undefined,
      status:
        editValidation.status !== OrderChanged.status
          ? editValidation.status
          : undefined,
    } as IOrderUpdate;

    props.updateOrderThunk(editOrderData);
    updateOrderList(pagination.rows, pagination.page);
    handleEditDialogClose();
  };

  const handleClickCreateDialogOpen = () => {
    setCreateOpen(true);
  };

  const handleCreateDialogClose = () => {
    setCreateOpen(false);
    setCreateValidation({
      clientId: '',
      clothIdList: [],
      status: OrderStatuses.CREATED,
    });
  };

  const handleClickEditDialogOpen = (order: IOrder) => {
    setEditValidation({
      id: order.id,
      clientId: order.clientId,
      clothIdList: order.clothIdList,
      status: order.status,
    });
    setEditOpen(true);
  };

  const handleEditDialogClose = () => {
    setEditOpen(false);
    setEditValidation({
      id: NaN,
      clientId: '',
      clothIdList: [],
      status: '' as OrderStatuses,
    });
  };

  const handleClickDeleteDialogOpen = (id: number) => {
    setDeleteValidation({ id });
    setDeleteOpen(true);
  };

  const handleDeleteDialogClose = () => {
    setDeleteOpen(false);
    setDeleteValidation({ id: NaN });
  };

  const handleDeleteOrder = (id: number) => () => {
    props.deleteOrderThunk({ id });
    updateOrderList(pagination.rows, pagination.page);
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
    newPage: number
  ) => {
    setPagination({ ...pagination, page: newPage });
    updateOrderList(pagination.rows, newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setPagination({ rows: parseInt(event.target.value, 10), page: 0 });

    updateOrderList(parseInt(event.target.value, 10), 0);
  };

  const handleFilterOrder = () => {
    setPagination({ ...pagination, page: 0 });

    updateOrderList(pagination.rows, 0);
  };

  const handleSort = (property: string) => () => {
    const orderString =
      orderBy === property && order === 'asc' ? EnumSort.desc : EnumSort.asc;
    setOrder(orderString);
    setOrderBy(property);
    setPagination({ rows: pagination.rows, page: 0 });
    updateOrderList(pagination.rows, 0, orderString, property);
  };

  const { clientId, clothIdList, status } = createValidation;

  const { id: deleteId } = deleteValidation;
  const {
    clientId: editClientId,
    clothIdList: editClothIdList,
    status: editStatus,
  } = editValidation;

  const {
    id: filterId,
    clientId: filterClientId,
    clothIdList: filterClothIdList,
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
                    sx: { width: '20%' },
                  }}
                >
                  <Grid
                    container
                    direction="column"
                    justifyContent="space-between"
                    className="drawerContainer"
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
                      <Tooltip title='Перелік ID через ","'>
                        <span>
                          <TextField
                            fullWidth
                            label="Список ID товарів"
                            className="drawerFilterElem"
                            value={filterClothIdList}
                            onChange={handleChangeFilterText}
                            name="clothIdList"
                            color="button"
                          />
                        </span>
                      </Tooltip>
                      <TextField
                        fullWidth
                        label="Статус замовлення"
                        className="drawerFilterElem"
                        value={filterStatus}
                        onChange={handleChangeFilterText}
                        name="status"
                        color="button"
                      />
                    </div>
                    <Button
                      color="button"
                      variant="contained"
                      onClick={handleFilterOrder}
                    >
                      Застосувати
                    </Button>
                  </Grid>
                </Drawer>
              </TableCell>
            </TableRow>
          </TableHead>
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
                        <span key={clothId} className="sizeSpan">
                          {clothId}
                        </span>
                      ))}
                    </Grid>
                  </TableCell>
                  <TableCell align="center">{order.status}</TableCell>
                  <TableCell align="center">{order.price}</TableCell>
                  <TableCell align="center">{order.updatedAt}</TableCell>
                  <TableCell align="center">{order.updatedBy}</TableCell>
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
