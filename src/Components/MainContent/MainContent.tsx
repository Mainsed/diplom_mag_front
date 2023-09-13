import { Route, Routes, Navigate } from 'react-router-dom';
import React from 'react';
import { Box } from '@mui/material';
import StaffContainer from '../../Containers/StaffContainer';
import ClientContainer from '../../Containers/ClientContainer';
import ClothContainer from '../../Containers/ClothContainer';
import OrderContainer from '../../Containers/OrderContainer';

const MainContent = () =>
  <Box style={{ padding: '20px' }}>
    <Routes>
      <Route path={'/staff'} element={<StaffContainer />} />
      <Route path={'/clients'} element={<ClientContainer />} />
      <Route path={'/cloth'} element={<ClothContainer />} />
      <Route path={'/orders'} element={<OrderContainer />} />
      <Route path="*" element={<Navigate to="/staff" />} />
    </Routes>
  </Box>;
export default MainContent;
