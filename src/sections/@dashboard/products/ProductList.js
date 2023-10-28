import React from 'react';
import PropTypes from 'prop-types';
import { Grid, Card, Link } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom'; // Importa Link de react-router-dom
import ShopProductCard from './ProductCard';

ProductList.propTypes = {
  users: PropTypes.array.isRequired,
};

export default function ProductList({ users, route, ...other }) {
  const handleMouseEnter = (event) => {
    event.currentTarget.style.transform = 'scale(1.1)';
    event.currentTarget.style.transition = 'transform 0.2s';
  };

  const handleMouseLeave = (event) => {
    event.currentTarget.style.transform = 'scale(1)';
  };

  return (
    <Grid container spacing={3} {...other}>
      {users && users.map((user) => (
        <Grid key={user.id} item xs={12} sm={6} md={3}>
          <Card
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            style={{ transition: 'transform 0.2s', transform: 'scale(1)' }}
          >
            <Link
              component={RouterLink} // Usa RouterLink como componente para el enlace
              to={user.data === "Error" ? "#" : `/dashboard/models/${user.id}`} // Define la URL según tus requerimientos
              underline="none" // Opcional: quita el subrayado del enlace
            >
              <ShopProductCard User={user} />
            </Link>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
}
