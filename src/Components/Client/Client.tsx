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
  PaletteColorOptions,
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
import PropTypes from 'prop-types';
import {
  ClothSizes,
  IClient,
  IClientCreate,
  IClientProps,
  IClientUpdate,
} from '../../Redux/interfaces';
import { EnumSort } from '../../enums/enum.sort';

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

const Client = (props: IClientProps): JSX.Element => {
  useEffect(() => {
    props.getClientThunk();
  }, []);

  const clients = props.client?.client || [];
  const clientCount = props.client.clientCount || 0;

  const [createValidation, setCreateValidation] = useState({
    email: '',
    name: '',
    phoneNumber: '',
    size: '',
  });

  const [editValidation, setEditValidation] = useState({
    id: NaN,
    email: '',
    name: '',
    phoneNumber: '',
    size: '',
  });

  const [filter, setFilter] = useState({
    id: '',
    email: '',
    name: '',
    phoneNumber: '',
    size: '',
  });

  const [deleteValidation, setDeleteValidation] = useState({
    id: NaN,
    name: '',
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

  const IsolatedMenu = (client: IClient) => {
    const menuOpen = Boolean(anchorEl);
    const { id, name } = client;

    const handleMenuClick =
      (id: number) => (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
        setAnchorId(id);
      };

    const handleMenuClose = () => {
      setAnchorEl(null);
      setAnchorId(null);
    };

    const handleEditClick = (client: IClient) => () => {
      handleMenuClose();
      handleClickEditDialogOpen(client);
    };

    const handleDeleteClick = (id: number, name: string) => () => {
      handleMenuClose();
      handleClickDeleteDialogOpen(id, name);
    };

    return {
      jsx: (
        <Menu
          id="basic-menu"
          anchorEl={anchorEl}
          open={menuOpen && anchorId === client.id}
          onClose={handleMenuClose}
          MenuListProps={{
            'aria-labelledby': 'basic-button',
          }}
          disableScrollLock={true}
        >
          <MenuItem onClick={handleEditClick(client)}>Редагувати</MenuItem>
          <MenuItem onClick={handleDeleteClick(id, name)}>Видалити</MenuItem>
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
            Створити клієнта
          </Typography>
        </DialogTitle>
        <DialogContent>
          <ValidatorForm
            onSubmit={handleCreateClient}
            className="dialogContent"
          >
            <TextValidator
              fullWidth
              variant={'outlined'}
              label="Електронна пошта"
              onChange={handleChangeCreateText}
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
              onChange={handleChangeCreateText}
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
              label="Номер телефону"
              onChange={handleChangeCreateText}
              name="phoneNumber"
              color="button"
              value={phoneNumber}
              validators={['minStringLength:2']}
              errorMessages={['Мінімальна дозволена довжена - 2 символи']}
              className="formElem"
            />
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label" color="button">
                Розмір одягу
              </InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={size}
                label="Розмір одягу"
                color="button"
                name="size"
                onChange={handleChangeCreateText}
              >
                <MenuItem value={ClothSizes.XS}>{ClothSizes.XS}</MenuItem>
                <MenuItem value={ClothSizes.S}>{ClothSizes.S}</MenuItem>
                <MenuItem value={ClothSizes.M}>{ClothSizes.M}</MenuItem>
                <MenuItem value={ClothSizes.L}>{ClothSizes.L}</MenuItem>
                <MenuItem value={ClothSizes.XL}>{ClothSizes.XL}</MenuItem>
                <MenuItem value={ClothSizes.XXL}>{ClothSizes.XXL}</MenuItem>
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
            Редагувати клієнта
          </Typography>
        </DialogTitle>
        <DialogContent>
          <ValidatorForm onSubmit={handleEditClient} className="dialogContent">
            <TextValidator
              fullWidth
              variant={'outlined'}
              label="Електронна пошта"
              onChange={handleChangeEditText}
              name="email"
              color="button"
              value={editEmail}
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
              onChange={handleChangeEditText}
              name="name"
              color="button"
              value={editName}
              validators={['minStringLength:2']}
              errorMessages={['Мінімальна дозволена довжена - 2 символи']}
              className="formElem"
            />
            <TextValidator
              fullWidth
              variant={'outlined'}
              label="Номер телефону"
              onChange={handleChangeEditText}
              name="phoneNumber"
              color="button"
              value={editPhoneNumber}
              validators={['minStringLength:2']}
              errorMessages={['Мінімальна дозволена довжена - 2 символи']}
              className="formElem"
            />
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label" color="button">
                Розмір одягу
              </InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={editSize}
                label="Розмір одягу"
                color="button"
                name="size"
                onChange={handleChangeEditText}
              >
                <MenuItem value={ClothSizes.XS}>{ClothSizes.XS}</MenuItem>
                <MenuItem value={ClothSizes.S}>{ClothSizes.S}</MenuItem>
                <MenuItem value={ClothSizes.M}>{ClothSizes.M}</MenuItem>
                <MenuItem value={ClothSizes.L}>{ClothSizes.L}</MenuItem>
                <MenuItem value={ClothSizes.XL}>{ClothSizes.XL}</MenuItem>
                <MenuItem value={ClothSizes.XXL}>{ClothSizes.XXL}</MenuItem>
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

  const DeleteDialog = (deleteId: number, deleteName: string) => {
    return (
      <Dialog
        onClose={handleDeleteDialogClose}
        open={deleteDialogOpen}
        className="dialog"
        fullWidth
      >
        <DialogTitle>
          <Typography align="center" fontSize={'20px'}>
            {`Видалити клієнта "${deleteName}" ?`}
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
              onClick={handleDeleteClient(deleteId)}
            >
              Видалити
            </Button>
          </Grid>
        </DialogContent>
      </Dialog>
    );
  };

  const updateClientList = (
    rows: number,
    page: number,
    orderString = order,
    orderByString = orderBy
  ) => {
    props.getClientThunk({
      limit: rows,
      page: page,
      filter: {
        id: parseInt(filter.id),
        email: filter.email,
        name: filter.name,
        phoneNumber: filter.phoneNumber,
        size: filter.size as ClothSizes,
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

  const handleCreateClient = () => {
    const createClientData = {
      email: createValidation.email,
      name: createValidation.name,
      phoneNumber: createValidation.phoneNumber,
      size: createValidation.size,
    } as IClientCreate;

    props.createClientThunk(createClientData);
    updateClientList(pagination.rows, pagination.page);
    handleCreateDialogClose();
  };

  const handleEditClient = () => {
    const ClientChanged = clients.find(
      (client) => client.id === editValidation.id
    );

    if (!ClientChanged) {
      handleEditDialogClose();
      return;
    }

    const editClientData = {
      id: editValidation.id,
      email:
        editValidation.email !== ClientChanged.email
          ? editValidation.email
          : undefined,
      name:
        editValidation.name !== ClientChanged.name
          ? editValidation.name
          : undefined,
      phoneNumber:
        editValidation.phoneNumber !== ClientChanged.phoneNumber
          ? editValidation.phoneNumber
          : undefined,
      size:
        editValidation.size !== ClientChanged.size
          ? editValidation.size
          : undefined,
    } as IClientUpdate;

    props.updateClientThunk(editClientData);
    updateClientList(pagination.rows, pagination.page);
    handleEditDialogClose();
  };

  const handleClickCreateDialogOpen = () => {
    setCreateOpen(true);
  };

  const handleCreateDialogClose = () => {
    setCreateOpen(false);
    setCreateValidation({
      email: '',
      name: '',
      phoneNumber: '',
      size: '',
    });
  };

  const handleClickEditDialogOpen = (client: IClient) => {
    setEditValidation({
      id: client.id,
      email: client.email,
      name: client.name,
      phoneNumber: client.phoneNumber,
      size: client.size,
    });
    setEditOpen(true);
  };

  const handleEditDialogClose = () => {
    setEditOpen(false);
    setEditValidation({
      id: NaN,
      email: '',
      name: '',
      phoneNumber: '',
      size: '',
    });
  };

  const handleClickDeleteDialogOpen = (id: number, name: string) => {
    setDeleteValidation({ id, name });
    setDeleteOpen(true);
  };

  const handleDeleteDialogClose = () => {
    setDeleteOpen(false);
    setDeleteValidation({ id: NaN, name: '' });
  };

  const handleDeleteClient = (id: number) => () => {
    props.deleteClientThunk({ id });
    updateClientList(pagination.rows, pagination.page);
    handleDeleteDialogClose();
  };

  const handleChangeCreateText = (event: any) => {
    setCreateValidation({
      ...createValidation,
      [event.target.name]: event.target.value,
    });
  };

  const handleChangeEditText = (event: any) => {
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
    updateClientList(pagination.rows, newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setPagination({ rows: parseInt(event.target.value, 10), page: 0 });

    updateClientList(parseInt(event.target.value, 10), 0);
  };

  const handleFilterClient = () => {
    setPagination({ ...pagination, page: 0 });

    updateClientList(pagination.rows, 0);
  };

  const handleSort = (property: string) => () => {
    const orderString =
      orderBy === property && order === 'asc' ? EnumSort.desc : EnumSort.asc;
    setOrder(orderString);
    setOrderBy(property);
    setPagination({ rows: pagination.rows, page: 0 });
    updateClientList(pagination.rows, 0, orderString, property);
  };

  const { email, name, phoneNumber, size } = createValidation;

  const { id: deleteId, name: deleteName } = deleteValidation;
  const {
    email: editEmail,
    name: editName,
    phoneNumber: editPhoneNumber,
    size: editSize,
  } = editValidation;

  const {
    id: filterId,
    email: filterEmail,
    name: filterName,
    phoneNumber: filterPhoneNumber,
    size: filterSize,
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
                  active={orderBy === 'email'}
                  direction={orderBy === 'email' ? order : 'asc'}
                  onClick={handleSort('email')}
                >
                  Електронна пошта
                </TableSortLabel>
              </TableCell>
              <TableCell align="center">
                <TableSortLabel
                  active={orderBy === 'name'}
                  direction={orderBy === 'name' ? order : 'asc'}
                  onClick={handleSort('name')}
                >
                  ПІБ
                </TableSortLabel>
              </TableCell>
              <TableCell align="center">Номер телефону</TableCell>
              <TableCell align="center">Розмір одягу</TableCell>
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
                        label="ПІБ"
                        className="drawerFilterElem"
                        value={filterName}
                        onChange={handleChangeFilterText}
                        name="name"
                        color="button"
                      />
                      <TextField
                        fullWidth
                        label="Номер телефону"
                        className="drawerFilterElem"
                        value={filterPhoneNumber}
                        onChange={handleChangeFilterText}
                        name="phoneNumber"
                        color="button"
                      />
                      <TextField
                        fullWidth
                        label="Електронна пошта"
                        className="drawerFilterElem"
                        value={filterEmail}
                        onChange={handleChangeFilterText}
                        name="email"
                        color="button"
                      />
                      <FormControl fullWidth>
                        <InputLabel
                          id="demo-simple-select-label"
                          color="button"
                        >
                          Розмір одягу
                        </InputLabel>
                        <Select
                          labelId="demo-simple-select-label"
                          id="demo-simple-select"
                          value={filterSize}
                          label="Розмір одягу"
                          color="button"
                          name="size"
                          onChange={handleChangeFilterText}
                        >
                          <MenuItem value={ClothSizes.XS}>
                            {ClothSizes.XS}
                          </MenuItem>
                          <MenuItem value={ClothSizes.S}>
                            {ClothSizes.S}
                          </MenuItem>
                          <MenuItem value={ClothSizes.M}>
                            {ClothSizes.M}
                          </MenuItem>
                          <MenuItem value={ClothSizes.L}>
                            {ClothSizes.L}
                          </MenuItem>
                          <MenuItem value={ClothSizes.XL}>
                            {ClothSizes.XL}
                          </MenuItem>
                          <MenuItem value={ClothSizes.XXL}>
                            {ClothSizes.XXL}
                          </MenuItem>
                        </Select>
                      </FormControl>
                    </div>
                    <Button
                      color="button"
                      variant="contained"
                      onClick={handleFilterClient}
                    >
                      Застосувати
                    </Button>
                  </Grid>
                </Drawer>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {clients?.map((client) => {
              const menu = IsolatedMenu(client);
              return (
                <TableRow key={client.id}>
                  <TableCell align="center">{client.id}</TableCell>
                  <TableCell align="center">{client.email}</TableCell>
                  <TableCell align="center">{client.name}</TableCell>
                  <TableCell align="center">{client.phoneNumber}</TableCell>
                  <TableCell align="center">{client.size}</TableCell>
                  <TableCell align="center">{client.updatedAt}</TableCell>
                  <TableCell align="center">{client.updatedBy}</TableCell>
                  <TableCell align="center">
                    <IconButton onClick={menu.handleMenuClick(client.id)}>
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
        {DeleteDialog(deleteId, deleteName)}
        <TablePagination
          component="div"
          count={clientCount || 0}
          page={pagination.page}
          onPageChange={handleChangePage}
          rowsPerPage={pagination.rows}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </ThemeProvider>
    </TableContainer>
  );
};

Client.propTypes = {
  client: PropTypes.array,
};

export default Client;
