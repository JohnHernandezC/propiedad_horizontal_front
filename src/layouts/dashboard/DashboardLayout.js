import { useState } from 'react';
import { Outlet } from 'react-router-dom';
// @mui
import { styled } from '@mui/material/styles';
import  {useEffect } from 'react';
import Header from './header';

import { connect } from 'react-redux';
import { checkAuthenticated, load_user } from '../../actions/auth';
// ----------------------------------------------------------------------
import Nav from './nav';
const APP_BAR_MOBILE = 64;
const APP_BAR_DESKTOP = 92;

const StyledRoot = styled('div')({
  display: 'flex',
  minHeight: '100%',
  overflow: 'hidden',
});

const Main = styled('div')(({ theme }) => ({
  flexGrow: 1,
  overflow: 'auto',
  minHeight: '100%',
  paddingTop: APP_BAR_MOBILE + 24,
  paddingBottom: theme.spacing(10),
  [theme.breakpoints.up('lg')]: {
    paddingTop: APP_BAR_DESKTOP + 24,
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2),
  },
}));

// ----------------------------------------------------------------------

const DashboardLayout = ({ checkAuthenticated, load_user})  => {
  const [open, setOpen] = useState(false);
  useEffect(() => {
    checkAuthenticated();
    load_user();
}, []);
  return (
    <StyledRoot>
      <Header onOpenNav={() => setOpen(true)} />

      <Nav openNav={open} onCloseNav={() => setOpen(false)} />

      <Main>
        <Outlet />
      </Main>
    </StyledRoot>
  );
}
export default connect(null, { checkAuthenticated, load_user })(DashboardLayout);