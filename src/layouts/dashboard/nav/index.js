import PropTypes from "prop-types";
import { useEffect, useState, Fragment } from "react"; // Importa useState aquí
import { useLocation } from "react-router-dom";
import { styled, alpha } from "@mui/material/styles";
import {
  Box,
  Link,
  Button,
  Drawer,
  Typography,
  Avatar,
  Stack,
} from "@mui/material";

import useResponsive from "../../../hooks/useResponsive";
import Logo from "../../../components/logo";
import Scrollbar from "../../../components/scrollbar";
import NavSection from "../../../components/nav-section";
import navConfig from "./config";
import { connect } from "react-redux";
import { logout } from "../../../actions/auth";
import { useAuth } from "../../../hooks";
import user from '../../../assets/abstract-user.png';
// ----------------------------------------------------------------------

const NAV_WIDTH = 280;

const StyledAccount = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  padding: theme.spacing(2, 2.5),
  borderRadius: Number(theme.shape.borderRadius) * 1.5,
  backgroundColor: alpha(theme.palette.grey[500], 0.12),
}));

// ----------------------------------------------------------------------

const Nav = ({ openNav, onCloseNav, logout, isAuthenticated }) => {
  const { pathname } = useLocation();
  const isDesktop = useResponsive("up", "lg");
  const [redirect, setRedirect] = useState(false);
  const { auth } = useAuth();

  useEffect(() => {
    if (openNav) {
      onCloseNav();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);
/* Si el usuario no está autenticado, se redirige a la página de inicio de sesión */
  
  // const logout_user = () => {
  //   logout();
  //   setRedirect(true);
  // };

  // const guestLinks = () => (
  //   <Fragment>
  //     <li className="nav-item">
  //       <Link className="nav-link" to="/login">
  //         Login
  //       </Link>
  //     </li>
  //     <li className="nav-item">
  //       <Link className="nav-link" to="/signup">
  //         Sign Up
  //       </Link>
  //     </li>
  //   </Fragment>
  // );

  // const authLinks = () => (
  //   <li className="nav-item">
  //     <a className="nav-link" href="#!" onClick={logout_user}>
  //       Logout
  //     </a>
  //   </li>
  // );

  

  const renderContent = (
    <Scrollbar
      sx={{
        height: 1,
        "& .simplebar-content": {
          height: 1,
          display: "flex",
          flexDirection: "column",
        },
      }}
    >
      <Box sx={{ px: 2.5, py: 3, display: "inline-flex" }}>
        <Logo />
      </Box>

      <Box sx={{ mb: 5, mx: 2.5 }}>
        <Link underline="none">
          <StyledAccount>
            {/* <Avatar src={account.photoURL} alt="photoURL" /> */}
            {auth?.me?.foto ? (
        <Avatar src={auth?.me?.foto} alt="photoURL" />
      ) : (
        <Avatar src={user} alt="Default Photo" />
      )}
        
            <Box sx={{ ml: 2 }}>
              <Typography variant="subtitle2" sx={{ color: "text.primary" }}>
                {/* {account.displayName} */}
                {auth?.me?.nombres} {auth?.me?.apellidos}
              </Typography>

              <Typography variant="body2" sx={{ color: "text.secondary" }}>
                {auth?.me?.is_admin ? "Administrador" : "Usuario"}
              </Typography>
            </Box>
          </StyledAccount>
        </Link>
      </Box>

      <NavSection data={navConfig} />

      <Box sx={{ flexGrow: 1 }} />

      {/* <Box sx={{ px: 2.5, pb: 3, mt: 10 }}>
        <Stack
          alignItems="center"
          spacing={3}
          sx={{ pt: 5, borderRadius: 2, position: "relative" }}
        >
         
              {isAuthenticated ? authLinks() : guestLinks()}
           
        </Stack>
      </Box> */}
    </Scrollbar>
  );

  return (
    <Box
      component="nav"
      sx={{
        flexShrink: { lg: 0 },
        width: { lg: NAV_WIDTH },
      }}
    >
      {isDesktop ? (
        <Drawer
          open
          variant="permanent"
          PaperProps={{
            sx: {
              width: NAV_WIDTH,
              bgcolor: "background.default",
              borderRightStyle: "dashed",
            },
          }}
        >
          {renderContent}
        </Drawer>
      ) : (
        <Drawer
          open={openNav}
          onClose={onCloseNav}
          ModalProps={{
            keepMounted: true,
          }}
          PaperProps={{
            sx: { width: NAV_WIDTH },
          }}
        >
          {renderContent}
        </Drawer>
      )}
    </Box>
  );
};
const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});
Nav.propTypes = {
  openNav: PropTypes.bool,
  onCloseNav: PropTypes.func,
};

export default connect(mapStateToProps, { logout })(Nav);
