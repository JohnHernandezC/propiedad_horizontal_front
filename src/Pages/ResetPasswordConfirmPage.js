import { Helmet } from "react-helmet-async";
// @mui
import { Container, Typography,Card } from "@mui/material";
import { styled } from "@mui/material/styles";
// hooks
// components
import Logo from "../components/logo";
// sections
import { useState } from "react";
// import { Redirect } from 'react-router-dom';

import { Link, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import { StyledSectionComponent } from "../components/common/StyledSection";
import { LoginForm } from "../sections/auth/confirm_reset";
import fondo from "../assets/buildings.jpg";
// ----------------------------------------------------------------------
import { connect } from "react-redux";
import { useParams } from "react-router-dom";
import { reset_password_confirm } from "../actions/auth";
import { useUsers } from "../hooks/UsersHooks/useUsers";

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

const ResetPasswordConfirmPage = ({ match, reset_password_confirm }) => {
  const navigate = useNavigate();
  const { UsersResetConfirmPassword }= useUsers();
  const [redirect, setRedirect] = useState(false);
  const { uid, token } = useParams();
  


  const formik = useFormik({
    // Initializa los valores del formulario con los valores iniciales proporcionados por la función initialValues
    initialValues: initialValues(),
    // Establece la validación del esquema utilizando Yup, si se proporciona un objeto  se utiliza un esquema de actualización, de lo contrario se utiliza un esquema nuevo
    validationSchema: Yup.object(validationSchema()),
    onSubmit: async (formValue) => {
      formValue.uid = uid;
      formValue.token = token;
      try {
        // Si hace una apeticion en caso de que retone valores se envia a la funcion login
        UsersResetConfirmPassword(formValue);
        setRedirect(true);
      } catch (error) {
       console.log(error);
      }
    },
  });
  if (redirect) {
    navigate("/dashboard", { replace: true });
  }

  return (
    <>
      <Helmet>
        <title> Nueva contraseña </title>
      </Helmet>

      <StyledRoot
      sx={{
        backgroundImage: `url(${fondo})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
      >
        <Logo
          sx={{
            position: "fixed",
            top: { xs: 16, sm: 24, md: 40 },
            left: { xs: 16, sm: 24, md: 40 },
          }}
        />

        <StyledSectionComponent messages={"Confirma tu nueva contraseña"} />

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
              Nueva contraseña
            </Typography>

            <Typography variant="body2" sx={{ mb: 5 }}>
              No tienes una cuenta? {""}
              <Link variant="subtitle2" to="/signup/:edificio/:email">
                <Link to="/signup/:edificio/:email">Sign Up</Link>
              </Link>
            </Typography>

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
export default connect(null, { reset_password_confirm })(
  ResetPasswordConfirmPage
);

function initialValues() {
  return {
    uid: "",
    token: "",
    new_password: "",
    re_new_password: "",
  };
}

function validationSchema() {
  return Yup.object().shape({
    // uid: Yup.string().required("El UID es obligatorio"),
    // token: Yup.string().required("El token es obligatorio"),
    new_password: Yup
      .string()
      .required("La nueva contraseña es obligatoria")
      .min(8, "La contraseña debe tener al menos 8 caracteres")
      .matches(
        /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/,
        "La contraseña debe contener al menos una letra, un número y un carácter especial"
      ),
    re_new_password: Yup
      .string()
      .required("Debes confirmar la contraseña")
      .oneOf([Yup.ref("new_password"), null], "Las contraseñas no coinciden"),
  });
}