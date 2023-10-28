import { Helmet } from "react-helmet-async";
// @mui
import {
  Button,
  Container,
  Divider,
  Stack,
  Typography,
  Card,
} from "@mui/material";
import { styled } from "@mui/material/styles";
// hooks
// components
import Iconify from "../components/iconify";
import Logo from "../components/logo";
import { useNavigate } from "react-router-dom";
// sections
import axios from "axios";
// import { Redirect } from 'react-router-dom';
import { Link } from "react-router-dom";
import { LoginForm } from "../sections/auth/register";
import fondo from "../assets/buildings.jpg";
import { useFormik } from "formik";
import * as Yup from "yup";
import { StyledSectionComponent } from "../components/common/StyledSection";
import { useUsers } from "../hooks/UsersHooks/useUsers";
// ----------------------------------------------------------------------
import { useParams } from "react-router-dom";
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

export default function SingUpPage() {
  const { UsersCreate } = useUsers();
  const navigate = useNavigate();
  const { edificio, email } = useParams();

  const continueWithGoogle = async () => {
    try {
      const res = await axios.get(
        `${process.env.REACT_APP_API_URL}/auth/o/google-oauth2/?redirect_uri=${process.env.REACT_APP_API_URL}/google`
      );

      window.location.replace(res.data.authorization_url);
    } catch (err) {}
  };

  const continueWithFacebook = async () => {
    try {
      const res = await axios.get(
        `${process.env.REACT_APP_API_URL}/auth/o/facebook/?redirect_uri=${process.env.REACT_APP_API_URL}/facebook`
      );

      window.location.replace(res.data.authorization_url);
    } catch (err) {}
  };

  const formik = useFormik({
    // Initializa los valores del formulario con los valores iniciales proporcionados por la función initialValues
    initialValues: initialValues(),
    // Establece la validación del esquema utilizando Yup, si se proporciona un objeto  se utiliza un esquema de actualización, de lo contrario se utiliza un esquema nuevo
    validationSchema: Yup.object(validationSchema()),
    onSubmit: async (formValue) => {
      try {
        // Si hace una apeticion en caso de que retone valores se envia a la funcion login
        UsersCreate(formValue);
        handleClick();
        // setRedirect(true);
      } catch (error) {
        console.log(error);
      }
    },
  });
  // if (isAuthenticated) {
  //     return <Redirect to='/' />
  // }

  const handleClick = () => {
    navigate("/dashboard", { replace: true });
  };


  return (
    <>
      <Helmet>
        <title> Registro</title>
      </Helmet>

      <StyledRoot
        sx={{
          backgroundImage: `url(${fondo})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <Logo
          sx={{
            position: "fixed",
            top: { xs: 16, sm: 24, md: 40 },
            left: { xs: 16, sm: 24, md: 40 },
          }}
        />

        <StyledSectionComponent messages={"Hola, Registrate"} />
        <Container maxWidth="sm">
          <StyledContent>
            <Card
              sx={{
                p: 5,
                width: 1,
                maxWidth: 800,
              }}
            >
              <Typography variant="h4" gutterBottom>
                Registro
              </Typography>

              <Typography variant="body2" sx={{ mb: 5 }}>
                Ya tienes una cuenta? {""}
                <Link variant="subtitle2" to="/dashboard">
                  <Link to="/dashboard">Inicia session</Link>
                </Link>
              </Typography>

              <Stack direction="row" spacing={2}>
                <Button
                  fullWidth
                  size="large"
                  color="inherit"
                  variant="outlined"
                >
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

              <LoginForm formik={formik} edificio={edificio} email={email} />
            </Card>
          </StyledContent>
        </Container>
      </StyledRoot>
    </>
  );
}

function initialValues() {
  return {
    tipo_id: "",
    identificacion: "",
    nombres: "",
    apellidos: "",
    email: "",
    celular: "",
    nit_edificio: "",
    tipo_usuario: true,
    acepta_tyc: false,
    password: "",
    // re_new_password: "",
  };
}

function validationSchema() {
  return {
    tipo_id: Yup.number().required("El tipo de identificación es obligatorio"),
    identificacion: Yup.string()
      .matches(/^[0-9]+$/, "La identificación debe ser un número")
      .max(50, "La identificación no debe tener más de 50 caracteres")
      .required("El número de identificación es requerido"),
    nombres: Yup.string().required("Los nombres son obligatorios"),
    apellidos: Yup.string()
      .max(50, "Los apellidos no deben tener más de 50 caracteres")
      .required("Los apellidos son requeridos"),
    email: Yup.string()
      .email("Ingrese un correo electrónico válido")
      .required("El correo electrónico es obligatorio"),
    celular: Yup.string()
      .matches(/^[0-9]+$/, "El número de celular debe ser un número")
      .max(50, "El número de celular no debe tener más de 50 caracteres")
      .required("El número de celular es requerido"),
    nit_edificio: Yup.string()
      .max(20, "El NIT del edificio no debe tener más de 20 caracteres")
      .required("El NIT del edificio es requerido"),
    tipo_usuario: Yup.boolean().required("El tipo de usuario es obligatorio"),
    acepta_tyc: Yup.boolean()
      .oneOf([true], 'Debes aceptar los términos y condiciones')
      .required('Debes aceptar los términos y condiciones'),

    password: Yup.string()
      .required("La nueva contraseña es requerida")
      .min(8, "La contraseña debe tener al menos 8 caracteres")
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/,
        "La contraseña debe contener al menos una letra mayúscula, una letra minúscula, un número y un carácter especial"
      ),

    re_new_password: Yup.string()
      .oneOf([Yup.ref("password"), null], "Las contraseñas no coinciden")
      .required("Debes confirmar la nueva contraseña"),
  };
}



export { initialValues, validationSchema };
