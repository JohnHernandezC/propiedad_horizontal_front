import React from 'react';
import AddIcon from '@material-ui/icons/Add';
import { Box, Button, Typography } from '@mui/material';
import {  makeStyles } from "@material-ui/core";
import useResponsive from "../hooks/useResponsive";

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: theme.spacing(2),
    backgroundColor: "#EDEFF2",
    boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.25)',
    borderRadius: 10,
  },
  title: {
    marginRight: 'auto', // Mueve el título a la esquina contraria
    fontWeight: 'bold', // Hace que el título sea más visible
    fontSize: '1.5rem', // Cambia el tamaño del título
  },
  addButton: {
    backgroundColor: '#808080', // Cambia el color del botón a gris
    '&:hover': {
      backgroundColor: '#606060', // Cambia el color de fondo en el hover
    },
    color: 'white', // Cambia el color del texto a blanco
    fontWeight: 'bold', // Hace que el texto del botón sea más visible
  },
}));

export function HeaderPage(props) {
  const { title, btnTitle, btnClick } = props;
  const mdUp = useResponsive("up", "md");
  const titleSize = mdUp ? '1.5rem' : '1rem';
  const buttonSize = mdUp ? 'medium' : 'small';
  const classes = useStyles();

  return (
    <Box className={classes.root}>
      <Typography variant="h4" className={classes.title} style={{ fontSize: titleSize }}>
        {title}
      </Typography>
      {btnClick && btnTitle && (
        <Button
          variant="contained"
          className={classes.addButton}
          startIcon={<AddIcon />}
          onClick={btnClick}
          size={buttonSize}
        >
          {btnTitle}
        </Button>
      )}
    </Box>
  );
}