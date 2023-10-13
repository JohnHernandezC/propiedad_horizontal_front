import { Helmet } from "react-helmet-async";
// @mui
import { Button, Container, Divider, Stack, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
// hooks
import useResponsive from "../hooks/useResponsive";
// components
import Iconify from "../components/iconify";
import Logo from "../components/logo";
// sections
import axios from "axios";
import { useState } from "react";
// import { Redirect } from 'react-router-dom';
import { Link, useNavigate } from "react-router-dom";
import { login } from "../actions/auth";
import { LoginForm } from "../sections/auth/login";
import { connect } from "react-redux";
// ----------------------------------------------------------------------

const StyledRoot = styled("div")(({ theme }) => ({
  [theme.breakpoints.up("md")]: {
    display: "flex",
  },
}));

const StyledSection = styled("div")(({ theme }) => ({
  width: "100%",
  maxWidth: 480,
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  boxShadow: theme.customShadows.card,
  backgroundColor: theme.palette.background.default,
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

const LoginPage = ({ login,isAuthenticated }) => {
  const navigate = useNavigate();
  const mdUp = useResponsive("up", "md");
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const { email, password } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

 
  const onSubmit = async (e) => {
    e.preventDefault();
    console.log("2");
    await login(email, password);
    // handleClick();
  };

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

  if (isAuthenticated) {
    navigate("/dashboard", { replace: true });
  }

  return (
    <>
      <Helmet>
        <title> Login | Minimal UI </title>
      </Helmet>

      <StyledRoot>
        <Logo
          sx={{
            position: "fixed",
            top: { xs: 16, sm: 24, md: 40 },
            left: { xs: 16, sm: 24, md: 40 },
          }}
        />

        {mdUp && (
          <StyledSection>
            <Typography variant="h3" sx={{ px: 5, mt: 10, mb: 5 }}>
              Hola bienvenido
            </Typography>
            <img
              src="/assets/illustrations/illustration_login.png"
              alt="login"
            />
          </StyledSection>
        )}

        <Container maxWidth="sm">
          <StyledContent>
            <Typography variant="h4" gutterBottom>
              Inicia session
            </Typography>

            <Typography variant="body2" sx={{ mb: 5 }}>
              No tienes una cuenta? {""}
              <Link variant="subtitle2" to="/signup">
                <Link to="/signup">Registrate</Link>
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

              <Button fullWidth size="large" color="inherit" variant="outlined">
                <Iconify
                  icon="eva:facebook-fill"
                  color="#1877F2"
                  width={22}
                  height={22}
                />
              </Button>

              <Button fullWidth size="large" color="inherit" variant="outlined">
                <Iconify
                  icon="eva:twitter-fill"
                  color="#1C9CEA"
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
              onChange={onChange}
              onSubmit={onSubmit}
              email={email}
              password={password}
            />
          </StyledContent>
        </Container>
      </StyledRoot>
    </>
  );
};
const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated

})
export default connect(mapStateToProps, { login })(LoginPage);
