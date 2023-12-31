import {
  Button,
  Checkbox,
  CircularProgress,
  Dialog,
  DialogContent,
  DialogTitle,
  Drawer,
  FormControlLabel,
  Grid,
  IconButton,
  InputAdornment,
  Menu,
  MenuItem,
  Paper,
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
  Check as CheckIcon,
  Clear as ClearIcon,
  Visibility as VisibilityIcon,
  VisibilityOff as VisibilityOffIcon,
  FilterAlt as FilterAltIcon,
} from '@mui/icons-material';
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';
import './Staff.css';
import {
  IStaff,
  IStaffCreate,
  IStaffProps,
  IStaffUpdate,
} from '../../Redux/interfaces';
import { EnumSort } from '../../utils/enums/enum.sort';

// declaring new color names

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

declare module '@mui/material/Checkbox' {
  interface CheckboxPropsColorOverrides {
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

const Staff = (props: IStaffProps): JSX.Element => {
  const [pagination, setPagination] = React.useState({ rows: 10, page: 0 });
  const [order, setOrder] = React.useState<EnumSort>(EnumSort.asc);
  const [orderBy, setOrderBy] = React.useState('id');

  useEffect(() => {
    props.getStaffThunk({
      page: pagination.page,
      limit: pagination.rows,
      sort: {
        order,
        orderBy,
      },
    });
    ValidatorForm.addValidationRule('isPassword', (value) => {
      if (/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/.test(value)) {
        return true;
      }
      return false;
    });
  }, []);

  const { staff } = props.staff;
  const staffCount = props.staff.staffCount || 0;

  const [createValidation, setCreateValidation] = useState({
    email: '',
    name: '',
    isAdmin: false,
    password: '',
    position: '',
    storeId: '',
  });

  const [editValidation, setEditValidation] = useState({
    id: NaN,
    email: '',
    name: '',
    isAdmin: false,
    password: '',
    position: '',
    storeId: '',
  });

  const [filter, setFilter] = useState({
    id: '',
    email: '',
    name: '',
    isAdmin: false,
    isNotAdmin: false,
    position: '',
    storeId: '',
  });

  const [loading, setLoading] = useState(false);

  const [adminValidation, setAdminValidation] = useState({
    id: NaN,
    name: '',
    password: '',
  });

  const [deleteValidation, setDeleteValidation] = useState({
    id: NaN,
    name: '',
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showDrawer, setShowDrawer] = useState(false);

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [anchorId, setAnchorId] = useState<null | number>(null);

  const [createDialogOpen, setCreateOpen] = React.useState(false);
  const [deleteDialogOpen, setDeleteOpen] = React.useState(false);
  const [makeAdminDialogOpen, setMakeAdminOpen] = React.useState(false);
  const [removeAdminDialogOpen, setRemoveAdminOpen] = React.useState(false);
  const [editDialogOpen, setEditOpen] = React.useState(false);

  const IsolatedMenu = (staff: IStaff) => {
    const menuOpen = Boolean(anchorEl);
    const { id, name, isAdmin } = staff;

    const handleMenuClick =
      (id: number) => (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
        setAnchorId(id);
      };

    const handleMenuClose = () => {
      setAnchorEl(null);
      setAnchorId(null);
    };

    const handleEditClick = (staff: IStaff) => () => {
      handleMenuClose();
      handleClickEditDialogOpen(staff);
    };

    const handleDeleteClick = (id: number, name: string) => () => {
      handleMenuClose();
      handleClickDeleteDialogOpen(id, name);
    };

    const handleMakeAdminClick = (id: number, name: string) => () => {
      handleMenuClose();
      handleClickMakeAdminDialogOpen(id, name);
    };

    const handleRemoveAdminClick = (id: number, name: string) => () => {
      handleMenuClose();
      handleClickRemoveAdminDialogOpen(id, name);
    };

    return {
      jsx: (
        <Menu
          id="basic-menu"
          anchorEl={anchorEl}
          open={menuOpen && anchorId === staff.id}
          onClose={handleMenuClose}
          MenuListProps={{
            'aria-labelledby': 'basic-button',
          }}
          disableScrollLock={true}
        >
          {isAdmin ? (
            <MenuItem onClick={handleRemoveAdminClick(id, name)}>
              Забрати можливості адміністратора
            </MenuItem>
          ) : (
            <MenuItem onClick={handleMakeAdminClick(id, name)}>
              Зробити адміністратором
            </MenuItem>
          )}
          <MenuItem onClick={handleEditClick(staff)}>Редагувати</MenuItem>
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
            Створити працівника
          </Typography>
        </DialogTitle>
        <DialogContent>
          <ValidatorForm onSubmit={handleCreateStaff} className="dialogContent">
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
              label="Посада"
              onChange={handleChangeCreateText}
              name="position"
              color="button"
              value={position}
              validators={['minStringLength:2']}
              errorMessages={['Мінімальна дозволена довжена - 2 символи']}
              className="formElem"
            />
            <TextValidator
              fullWidth
              variant={'outlined'}
              label="ID магазину"
              onChange={handleChangeCreateText}
              name="storeId"
              color="button"
              value={storeId}
              validators={['required']}
              errorMessages={["Це поле обов'язкове"]}
              className="formElem"
            />
            <FormControlLabel
              value={isAdmin}
              onChange={handleChangeCreateText}
              control={<Switch color="button" />}
              label="Зробити адміністратором"
              labelPlacement="end"
              name="isAdmin"
              className="formElem"
            />
            {isAdmin ? (
              <TextValidator
                fullWidth
                variant={'outlined'}
                label="Пароль"
                onChange={handleChangeCreateText}
                name="password"
                color="button"
                type={showPassword ? 'text' : 'password'}
                value={password}
                validators={['isPassword']}
                errorMessages={['Мінімальна довжина паролю - 8 символів, має містити хоча б 1 букву та 1 цифру']}
                className="formElem"
                InputProps={{
                  // <-- This is where the toggle button is added.
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
            ) : (
              ''
            )}
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
                {loading ? <CircularProgress size={24} color="button" /> : ''}
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
            Редагувати працівника
          </Typography>
        </DialogTitle>
        <DialogContent>
          <ValidatorForm onSubmit={handleEditStaff} className="dialogContent">
            <TextValidator
              fullWidth
              variant={'outlined'}
              label="Електронна пошта"
              onChange={handleEditAdminText}
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
              onChange={handleEditAdminText}
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
              label="Посада"
              onChange={handleEditAdminText}
              name="position"
              color="button"
              value={editPosition}
              validators={['minStringLength:2']}
              errorMessages={['Мінімальна дозволена довжена - 2 символи']}
              className="formElem"
            />
            <TextValidator
              fullWidth
              variant={'outlined'}
              label="ID магазину"
              onChange={handleEditAdminText}
              name="storeId"
              color="button"
              value={editStoreId}
              validators={['required']}
              errorMessages={["Це поле обов'язкове"]}
              className="formElem"
            />
            <FormControlLabel
              checked={editIsAdmin}
              disabled={true}
              control={<Switch color="button" />}
              label="Зробити адміністратором"
              labelPlacement="end"
              name="isAdmin"
              className="formElem"
            />
            {editIsAdmin ? (
              <TextValidator
                fullWidth
                disabled={true}
                variant={'outlined'}
                label="Пароль"
                name="password"
                color="button"
                type={showPassword ? 'text' : 'password'}
                value={editPassword}
                validators={['isPassword']}
                errorMessages={['Мінімальна довжина паролю - 8 символів, має містити хоча б 1 букву та 1 цифру']}
                className="formElem"
              />
            ) : (
              ''
            )}
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
                {loading ? <CircularProgress size={24} color="button" /> : ''}
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
            {`Видалити працівника "${deleteName}" ?`}
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
              onClick={handleDeleteStaff(deleteId)}
            >
              Видалити
              {loading ? <CircularProgress size={24} color="button" /> : ''}
            </Button>
          </Grid>
        </DialogContent>
      </Dialog>
    );
  };

  const RemoveAdminDialog = (adminId: number, adminName: string) => {
    return (
      <Dialog
        onClose={handleRemoveAdminDialogClose}
        open={removeAdminDialogOpen}
        className="dialog"
        fullWidth
      >
        <DialogTitle>
          <Typography align="center" fontSize={'20px'}>
            {`Забрати можливості адміністратора у працівника "${adminName}" ?`}
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
              onClick={handleRemoveAdminDialogClose}
            >
              Відмінити
            </Button>
            <Button
              variant="contained"
              color="button"
              onClick={handleRemoveAdmin(adminId)}
            >
              Забрати права адміністратора
              {loading ? <CircularProgress size={24} color="button" /> : ''}
            </Button>
          </Grid>
        </DialogContent>
      </Dialog>
    );
  };

  const MakeAdminDialog = (id: number, name: string, password: string) => {
    return (
      <Dialog
        onClose={handleMakeAdminDialogClose}
        open={makeAdminDialogOpen}
        className="dialog"
        fullWidth
      >
        <DialogTitle>
          <Typography align="center" fontSize={'20px'}>
            {`Зробити працівника "${name}" адміністратором ?`}
          </Typography>
        </DialogTitle>
        <DialogContent>
          <ValidatorForm
            onSubmit={handleMakeAdmin(id)}
            className="dialogContent"
          >
            <TextValidator
              fullWidth
              variant={'outlined'}
              label="Пароль"
              onChange={handleChangeAdminText}
              name="password"
              color="button"
              type={showPassword ? 'text' : 'password'}
              value={password}
              validators={['isPassword']}
              errorMessages={['Мінімальна довжина паролю - 8 символів, має містити хоча б 1 букву та 1 цифру']}
              className="formElem"
              InputProps={{
                // <-- This is where the toggle button is added.
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
              justifyContent="space-evenly"
              className="dialogContent"
            >
              <Button
                variant="contained"
                color="error"
                onClick={handleMakeAdminDialogClose}
              >
                Відмінити
              </Button>
              <Button variant="contained" color="button" type={'submit'}>
                Зробити адміністратором
                {loading ? <CircularProgress size={24} color="button" /> : ''}
              </Button>
            </Grid>
          </ValidatorForm>
        </DialogContent>
      </Dialog>
    );
  };

  const updateStaffList = async (
    rows: number,
    page: number,
    orderString = order,
    orderByString = orderBy
  ) => {
    let { isAdmin } = filter;

    if (
      (filter.isAdmin && filter.isNotAdmin) ||
      (!filter.isAdmin && !filter.isNotAdmin)
    ) {
      isAdmin = undefined as any;
    }

    await props.getStaffThunk({
      limit: rows,
      page: page,
      filter: {
        id: parseInt(filter.id) || undefined,
        email: filter.email || undefined,
        isAdmin,
        name: filter.name || undefined,
        position: filter.position || undefined,
        storeId: parseInt(filter.storeId) || undefined,
      },
      sort: {
        order: orderString,
        orderBy: orderByString,
      },
    });
  };

  const handleSetLoading = (loading: boolean) => {
    setLoading(loading);
  };

  const handleMakeAdmin = (adminId: number) => async () => {
    handleSetLoading(true);
    await props.updateStaffThunk({
      id: adminId,
      isAdmin: true,
      password: adminValidation.password,
    });
    updateStaffList(pagination.rows, pagination.page);
    handleSetLoading(false);
    handleMakeAdminDialogClose();
  };

  const handleRemoveAdmin = (adminId: number) => async () => {
    handleSetLoading(true);
    await props.updateStaffThunk({ id: adminId, isAdmin: false });
    updateStaffList(pagination.rows, pagination.page);
    handleSetLoading(false);
    handleRemoveAdminDialogClose();
  };

  const handleMouseSwitchShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleDrawerOpenToggle = () => {
    setShowDrawer(!showDrawer);
  };

  const handleCreateStaff = async () => {
    handleSetLoading(true);
    const createStaffData = {
      email: createValidation.email,
      isAdmin: createValidation.isAdmin,
      name: createValidation.name,
      position: createValidation.position,
      password:
        createValidation.password !== ''
          ? createValidation.password
          : undefined,
      storeId: parseInt(createValidation.storeId),
    } as IStaffCreate;

    await props.createStaffThunk(createStaffData);
    updateStaffList(pagination.rows, pagination.page);
    handleSetLoading(false);
    handleCreateDialogClose();
  };

  const handleEditStaff = async () => {
    handleSetLoading(true);
    const staffChanged = staff.find((staff) => staff.id === editValidation.id);

    if (!staffChanged) {
      handleEditDialogClose();
      return;
    }

    const editStaffData = {
      id: editValidation.id,
      email:
        editValidation.email !== staffChanged.email
          ? editValidation.email
          : undefined,
      name:
        editValidation.name !== staffChanged.name
          ? editValidation.name
          : undefined,
      position:
        editValidation.position !== staffChanged.position
          ? editValidation.position
          : undefined,
      storeId:
        parseInt(editValidation.storeId) !== staffChanged.storeId
          ? parseInt(editValidation.storeId)
          : undefined,
    } as IStaffUpdate;

    await props.updateStaffThunk(editStaffData);
    updateStaffList(pagination.rows, pagination.page);
    handleSetLoading(false);
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
      isAdmin: false,
      password: '',
      position: '',
      storeId: '',
    });
  };

  const handleClickEditDialogOpen = (staff: IStaff) => {
    setEditValidation({
      id: staff.id,
      email: staff.email,
      name: staff.name,
      isAdmin: staff.isAdmin,
      password: staff.password,
      position: staff.position,
      storeId: staff.storeId.toString(),
    });
    setEditOpen(true);
  };

  const handleEditDialogClose = () => {
    setEditOpen(false);
    setEditValidation({
      id: NaN,
      email: '',
      name: '',
      isAdmin: false,
      password: '',
      position: '',
      storeId: '',
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

  const handleDeleteStaff = (id: number) => async () => {
    handleSetLoading(true);
    await props.deleteStaffThunk({ id });
    updateStaffList(pagination.rows, pagination.page);
    handleSetLoading(false);
    handleDeleteDialogClose();
  };

  const handleClickMakeAdminDialogOpen = (id: number, name: string) => {
    setAdminValidation({ id, name, password: '' });
    setMakeAdminOpen(true);
  };

  const handleMakeAdminDialogClose = () => {
    setMakeAdminOpen(false);
    setAdminValidation({ id: NaN, name: '', password: '' });
  };

  const handleClickRemoveAdminDialogOpen = (id: number, name: string) => {
    setAdminValidation({ id, name, password: '' });
    setRemoveAdminOpen(true);
  };

  const handleRemoveAdminDialogClose = () => {
    setRemoveAdminOpen(false);
    setAdminValidation({ id: NaN, name: '', password: '' });
  };

  const handleChangeCreateText = (event: any) => {
    if (event.target.type === 'checkbox') {
      setCreateValidation({
        ...createValidation,
        [event.target.name]: event.target.checked,
        password: event.target.checked ? createValidation.password : '',
      });
    } else {
      setCreateValidation({
        ...createValidation,
        [event.target.name]: event.target.value,
      });
    }
  };

  const handleChangeAdminText = (event: any) => {
    if (event.target.type === 'checkbox') {
      setAdminValidation({
        ...adminValidation,
        [event.target.name]: event.target.checked,
        password: event.target.checked ? adminValidation.password : '',
      });
    } else {
      setAdminValidation({
        ...adminValidation,
        [event.target.name]: event.target.value,
      });
    }
  };

  const handleEditAdminText = (event: any) => {
    setEditValidation({
      ...editValidation,
      [event.target.name]: event.target.value,
    });
  };

  const handleChangeFilterText = (event: any) => {
    if (event.target.type === 'checkbox') {
      setFilter({
        ...filter,
        [event.target.name]: event.target.checked,
      });
    } else {
      setFilter({
        ...filter,
        [event.target.name]: event.target.value,
      });
    }
  };

  const handleChangePage = (
    event: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number
  ) => {
    setPagination({ ...pagination, page: newPage });
    updateStaffList(pagination.rows, newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setPagination({ rows: parseInt(event.target.value, 10), page: 0 });
    updateStaffList(parseInt(event.target.value, 10), 0);
  };

  const handleFilterStaff = async () => {
    handleSetLoading(true);
    setPagination({ ...pagination, page: 0 });
    await updateStaffList(pagination.rows, 0);
    handleSetLoading(false);
    handleDrawerOpenToggle();
  };

  const handleClearFilterStaff = () => {
    setFilter({
      id: '',
      email: '',
      name: '',
      isAdmin: false,
      isNotAdmin: false,
      position: '',
      storeId: '',
    });
  };

  const handleSort = (property: string) => () => {
    const orderString =
      orderBy === property && order === 'asc' ? EnumSort.desc : EnumSort.asc;
    setOrder(orderString);
    setOrderBy(property);
    setPagination({ rows: pagination.rows, page: 0 });
    updateStaffList(pagination.rows, 0, orderString, property);
  };

  const { email, isAdmin, name, password, position, storeId } =
    createValidation;
  const {
    password: adminPassword,
    id: adminId,
    name: adminName,
  } = adminValidation;
  const { id: deleteId, name: deleteName } = deleteValidation;
  const {
    email: editEmail,
    isAdmin: editIsAdmin,
    name: editName,
    password: editPassword,
    position: editPosition,
    storeId: editStoreId,
  } = editValidation;

  const {
    id: filterId,
    email: filterEmail,
    isAdmin: filterIsAdmin,
    isNotAdmin: filterIsNotAdmin,
    name: filterName,
    position: filterPosition,
    storeId: filterStoreId,
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
              <TableCell align="center">Посада</TableCell>
              <TableCell align="center">
                <TableSortLabel
                  active={orderBy === 'isAdmin'}
                  direction={orderBy === 'isAdmin' ? order : 'asc'}
                  onClick={handleSort('isAdmin')}
                >
                  Чи є адміністратором
                </TableSortLabel>
              </TableCell>
              <TableCell align="center">
                <TableSortLabel
                  active={orderBy === 'storeId'}
                  direction={orderBy === 'storeId' ? order : 'asc'}
                  onClick={handleSort('storeId')}
                >
                  ID магазину
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
                        label="ПІБ"
                        className="drawerFilterElem"
                        value={filterName}
                        onChange={handleChangeFilterText}
                        name="name"
                        color="button"
                      />
                      <TextField
                        fullWidth
                        label="Посада"
                        className="drawerFilterElem"
                        value={filterPosition}
                        onChange={handleChangeFilterText}
                        name="position"
                        color="button"
                      />
                      <TextField
                        fullWidth
                        label="ID магазину"
                        className="drawerFilterElem"
                        value={filterStoreId}
                        onChange={handleChangeFilterText}
                        name="storeId"
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
                      <Typography>Чи є адміністратором ?</Typography>
                      <FormControlLabel
                        value={isAdmin}
                        onChange={handleChangeFilterText}
                        control={<Checkbox color="button" />}
                        label="Так"
                        labelPlacement="end"
                        name="isAdmin"
                        checked={filterIsAdmin}
                        className="formElem"
                      />
                      <FormControlLabel
                        value={isAdmin}
                        onChange={handleChangeFilterText}
                        control={<Checkbox color="button" />}
                        label="Ні"
                        labelPlacement="end"
                        name="isNotAdmin"
                        checked={filterIsNotAdmin}
                        className="formElem"
                      />
                    </div>
                    <Grid
                      container
                      justifyContent="space-evenly"
                      alignContent="center"
                    >
                      <Button
                        color="button"
                        variant="contained"
                        onClick={handleFilterStaff}
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
                        onClick={handleClearFilterStaff}
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
          {!staff ? <CircularProgress color="button" /> : ''}
          <TableBody>
            {staff?.map((staff) => {
              const menu = IsolatedMenu(staff);
              return (
                <TableRow key={staff.id}>
                  <TableCell align="center">{staff.id}</TableCell>
                  <TableCell align="center">{staff.email}</TableCell>
                  <TableCell align="center">{staff.name}</TableCell>
                  <TableCell align="center">{staff.position}</TableCell>
                  <TableCell align="center">
                    {staff.isAdmin ? (
                      <CheckIcon color="button" />
                    ) : (
                      <ClearIcon color="error" />
                    )}
                  </TableCell>
                  <TableCell align="center">{staff.storeId}</TableCell>
                  <TableCell align="center">
                    {staff.updatedAt || staff.createdAt}
                  </TableCell>
                  <TableCell align="center">
                    {staff.deletedBy || staff.updatedBy || staff.createdBy}
                  </TableCell>
                  <TableCell align="center">
                    <IconButton onClick={menu.handleMenuClick(staff.id)}>
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
        {MakeAdminDialog(adminId, adminName, adminPassword)}
        {RemoveAdminDialog(adminId, adminName)}
        <TablePagination
          component="div"
          count={staffCount || 0}
          page={pagination.page}
          onPageChange={handleChangePage}
          rowsPerPage={pagination.rows}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </ThemeProvider>
    </TableContainer>
  );
};

export default Staff;
