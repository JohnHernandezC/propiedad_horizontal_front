import {
  Autocomplete,
  Button,
  Checkbox,
  FormControlLabel,
  Grid,
  TextField
} from "@mui/material";
import { useFormik } from "formik";
import { useEffect } from "react";
import { useEquipos } from "src/hooks/EquiposHooks/useEquipos";
import * as Yup from "yup";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";
import dayjs from 'dayjs';


export default function AddEditForm(props) {
  const { onClose, onRefetch, Data } = props;
  const { updateEquipos, addEquipos, getTiposEquiposDB,TipoEquipos } = useEquipos();

  useEffect(() => {
    getTiposEquiposDB();
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
        if (Data) await updateEquipos(Data.id_mtto, formValue);
        else await addEquipos(formValue);

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
            id="tipo_equipo"
            options={TipoEquipos}
            getOptionLabel={(option) => `${option.tipo_equipo} `}
            value={TipoEquipos?.find((tipo) => tipo.id_tipoequipo === formik.values?.tipo_equipo) || null}
            onChange={(_, value) => formik.setFieldValue("tipo_equipo", value?.id_tipoequipo || "")}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Tipo de Equipo"
                variant="outlined"
                error={formik.touched.tipo_equipo && Boolean(formik.errors.tipo_equipo)}
                helperText={formik.touched.tipo_equipo && formik.errors.tipo_equipo}
                sx={{ background: "#fcfcfc" }}
              />
            )}
          />
        </Grid>
        <Grid item xs={12} md={4}>
          <TextField
            fullWidth
            id="codigo_equipo"
            name="codigo_equipo"
            label="Código de Equipo"
            variant="outlined"
            value={formik.values.codigo_equipo}
            onChange={formik.handleChange}
            error={formik.touched.codigo_equipo && Boolean(formik.errors.codigo_equipo)}
            helperText={formik.touched.codigo_equipo && formik.errors.codigo_equipo}
          />
        </Grid>
        <Grid item xs={12} md={4}>
          <TextField
            fullWidth
            id="nom_equipo"
            name="nom_equipo"
            label="Nombre de Equipo"
            variant="outlined"
            value={formik.values.nom_equipo}
            onChange={formik.handleChange}
            error={formik.touched.nom_equipo && Boolean(formik.errors.nom_equipo)}
            helperText={formik.touched.nom_equipo && formik.errors.nom_equipo}
          />
        </Grid>
        <Grid item xs={6}>
          <FormControlLabel
            control={
              <Checkbox
                checked={formik.values.contabilizado}
                onChange={formik.handleChange}
                id="contabilizado"
                name="contabilizado"
                sx={{ color: "#d53d0c" }}
              />
            }
            label="Contabilizado"
          />
        </Grid>
        <Grid item xs={6}>
          <FormControlLabel
            control={
              <Checkbox
                checked={formik.values.tiene_depreciacion}
                onChange={formik.handleChange}
                id="tiene_depreciacion"
                name="tiene_depreciacion"
                sx={{ color: "#d53d0c" }}
              />
            }
            label="Tiene Depreciación"
          />
        </Grid>
        <Grid item xs={4}>
          <TextField
            fullWidth
            id="ubicacion_equipo"
            name="ubicacion_equipo"
            label="Ubicación del Equipo"
            variant="outlined"
            value={formik.values.ubicacion_equipo}
            onChange={formik.handleChange}
            error={formik.touched.ubicacion_equipo && Boolean(formik.errors.ubicacion_equipo)}
            helperText={formik.touched.ubicacion_equipo && formik.errors.ubicacion_equipo}
          />
        </Grid>
        <Grid item xs={4}>
          <TextField
            fullWidth
            id="year_depreciacion"
            name="year_depreciacion"
            label="Año de Depreciación"
            variant="outlined"
            type="number"
            value={formik.values.year_depreciacion}
            onChange={formik.handleChange}
            error={formik.touched.year_depreciacion && Boolean(formik.errors.year_depreciacion)}
            helperText={formik.touched.year_depreciacion && formik.errors.year_depreciacion}
          />
        </Grid>
        
       
         
        
        <Grid item xs={4} md={4}>
          <LocalizationProvider dateAdapter={AdapterDayjs} locale="es">
            <DatePicker
              label="Fecha de Compra"
              value={formik.values.fecha_compra}
              onChange={(value) => formik.setFieldValue("fecha_compra", value)}
              renderInput={(params) => (
                <TextField
                  {...params}
                  variant="outlined"
                  fullWidth
                  sx={{ background: "#fcfcfc" }}
                />
              )}
            />
          </LocalizationProvider>
        </Grid>
        
        
        
        
        <Grid item xs={12}>
          <TextField
            fullWidth
            id="descripcion"
            name="descripcion"
            label="Descripción"
            variant="outlined"
            multiline
            rows={4}
            value={formik.values.descripcion}
            onChange={formik.handleChange}
            error={formik.touched.descripcion && Boolean(formik.errors.descripcion)}
            helperText={formik.touched.descripcion && formik.errors.descripcion}
          />
        </Grid>
        <Grid item xs={12}>
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
    tipo_equipo: data?.tipo_equipo || "",
    codigo_equipo: data?.codigo_equipo || "",
    nom_equipo: data?.nom_equipo || "",
    descripcion: data?.descripcion || "",
    ubicacion_equipo: data?.ubicacion_equipo || "",
    estado: data?.estado || true,
    contabilizado: data?.contabilizado || false,
    tiene_depreciacion: data?.tiene_depreciacion || false,
    
    fecha_compra: data?.fecha_compra || "",
    year_depreciacion: data?.year_depreciacion || "",
    // Add other fields here based on your model
  };
}

function newSchema() {
  const requiredMessage = "Este campo es requerido";

  return {
    tipo_equipo: Yup.string().required(requiredMessage),
    codigo_equipo: Yup.string().max(20, "El código del equipo debe tener como máximo 20 caracteres").required(requiredMessage),
    nom_equipo: Yup.string().max(200, "El nombre del equipo debe tener como máximo 200 caracteres").required(requiredMessage),
    descripcion: Yup.string().max(200, "La descripción debe tener como máximo 200 caracteres"),
    ubicacion_equipo: Yup.string().max(200, "La ubicación del equipo debe tener como máximo 200 caracteres").required(requiredMessage),
    estado: Yup.boolean().required(requiredMessage),
    contabilizado: Yup.boolean(),
    tiene_depreciacion: Yup.boolean(),
   
    fecha_compra: Yup.date(),
    year_depreciacion: Yup.number(),
    // Add validation for other fields based on your model
  };
}
