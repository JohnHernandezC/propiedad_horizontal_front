// component
import SvgColor from '../../../components/svg-color';

// ----------------------------------------------------------------------

const icon = (name) => <SvgColor src={`/assets/icons/navbar/${name}.svg`} sx={{ width: 1, height: 1 }} />;

const navConfig = [
  {
    title: 'dashboard',
    path: '/dashboard/app',
    icon: icon('ic_analytics'),
  },
  {
    title: 'Usuarios',
    path: '/dashboard/register',
    icon: icon('ic_user'),
  },
  {
    title: 'Bancos Edificio',
    path: '/dashboard/banco/edificio',
    icon: icon('ic_cart'),
  },
  {
    title: 'Tipo Propiedad',
    path: '/dashboard/propiedad/tipo',
    icon: icon('ic_cart'),
  },
  {
    title: 'Proveedores',
    path: '/dashboard/proveedores',
    icon: icon('ic_cart'),
  },
  {
    title: 'Configuracion cuentas',
    path: '/dashboard/conficuentas',
    icon: icon('ic_cart'),
  },
  {
    title: 'Propiedades',
    path: '/dashboard/property',
    icon: icon('ic_cart'),
  },
  
  {
    title: 'Mis propiedades',
    path: '/dashboard/myproperty',
    icon: icon('ic_blog'),
  },
  {
    title: 'Visitantes',
    path: '/dashboard/visitors',
    icon: icon('ic_blog'),
  },
  {
    title: 'Alquiler',
    path: '/dashboard/alquiler',
    icon: icon('ic_cart'),
  },
  {
    title: 'Cuotas',
    path: '/dashboard/cuotas',
    icon: icon('ic_blog'),
  },
  {
    title: 'Equipos',
    path: '/dashboard/equipos',
    icon: icon('ic_blog'),
  },
  {
    title: 'Gestion',
    path: '/dashboard/gestion',
    icon: icon('ic_blog'),
  },
  {
    title: 'Impuestos',
    path: '/dashboard/impuestos',
    icon: icon('ic_blog'),
  },
  {
    title: 'Items',
    path: '/dashboard/items',
    icon: icon('ic_cart'),
  },
  {
    title: 'Mantenimiento',
    path: '/dashboard/mantenimineto',
    icon: icon('ic_blog'),
  },
  {
    title: 'Parquederos',
    path: '/dashboard/parqueaderos',
    icon: icon('ic_blog'),
  },
  {
    title: 'PUC Edificio',
    path: '/dashboard/PUC/Edificio',
    icon: icon('ic_blog'),
  },
  // {
  //   title: 'login',
  //   path: '/login',
  //   icon: icon('ic_lock'),
  // },
  // {
  //   title: 'signup',
  //   path: '/signup',
  //   icon: icon('ic_lock'),
  // },
  // {
  //   title: 'activate',
  //   path: '/activate/:uid/:token',
  //   icon: icon('ic_lock'),
  // },
  // {
  //   title: 'resetpassword',
  //   path: '/reset-password',
  //   icon: icon('ic_lock'),
  // },
  // {
  //   title: 'resetpasswordconfirm',
  //   path: '/password/reset/confirm/:uid/:token',
  //   icon: icon('ic_lock'),
  // },
  // {
  //   title: 'Not found',
  //   path: '/404',
  //   icon: icon('ic_disabled'),
  // },
];

export default navConfig;
