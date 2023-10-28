import { Helmet } from 'react-helmet-async';
// @mui
import { Container, Typography,Card } from '@mui/material';
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
import { useFormik } from "formik";
import * as Yup from "yup";
import { StyledSectionComponent } from "../components/common/StyledSection";
import fondo from "../assets/buildings.jpg";
import { useUsers } from "../hooks/UsersHooks/useUsers";
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
  const { UsersResetConfirmPassword }= useUsers();

const formik = useFormik({
  // Initializa los valores del formulario con los valores iniciales proporcionados por la función initialValues
  initialValues: initialValues(),
  // Establece la validación del esquema utilizando Yup, si se proporciona un objeto  se utiliza un esquema de actualización, de lo contrario se utiliza un esquema nuevo
  validationSchema: Yup.object(validationSchema()),
  onSubmit: async (formValue) => {
    try {
      // Si hace una apeticion en caso de que retone valores se envia a la funcion login
      UsersResetConfirmPassword(formValue);
      setRequestSent(true);
    } catch (error) {
     console.log(error);
    }
  },
});

if (requestSent) {
  navigate("/dashboard", { replace: true });
}

  return (
    <>
      <Helmet>
        <title> reset password </title>
      </Helmet>

      <StyledRoot
      sx={{
        backgroundImage: `url(${fondo})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}>
        <Logo
          sx={{
            position: 'fixed',
            top: { xs: 16, sm: 24, md: 40 },
            left: { xs: 16, sm: 24, md: 40 },
          }}
        />

        <StyledSectionComponent messages={'Hola recupera tu contraseña'} />

        <Container maxWidth="sm">
          <StyledContent>
          <Card
          sx={{
            p: 5,
            width: 1,
            maxWidth: 420,
          }}
        >
            <Typography variant="h4" gutterBottom>
              Recuperacion de contraseña
            </Typography>

            <Typography variant="body2" sx={{ mb: 5 }}>
              No tienes una cuenta? {''}
              <Link variant="subtitle2" to='/signup/:edificio/:email'><Link to='/signup/:edificio/:email'>Sign Up</Link></Link>
              
            </Typography>

            <LoginForm formik={formik}  />
            </Card>
          </StyledContent>
        </Container>
      </StyledRoot>
    </>
  );
}
export default connect(null, { reset_password })(ResetPasswordPage);


function initialValues() {
  return {
    email: "",
    
  };
}

function validationSchema() {
  return {
    email: Yup.string().required("El email es obligatorio"), 
  }
    
}