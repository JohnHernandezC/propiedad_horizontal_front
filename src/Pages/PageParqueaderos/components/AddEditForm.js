import {
  Button,
  Grid,
  TextField,
  FormControlLabel,
  Checkbox,
} from "@mui/material";
import { useFormik } from "formik";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers";
import { useEffect } from "react";
import { useVisitantes } from "src/hooks/VisitantesHooks/useVisitantes";
import * as Yup from "yup";
import { usePropiedades } from "../../../hooks/PropiedadesHooks/usePropiedades";

export default function AddEditForm(props) {
  const { onClose, onRefetch, Data } = props;
  const { updateVisitantes, addVisitantes } = useVisitantes();
  const { PropiedadesDB, getPropiedadesDB } = usePropiedades();
  useEffect(() => {
    getPropiedadesDB();
  }, []);
  const formik = useFormik({
    // Inicializa los valores del formulario con los valores iniciales proporcionados por la función initialValues
    initialValues: initialValues(Data),
    // Establece la validación del esquema utilizando Yup, si se proporciona un objeto se actualiza, de lo contrario se utiliza un esquema nuevo
    validationSchema: Yup.object(newSchema()),
    // Desactiva la validación al cambiar los valores del formulario
    validateOnChange: false,
    onSubmit: async (formValue) => {
      try {
        // Si se proporciona un objeto se actualiza, de lo contrario se crea uno nuevo
        if (Data) await updateVisitantes(Data.id_ingreso, formValue);
        else await addVisitantes(formValue);

        // Llama a la función onRefetch para actualizar la lista
        onRefetch();
        // Llama a la función onClose para cerrar el formulario
        onClose();
      } catch (error) {
        // Muestra un mensaje de error si ocurre algún problema
        if (error?.message) {
          console.log(error);
        } else {
          onClose();
        }
      }
    },
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            id="id_propiedad"
            name="id_propiedad"
            label="ID Propiedad"
            variant="outlined"
            value={formik.values.id_propiedad}
            onChange={formik.handleChange}
            error={formik.touched.id_propiedad && Boolean(formik.errors.id_propiedad)}
            helperText={formik.touched.id_propiedad && formik.errors.id_propiedad}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            id="id_propiedad_parqueadero"
            name="id_propiedad_parqueadero"
            label="ID Propiedad Parqueadero"
            variant="outlined"
            value={formik.values.id_propiedad_parqueadero}
            onChange={formik.handleChange}
            error={formik.touched.id_propiedad_parqueadero && Boolean(formik.errors.id_propiedad_parqueadero)}
            helperText={formik.touched.id_propiedad_parqueadero && formik.errors.id_propiedad_parqueadero}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <LocalizationProvider dateAdapter={AdapterDayjs} locale="es">
            <DatePicker
              label="Fecha de Inicio"
              value={formik.values.fecha_inicio}
              onChange={(value) => formik.setFieldValue("fecha_inicio", value)}
              renderInput={(params) => <TextField {...params} variant="outlined" fullWidth />}
            />
          </LocalizationProvider>
        </Grid>
        <Grid item xs={12} sm={6}>
          <LocalizationProvider dateAdapter={AdapterDayjs} locale="es">
            <DatePicker
              label="Fecha de Fin"
              value={formik.values.fecha_fin}
              onChange={(value) => formik.setFieldValue("fecha_fin", value)}
              renderInput={(params) => <TextField {...params} variant="outlined" fullWidth />}
            />
          </LocalizationProvider>
        </Grid>
        <Grid item xs={12} sm={12}>
          <FormControlLabel
            control={
              <Checkbox
                checked={formik.values.estado}
                onChange={formik.handleChange}
                id="estado"
                name="estado"
                sx={{ color: "#d53d0c" }}
              />
            }
            label="Estado"
          />
        </Grid>
        <Grid item xs={12}>
          <Button type="submit" variant="contained" color="primary" fullWidth sx={{ background: "#d53d0c" }}>
            {Data ? "Actualizar" : "Crear"}
          </Button>
        </Grid>
      </Grid>
    </form>
  );
          }

// Resto del código no ha cambiado y permanece igual.


function initialValues(data) {
  return {
    id_propiedad: data?.id_propiedad || "",
    id_propiedad_parqueadero: data?.id_propiedad_parqueadero || "",
    fecha_inicio: data?.fecha_inicio || "",
    fecha_fin: data?.fecha_fin || null,
    estado: data?.estado || false,
    // Add other fields here based on your model
  };
}

function newSchema() {
  const requiredMessage = "Este campo es requerido";
  return {
    id_propiedad: Yup.number().required(requiredMessage),
    id_propiedad_parqueadero: Yup.number().required(requiredMessage),
    fecha_inicio: Yup.date().required(requiredMessage),
    fecha_fin: Yup.date(),
    estado: Yup.boolean().required(requiredMessage),
    // Add validation for other fields based on your model
  };
}
