import {
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  Drawer,
  FormControl,
  FormControlLabel,
  Grid,
  IconButton,
  InputLabel,
  Menu,
  MenuItem,
  Paper,
  Select,
  Switch,
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
  Check as CheckIcon,
  Clear as ClearIcon,
} from '@mui/icons-material';
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';
import {
  ClothSizes,
  IStore,
  IStoreCreate,
  IStoreProps,
  IStoreUpdate,
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

const Store = (props: IStoreProps): JSX.Element => {
  useEffect(() => {
    props.getStoreThunk();
  }, []);

  const stores = props.store?.store || [];
  const storeCount = props.store.storeCount || 0;

  const [createValidation, setCreateValidation] = useState({
    address: '',
    isActive: false,
  });

  const [editValidation, setEditValidation] = useState({
    id: NaN,
    address: '',
    isActive: false,
  });

  const [filter, setFilter] = useState({
    id: '',
    address: '',
    isActive: false,
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

  const IsolatedMenu = (store: IStore) => {
    const menuOpen = Boolean(anchorEl);
    const { id } = store;

    const handleMenuClick =
      (id: number) => (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
        setAnchorId(id);
      };

    const handleMenuClose = () => {
      setAnchorEl(null);
      setAnchorId(null);
    };

    const handleEditClick = (store: IStore) => () => {
      handleMenuClose();
      handleClickEditDialogOpen(store);
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
          open={menuOpen && anchorId === store.id}
          onClose={handleMenuClose}
          MenuListProps={{
            'aria-labelledby': 'basic-button',
          }}
          disableScrollLock={true}
        >
          <MenuItem onClick={handleEditClick(store)}>Редагувати</MenuItem>
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
            Створити магазин
          </Typography>
        </DialogTitle>
        <DialogContent>
          <ValidatorForm onSubmit={handleCreateStore} className="dialogContent">
            <TextValidator
              fullWidth
              variant={'outlined'}
              label="Адреса"
              onChange={handleChangeCreateText}
              name="address"
              color="button"
              value={address}
              validators={['minStringLength:2']}
              errorMessages={['Мінімальна дозволена довжена - 2 символи']}
              className="formElem"
            />
            <FormControlLabel
              checked={isActive}
              onChange={handleChangeCreateText}
              control={<Switch color="button" />}
              label="Чи працює"
              labelPlacement="end"
              name="isActive"
              className="formElem"
            />
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
            Редагувати магазин
          </Typography>
        </DialogTitle>
        <DialogContent>
          <ValidatorForm onSubmit={handleEditStore} className="dialogContent">
            <TextValidator
              fullWidth
              variant={'outlined'}
              label="Адреса"
              onChange={handleChangeEditText}
              name="address"
              color="button"
              value={editAddress}
              validators={['minStringLength:2']}
              errorMessages={['Мінімальна дозволена довжена - 2 символи']}
              className="formElem"
            />
            <FormControlLabel
              checked={editIsActive}
              onChange={handleChangeEditText}
              control={<Switch color="button" />}
              label="Чи працює"
              labelPlacement="end"
              name="isActive"
              className="formElem"
            />
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
            {`Видалити магазин "${deleteId}" ?`}
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
              onClick={handleDeleteStore(deleteId)}
            >
              Видалити
            </Button>
          </Grid>
        </DialogContent>
      </Dialog>
    );
  };

  const updateStoreList = (
    rows: number,
    page: number,
    orderString = order,
    orderByString = orderBy
  ) => {
    props.getStoreThunk({
      limit: rows,
      page: page,
      filter: {
        id: parseInt(filter.id),
        address: filter.address,
        isActive: filter.isActive,
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

  const handleCreateStore = () => {
    const createStoreData = {
      address: createValidation.address,
      isActive: createValidation.isActive,
    } as IStoreCreate;

    props.createStoreThunk(createStoreData);
    updateStoreList(pagination.rows, pagination.page);
    handleCreateDialogClose();
  };

  const handleEditStore = () => {
    const StoreChanged = stores.find((store) => store.id === editValidation.id);

    if (!StoreChanged) {
      handleEditDialogClose();
      return;
    }

    const editStoreData = {
      id: editValidation.id,
      address:
        editValidation.address !== StoreChanged.address
          ? editValidation.address
          : undefined,
      isActive:
        editValidation.isActive !== StoreChanged.isActive
          ? editValidation.isActive
          : undefined,
    } as IStoreUpdate;

    props.updateStoreThunk(editStoreData);
    updateStoreList(pagination.rows, pagination.page);
    handleEditDialogClose();
  };

  const handleClickCreateDialogOpen = () => {
    setCreateOpen(true);
  };

  const handleCreateDialogClose = () => {
    setCreateOpen(false);
    setCreateValidation({
      address: '',
      isActive: false,
    });
  };

  const handleClickEditDialogOpen = (store: IStore) => {
    setEditValidation({
      id: store.id,
      address: store.address,
      isActive: store.isActive,
    });
    setEditOpen(true);
  };

  const handleEditDialogClose = () => {
    setEditOpen(false);
    setEditValidation({
      id: NaN,
      address: '',
      isActive: false,
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

  const handleDeleteStore = (id: number) => () => {
    props.deleteStoreThunk({ id });
    updateStoreList(pagination.rows, pagination.page);
    handleDeleteDialogClose();
  };

  const handleChangeCreateText = (event: any) => {
    if (event.target.type === 'checkbox') {
      setCreateValidation({
        ...createValidation,
        [event.target.name]: event.target.checked,
      });
    } else {
      setCreateValidation({
        ...createValidation,
        [event.target.name]: event.target.value,
      });
    }
  };

  const handleChangeEditText = (event: any) => {
    if (event.target.type === 'checkbox') {
      setEditValidation({
        ...editValidation,
        [event.target.name]: event.target.checked,
      });
    } else {
      setEditValidation({
        ...editValidation,
        [event.target.name]: event.target.value,
      });
    }
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
    updateStoreList(pagination.rows, newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setPagination({ rows: parseInt(event.target.value, 10), page: 0 });

    updateStoreList(parseInt(event.target.value, 10), 0);
  };

  const handleFilterStore = () => {
    setPagination({ ...pagination, page: 0 });

    updateStoreList(pagination.rows, 0);
  };

  const handleSort = (property: string) => () => {
    const orderString =
      orderBy === property && order === 'asc' ? EnumSort.desc : EnumSort.asc;
    setOrder(orderString);
    setOrderBy(property);
    setPagination({ rows: pagination.rows, page: 0 });
    updateStoreList(pagination.rows, 0, orderString, property);
  };

  const { address, isActive } = createValidation;

  const { id: deleteId } = deleteValidation;
  const { address: editAddress, isActive: editIsActive } = editValidation;

  const {
    id: filterId,
    address: filterAddress,
    isActive: filterIsActive,
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
                  Адреса
                </TableSortLabel>
              </TableCell>
              <TableCell align="center">
                <TableSortLabel
                  active={orderBy === 'name'}
                  direction={orderBy === 'name' ? order : 'asc'}
                  onClick={handleSort('name')}
                >
                  Чи працює
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
                        label="ПІБ"
                        className="drawerFilterElem"
                        value={filterAddress}
                        onChange={handleChangeFilterText}
                        name="address"
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
                          value={filterIsActive}
                          label="Розмір одягу"
                          color="button"
                          name="isActive"
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
                      onClick={handleFilterStore}
                    >
                      Застосувати
                    </Button>
                  </Grid>
                </Drawer>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {stores?.map((store) => {
              const menu = IsolatedMenu(store);
              return (
                <TableRow key={store.id}>
                  <TableCell align="center">{store.id}</TableCell>
                  <TableCell align="center">{store.address}</TableCell>
                  <TableCell align="center">
                    {store.isActive ? (
                      <CheckIcon color="button" />
                    ) : (
                      <ClearIcon color="error" />
                    )}
                  </TableCell>
                  <TableCell align="center">{store.updatedAt}</TableCell>
                  <TableCell align="center">{store.updatedBy}</TableCell>
                  <TableCell align="center">
                    <IconButton onClick={menu.handleMenuClick(store.id)}>
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
          count={storeCount || 0}
          page={pagination.page}
          onPageChange={handleChangePage}
          rowsPerPage={pagination.rows}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </ThemeProvider>
    </TableContainer>
  );
};

export default Store;
