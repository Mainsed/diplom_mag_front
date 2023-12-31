import {
  Button,
  CircularProgress,
  Collapse,
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
  KeyboardArrowUp as KeyboardArrowUpIcon,
  KeyboardArrowDown as KeyboardArrowDownIcon,
  Clear as ClearIcon,
} from '@mui/icons-material';
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';
import {
  DeliveryType,
  IClothDelivered,
  IDelivery,
  IDeliveryCreate,
  IDeliveryProps,
  IDeliveryUpdate,
  IDeliverySizeCount,
  ClothSizes,
} from '../../Redux/interfaces';
import { EnumSort } from '../../utils/enums/enum.sort';
import './Delivery.css';

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

const Delivery = (props: IDeliveryProps): JSX.Element => {
  useEffect(() => {
    props.getDeliveryThunk({
      page: pagination.page,
      limit: pagination.rows,
      sort: {
        order,
        orderBy,
      },
    });
  }, []);

  const delivers = props.delivery?.delivery;
  const deliveryCount = props.delivery.deliveryCount || 0;

  const [loading, setLoading] = useState(false);

  const [createValidation, setCreateValidation] = useState({
    deliveredTo: '',
    deliveredFrom: '',
    typeOfDelivery: '' as DeliveryType,
    price: '',
  });

  const [editValidation, setEditValidation] = useState({
    id: '',
    deliveredTo: '',
    deliveredFrom: '',
    typeOfDelivery: '',
    price: '',
  });

  const [clothDeliverValidation, setClothDeliverValidation] = useState<
  IClothDelivered[]
  >([
    {
      clothId: 0,
      sizes: [],
    },
  ]);

  const [filter, setFilter] = useState({
    id: '',
    deliveredTo: '',
    deliveredFrom: '',
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
  const [colapseOpen, setColapseOpen] = React.useState([] as number[]);

  const [order, setOrder] = React.useState<EnumSort>(EnumSort.asc);
  const [orderBy, setOrderBy] = React.useState('id');

  const IsolatedMenu = (delivery: IDelivery) => {
    const menuOpen = Boolean(anchorEl);
    const { id } = delivery;

    const handleMenuClick =
      (id: number) => (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
        setAnchorId(id);
      };

    const handleMenuClose = () => {
      setAnchorEl(null);
      setAnchorId(null);
    };

    const handleEditClick = (delivery: IDelivery) => () => {
      handleMenuClose();
      handleClickEditDialogOpen(delivery);
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
          open={menuOpen && anchorId === delivery.id}
          onClose={handleMenuClose}
          MenuListProps={{
            'aria-labelledby': 'basic-button',
          }}
          disableScrollLock={true}
          key={delivery.id}
        >
          <MenuItem onClick={handleEditClick(delivery)}>Редагувати</MenuItem>
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
        sx={{
          '& .MuiDialog-container': {
            '& .MuiPaper-root': {
              maxWidth: '1000px',
            },
          },
        }}
        fullWidth
      >
        <DialogTitle>
          <Typography align="center" fontSize={'20px'}>
            Створити поставку
          </Typography>
        </DialogTitle>
        <DialogContent>
          <ValidatorForm
            onSubmit={handleCreateDelivery}
            className="dialogContent"
          >
            <TextValidator
              fullWidth
              variant={'outlined'}
              label="Доставка в"
              onChange={handleChangeCreateText}
              name="deliveredTo"
              color="button"
              value={deliveredTo}
              validators={['required']}
              errorMessages={["Це поле обов'язкове"]}
              className="formElem"
            />
            {typeOfDelivery === DeliveryType.INTERNAL ? (
              <TextValidator
                fullWidth
                variant={'outlined'}
                label="Доставка з"
                onChange={handleChangeCreateText}
                name="deliveredFrom"
                color="button"
                value={deliveredFrom}
                validators={['required']}
                errorMessages={["Це поле обов'язкове"]}
                className="formElem"
              />
            ) : (
              ''
            )}
            {typeOfDelivery === DeliveryType.EXTERNAL ? (
              <TextValidator
                fullWidth
                variant={'outlined'}
                label="Ціна"
                onChange={handleChangeCreateText}
                name="price"
                color="button"
                type="number"
                value={price}
                validators={['required', 'minNumber:1']}
                errorMessages={[
                  "Це поле обов'язкове",
                  'Мінімальне значення - 1',
                ]}
                className="formElem"
              />
            ) : (
              ''
            )}
            <FormControl fullWidth className="formElem">
              <InputLabel id="select-label" color="button">
                Тип поставки
              </InputLabel>
              <Select
                labelId="select-label"
                fullWidth
                variant={'outlined'}
                label="Тип поставки"
                onChange={handleChangeCreateText}
                name="typeOfDelivery"
                color="button"
                value={typeOfDelivery}
              >
                {Object.values(DeliveryType).map((name) => (
                  <MenuItem key={name} value={name}>
                    {name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            {Clothdeliversizes()}
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
        sx={{
          '& .MuiDialog-container': {
            '& .MuiPaper-root': {
              maxWidth: '1000px',
            },
          },
        }}
        fullWidth
      >
        <DialogTitle>
          <Typography align="center" fontSize={'20px'}>
            Редагувати поставку
          </Typography>
        </DialogTitle>
        <DialogContent>
          <ValidatorForm
            onSubmit={handleEditDelivery}
            className="dialogContent"
          >
            {editTypeOfDelivery === DeliveryType.INTERNAL ? (
              <TextValidator
                fullWidth
                variant={'outlined'}
                label="Доставка з"
                disabled={true}
                name="deliveredFrom"
                color="button"
                value={editDeliveredFrom}
                validators={['required']}
                errorMessages={["Це поле обов'язкове"]}
                className="formElem"
              />
            ) : (
              ''
            )}
            <TextValidator
              fullWidth
              variant={'outlined'}
              label="Опис"
              disabled={true}
              name="Доставка в"
              color="button"
              value={editDeliveredTo}
              validators={['required']}
              errorMessages={["Це поле обов'язкове"]}
              className="formElem"
            />
            {editTypeOfDelivery === DeliveryType.EXTERNAL ? (
              <TextValidator
                fullWidth
                variant={'outlined'}
                label="Ціна"
                onChange={handleChangeEditText}
                name="price"
                color="button"
                type="number"
                value={editPrice}
                validators={['required', 'minNumber:1']}
                errorMessages={[
                  "Це поле обов'язкове",
                  'Мінімальне значення - 1',
                ]}
                className="formElem"
              />
            ) : (
              ''
            )}
            {Clothdeliversizes(true)}
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
            {`Видалити поставку '${deleteId}' ?`}
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
              onClick={handleDeleteDelivery(deleteId)}
            >
              Видалити
            </Button>
          </Grid>
        </DialogContent>
      </Dialog>
    );
  };

  const Clothdeliversizes = (disabled = false) => {
    return (
      <Grid container className="clothDeliverySizesBox">
        {clothDeliverValidation.map((clothDeliver, i) => {
          const availableSizes = Object.values(ClothSizes).filter(
            (size) =>
              clothDeliver.sizes.findIndex(
                (clothSize) => clothSize.size === size
              ) === -1
          );
          return (
            <Grid item xs={4} key={i}>
              <Paper className="clothDeliverySizePaper" elevation={3}>
                <TextValidator
                  fullWidth
                  variant={'outlined'}
                  size="small"
                  label="ID одягу"
                  disabled={disabled}
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
                <Typography align="center">Розміри</Typography>

                {clothDeliver.sizes.map((size) => {
                  return (
                    <Grid
                      key={size.size}
                      container
                      justifyContent={'space-evenly'}
                      alignItems={'center'}
                      className="formElem"
                    >
                      <Typography className="clothDeliverySizeTitle">
                        {size.size}
                      </Typography>
                      <TextValidator
                        label="Кількість"
                        disabled={disabled}
                        size="small"
                        color="button"
                        name={size.size}
                        value={size.count}
                        className="clothDeliverySizeText"
                        onFocus={(event: any) => {
                          event.target.select();
                        }}
                        type="number"
                        onChange={handleClothDeliverChange(i)}
                        validators={['required', 'minNumber:1']}
                        errorMessages={[
                          "Це поле обов'язкове",
                          'Мінімальне значення - 1',
                        ]}
                      />{' '}
                      шт.
                      <IconButton
                        disabled={disabled}
                        onClick={handleRemoveClothDeliverSize(i, size.size)}
                      >
                        <ClearIcon />
                      </IconButton>
                    </Grid>
                  );
                })}
                {availableSizes.length !== 0 ? (
                  <FormControl fullWidth className="formElem">
                    <InputLabel id="select-label" color="button">
                      Новий розмір
                    </InputLabel>
                    <Select
                      disabled={disabled}
                      labelId="select-label"
                      variant={'outlined'}
                      label="Новий розмір"
                      onChange={handleAddClothDeliverSize(i)}
                      name="newdeliversize"
                      color="button"
                      className="clothDeliveryNewSizeText"
                      value=""
                    >
                      {availableSizes.map((name) => (
                        <MenuItem key={name} value={name}>
                          {name}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                ) : (
                  ''
                )}
                <Grid container justifyContent="space-evenly">
                  {clothDeliverValidation.length === i + 1 ? (
                    <Button
                      color="button"
                      onClick={handleAddClothDeliver(i)}
                      disabled={disabled}
                    >
                      Додати товар
                    </Button>
                  ) : (
                    ''
                  )}
                  <Button
                    color="error"
                    onClick={handleRemoveClothDeliver(i)}
                    disabled={disabled}
                  >
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

  const handleColapseToggle = (deliveryId: number) => () => {
    if (colapseOpen.indexOf(deliveryId) !== -1) {
      setColapseOpen(colapseOpen.filter((colapse) => colapse !== deliveryId));
    } else {
      setColapseOpen([...colapseOpen, deliveryId]);
    }
  };

  const updateDeliveryList = async (
    rows: number,
    page: number,
    orderString = order,
    orderByString = orderBy
  ) => {
    await props.getDeliveryThunk({
      limit: rows,
      page: page,
      filter: {
        id: parseInt(filter.id) || undefined,
        deliveredFrom: parseInt(filter.deliveredFrom) || undefined,
        deliveredTo: parseInt(filter.deliveredTo) || undefined,
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

  const handleCreateDelivery = async () => {
    handleSetLoading(true);
    const createDeliveryData = {
      clothDelivered: clothDeliverValidation,
      deliveredTo: parseInt(createValidation.deliveredTo),
      typeOfDelivery: createValidation.typeOfDelivery,
      deliveredFrom: parseInt(createValidation.deliveredFrom),
      price: parseInt(createValidation.price),
    } as IDeliveryCreate;

    await props.createDeliveryThunk(createDeliveryData);
    updateDeliveryList(pagination.rows, pagination.page);
    handleSetLoading(false);
    handleCreateDialogClose();
  };

  const handleEditDelivery = async () => {
    handleSetLoading(true);
    const DeliveryChanged = delivers.find(
      (delivery) => delivery.id === parseInt(editValidation.id)
    );

    if (!DeliveryChanged) {
      handleEditDialogClose();
      return;
    }

    const editDeliveryData = {
      id: parseInt(editValidation.id),
      deliveredFrom:
        parseInt(editValidation.deliveredFrom) !== DeliveryChanged.deliveredFrom
          ? parseInt(editValidation.deliveredFrom)
          : undefined,
      deliveredTo:
        parseInt(editValidation.deliveredTo) !== DeliveryChanged.deliveredTo
          ? parseInt(editValidation.deliveredTo)
          : undefined,
      clothDelivered:
        clothDeliverValidation !== DeliveryChanged.clothDelivered
          ? clothDeliverValidation
          : undefined,
      price:
        parseInt(editValidation.price) !== DeliveryChanged.price
          ? editValidation.price
          : undefined,
    } as IDeliveryUpdate;

    await props.updateDeliveryThunk(editDeliveryData);
    updateDeliveryList(pagination.rows, pagination.page);
    handleSetLoading(false);
    handleEditDialogClose();
  };

  const handleClickCreateDialogOpen = () => {
    setCreateOpen(true);
  };

  const handleCreateDialogClose = () => {
    setCreateOpen(false);
    setCreateValidation({
      deliveredTo: '',
      deliveredFrom: '',
      typeOfDelivery: '' as DeliveryType,
      price: '',
    });
    setClothDeliverValidation([
      {
        clothId: 0,
        sizes: [] as IDeliverySizeCount[],
      },
    ]);
  };

  const handleClickEditDialogOpen = (delivery: IDelivery) => {
    setEditValidation({
      id: delivery.id.toString(),
      deliveredTo: delivery.deliveredTo.toString(),
      deliveredFrom: delivery?.deliveredFrom?.toString() || '',
      typeOfDelivery: delivery.typeOfDelivery,
      price: delivery?.price?.toString() || '',
    });
    setClothDeliverValidation(delivery.clothDelivered);
    setEditOpen(true);
  };

  const handleEditDialogClose = () => {
    setEditOpen(false);
    setEditValidation({
      id: '',
      deliveredTo: '',
      deliveredFrom: '',
      typeOfDelivery: '',
      price: '',
    });
    setClothDeliverValidation([
      {
        clothId: 0,
        sizes: [] as IDeliverySizeCount[],
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

  const handleDeleteDelivery = (id: number) => async () => {
    handleSetLoading(true);
    await props.deleteDeliveryThunk({ id });
    updateDeliveryList(pagination.rows, pagination.page);
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
    setEditValidation({
      ...editValidation,
      [event.target.name]: event.target.value,
    });
  };

  const handleClothDeliverChange = (id: number) => (event: any) => {
    setClothDeliverValidation(
      clothDeliverValidation.map((clothDeliver, i) => {
        if (i === id) {
          if (event.target.name === 'clothId') {
            return {
              ...clothDeliver,
              clothId: event.target.value,
            };
          } else {
            const sizes = clothDeliver.sizes.map((size) => {
              if (size.size === event.target.name) {
                return {
                  size: size.size,
                  count: event.target.value,
                };
              }
              return size;
            });
            return {
              clothId: clothDeliver.clothId,
              sizes,
            };
          }
        }
        return clothDeliver;
      })
    );
  };

  const handleChangeFilterText = (event: any) => {
    setFilter({
      ...filter,
      [event.target.name]: event.target.value,
    });
  };

  const handleAddClothDeliver = (id: number) => () => {
    if (clothDeliverValidation.length !== id + 1) {
      return;
    }
    setClothDeliverValidation([
      ...clothDeliverValidation,
      {
        clothId: 0,
        sizes: [],
      },
    ]);
  };

  const handleAddClothDeliverSize = (id: number) => (event: any) => {
    setClothDeliverValidation(
      clothDeliverValidation.map((clothDeliver, i) => {
        if (i === id) {
          return {
            clothId: clothDeliver.clothId,
            sizes: [
              ...clothDeliver.sizes,
              { size: event.target.value, count: 0 },
            ],
          };
        }
        return clothDeliver;
      })
    );
  };

  const handleRemoveClothDeliverSize = (id: number, size: ClothSizes) => () => {
    setClothDeliverValidation(
      clothDeliverValidation.map((clothDeliver, i) => {
        if (i === id) {
          return {
            clothId: clothDeliver.clothId,
            sizes: clothDeliver.sizes.filter(
              (clothSize) => clothSize.size !== size
            ),
          };
        }
        return clothDeliver;
      })
    );
  };

  const handleRemoveClothDeliver = (id: number) => () => {
    if (clothDeliverValidation.length === 1) {
      return;
    }
    setClothDeliverValidation([
      ...clothDeliverValidation.filter((clothDeliver, i) => {
        if (i === id) {
          return false;
        }
        return true;
      }),
    ]);
  };

  const handleChangePage = (
    event: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number
  ) => {
    setPagination({ ...pagination, page: newPage });
    updateDeliveryList(pagination.rows, newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setPagination({ rows: parseInt(event.target.value, 10), page: 0 });

    updateDeliveryList(parseInt(event.target.value, 10), 0);
  };

  const handleFilterDelivery = async () => {
    handleSetLoading(true);
    setPagination({ ...pagination, page: 0 });
    await updateDeliveryList(pagination.rows, 0);
    handleSetLoading(false);
    handleDrawerOpenToggle();
  };

  const handleClearFilterDelivery = () => {
    setFilter({ id: '', deliveredTo: '', deliveredFrom: '' });
  };

  const handleSort = (property: string) => () => {
    const orderString =
      orderBy === property && order === 'asc' ? EnumSort.desc : EnumSort.asc;
    setOrder(orderString);
    setOrderBy(property);
    setPagination({ rows: pagination.rows, page: 0 });
    updateDeliveryList(pagination.rows, 0, orderString, property);
  };

  const { deliveredFrom, deliveredTo, price, typeOfDelivery } =
    createValidation;

  const { id: deleteId } = deleteValidation;
  const {
    deliveredFrom: editDeliveredFrom,
    deliveredTo: editDeliveredTo,
    typeOfDelivery: editTypeOfDelivery,
    price: editPrice,
  } = editValidation;

  const {
    id: filterId,
    deliveredFrom: filterDeliveredFrom,
    deliveredTo: filterDeliveredTo,
  } = filter;

  return (
    <TableContainer component={Paper}>
      <ThemeProvider theme={theme}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell align="center" />
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
                  active={orderBy === 'name'}
                  direction={orderBy === 'name' ? order : 'asc'}
                  onClick={handleSort('name')}
                >
                  Доставка з
                </TableSortLabel>
              </TableCell>
              <TableCell align="center">Доставка в</TableCell>
              <TableCell align="center">
                <TableSortLabel
                  active={orderBy === 'price'}
                  direction={orderBy === 'price' ? order : 'asc'}
                  onClick={handleSort('price')}
                >
                  Всього товару доставлено
                </TableSortLabel>
              </TableCell>
              <TableCell align="center">Ціна</TableCell>
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
                        value={filterDeliveredFrom}
                        onChange={handleChangeFilterText}
                        name="deliveredFrom"
                        color="button"
                      />
                      <TextField
                        fullWidth
                        label="Опис"
                        className="drawerFilterElem"
                        value={filterDeliveredTo}
                        onChange={handleChangeFilterText}
                        name="deliveredTo"
                        color="button"
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
                        onClick={handleFilterDelivery}
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
                        onClick={handleClearFilterDelivery}
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
          {!delivers ? <CircularProgress color="button" /> : ''}
          <TableBody>
            {delivers?.map((delivery) => {
              const menu = IsolatedMenu(delivery);
              return (
                <React.Fragment key={'tab' + delivery.id}>
                  <TableRow>
                    <TableCell align="center">
                      <IconButton
                        size="small"
                        onClick={handleColapseToggle(delivery.id)}
                      >
                        {colapseOpen.includes(delivery.id) ? (
                          <KeyboardArrowUpIcon />
                        ) : (
                          <KeyboardArrowDownIcon />
                        )}
                      </IconButton>
                    </TableCell>
                    <TableCell align="center">{delivery.id}</TableCell>
                    <TableCell align="center">
                      {delivery.deliveredFrom}
                    </TableCell>
                    <TableCell align="center">{delivery.deliveredTo}</TableCell>
                    <TableCell align="center">
                      {delivery.totalAmountDelivered} шт.
                    </TableCell>
                    <TableCell align="center">
                      {!Number.isNaN(delivery.price) ? delivery.price : ''}
                    </TableCell>
                    <TableCell align="center">
                      {delivery.updatedAt || delivery.createdAt}
                    </TableCell>
                    <TableCell align="center">
                      {delivery.deletedBy ||
                        delivery.updatedBy ||
                        delivery.createdBy}
                    </TableCell>
                    <TableCell align="center">
                      <IconButton onClick={menu.handleMenuClick(delivery.id)}>
                        <MoreHorizIcon />
                      </IconButton>
                      {menu.jsx}
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell
                      style={{ paddingBottom: 0, paddingTop: 0 }}
                      colSpan={12}
                    >
                      <Collapse
                        in={colapseOpen.includes(delivery.id)}
                        timeout="auto"
                        unmountOnExit
                      >
                        <Paper className="shopSizesWrap" elevation={3}>
                          <Typography align="center">
                            Кількість поставленого товару
                          </Typography>
                          <Grid container>
                            {delivery.clothDelivered.map(
                              (clothDelivered, i) => (
                                <Grid item xs={6} md={4} lg={3} key={i}>
                                  <Grid container justifyContent="center">
                                    <Paper className="shopSizes" elevation={3}>
                                      <Typography align="center">
                                        Номер одягу: {clothDelivered.clothId}
                                      </Typography>
                                      {clothDelivered.sizes.map((size) => (
                                        <Grid
                                          key={
                                            size.size + clothDelivered.clothId
                                          }
                                        >
                                          <Typography align="center">
                                            {size.size}: {size.count} шт.
                                          </Typography>
                                        </Grid>
                                      ))}
                                    </Paper>
                                  </Grid>
                                </Grid>
                              )
                            )}
                          </Grid>
                        </Paper>
                      </Collapse>
                    </TableCell>
                  </TableRow>
                </React.Fragment>
              );
            })}
          </TableBody>
        </Table>
        {CreateDialog()}
        {EditDialog()}
        {DeleteDialog(deleteId)}
        <TablePagination
          component="div"
          count={deliveryCount || 0}
          page={pagination.page}
          onPageChange={handleChangePage}
          rowsPerPage={pagination.rows}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </ThemeProvider>
    </TableContainer>
  );
};

export default Delivery;
