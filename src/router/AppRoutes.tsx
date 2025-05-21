import { BrowserRouter, Routes, Route } from 'react-router-dom';
import AppLayout from '../layouts/AppLayout';
import LoginPage from '../pages/LoginPage';
import SelectPage from '../pages/SelectPage';
import DashboardPage from '../pages/DashboardPage';

export const AppRoutes = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/login" element={<LoginPage />} />

      <Route
        path="/select-page"
        element={
          <AppLayout>
            <SelectPage />
          </AppLayout>
        }
      />
      <Route
        path="/profile"
        element={
          <AppLayout>
            <DashboardPage />
          </AppLayout>
        }
      />
    </Routes>
  </BrowserRouter>
);
