import {
  Card,
  CardContent,
  Container,
  Grid,
  Switch,
  Typography,
  CardActions,
} from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";
import { useCallback, useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import { usePropiedades } from "../../hooks/PropiedadesHooks/usePropiedades";
import { HeaderPage } from "../HeaderPage";

function getTipoPropiedad(valor) {
  switch (valor) {
    case "0":
      return "APARTAMENTO";
    case "1":
      return "CASA";
    case "2":
      return "LOCAL";
    case "3":
      return "OFICINA";
    case "4":
      return "SALON COMUNAL";
    case "5":
      return "BAR BQ";
    case "6":
      return "GIMNASIO";
    case "7":
      return "PARQUEADERO";
    default:
      return "Desconocido";
  }
}

export default function MyPropertyPage() {
  const [showModal, setShowModal] = useState(false);
  const [titleModal, setTitleModal] = useState(null);
  const [contentModal, setContentModal] = useState(null);
  const [refetch, setRefetch] = useState(false);
  const { loading, Propiedades, getMiPropiedades, updatePropiedades } =
    usePropiedades();

  const openCloseModal = useCallback(() => setShowModal((prev) => !prev), []);
  const onRefetch = useCallback(() => setRefetch((prev) => !prev), []);

  useEffect(() => {
    getMiPropiedades();
  }, [refetch]);

  const handleEditEstado = (propiedadId, estado) => {
    // Aquí puedes implementar la lógica para actualizar el estado de la propiedad en el backend.
    // Luego, puedes refrescar la lista de propiedades llamando a `onRefetch()`.
    updatePropiedades(propiedadId, estado).then(() => onRefetch());
  };

  return (
    <>
      <Helmet>
        <title>Mis propiedades</title>
      </Helmet>

      <Container maxWidth="xl">
        <HeaderPage
          title="Mis propiedades registradas"
          btnTitle="Registro de propietarios"
          icono="plus square icon"
        />
        {loading ? (
          <CircularProgress />
        ) : (
          <div>
            {Propiedades?.Propiedades == null ||
            Propiedades?.Propiedades?.length === 0 ? (
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  height: "300px",
                }}
              >
                <Typography variant="h3">
                  No cuenta con propiedades registradas para su cuenta.
                </Typography>
              </div>
            ) : (
              <Grid container spacing={2}>
                {Propiedades?.Propiedades?.map((propiedad) => (
                  <Grid item xs={12} sm={6} key={propiedad.id_propiedad}>
                    <Card
                      sx={{
                        marginBottom: "10px",
                        margin: "10px",
                        padding: "16px",
                        borderRadius: "8px",
                        boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.2)",
                        backgroundColor: "#FFFFFF",
                      }}
                    >
                      <CardContent>
                        <Typography
                          variant="h5"
                          component="div"
                          sx={{ marginBottom: "8px", fontWeight: 600 }}
                        >
                          Edificio: {propiedad.nom_edificio}{" "}
                          {propiedad.id_registro}
                        </Typography>
                        <Typography
                          component="div"
                          sx={{ marginBottom: "8px" }}
                        >
                          Número de Propiedad: {propiedad.num_propiedad}
                        </Typography>
                        <Typography
                          component="div"
                          sx={{ marginBottom: "8px" }}
                        >
                          Tipo de Propiedad:{" "}
                          {getTipoPropiedad(propiedad.tipo_propiedad)}
                        </Typography>
                        <Typography
                          component="div"
                          sx={{ marginBottom: "8px" }}
                        >
                          Torre: {propiedad.torre}
                        </Typography>
                        <Typography
                          component="div"
                          sx={{ marginBottom: "8px" }}
                        >
                          Coeficiente: {propiedad.coeficiente}
                        </Typography>
                        <Typography
                          component="div"
                          sx={{ marginBottom: "8px" }}
                        >
                          Dirección:
                        </Typography>
                        <Typography component="div">
                          {propiedad.ciudad} {propiedad.departamento}{" "}
                          {propiedad.pais}
                        </Typography>
                        <Typography
                          component="div"
                          sx={{ marginBottom: "8px" }}
                        >
                          {propiedad.direccion}
                        </Typography>
                        <Typography
                          component="div"
                          sx={{ marginBottom: "8px" }}
                        >
                          Cantidad de Parqueaderos: {propiedad.cant_parqueadero}
                        </Typography>
                      </CardContent>
                      <CardActions sx={{ justifyContent: "flex-end" }}>
                        <div style={{ display: "flex", alignItems: "center" }}>
                          <Typography
                            component="div"
                            sx={{ marginRight: "10px" }}
                          >
                            Estado: {propiedad.estado ? "Activo" : "Inactivo"}
                          </Typography>
                          <Switch
                            checked={propiedad.estado}
                            onChange={() =>
                              handleEditEstado(
                                propiedad.id_propiedad,
                                !propiedad.estado
                              )
                            }
                            sx={{ color: "#2196F3" }}
                          />
                        </div>
                      </CardActions>
                    </Card>
                  </Grid>
                ))}
              </Grid>
            )}
          </div>
        )}
      </Container>
    </>
  );
}
