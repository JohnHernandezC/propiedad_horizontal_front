import { Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import Logo from "../../components/logo";
import useResponsive from "../../hooks/useResponsive";

const StyledSection = styled("div")(({ theme }) => ({
    width: "100%",
    maxWidth: 480,
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    boxShadow: theme.shadows[5], // Usamos sombras predefinidas de Material-UI
    backgroundColor: theme.palette.background.paper, // Usamos el fondo de papel predeterminado de Material-UI
    borderRadius: theme.shape.borderRadius, // Agregamos bordes redondeados
    padding: theme.spacing(4), // Añadimos espacio interno
    textAlign: "center", // Centramos el contenido
  }));

export  function StyledSectionComponent( { messages } ) {
    const mdUp = useResponsive("up", "md");
  return (
    <>
    <Logo
          sx={{
            position: "fixed",
            top: { xs: 16, sm: 24, md: 40 },
            left: { xs: 16, sm: 24, md: 40 },
          }}
        />

        {mdUp && (
          <StyledSection>
          <Typography variant="h3" sx={{ mt: 2, mb: 4 }}>
            <span className="welcome-text">{messages}</span>
          </Typography>
          {/* Tu contenido adicional */}
        </StyledSection>
        )}
    </> 
  )
}
