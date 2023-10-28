import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useUsers } from '../../../hooks/useUsers';
import { Helmet } from 'react-helmet-async';
import {
  Grid,
  Container,
  Stack,
  Typography,
  Card,
  CardContent,
  CardMedia,
  Divider,
  Box,
} from '@mui/material';

export default function ProductGeneral() {
  const { loading, Users, getUsers } = useUsers();
  const { id } = useParams();
  const [dataLoaded, setDataLoaded] = useState(false);

  useEffect(() => {
    // Llama a la función getUsers solo si hay un ID válido
    if (id) {
      getUsers(id).then(() => {
        // Marca los datos como cargados cuando la solicitud se completa
        setDataLoaded(true);
      });
    }
  }, []);

  return (
    <>
      <Helmet>
        <title> Models </title>
      </Helmet>

      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" gutterBottom>
            Información del Usuario
          </Typography>
        </Stack>

        {dataLoaded ? (
          <Card elevation={3}>
            <CardMedia
              component="div" // Usamos un div como componente para el contenedor de la imagen
              alt={Users.first_name}
              width="80px" // Ancho fijo más pequeño para el contenedor de la imagen
              height="80px" // Altura fija más pequeña para el contenedor de la imagen
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                overflow: 'hidden', // Oculta cualquier contenido que exceda el contenedor
                border: '2px solid #ccc', // Agregar un borde al contenedor
                borderRadius: '4px', // Agregar bordes redondeados al contenedor
              }}
            >
              <img
                alt={Users.first_name}
                width="40%" // Ancho del 100% para que la imagen se adapte al contenedor
                src={Users.profile_picture}
                style={{
                  objectFit: 'cover',
                  objectPosition: 'center', // Centrar la imagen en el contenedor
                }}
              />
            </CardMedia>
            <CardContent>
              <Typography variant="h5" component="div">
                {Users.first_name} {Users.last_name}
              </Typography>
              <Divider sx={{ my: 2 }} />
              <Box display="flex" flexDirection="column">
                
                <Typography variant="body1" gutterBottom>
                  Edad: {Users.age}
                </Typography>
                <Typography variant="body1" gutterBottom>
                  Género: {Users.gender}
                </Typography>
                <Typography variant="body1" gutterBottom>
                  País: {Users.country}
                </Typography>
                {/* Agrega más campos según sea necesario */}
              </Box>
            </CardContent>
          </Card>
        ) : (
          <p>Cargando datos...</p>
        )}
      </Container>
    </>
  );
}
