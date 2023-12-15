import ArrowDownOnSquareIcon from "@heroicons/react/24/solid/ArrowDownOnSquareIcon";
import {
  Button,
  Container,
  Unstable_Grid2 as Grid,
  Pagination,
  Stack,
  SvgIcon,
  Typography,
} from "@mui/material";
import Box from "@mui/material/Box";
import { useState } from "react";
import { BaseCard } from "./CardComponent/base-card";
import { CompaniesSearch } from "./CardComponent/companies-search";



export function CardsBase(props) {
  const {
    data,
    Edit,
    Delete,
    columns,
   } = props;
  
  
   const [page, setPage] = useState(1);
  const [searchText, setSearchText] = useState("");
  const itemsPerPage = 12;

  const filterFunction = (datos, searchText) => {
    // Personaliza esta función para que se adapte a las columnas específicas de tu tabla
    return columns.some((column) => {
      const cellValue = datos[column.id];
      return cellValue && cellValue.toString().toLowerCase().includes(searchText.toLowerCase());
    });
  };

  const displayedData = data.filter((datos) => filterFunction(datos, searchText));

  const totalItems = displayedData.length;

  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const paginatedData = displayedData.slice(
    (page - 1) * itemsPerPage,
    page * itemsPerPage
  );

  const handlePageChange = (event, value) => {
    setPage(value);
  };

  const handleSearchChange = (searchValue) => {
    setSearchText(searchValue);
    setPage(1);
  };    
  function generateUniqueKey(data, index) {
    return JSON.stringify(data) + '-' + index;
  }
  
  return (
    <>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 2,
        }}
      >
        <Container maxWidth="xl">
          <Stack spacing={3}>
            <Stack
              direction="row"
              justifyContent="space-between"
              spacing={4}
              alignItems="center"
            >
              <Stack spacing={1}>
                <Typography variant="h4">
                  Vista
                </Typography>
                <Stack alignItems="center" direction="row" spacing={1}>
                  <Button
                    color="inherit"
                    startIcon={
                      <SvgIcon fontSize="small">
                        <ArrowDownOnSquareIcon />
                      </SvgIcon>
                    }
                  >
                    Export
                  </Button>
                </Stack>
              </Stack>
              <div>
               
              </div>
            </Stack>
            <CompaniesSearch onSearchChange={handleSearchChange} x={1} />
            <Grid container spacing={3}>
            {paginatedData.map((datos, index) => (
                <Grid xs={12} md={6} lg={4} key={generateUniqueKey(datos, index)}>
                  <BaseCard
                    datos={datos}
                    Edit={Edit}
                    Delete={Delete}
                    columns={columns}
                  />
                </Grid>
              ))}

            </Grid>
            <Box sx={{ display: "flex", justifyContent: "center", mt: 2 }}>
              <Pagination
                count={totalPages}
                size="small"
                page={page}
                onChange={handlePageChange}
              />
            </Box>
          </Stack>
        </Container>
      </Box>
    </>
  );
}
