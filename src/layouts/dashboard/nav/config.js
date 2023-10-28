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
    title: 'Propiedades',
    path: '/dashboard/property',
    icon: icon('ic_cart'),
  },
  {
    title: 'Mis propiedades',
    path: '/dashboard/myproperty',
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
