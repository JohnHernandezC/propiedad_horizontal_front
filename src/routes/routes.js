import { Navigate, useRoutes } from 'react-router-dom';
// layouts
import  DashboardLayout  from '../layouts/dashboard';
import SimpleLayout from '../layouts/simple';
//
// import ActivatePage from '../Pages/ActivatePage';
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
