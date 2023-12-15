import {
  Button,
  Checkbox,
  FormControlLabel,
  Grid,
  TextField,
  Autocomplete
} from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { useFormik } from "formik";
import { useEffect } from "react";
import { useEquipos } from "src/hooks/EquiposHooks/useEquipos";
import { useMantenimientoEquipos } from "src/hooks/MantenimientoEquiposHooks/useMantenimientoEquipos";
import * as Yup from "yup";


export default function AddEditForm(props) {
  const { onClose, onRefetch, Data } = props;
  const { updateMantenimientoEquipos, addMantenimientoEquipos } = useMantenimientoEquipos();
  const {  Equipos, getEquipos } = useEquipos();
  useEffect(() => {
    getEquipos();
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
        if (Data) await updateMantenimientoEquipos(Data.id_ingreso, formValue);
        else await addMantenimientoEquipos(formValue);

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
        
        <Grid item xs={12} md={4}>
          <Autocomplete
            fullWidth
            id="id_equipo"
            options={Equipos}
            getOptionLabel={(option) => option.nom_equipo + " " + option.codigo_equipo }
            value={
              Equipos?.find(
                (equipo) =>
                  equipo.id_equipo === formik.values?.id_equipo
              ) || null
            }
            onChange={(_, value) =>
              formik.setFieldValue("id_equipo", value?.id_equipo || "")
            }
            renderInput={(params) => (
              <TextField
                {...params}
                label="Equipo"
                variant="outlined"
                error={
                  formik.touched.id_equipo &&
                  Boolean(formik.errors.id_equipo)
                }
                helperText={
                  formik.touched.id_equipo && formik.errors.id_equipo
                }
                sx={{ background: "#fcfcfc" }}
              />
            )}
          />
        </Grid>
        
        <Grid item xs={12} sm={4}>
          <LocalizationProvider dateAdapter={AdapterDayjs} locale="es">
            <DatePicker
              label="Fecha Inicial"
              value={formik.values.fecha_inicial}
              onChange={(value) => formik.setFieldValue("fecha_inicial", value)}
              renderInput={(params) => <TextField {...params} variant="outlined" fullWidth />}
            />
          </LocalizationProvider>
        </Grid>
        <Grid item xs={12} sm={4}>
          <LocalizationProvider dateAdapter={AdapterDayjs} locale="es">
            <DatePicker
              label="Fecha Final"
              value={formik.values.fecha_final}
              onChange={(value) => formik.setFieldValue("fecha_final", value)}
              renderInput={(params) => <TextField {...params} variant="outlined" fullWidth />}
            />
          </LocalizationProvider>
        </Grid>
        <Grid item xs={12} sm={12}>
          <TextField
            fullWidth
            id="descripcion_mtto"
            name="descripcion_mtto"
            label="Descripción Mantenimiento"
            multiline
            rows={4}
            variant="outlined"
            value={formik.values.descripcion_mtto}
            onChange={formik.handleChange}
            error={formik.touched.descripcion_mtto && Boolean(formik.errors.descripcion_mtto)}
            helperText={formik.touched.descripcion_mtto && formik.errors.descripcion_mtto}
          />
        </Grid>
        <Grid item xs={12} sm={3}>
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



function initialValues(data) {
  return {
    id_equipo: data?.id_equipo || "",
   
    fecha_inicial: data?.fecha_inicial || null,
    fecha_final: data?.fecha_final || null,
    descripcion_mtto: data?.descripcion_mtto || "",
    estado: data?.estado || true,
    // Add other fields here based on your model
  };
}

function newSchema() {
  const requiredMessage = "Este campo es requerido";

  return {
    id_equipo: Yup.number().required(requiredMessage),
    
    fecha_inicial: Yup.date(),
    fecha_final: Yup.date(),
    descripcion_mtto: Yup.string().required(requiredMessage),
    estado: Yup.boolean().required(requiredMessage),
    // Add validation for other fields based on your model
  };
}

