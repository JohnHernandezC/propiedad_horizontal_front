import { Helmet } from "react-helmet-async";
// @mui
import { Button, Card, Container, Divider, Stack, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
// hooks
// components
import Iconify from "../components/iconify";

// sections
import { useRef, useState } from "react";
// import { Redirect } from 'react-router-dom';
import { useFormik } from "formik";
import { connect } from "react-redux";
import { Link, Navigate } from "react-router-dom";
import * as Yup from "yup";
import { loginDjango } from "../api/user";
import fondo from "../assets/buildings.jpg";
import { StyledSectionComponent } from "../components/common/StyledSection";
import { useAuth } from "../hooks";
import { LoginForm } from "../sections/auth/login";
// ----------------------------------------------------------------------

const StyledRoot = styled("div")(({ theme }) => ({
  [theme.breakpoints.up("md")]: {
    display: "flex",
  },
}));



const StyledContent = styled("div")(({ theme }) => ({
  maxWidth: 480,
  margin: "auto",
  minHeight: "100vh",
  display: "flex",
  justifyContent: "center",
  flexDirection: "column",
  padding: theme.spacing(12, 0),
}));

// ----------------------------------------------------------------------

const LoginPage = () => {

  
  const { login } = useAuth();

  const captcha = useRef(null)
  const [tokenRc, setToken] = useState(false);
  const [redirect, setRedirect] = useState(false);
  const formik = useFormik({
    // Initializa los valores del formulario con los valores iniciales proporcionados por la función initialValues
    initialValues: initialValues(),
    // Establece la validación del esquema utilizando Yup, si se proporciona un objeto  se utiliza un esquema de actualización, de lo contrario se utiliza un esquema nuevo
    validationSchema: Yup.object(validationSchema()),
    
    onSubmit: async (formValue) => {
      try {
       
         // Si hace una apeticion en caso de que retone valores se envia a la funcion login
        const response = await loginDjango(formValue);
        const { access } = response;
        const token = access;

        login(token);
        setRedirect(true);
        
        
      } catch (error) {
        console.log(error);
      }
    },
  });

  if (redirect) {
    return <Navigate to="/" />;
  }
  return (
    <>
      <Helmet>
        <title> Login </title>
      </Helmet>

      <StyledRoot
      
      sx={{
        backgroundImage: `url(${fondo})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}>
        <StyledSectionComponent messages="¡Hola, bienvenido!" />

        <Container maxWidth="sm" >
          <StyledContent>
          <Card
          sx={{
            p: 5,
            width: 1,
            maxWidth: 420,
          }}
        >
            <Typography variant="h4" gutterBottom>
              Inicia session
            </Typography>

            <Typography variant="body2" sx={{ mb: 5 }}>
              No tienes una cuenta? {""}
              <Link variant="subtitle2" to="/signup/:edificio/:email">
                <Link to="/signup/:edificio/:email">Registrate</Link>
              </Link>
            </Typography>

            <Stack direction="row" spacing={2}>
              <Button fullWidth size="large" color="inherit" variant="outlined">
                <Iconify
                  icon="eva:google-fill"
                  color="#DF3E30"
                  width={22}
                  height={22}
                />
              </Button>

      
            </Stack>

            <Divider sx={{ my: 3 }}>
              <Typography variant="body2" sx={{ color: "text.secondary" }}>
                O
              </Typography>
            </Divider>

            <LoginForm
              formik={formik}
            />
            </Card>
          </StyledContent>
        </Container>
        
      </StyledRoot>
    </>
  );
};
const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated

})
export default connect(mapStateToProps, { })(LoginPage);


function initialValues() {
  return {
    email: "",
    password: "",
  };
}
function validationSchema() {
  return {
    email: Yup.string().email(true).required(true),
    password: Yup.string().required(true),
  };
}
