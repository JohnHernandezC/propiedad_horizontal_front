import {
  Autocomplete,
  Button,
  Checkbox,
  FormControlLabel,
  Grid,
  TextField,
} from "@mui/material";
import { useFormik } from "formik";
import { useEffect } from "react";
import { useCuotas } from "src/hooks/CuotasHooks/useCuotas";
import * as Yup from "yup";
import { usePropiedades } from "../../../hooks/PropiedadesHooks/usePropiedades";

export default function AddEditForm(props) {
  const { onClose, onRefetch, Data } = props;
  const { updateCuotas, addCuotas, getTiposCuotasDB, TipoCuotas } = useCuotas();
  const { PropiedadesDB, getPropiedadesDB } = usePropiedades();
  useEffect(() => {
    getPropiedadesDB();
    getTiposCuotasDB();
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
        if (Data) await updateCuotas(Data.id_cuota, formValue);
        else await addCuotas(formValue);

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
  console.log(TipoCuotas);

  return (
    <form onSubmit={formik.handleSubmit}>
      <Grid container spacing={2}>
        <Grid item xs={12} md={3}>
          <Autocomplete
            fullWidth
            id="id_propiedad"
            options={PropiedadesDB}
            getOptionLabel={(option) => option.num_propiedad}
            value={
              PropiedadesDB?.find(
                (propiedad) =>
                  propiedad.id_propiedad === formik.values?.id_propiedad
              ) || null
            }
            onChange={(_, value) =>
              formik.setFieldValue("id_propiedad", value?.id_propiedad || "")
            }
            renderInput={(params) => (
              <TextField
                {...params}
                label="Propiedad"
                variant="outlined"
                error={
                  formik.touched.id_propiedad &&
                  Boolean(formik.errors.id_propiedad)
                }
                helperText={
                  formik.touched.id_propiedad && formik.errors.id_propiedad
                }
                sx={{ background: "#fcfcfc" }}
              />
            )}
          />
        </Grid>
        
        <Grid item xs={12} md={3}>
          <Autocomplete
            fullWidth
            id="tipo_movimiento"
            options={TipoCuotas}
            getOptionLabel={(option) => option.tipo_movimiento}
            value={
              TipoCuotas?.find(
                (tipo) => tipo.tipo_movimiento === formik.values?.tipo_movimiento
              ) || null
            }
            onChange={(_, value) =>
              formik.setFieldValue("tipo_movimiento", value?.tipo_movimiento || "")
            }
            renderInput={(params) => (
              <TextField
                {...params}
                label="Tipo Movimiento"
                variant="outlined"
                error={
                  formik.touched.tipo_movimiento && Boolean(formik.errors.tipo_movimiento)
                }
                helperText={
                  formik.touched.tipo_movimiento && formik.errors.tipo_movimiento
                }
                sx={{ background: "#fcfcfc" }}
              />
            )}
          />
        </Grid>
        <Grid item xs={12} md={3}>
          <TextField
            fullWidth
            id="valor_cuota"
            name="valor_cuota"
            label="Valor Cuota"
            variant="outlined"
            value={formik.values.valor_cuota}
            onChange={formik.handleChange}
            error={
              formik.touched.valor_cuota && Boolean(formik.errors.valor_cuota)
            }
            helperText={formik.touched.valor_cuota && formik.errors.valor_cuota}
          />
        </Grid>
        
        <Grid item xs={12} md={3}>
          <TextField
            fullWidth
            id="frecuencia"
            name="frecuencia"
            label="Frecuencia"
            variant="outlined"
            value={formik.values.frecuencia}
            onChange={formik.handleChange}
            error={
              formik.touched.frecuencia && Boolean(formik.errors.frecuencia)
            }
            helperText={formik.touched.frecuencia && formik.errors.frecuencia}
          />
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
            error={
              formik.touched.descripcion && Boolean(formik.errors.descripcion)
            }
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
          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            sx={{ background: "#d53d0c" }}
          >
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
    valor_cuota: data?.valor_cuota || "",
    tipo_movimiento: data?.tipo_movimiento || "",
    descripcion: data?.descripcion || "",
    frecuencia: data?.frecuencia || "",
    estado: data?.estado || false,
    // Add other fields here based on your model
  };
}

function newSchema() {
  const requiredMessage = "Este campo es requerido";

  return {
    id_propiedad: Yup.number().required(requiredMessage),
    valor_cuota: Yup.number().required(requiredMessage),
    tipo_movimiento: Yup.string().required(requiredMessage),
    descripcion: Yup.string().max(
      200,
      "La descripción debe tener como máximo 200 caracteres"
    ),
    frecuencia: Yup.string(),
    dia_max_descuento: Yup.number(),
    interes_mora: Yup.number()
    .nullable()
    .typeError("Por favor, ingrese un número válido")
    .test(
      "maxDigits",
      "Asegúrese de que no haya más de 4 dígitos en total.",
      (value) => {
        // Convierte el número a cadena y cuenta la longitud total
        const totalDigits = value?.toString().replace(".", "").length || 0;
        return totalDigits <= 4;
      }
    )
    .test(
      "maxDecimalPlaces",
      "Asegúrese de que no haya más de 2 dígitos en la parte decimal.",
      (value) => {
        // Obtiene la parte decimal y cuenta su longitud
        const decimalPlaces = (value?.toString().split(".")[1] || "").length;
        return decimalPlaces <= 2;
      }
    ),


    fecha_vencimiento: Yup.date(),
    estado: Yup.boolean().required(requiredMessage),
    // Add validation for other fields based on your model
  };
}

