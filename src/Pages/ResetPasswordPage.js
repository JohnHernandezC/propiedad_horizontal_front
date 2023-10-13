import { Helmet } from 'react-helmet-async';
// @mui
import { Container, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
// hooks
import useResponsive from '../hooks/useResponsive';
// components
import Logo from '../components/logo';
// sections
import { useState } from 'react';
// import { Redirect } from 'react-router-dom';
import { Link, useNavigate } from 'react-router-dom';
import { LoginForm } from '../sections/auth/reset';
// ----------------------------------------------------------------------
import { connect } from 'react-redux';
import { reset_password } from '../actions/auth';


const StyledRoot = styled('div')(({ theme }) => ({
  [theme.breakpoints.up('md')]: {
    display: 'flex',
  },
}));

const StyledSection = styled('div')(({ theme }) => ({
  width: '100%',
  maxWidth: 480,
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  boxShadow: theme.customShadows.card,
  backgroundColor: theme.palette.background.default,
}));

const StyledContent = styled('div')(({ theme }) => ({
  maxWidth: 480,
  margin: 'auto',
  minHeight: '100vh',
  display: 'flex',
  justifyContent: 'center',
  flexDirection: 'column',
  padding: theme.spacing(12, 0),
}));
const ResetPasswordPage = ({ reset_password }) => {
  const navigate = useNavigate();
  const [requestSent, setRequestSent] = useState(false);
  const mdUp = useResponsive('up', 'md');

const [formData, setFormData] = useState({
  email: ''
});

const { email } = formData;

const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

const onSubmit = e => {
  e.preventDefault();

  reset_password(email);
  setRequestSent(true);
};

if (requestSent) {
  navigate("/dashboard", { replace: true });
}

  return (
    <>
      <Helmet>
        <title> reset password </title>
      </Helmet>

      <StyledRoot>
        <Logo
          sx={{
            position: 'fixed',
            top: { xs: 16, sm: 24, md: 40 },
            left: { xs: 16, sm: 24, md: 40 },
          }}
        />

        {mdUp && (
          <StyledSection>
            <Typography variant="h3" sx={{ px: 5, mt: 10, mb: 5 }}>
              Hola recupera tu contraseña
            </Typography>
            <img src="/assets/illustrations/illustration_login.png" alt="login" />
          </StyledSection>
        )}

        <Container maxWidth="sm">
          <StyledContent>
            <Typography variant="h4" gutterBottom>
              Recuperacion de contraseña
            </Typography>

            <Typography variant="body2" sx={{ mb: 5 }}>
              No tienes una cuenta? {''}
              <Link variant="subtitle2" to='/signup'><Link to='/signup'>Sign Up</Link></Link>
              
            </Typography>

          

            <LoginForm onChange={onChange} onSubmit={onSubmit} email={email}  />
          </StyledContent>
        </Container>
      </StyledRoot>
    </>
  );
}
export default connect(null, { reset_password })(ResetPasswordPage);
