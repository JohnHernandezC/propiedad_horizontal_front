import React, { useEffect } from "react";
import {
  Button,
  FormControlLabel,
  Grid,
  TextField,
  Checkbox,
  Autocomplete
} from "@mui/material";
import { useFormik } from "formik";
import * as Yup from "yup";
import { usePropiedades } from "../../../hooks/PropiedadesHooks/usePropiedades";
import { useTipoPropiedad } from "src/hooks/TipoPropiedadHooks/useTipoPropiedad";
export default function AddEditForm(props) {
  const { onClose, onRefetch, Data } = props;
  const { updatePropiedades, addPropiedades } = usePropiedades();
  const { TipoPropiedadDB, getTipoPropiedadDB } = useTipoPropiedad();
  
  useEffect(() => {
 
    getTipoPropiedadDB();
}, []);

  const formik = useFormik({
    initialValues: initialValues(Data),
    validationSchema: Yup.object(newSchema()),
    validateOnChange: false,
    onSubmit: async (formValue) => {
      try {
        if (Data) await updatePropiedades(Data.id_propiedad, formValue);
        else await addPropiedades(formValue);

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
            id="tipo_propiedad"
            options={TipoPropiedadDB}
            getOptionLabel={(option) => `${option.tipo_propiedad}`}
            value={TipoPropiedadDB?.find((user) => user.id_tipopropiedad === formik.values?.tipo_propiedad) || null}
            onChange={(_, value) => formik.setFieldValue("tipo_propiedad", value?.id_tipopropiedad || "")}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Tipo de propiedad"
                variant="outlined"
                error={formik.touched.tipo_propiedad && Boolean(formik.errors.tipo_propiedad)}
                helperText={formik.touched.tipo_propiedad && formik.errors.tipo_propiedad}
                sx={{ background: "#fcfcfc" }}
              />
            )}
          />
        </Grid>
        
        <Grid item xs={12} md={6}>
          <TextField
            fullWidth
            id="num_propiedad"
            name="num_propiedad"
            label="Número de Propiedad"
            variant="outlined"
            value={formik.values.num_propiedad}
            onChange={formik.handleChange}
            error={
              formik.touched.num_propiedad &&
              Boolean(formik.errors.num_propiedad)
            }
            helperText={
              formik.touched.num_propiedad && formik.errors.num_propiedad
            }
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            fullWidth
            id="torre"
            name="torre"
            label="Torre"
            variant="outlined"
            value={formik.values.torre}
            onChange={formik.handleChange}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            fullWidth
            id="piso"
            name="piso"
            label="Piso"
            variant="outlined"
            value={formik.values.piso}
            onChange={formik.handleChange}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            fullWidth
            id="coeficiente"
            name="coeficiente"
            label="Coeficiente"
            variant="outlined"
            value={formik.values.coeficiente}
            onChange={formik.handleChange}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            fullWidth
            id="cant_parqueadero"
            name="cant_parqueadero"
            label="Cantidad de Parqueaderos"
            variant="outlined"
            value={formik.values.cant_parqueadero}
            onChange={formik.handleChange}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            fullWidth
            id="cedula"
            name="cedula"
            label="Cédula"
            variant="outlined"
            value={formik.values.cedula}
            onChange={formik.handleChange}
            error={
              formik.touched.cedula && Boolean(formik.errors.cedula)
            }
            helperText={
              formik.touched.cedula && formik.errors.cedula
            }
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            fullWidth
            id="nombre"
            name="nombre"
            label="Nombre"
            variant="outlined"
            value={formik.values.nombre}
            onChange={formik.handleChange}
            error={
              formik.touched.nombre && Boolean(formik.errors.nombre)
            }
            helperText={
              formik.touched.nombre && formik.errors.nombre
            }
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            fullWidth
            id="usuario_email"
            name="usuario_email"
            label="Correo Electrónico del Usuario"
            variant="outlined"
            value={formik.values.usuario_email}
            onChange={formik.handleChange}
            error={
              formik.touched.usuario_email && Boolean(formik.errors.usuario_email)
            }
            helperText={
              formik.touched.usuario_email && formik.errors.usuario_email
            }
          />
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
                checked={formik.values?.privado}
                onChange={formik.handleChange}
                id="privado"
                name="privado"
                sx={{ color: "#d53d0c" }}
              />
            }
            label="MARCAR SI ES PRIVADO"
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
    tipo_propiedad: data?.tipo_propiedad || "",
    num_propiedad: data?.num_propiedad || "",
    torre: data?.torre || "",
    piso: data?.piso || "",
    coeficiente: data?.coeficiente || "",
    cant_parqueadero: data?.cant_parqueadero || "",
    cedula: data?.cedula || "",
    nombre: data?.nombre || "",
    usuario_email: data?.usuario_email || "",
    estado: data?.estado || true,
    privado: data?.privado || true,
  };
}

function newSchema() {
  const requiredMessage = "Este campo es requerido";

  return {
    tipo_propiedad: Yup.string().required(requiredMessage),
    num_propiedad: Yup.string().required(requiredMessage),
    torre: Yup.string().required(requiredMessage),
    piso: Yup.string(),
    coeficiente: Yup.number().required(requiredMessage),
    cant_parqueadero: Yup.number().required(requiredMessage),
    cedula: Yup.string().max(15, "La cédula debe tener como máximo 15 caracteres").required(requiredMessage),
    nombre: Yup.string().max(200, "El nombre debe tener como máximo 200 caracteres").required(requiredMessage),
    usuario_email: Yup.string().email("Formato de email inválido").required(requiredMessage),
    estado: Yup.boolean().required(requiredMessage),
    privado: Yup.boolean().required(requiredMessage),
  };
}
