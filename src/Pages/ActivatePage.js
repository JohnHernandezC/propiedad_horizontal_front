import { Helmet } from "react-helmet-async";
// @mui
import {
  Card,
  Container,
  Typography
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { useFormik } from "formik";
// components
import Logo from "../components/logo";
// sections
import { useState } from "react";
import { useNavigate } from "react-router-dom";
// import { Redirect } from 'react-router-dom';
import fondo from "../assets/buildings.jpg";
import { StyledSectionComponent } from "../components/common/StyledSection";
import { LoginForm } from "../sections/auth/activate";
import { useUsers } from "../hooks/UsersHooks/useUsers";
// ----------------------------------------------------------------------
import { useParams } from "react-router-dom";

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

export default function ActivatePage() {
  const navigate = useNavigate();
  const { UsersActivateUser }= useUsers();
  const [redirect, setRedirect] = useState(false);
  const { uid, token } = useParams();



  const formik = useFormik({
    initialValues: initialValues(),
    onSubmit: async (formValue) => {
      formValue.uid = uid;
      formValue.token = token;
      console.log("aqui")
      try {
        // Si hace una apeticion en caso de que retone valores se envia a la funcion login
        UsersActivateUser(formValue);
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
        <title> Activate </title>
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

        <StyledSectionComponent messages={"Gracias por registrarte"} />

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
                Activa tu cuenta
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
}
function initialValues() {
  return {
    uid: "",
    token: "",
  };
}