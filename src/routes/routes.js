import { Navigate, useRoutes } from 'react-router-dom';
// layouts
import  DashboardLayout  from '../layouts/dashboard';
import SimpleLayout from '../layouts/simple';
//
import DashboardAppPage from '../Pages/DashboardAppPage';
import LoginPage from '../Pages/LoginPage';
import ActivatePage from '../Pages/ActivatePage';
import Page404 from '../Pages/Page404';
import ResetPasswordConfirmPage from '../Pages/ResetPasswordConfirmPage';
import ResetPasswordPage from '../Pages/ResetPasswordPage';
import SingUpPage from '../Pages/SingUpPage';
import RegisterUserAdmin from '../Pages/RegisterUserAdmin';
import PropertyPage from '../Pages/PageProperty/PropertyPage';
import MyPropertyPage from '../Pages/PageMyProperty/MyPropertyPage';
import { PageVisitors } from '../Pages/PageVisitors/PageVisitors';
import { PageAlquiler } from '../Pages/PageAlquiler/PageAlquiler';
import { PageCuotas } from '../Pages/PageCuotas/PageCuotas';
import { PageEquipos } from '../Pages/PageEquipos/PageEquipos';
import { PageGestionDocumental } from '../Pages/PageGestionDocumental/PageGestionDocumental';
import { PageImpuestos } from '../Pages/PageImpuestos/PageImpuestos';
import { PageItems } from '../Pages/PageItems/PageItems';
import { PageMantenimientoEquipos } from '../Pages/PageMantenimientoEquipos/PageMantenimientoEquipos';
import { PageParqueaderos } from '../Pages/PageParqueaderos/PageParqueaderos';
import PagePUC_Colombia from '../Pages/PagePUC_Colombia/PagePUC_Colombia';
import PagePucEdificio from '../Pages/PagePucEdificio/PagePucEdificio';
import { PageBancosEdificio } from 'src/Pages/pageBancosEdificio/PageBancosEdificio';
import { PageTipoPropiedad } from 'src/Pages/PageTipoPropiedad/PageTipoPropiedad';
import { PageConfiCuentas } from 'src/Pages/PageConfiCuentas/PageConfiCuentas';
import { PageProveedores } from 'src/Pages/PageProveedores/PageProveedores';
// ----------------------------------------------------------------------

export default function Router() {
  const routes = useRoutes([
    {
      path: '/dashboard',
      element: <DashboardLayout />,
      children: [
        { element: <Navigate to="/dashboard/app" />, index: true },
        { path: 'app', element: <DashboardAppPage /> },
        { path: 'register', element: <RegisterUserAdmin /> },
        { path: 'property', element: <PropertyPage /> },
        { path: 'myproperty', element: <MyPropertyPage /> },
        { path: 'visitors', element: <PageVisitors /> },
        { path: 'alquiler', element: <PageAlquiler /> },
        { path: 'cuotas', element: <PageCuotas /> },
        { path: 'equipos', element: <PageEquipos /> },
        { path: 'gestion', element: <PageGestionDocumental /> },
        { path: 'impuestos', element: <PageImpuestos /> },
        { path: 'items', element: <PageItems /> },
        { path: 'mantenimineto', element: <PageMantenimientoEquipos /> },
        { path: 'parqueaderos', element: <PageParqueaderos /> },
        { path: 'banco/edificio', element: <PageBancosEdificio /> },
        { path: 'PUC/Colombia', element: <PagePUC_Colombia /> },
        { path: 'PUC/Edificio', element: <PagePucEdificio /> },
        { path: 'propiedad/tipo', element: <PageTipoPropiedad /> },
        { path: 'conficuentas', element: <PageConfiCuentas /> },
        { path: 'proveedores', element: <PageProveedores /> },
       
        
       
        
      ],
    },
    
    
    {
      element: <SimpleLayout />,
      children: [
        { element: <Navigate to="/dashboard/app" />, index: true },
        {
      path: 'login',
      element: <LoginPage />,
    },
    { path: 'signup/:edificio/:email', element: <SingUpPage /> },
    { path: 'activate/:uid/:token', element: <ActivatePage /> },
    { path: 'reset-password', element: <ResetPasswordPage /> },
    { path: 'password/reset/confirm/:uid/:token', element: <ResetPasswordConfirmPage /> },
    
        { path: '404', element: <Page404 /> },
        { path: '*', element: <Navigate to="/404" /> },
      ],
    },
    {
      path: '*',
      element: <Navigate to="/404" replace />,
    },
  ]);

  return routes;
}
