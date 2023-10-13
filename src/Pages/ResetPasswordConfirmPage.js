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
import { LoginForm } from '../sections/auth/confirm_reset';
// ----------------------------------------------------------------------
import { connect } from 'react-redux';
import { reset_password_confirm } from '../actions/auth';
import { useParams } from 'react-router-dom';
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
const ResetPasswordConfirmPage = ({ match, reset_password_confirm }) => {
  const navigate = useNavigate();
  const [requestSent, setRequestSent] = useState(false);
  const mdUp = useResponsive('up', 'md');
  const [formData, setFormData] = useState({
      new_password: '',
      re_new_password: ''
  });
  const { uid, token } = useParams();
  const UID=uid
  const Token=token
  const { new_password, re_new_password } = formData;

  const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = e => {
      e.preventDefault();

      const uid = UID
      const token = Token

      reset_password_confirm(uid, token, new_password, re_new_password);
      setRequestSent(true);
  };
  if (requestSent) {
    navigate("/dashboard", { replace: true });
  }

  return (
    <>
      <Helmet>
        <title> new password </title>
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
              Confirma tu nueva contraseña
            </Typography>
            <img src="/assets/illustrations/illustration_login.png" alt="login" />
          </StyledSection>
        )}

        <Container maxWidth="sm">
          <StyledContent>
            <Typography variant="h4" gutterBottom>
            Nueva contraseña
            </Typography>

            <Typography variant="body2" sx={{ mb: 5 }}>
              No tienes una cuenta? {''}
              <Link variant="subtitle2" to='/signup'><Link to='/signup'>Sign Up</Link></Link>
              
            </Typography>

          

            <LoginForm onChange={onChange} onSubmit={onSubmit} new_password={new_password} re_new_password={re_new_password} />
          </StyledContent>
        </Container>
      </StyledRoot>
    </>
  );
}
export default connect(null, { reset_password_confirm })(ResetPasswordConfirmPage);