import { Route, Routes, Navigate } from 'react-router-dom';
import React from 'react';
import { Box } from '@mui/material';
import StaffContainer from '../../Containers/StaffContainer';
import ClientContainer from '../../Containers/ClientContainer';
import ClothContainer from '../../Containers/ClothContainer';
import OrderContainer from '../../Containers/OrderContainer';
import StoreContainer from '../../Containers/StoreContainer';
import DeliveryContainer from '../../Containers/DeliveryContainer';
import ReportsContainer from '../../Containers/ReportsContainer';
import AuthContainer from '../../Containers/AuthContainer';

const MainContent = () =>
  <Box style={{ padding: '20px' }}>
    <Routes>
      <Route path={'/staff'} element={<StaffContainer />} />
      <Route path={'/clients'} element={<ClientContainer />} />
      <Route path={'/cloth'} element={<ClothContainer />} />
      <Route path={'/orders'} element={<OrderContainer />} />
      <Route path={'/stores'} element={<StoreContainer />} />
      <Route path={'/delivery'} element={<DeliveryContainer />} />
      <Route path={'/reports'} element={<ReportsContainer />} />
      <Route path={'/auth'} element={<AuthContainer />} />
      <Route path="*" element={<Navigate to="/staff" />} />
    </Routes>
  </Box>;
export default MainContent;
