import PropTypes from "prop-types";
// @mui
import { Box, Card, Link, Typography, Stack } from "@mui/material";
import { styled } from "@mui/material/styles";
// utils
import { fCurrency } from "../../../utils/formatNumber";
// components
import Label from "../../../components/label";
// import { ColorPreview } from '../../../components/color-utils';
// import { fortawesome } 
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMars, faVenus, faGenderless, faQuestionCircle } from "@fortawesome/free-solid-svg-icons";

// ----------------------------------------------------------------------

const StyledProductImg = styled("img")({
  top: 0,
  width: "100%",
  height: "100%",
  objectFit: "cover",
  position: "absolute",
});

// ----------------------------------------------------------------------

ShopProductCard.propTypes = {
  User: PropTypes.object,
};

export default function ShopProductCard({ User }) {
  const {
    first_name,
    profile_picture,
    price,
    nickmame,
    country,
    age,
    gender,
    bio,
    introduction
  } = User;

  const status = "new";
  
  const genderIcon = (gender) => {
    switch (gender) {
      case "male":
        return faMars;
      case "female":
        return faVenus;
      case "others":
        return faGenderless;
      default:
        return faQuestionCircle;
    }
  };

  return (
    <Card>
      <Box sx={{ pt: "100%", position: "relative" }}>
        {status && (
          <Label
            variant="filled"
            color={(status === "sale" && "error") || "info"}
            sx={{
              zIndex: 9,
              top: 16,
              right: 16,
              position: "absolute",
              textTransform: "uppercase",
            }}
          >
            {status}
          </Label>
        )}
        <StyledProductImg alt={nickmame} src={profile_picture} />
        <FontAwesomeIcon
          icon={genderIcon(gender)}
          size="lg" // Tamaño del ícono (puedes ajustarlo según tus necesidades)
          color="#FF5733" // Cambia el color del ícono aquí
          style={{
            position: "absolute",
            top: 0,
            left: 0, // Coloca el ícono en la esquina superior izquierda
            padding: "4px",
            backgroundColor: "rgba(0, 0, 0, 0.1)",
            borderRadius: "6px 6px 6px 6px", // Añade bordes redondeados solo en la esquina superior derecha
            zIndex: 2,
          }}
        />
        <Typography
          variant="subtitle2"
          noWrap
          sx={{
            position: "absolute",
            bottom: 0,
            left: 0,
            padding: "8px",
            backgroundColor: "rgba(0, 0, 0, 0.7)",
            color: "white",
            borderRadius: "0 6px 6px 0",
            zIndex: 2,
          }}
        >
          {nickmame}
        </Typography>
      </Box>

      <Stack spacing={2} sx={{ p: 3 }}>
        <Link color="inherit" underline="hover">
          <Typography variant="subtitle2" noWrap>
           {country}
          </Typography>
        </Link>

        <Link color="inherit" underline="hover">
          <Typography variant="subtitle2" noWrap>
             {introduction}
          </Typography>
        </Link>

        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
        >
          {/* <ColorPreview colors={colors} /> */}
          <Typography variant="subtitle1">
            <Typography
              component="span"
              variant="body1"
              sx={{
                color: "text.disabled",
                textDecoration: "line-through",
              }}
            >
              {price && fCurrency(price)}
            </Typography>
            &nbsp;
            {fCurrency(price)}
          </Typography>
        </Stack>
      </Stack>
    </Card>
  );
}
