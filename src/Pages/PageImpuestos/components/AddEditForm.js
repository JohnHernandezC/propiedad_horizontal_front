import { useEffect } from "react";
import * as Yup from "yup";
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
import { useVisitantes } from "src/hooks/VisitantesHooks/useVisitantes";
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
            id="pais"
            name="pais"
            label="País"
            variant="outlined"
            value={formik.values.pais}
            onChange={formik.handleChange}
            error={formik.touched.pais && Boolean(formik.errors.pais)}
            helperText={formik.touched.pais && formik.errors.pais}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            id="tipo_impuesto"
            name="tipo_impuesto"
            label="Tipo de Impuesto"
            variant="outlined"
            value={formik.values.tipo_impuesto}
            onChange={formik.handleChange}
            error={formik.touched.tipo_impuesto && Boolean(formik.errors.tipo_impuesto)}
            helperText={formik.touched.tipo_impuesto && formik.errors.tipo_impuesto}
          />
        </Grid>
        <Grid item xs={12} sm={3}>
          <TextField
            fullWidth
            id="cuenta_venta"
            name="cuenta_venta"
            label="Cuenta de Venta"
            variant="outlined"
            value={formik.values.cuenta_venta}
            onChange={formik.handleChange}
            error={formik.touched.cuenta_venta && Boolean(formik.errors.cuenta_venta)}
            helperText={formik.touched.cuenta_venta && formik.errors.cuenta_venta}
          />
        </Grid>
        <Grid item xs={12} sm={3}>
          <TextField
            fullWidth
            id="cuenta_compra"
            name="cuenta_compra"
            label="Cuenta de Compra"
            variant="outlined"
            value={formik.values.cuenta_compra}
            onChange={formik.handleChange}
            error={formik.touched.cuenta_compra && Boolean(formik.errors.cuenta_compra)}
            helperText={formik.touched.cuenta_compra && formik.errors.cuenta_compra}
          />
        </Grid>
        <Grid item xs={12} sm={3}>
          <TextField
            fullWidth
            id="cuenta_dev_compra"
            name="cuenta_dev_compra"
            label="Cuenta Dev. Compra"
            variant="outlined"
            value={formik.values.cuenta_dev_compra}
            onChange={formik.handleChange}
            error={formik.touched.cuenta_dev_compra && Boolean(formik.errors.cuenta_dev_compra)}
            helperText={formik.touched.cuenta_dev_compra && formik.errors.cuenta_dev_compra}
          />
        </Grid>
        <Grid item xs={12} sm={3}>
          <TextField
            fullWidth
            id="cuenta_dev_venta"
            name="cuenta_dev_venta"
            label="Cuenta Dev. Venta"
            variant="outlined"
            value={formik.values.cuenta_dev_venta}
            onChange={formik.handleChange}
            error={formik.touched.cuenta_dev_venta && Boolean(formik.errors.cuenta_dev_venta)}
            helperText={formik.touched.cuenta_dev_venta && formik.errors.cuenta_dev_venta}
          />
        </Grid>
        <Grid item xs={12} sm={12}>
          <TextField
            fullWidth
            id="valor_impuesto"
            name="valor_impuesto"
            label="Valor de Impuesto"
            variant="outlined"
            value={formik.values.valor_impuesto}
            onChange={formik.handleChange}
            error={formik.touched.valor_impuesto && Boolean(formik.errors.valor_impuesto)}
            helperText={formik.touched.valor_impuesto && formik.errors.valor_impuesto}
          />
        </Grid>

        <Grid item xs={12} sm={10}>
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
        <Grid item xs={12} sm={2}>
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
    pais: data?.pais || "",
    tipo_impuesto: data?.tipo_impuesto || "",
    cuenta_venta: data?.cuenta_venta || "",
    cuenta_compra: data?.cuenta_compra || "",
    cuenta_dev_compra: data?.cuenta_dev_compra || "",
    cuenta_dev_venta: data?.cuenta_dev_venta || "",
    valor_impuesto: data?.valor_impuesto || "",
   
    estado: data?.estado || true,
    // Add other fields here based on your model
  };
}

function newSchema() {
  const requiredMessage = "Este campo es requerido";

  return {
    pais: Yup.string().required(requiredMessage),
    tipo_impuesto: Yup.string().required(requiredMessage),
    cuenta_venta: Yup.string().required(requiredMessage),
    cuenta_compra: Yup.string().required(requiredMessage),
    cuenta_dev_compra: Yup.string().required(requiredMessage),
    cuenta_dev_venta: Yup.string().required(requiredMessage),
    valor_impuesto: Yup.number().required(requiredMessage),
    
    estado: Yup.boolean().required(requiredMessage),
    // Add validation for other fields based on your model
  };

}
