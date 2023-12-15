import { makeStyles } from "@material-ui/core";
import {
  Button,
  Grid,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import useResponsive from "../../hooks/useResponsive";
import Scrollbar from "../scrollbar";
import { CardsBase } from "./Cards";

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
    border: "1px solid #e0e0e0",
    borderRadius: 10,
    boxShadow: "0px 3px 10px rgba(0, 0, 0, 0.1)",
  },
  cardContent: {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
    padding: theme.spacing(2),
  },
  actionButtons: {
    marginTop: theme.spacing(2),
    display: "flex",
    justifyContent: "flex-end",
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
        {data?.length > 0 ? ( // Verifica si data es un array con al menos un elemento
          <>
            <CardsBase
              data={data}
              Edit={handleEdit}
              Delete={handleDelete}
              columns={columns}
            />
          </>
        ) : (
          // Si data no es un array o está vacío, muestra un mensaje de error o estado vacío
          <Typography variant="body2" color="textSecondary">
            No data available.
          </Typography>
        )}
      </Grid>
    );
  } else {
    // En pantallas más grandes, muestra la tabla
    return (
      <Grid container className={classes.tableContainer}>
        <Scrollbar>
          <TableContainer sx={{ overflow: "unset" }}>
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
                {data?.length > 0 ? ( // Verifica si data es un array con al menos un elemento
                  data.map((item) => (
                    <TableRow key={item.id}>
                      {columns.map((column) => (
                        <TableCell key={column.id}>
                          {column.render
                            ? column.render(item[column.id])
                            : item[column.id]}
                        </TableCell>
                      ))}
                      <TableCell>
                        {handleEdit && (
                          <Button
                            variant="contained"
                            sx={{
                              backgroundColor: "#880606", // Dark red
                              color: "#fcfcfc", // White
                              "&:hover": {
                                backgroundColor: "#d53d0c", // Lighter red on hover
                              },
                            }}
                            onClick={() => handleEdit(item)}
                          >
                            {'Editar'}
                          </Button>
                        )}
                        {handleDelete && (
                          <Button
                            variant="contained"
                            sx={{
                              backgroundColor: "#d53d0c", // Lighter red
                              color: "#fcfcfc", // White
                              "&:hover": {
                                backgroundColor: "#ff8207", // Orange on hover
                              },
                            }}
                            onClick={() => handleDelete(item)}
                          >
                            {'Delete'}
                          </Button>
                        )}
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  // Si data no es un array o está vacío, muestra un mensaje de error o estado vacío
                  <TableRow>
                    <TableCell colSpan={columns.length + 1}>
                      No data available.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>
        </Scrollbar>
      </Grid>
    );
  }
};
