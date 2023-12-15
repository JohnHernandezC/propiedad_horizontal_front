import {
  Autocomplete,
  Button,
  Checkbox,
  FormControlLabel,
  Grid,
  TextField
} from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { useFormik } from "formik";
import { useEffect } from "react";
import { useUser } from "src/hooks";
import { useAlquiler } from "src/hooks/AlquilerHooks/useAlquiler";
import { usePropiedades } from "src/hooks/PropiedadesHooks/usePropiedades";
import * as Yup from "yup";
import dayjs from 'dayjs';

export default function AddEditForm(props) {
  const { onClose, onRefetch, Data } = props;
  const { updateAlquiler, addAlquiler } = useAlquiler();
  const { getUsersDB, usersDB } = useUser();
  const { PropiedadesDB, getPropiedadesDB } = usePropiedades();
  
  useEffect(() => {
    getUsersDB();
    getPropiedadesDB();
}, []);

  const formik = useFormik({
    initialValues: initialValues(Data),
    validationSchema: Yup.object(newSchema()),
    validateOnChange: false,
    onSubmit: async (formValue) => {
      try {
        if (Data) await updateAlquiler(Data.id_alquiler, formValue);
        else await addAlquiler(formValue);

        onRefetch();
        onClose();
      } catch (error) {
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
      <Grid item xs={12} md={6}>
          <Autocomplete
            fullWidth
            id="id_usuario"
            options={usersDB}
            getOptionLabel={(option) => `${option.nombres} ${option.apellidos}`}
            value={usersDB?.find((user) => user.email === formik.values?.id_usuario) || null}
            onChange={(_, value) => formik.setFieldValue("id_usuario", value?.email || "")}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Usuario"
                variant="outlined"
                error={formik.touched.id_usuario && Boolean(formik.errors.id_usuario)}
                helperText={formik.touched.id_usuario && formik.errors.id_usuario}
                sx={{ background: "#fcfcfc" }}
              />
            )}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <Autocomplete
            fullWidth
            id="id_propiedad"
            options={PropiedadesDB}
            getOptionLabel={(option) => option.num_propiedad}
            value={PropiedadesDB?.find((propiedad) => propiedad.id_propiedad === formik.values?.id_propiedad) || null}
            onChange={(_, value) => formik.setFieldValue("id_propiedad", value?.id_propiedad || "")}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Propiedad"
                variant="outlined"
                error={formik.touched.id_propiedad && Boolean(formik.errors.id_propiedad)}
                helperText={formik.touched.id_propiedad && formik.errors.id_propiedad}
                sx={{ background: "#fcfcfc" }}
              />
            )}
          />
        </Grid>
       
        <Grid item xs={12} md={6}>
          <LocalizationProvider dateAdapter={AdapterDayjs} locale="es">
            <DatePicker
              label="Fecha Separación"
              value={formik.values?.fecha_separacion}
              onChange={(value) => formik.setFieldValue("fecha_separacion", value)}
              renderInput={(params) => <TextField {...params} variant="outlined" fullWidth sx={{ background: "#fcfcfc" }} />}
            />
          </LocalizationProvider>
        </Grid>
        <Grid item xs={12} md={6}>
          <LocalizationProvider dateAdapter={AdapterDayjs} locale="es">
          <DatePicker
              label="Fecha Entrega"
              value={
                formik.values?.fecha_entrega
                  ? dayjs(formik.values?.fecha_entrega)
                  : null
              }
              onChange={(value) => {
                const formattedDate = value ? value.format("YYYY-MM-DD") : null;
                formik.setFieldValue("fecha_entrega", formattedDate);
              }}
              renderInput={(params) => (
                <TextField
                  {...params}
                  variant="outlined"
                  fullWidth
                  error={
                    formik.touched.fecha_entrega &&
                    Boolean(formik.errors.fecha_entrega)
                  }
                  helperText={
                    formik.touched.fecha_entrega &&
                    formik.errors.fecha_entrega
                  }
                />
              )}
            />
            
          </LocalizationProvider>
        </Grid>
        <Grid item xs={12} md={6}>
          <FormControlLabel
            control={
              <Checkbox
                checked={formik.values?.estado}
                onChange={formik.handleChange}
                id="estado"
                name="estado"
                sx={{ color: "#d53d0c" }}
              />
            }
            label="Estado"
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <FormControlLabel
            control={
              <Checkbox
                checked={formik.values?.Pago}
                onChange={formik.handleChange}
                id="Pago"
                name="Pago"
                sx={{ color: "#d53d0c" }}
              />
            }
            label="Pago"
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
    id_usuario: data?.id_usuario || "",
    fecha_separacion: data?.fecha_separacion ? dayjs(data.fecha_separacion) : null,
    fecha_entrega: data?.fecha_entrega ? dayjs(data.fecha_entrega) : null,

    estado: data?.estado || true,
    Pago: data?.Pago || false,
  };
}

function newSchema() {
  const requiredMessage = "Este campo es requerido";

  return {
    id_usuario: Yup.string().required(requiredMessage),
    id_propiedad: Yup.number().nullable(),
    fecha_separacion: Yup.date(),
    fecha_entrega: Yup.date(),
    estado: Yup.boolean().required(requiredMessage),
    Pago: Yup.boolean().required(requiredMessage),
  };
}
