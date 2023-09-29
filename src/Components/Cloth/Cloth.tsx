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
} from '@mui/icons-material';
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';
import {
  ClothSizes,
  ICloth,
  IClothCreate,
  IClothProps,
  IClothUpdate,
} from '../../Redux/interfaces';
import { EnumSort } from '../../utils/enums/enum.sort';
import './Cloth.css';

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

const Cloth = (props: IClothProps): JSX.Element => {
  useEffect(() => {
    props.getClothThunk({
      page: pagination.page,
      limit: pagination.rows,
      sort: {
        order,
        orderBy,
      },
    });
  }, []);

  const cloths = props.cloth?.cloth;
  const clothCount = props.cloth.clothCount || 0;

  const [loading, setLoading] = useState(false);

  const [createValidation, setCreateValidation] = useState({
    desc: '',
    name: '',
    price: '',
    availableSizes: [] as ClothSizes[],
  });

  const [editValidation, setEditValidation] = useState({
    id: NaN,
    desc: '',
    name: '',
    price: '',
    availableSizes: [] as ClothSizes[],
  });

  const [filter, setFilter] = useState({
    id: '',
    availableSizes: [] as ClothSizes[],
    name: '',
    desc: '',
    price: '',
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
  const [colapseOpen, setColapseOpen] = React.useState([] as number[]);

  const [order, setOrder] = React.useState<EnumSort>(EnumSort.asc);
  const [orderBy, setOrderBy] = React.useState('id');

  const IsolatedMenu = (cloth: ICloth) => {
    const menuOpen = Boolean(anchorEl);
    const { id, name } = cloth;

    const handleMenuClick =
      (id: number) => (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
        setAnchorId(id);
      };

    const handleMenuClose = () => {
      setAnchorEl(null);
      setAnchorId(null);
    };

    const handleEditClick = (cloth: ICloth) => () => {
      handleMenuClose();
      handleClickEditDialogOpen(cloth);
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
          open={menuOpen && anchorId === cloth.id}
          onClose={handleMenuClose}
          MenuListProps={{
            'aria-labelledby': 'basic-button',
          }}
          disableScrollLock={true}
          key={cloth.id}
        >
          <MenuItem onClick={handleEditClick(cloth)}>Редагувати</MenuItem>
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
            Створити товар
          </Typography>
        </DialogTitle>
        <DialogContent>
          <ValidatorForm onSubmit={handleCreateCloth} className="dialogContent">
            <TextValidator
              fullWidth
              variant={'outlined'}
              label="Назва"
              onChange={handleChangeCreateText}
              name="name"
              color="button"
              value={name}
              validators={['minStringLength:2', 'required']}
              errorMessages={[
                'Мінімальна дозволена довжена - 2 символи',
                "Це поле обов'язкове",
              ]}
              className="formElem"
            />
            <TextValidator
              fullWidth
              variant={'outlined'}
              label="Опис товару"
              onChange={handleChangeCreateText}
              name="desc"
              color="button"
              value={desc}
              validators={['minStringLength:2']}
              errorMessages={['Мінімальна дозволена довжена - 2 символи']}
              className="formElem"
            />
            <TextValidator
              fullWidth
              variant={'outlined'}
              label="Ціна"
              onChange={handleChangeCreateText}
              name="price"
              color="button"
              value={price}
              validators={['required']}
              errorMessages={["Це поле обов'язкове"]}
              className="formElem"
            />
            <FormControl fullWidth className="formElem">
              <InputLabel id="select-label" color="button">
                Розміри
              </InputLabel>
              <Select
                labelId="select-label"
                multiple
                fullWidth
                variant={'outlined'}
                label="Розміри"
                onChange={handleChangeCreateText}
                name="availableSizes"
                color="button"
                value={availableSizes}
              >
                {Object.values(ClothSizes).map((name) => (
                  <MenuItem key={name} value={name}>
                    {name}
                  </MenuItem>
                ))}
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
            Редагувати товар
          </Typography>
        </DialogTitle>
        <DialogContent>
          <ValidatorForm onSubmit={handleEditCloth} className="dialogContent">
            <TextValidator
              fullWidth
              variant={'outlined'}
              label="Назва"
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
              label="Опис"
              onChange={handleChangeEditText}
              name="desc"
              color="button"
              value={editDesc}
              validators={['required']}
              errorMessages={["Це поле обов'язкове"]}
              className="formElem"
            />
            <TextValidator
              fullWidth
              variant={'outlined'}
              label="Ціна"
              onChange={handleChangeEditText}
              name="price"
              color="button"
              value={editPrice}
              validators={['required']}
              errorMessages={["Це поле обов'язкове"]}
              className="formElem"
            />
            <FormControl fullWidth>
              <InputLabel id="select-label" color="button">
                Розміри
              </InputLabel>
              <Select
                labelId="select-label"
                multiple
                fullWidth
                variant={'outlined'}
                label="Ціна"
                onChange={handleChangeEditText}
                name="availableSizes"
                color="button"
                value={editAvailableSizes}
                className="formElem"
              >
                {Object.values(ClothSizes).map((name) => (
                  <MenuItem key={name} value={name}>
                    {name}
                  </MenuItem>
                ))}
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
            {`Видалити товар '${deleteName}' ?`}
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
              onClick={handleDeleteCloth(deleteId)}
            >
              Видалити
            </Button>
          </Grid>
        </DialogContent>
      </Dialog>
    );
  };

  const handleSetLoading = (loading: boolean) => {
    setLoading(loading);
  };

  const handleColapseToggle = (clothId: number) => async () => {
    if (colapseOpen.indexOf(clothId) !== -1) {
      setColapseOpen(colapseOpen.filter((colapse) => colapse !== clothId));
    } else {
      await props.getClothSizesThunk(clothId);
      setColapseOpen([...colapseOpen, clothId]);
    }
  };

  const updateClothList = async (
    rows: number,
    page: number,
    orderString = order,
    orderByString = orderBy
  ) => {
    await props.getClothThunk({
      limit: rows,
      page: page,
      filter: {
        id: parseInt(filter.id) || undefined,
        availableSizes: (filter.availableSizes as ClothSizes[]) || undefined,
        name: filter.name || undefined,
        desc: filter.desc || undefined,
        price: parseInt(filter.price) || undefined,
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

  const handleCreateCloth = async () => {
    handleSetLoading(true);
    const createClothData = {
      desc: createValidation.desc,
      name: createValidation.name,
      price: parseInt(createValidation.price),
      availableSizes: createValidation.availableSizes,
    } as IClothCreate;

    await props.createClothThunk(createClothData);
    updateClothList(pagination.rows, pagination.page);
    handleSetLoading(false);
    handleCreateDialogClose();
  };

  const handleEditCloth = async () => {
    handleSetLoading(true);
    const ClothChanged = cloths.find((cloth) => cloth.id === editValidation.id);

    if (!ClothChanged) {
      handleEditDialogClose();
      return;
    }

    const editClothData = {
      id: editValidation.id,
      desc:
        editValidation.desc !== ClothChanged.desc
          ? editValidation.desc
          : undefined,
      name:
        editValidation.name !== ClothChanged.name
          ? editValidation.name
          : undefined,
      price:
        parseInt(editValidation.price) !== ClothChanged.price
          ? parseInt(editValidation.price)
          : undefined,
      availableSizes:
        editValidation.availableSizes !== ClothChanged.availableSizes
          ? editValidation.availableSizes
          : undefined,
    } as IClothUpdate;

    await props.updateClothThunk(editClothData);
    updateClothList(pagination.rows, pagination.page);
    handleSetLoading(false);
    handleEditDialogClose();
  };

  const handleClickCreateDialogOpen = () => {
    setCreateOpen(true);
  };

  const handleCreateDialogClose = () => {
    setCreateOpen(false);
    setCreateValidation({
      desc: '',
      name: '',
      price: '',
      availableSizes: [],
    });
  };

  const handleClickEditDialogOpen = (cloth: ICloth) => {
    setEditValidation({
      id: cloth.id,
      desc: cloth.desc,
      name: cloth.name,
      price: cloth.price.toString(),
      availableSizes: cloth.availableSizes,
    });
    setEditOpen(true);
  };

  const handleEditDialogClose = () => {
    setEditOpen(false);
    setEditValidation({
      id: NaN,
      desc: '',
      name: '',
      price: '',
      availableSizes: [],
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

  const handleDeleteCloth = (id: number) => async () => {
    handleSetLoading(true);
    await props.deleteClothThunk({ id });
    updateClothList(pagination.rows, pagination.page);
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
    updateClothList(pagination.rows, newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setPagination({ rows: parseInt(event.target.value, 10), page: 0 });

    updateClothList(parseInt(event.target.value, 10), 0);
  };

  const handleFilterCloth = async () => {
    handleSetLoading(true);
    setPagination({ ...pagination, page: 0 });
    await updateClothList(pagination.rows, 0);
    handleSetLoading(false);
    handleDrawerOpenToggle();
  };

  const handleClearFilterCloth = () => {
    setFilter({
      id: '',
      availableSizes: [] as ClothSizes[],
      name: '',
      desc: '',
      price: '',
    });
  };

  const handleSort = (property: string) => () => {
    const orderString =
      orderBy === property && order === 'asc' ? EnumSort.desc : EnumSort.asc;
    setOrder(orderString);
    setOrderBy(property);
    setPagination({ rows: pagination.rows, page: 0 });
    updateClothList(pagination.rows, 0, orderString, property);
  };

  const { desc, name, price, availableSizes } = createValidation;

  const { id: deleteId, name: deleteName } = deleteValidation;
  const {
    desc: editDesc,
    name: editName,
    price: editPrice,
    availableSizes: editAvailableSizes,
  } = editValidation;

  const {
    id: filterId,
    desc: filterDesc,
    name: filterName,
    price: filterPrice,
    availableSizes: filterAvailableSizes,
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
                  Назва
                </TableSortLabel>
              </TableCell>
              <TableCell align="center">Опис</TableCell>
              <TableCell align="center">
                <TableSortLabel
                  active={orderBy === 'price'}
                  direction={orderBy === 'price' ? order : 'asc'}
                  onClick={handleSort('price')}
                >
                  Ціна
                </TableSortLabel>
              </TableCell>
              <TableCell align="center">Доступні розміри</TableCell>
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
                        label="Опис"
                        className="drawerFilterElem"
                        value={filterDesc}
                        onChange={handleChangeFilterText}
                        name="desc"
                        color="button"
                      />
                      <TextField
                        fullWidth
                        label="Ціна"
                        className="drawerFilterElem"
                        value={filterPrice}
                        onChange={handleChangeFilterText}
                        name="price"
                        color="button"
                      />
                      <FormControl fullWidth>
                        <InputLabel id="select-label" color="button">
                          Розміри
                        </InputLabel>
                        <Select
                          labelId="select-label"
                          multiple
                          fullWidth
                          variant={'outlined'}
                          label="Розміри"
                          onChange={handleChangeFilterText}
                          name="availableSizes"
                          color="button"
                          value={filterAvailableSizes}
                          className="drawerFilterElem"
                        >
                          {Object.values(ClothSizes).map((name) => (
                            <MenuItem key={name} value={name}>
                              {name}
                            </MenuItem>
                          ))}
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
                        onClick={handleFilterCloth}
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
                        onClick={handleClearFilterCloth}
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
          {!cloths ? <CircularProgress color="button" /> : ''}
          <TableBody>
            {cloths?.map((cloth) => {
              const menu = IsolatedMenu(cloth);
              return (
                <React.Fragment key={'tab' + cloth.id}>
                  <TableRow>
                    <TableCell align="center">
                      <IconButton
                        size="small"
                        onClick={handleColapseToggle(cloth.id)}
                      >
                        {colapseOpen.includes(cloth.id) ? (
                          <KeyboardArrowUpIcon />
                        ) : (
                          <KeyboardArrowDownIcon />
                        )}
                      </IconButton>
                    </TableCell>
                    <TableCell align="center">{cloth.id}</TableCell>
                    <TableCell align="center">{cloth.name}</TableCell>
                    <TableCell align="center">{cloth.desc}</TableCell>
                    <TableCell align="center">{cloth.price}</TableCell>
                    <TableCell align="center">
                      {cloth.availableSizes.map((size) => (
                        <span key={size} className="sizeSpan">
                          {size}
                        </span>
                      ))}
                    </TableCell>
                    <TableCell align="center">
                      {cloth.updatedAt || cloth.createdAt}
                    </TableCell>
                    <TableCell align="center">
                      {cloth.deletedBy || cloth.updatedBy || cloth.createdBy}
                    </TableCell>
                    <TableCell align="center">
                      <IconButton onClick={menu.handleMenuClick(cloth.id)}>
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
                        in={colapseOpen.includes(cloth.id)}
                        timeout="auto"
                        unmountOnExit
                      >
                        <Paper className="shopSizesWrap" elevation={3}>
                          {props.cloth?.sizesByShop?.find(
                            (clothByShops) => clothByShops.clothId === cloth.id
                          )?.shops?.length ? (
                              <>
                                <Typography align="center">
                                Кількість товару в магазинах
                                </Typography>
                                <Grid container>
                                  {props.cloth?.sizesByShop
                                    ?.find(
                                      (clothByShops) =>
                                        clothByShops.clothId === cloth.id
                                    )
                                    ?.shops.map((shop, i) => (
                                      <Grid item xs={6} md={4} lg={3} key={i}>
                                        <Grid container justifyContent="center">
                                          <Paper
                                            className="shopSizes"
                                            elevation={3}
                                          >
                                            <Typography align="center">
                                            Номер магазину: {shop.shopId}
                                            </Typography>
                                            {shop.sizes.map((size) => (
                                              <Grid key={size.size + shop.shopId}>
                                                <Typography align="center">
                                                  {size.size}: {size.count} шт.
                                                </Typography>
                                              </Grid>
                                            ))}
                                          </Paper>
                                        </Grid>
                                      </Grid>
                                    ))}
                                </Grid>
                              </>
                            ) : (
                              <Typography align="center">
                              Цього товару ще нема в магазинах
                              </Typography>
                            )}
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
        {DeleteDialog(deleteId, deleteName)}
        <TablePagination
          component="div"
          count={clothCount || 0}
          page={pagination.page}
          onPageChange={handleChangePage}
          rowsPerPage={pagination.rows}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </ThemeProvider>
    </TableContainer>
  );
};

export default Cloth;
