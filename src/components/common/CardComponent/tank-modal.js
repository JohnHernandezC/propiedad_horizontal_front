import React from "react";
import { Grid, Paper, Typography } from "@material-ui/core";
export function TankModal(props) {
  const { data } = props;
  const styles = {
    paper: {
      padding: "16px",
      marginBottom: "16px",
    },
    label: {
      fontWeight: "bold",
      marginRight: "8px",
    },
    value: {
      fontWeight: "normal",
    },
    header: {
      marginBottom: "16px",
    },
    sectionTitle: {
      fontWeight: "bold",
      marginBottom: "8px",
    },
  };

  return (
    <Grid container spacing={3}>
      <Grid item xs={12}>

        <Typography variant="subtitle1">
          Código de tanque:<strong>{data.codigo_tanque}</strong>
        </Typography>
      </Grid>
      <Grid item xs={12}>
        <Paper style={styles.paper}>
          <Typography variant="h6" style={styles.sectionTitle}>
            Información general
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={6}>

              <Typography variant="body1">
                <span style={styles.label}>Altura de referencia:</span>
                <span style={styles.value}>{data.altura_referencia}</span>
              </Typography>
              <Typography variant="body1">
                <span style={styles.label}>Capacidad del tanque:</span>
                <span style={styles.value}>{data.capacidad_tanque}</span>
              </Typography>
              <Typography variant="body1">
                <span style={styles.label}>Diámetro del tanque:</span>
                <span style={styles.value}>{data.diametro_tanque}</span>
              </Typography>
              <Typography variant="body1">
                <span style={styles.label}>Temperatura de operación:</span>
                <span style={styles.value}>{data.temperatura_operacion}</span>
              </Typography>
            </Grid>
            <Grid item xs={6}>

              <Typography variant="body1">
                <span style={styles.label}>Temperatura de la lámina:</span>
                <span style={styles.value}>{data.temperatura_lamina}</span>
              </Typography>
              <Typography variant="body1">
                <span style={styles.label}>Tipo de techo:</span>
                <span style={styles.value}>{data.tipo_techo}</span>
              </Typography>
              <Typography variant="body1">
                <span style={styles.label}>Tipo de fondo:</span>
                <span style={styles.value}>{data.tipo_fondo}</span>
              </Typography>
            </Grid>
          </Grid>
        </Paper>
        <Paper style={styles.paper}>
          <Typography variant="h6" style={styles.sectionTitle}>
            Información adicional
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <Typography variant="body1">
                <span style={styles.label}>ID de usuario:</span>
                <span style={styles.value}>{data.id_usuario}</span>
              </Typography>
              <Typography variant="body1">
                <span style={styles.label}>ID de cliente:</span>
                <span style={styles.value}>{data.id_cliente}</span>
              </Typography>
              <Typography variant="body1">
                <span style={styles.label}>
                  Coeficiente lineal de expansión:
                </span>
                <span style={styles.value}>
                  {data.coeficiente_lineal_expansion}
                </span>
              </Typography>
              <Typography variant="body1">
                <span style={styles.label}>Altura del cilindro:</span>
                <span style={styles.value}>{data.altura_cilindro}</span>
              </Typography>
              {data.is_consumo_int ?
                <>
                  <Typography variant="body1">
                    <span style={styles.label}>Capacidad para consumo interno:</span>
                    <span style={styles.value}>{data.cap_consumo_int}</span>
                  </Typography>
                </>
                : <></>
              }
            </Grid>
            <Grid item xs={6}>
              <Typography variant="body1">
                <span style={styles.label}>Altura máxima de llenado:</span>
                <span style={styles.value}>{data.Altura_máxima_llenado}</span>
              </Typography>
              <Typography variant="body1">
                <span style={styles.label}>Altura máxima de seguridad:</span>
                <span style={styles.value}>{data.Altura_máxima_seguridad}</span>
              </Typography>
              <Typography variant="body1">
                <span style={styles.label}>ID de producto:</span>
                <span style={styles.value}>{data.id_producto}</span>
              </Typography>
              <Typography variant="body1">
                <span style={styles.label}>Tipo de tanque:</span>
                <span style={styles.value}>{data.tipo_tanque}</span>
              </Typography>
              {data.is_consumo_int ?
                <>
                  <Typography variant="body1">
                    <span style={styles.label}>Capacidad para consumo interno actual:</span>
                    <span style={styles.value}>{data.cap_consumo_int_act}</span>
                  </Typography>
                </>
                : <></>
              }
            </Grid>
          </Grid>
        </Paper>
        <Paper style={styles.paper}>
          <Typography variant="h6" style={styles.sectionTitle}>
            Características técnicas
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <Typography variant="body1">
                <span style={styles.label}>Gravedad API:</span>
                <span style={styles.value}>{data.GravedadApi}</span>
              </Typography>
              <Typography variant="body1">
                <span style={styles.label}>Ajuste del techo flotante:</span>
                <span style={styles.value}>{data.ajuste_techo_flotante}</span>
              </Typography>
              <Typography variant="body1">
                <span style={styles.label}>Zona crítica FRA:</span>
                <span style={styles.value}>{data.zona_critica_fra}</span>
              </Typography>
              <Typography variant="body1">
                <span style={styles.label}>Presión de almacenamiento:</span>
                <span style={styles.value}>{data.presion_almacenamiento}</span>
              </Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography variant="body1">
                <span style={styles.label}>ID de tabla de aforo:</span>
                <span style={styles.value}>{data.id_tabla_aforo}</span>
              </Typography>
              <Typography variant="body1">
                <span style={styles.label}>Comentarios:</span>
                <span style={styles.value}>{data.comentarios}</span>
              </Typography>
            </Grid>
          </Grid>
        </Paper>
      </Grid>
    </Grid>
  );
}
