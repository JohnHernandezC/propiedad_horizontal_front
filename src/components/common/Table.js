import React from 'react';
import {
  Table,
  TableContainer,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Button,
  Box,
  Grid,
  Card,
  CardContent,
  Typography,
} from '@mui/material';
import Scrollbar from '../scrollbar';
import useResponsive from "../../hooks/useResponsive";
import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  tableContainer: {
    marginTop: "20px",
    backgroundColor: "#FFFFFF",
    borderRadius: 10,
    boxShadow: "0px 3px 10px rgba(0, 0, 0, 0.1)",
    padding: theme.spacing(2),
  },
  card: {
    marginBottom: theme.spacing(2),
    border: '1px solid #e0e0e0',
    borderRadius: 10,
    boxShadow: "0px 3px 10px rgba(0, 0, 0, 0.1)",
  },
  cardContent: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    padding: theme.spacing(2),
  },
  actionButtons: {
    marginTop: theme.spacing(2),
    display: 'flex',
    justifyContent: 'flex-end',
  },
}));

export const CustomTable = ({ columns, data, handleEdit, handleDelete }) => {
  const mdUp = useResponsive("up", "md");
  const classes = useStyles();

  // Comprueba si la pantalla es lo suficientemente pequeña para cambiar a una vista de tarjeta
  const isSmallScreen = !mdUp;

  if (isSmallScreen) {
    return (
      <Grid container className={classes.tableContainer}>
        {data?.map((item) => (
          <Card key={item.id} className={classes.card}>
            <CardContent className={classes.cardContent}>
              {columns?.map((column) => (
                <Typography key={column.id} variant="body2" color="textSecondary">
                  {column.label}: {item[column.id]}
                </Typography>
              ))}
              <div className={classes.actionButtons}>
                <Button
                  variant="outlined"
                  color="primary"
                  onClick={() => handleEdit(item)}
                  style={{ marginRight: '10px' }}
                >
                  Edit
                </Button>
                <Button
                  variant="outlined"
                  color="secondary"
                  onClick={() => handleDelete(item)}
                >
                  Delete
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </Grid>
    );
  } else {
    // En pantallas más grandes, muestra la tabla
    return (
      <Grid container className={classes.tableContainer}>
         <Scrollbar>
         <TableContainer sx={{ overflow: 'unset' }}>
            <Table sx={{ minWidth: 800 }}>
            <TableHead>
              <TableRow>
                {columns.map((column) => (
                  <TableCell key={column.id}>{column.label}</TableCell>
                ))}
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data?.map((item) => (
                <TableRow key={item.id}>
                  {columns.map((column) => (
                    <TableCell key={column.id}>{item[column.id]}</TableCell>
                  ))}
                  <TableCell>
                    <Button
                      variant="outlined"
                      color="primary"
                      onClick={() => handleEdit(item)}
                    >
                      Edit
                    </Button>
                    <Button
                      variant="outlined"
                      color="secondary"
                      onClick={() => handleDelete(item)}
                    >
                      Delete
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        </Scrollbar>
      </Grid>
    );
  }
};
