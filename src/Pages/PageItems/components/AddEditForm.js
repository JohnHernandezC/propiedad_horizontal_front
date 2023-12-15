
import {
  Button,
  Checkbox,
  FormControlLabel,
  Grid,
  TextField,
} from "@mui/material";
import { useFormik } from "formik";
import { useEffect } from "react";
import { useItems } from "src/hooks/ItemsHooks/useItems";
import * as Yup from "yup";

export default function AddEditForm(props) {
  const { onClose, onRefetch, Data } = props;
  const { updateItems, addItems } = useItems();

  useEffect(() => {
   
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
        if (Data) await updateItems(Data.id_item, formValue);
        else await addItems(formValue);

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
  console.log(formik)

  return (
    <form onSubmit={formik.handleSubmit}>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={4}>
          <TextField
            fullWidth
            id="tipo_producto"
            name="tipo_producto"
            label="Tipo de Producto"
            variant="outlined"
            value={formik.values.tipo_producto}
            onChange={formik.handleChange}
            error={formik.touched.tipo_producto && Boolean(formik.errors.tipo_producto)}
            helperText={formik.touched.tipo_producto && formik.errors.tipo_producto}
          />
        </Grid>
        <Grid item xs={12} sm={4}>
          <TextField
            fullWidth
            id="nom_producto"
            name="nom_producto"
            label="Nombre del Producto"
            variant="outlined"
            value={formik.values.nom_producto}
            onChange={formik.handleChange}
            error={formik.touched.nom_producto && Boolean(formik.errors.nom_producto)}
            helperText={formik.touched.nom_producto && formik.errors.nom_producto}
          />
        </Grid>
        <Grid item xs={12} sm={4}>
          <TextField
            fullWidth
            id="cod_producto"
            name="cod_producto"
            label="Código de Producto"
            variant="outlined"
            value={formik.values.cod_producto}
            onChange={formik.handleChange}
            error={formik.touched.cod_producto && Boolean(formik.errors.cod_producto)}
            helperText={formik.touched.cod_producto && formik.errors.cod_producto}
          />
        </Grid>
        <Grid item xs={12} >
          <TextField
            fullWidth
            id="referencia_fabrica"
            name="referencia_fabrica"
            label="Referencia de Fábrica"
            variant="outlined"
            value={formik.values.referencia_fabrica}
            onChange={formik.handleChange}
            error={formik.touched.referencia_fabrica && Boolean(formik.errors.referencia_fabrica)}
            helperText={formik.touched.referencia_fabrica && formik.errors.referencia_fabrica}
          />
        </Grid>
        
        <Grid item xs={12} sm={12}>
          <TextField
            fullWidth
            id="descripcion_producto"
            name="descripcion_producto"
            label="Descripción del Producto"
            multiline
            rows={4}
            variant="outlined"
            value={formik.values.descripcion_producto}
            onChange={formik.handleChange}
            error={formik.touched.descripcion_producto && Boolean(formik.errors.descripcion_producto)}
            helperText={formik.touched.descripcion_producto && formik.errors.descripcion_producto}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            id="unidad_medida"
            name="unidad_medida"
            label="Unidad de Medida"
            variant="outlined"
            value={formik.values.unidad_medida}
            onChange={formik.handleChange}
            error={formik.touched.unidad_medida && Boolean(formik.errors.unidad_medida)}
            helperText={formik.touched.unidad_medida && formik.errors.unidad_medida}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            id="impuesto"
            name="impuesto"
            label="Impuesto"
            variant="outlined"
            value={formik.values.impuesto}
            onChange={formik.handleChange}
            error={formik.touched.impuesto && Boolean(formik.errors.impuesto)}
            helperText={formik.touched.impuesto && formik.errors.impuesto}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <FormControlLabel
            control={
              <Checkbox
                checked={formik.values.controlinventario}
                onChange={formik.handleChange}
                id="controlinventario"
                name="controlinventario"
                sx={{ color: "#d53d0c" }}
              />
            }
            label="Control de Inventario"
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            id="clasificacion_tributaria"
            name="clasificacion_tributaria"
            label="Clasificación Tributaria"
            variant="outlined"
            value={formik.values.clasificacion_tributaria}
            onChange={formik.handleChange}
            error={formik.touched.clasificacion_tributaria && Boolean(formik.errors.clasificacion_tributaria)}
            helperText={formik.touched.clasificacion_tributaria && formik.errors.clasificacion_tributaria}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            id="impuesto_retencion"
            name="impuesto_retencion"
            label="Impuesto de Retención"
            variant="outlined"
            value={formik.values.impuesto_retencion}
            onChange={formik.handleChange}
            error={formik.touched.impuesto_retencion && Boolean(formik.errors.impuesto_retencion)}
            helperText={formik.touched.impuesto_retencion && formik.errors.impuesto_retencion}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            id="nit_proveedor"
            name="nit_proveedor"
            label="NIT del Proveedor"
            variant="outlined"
            value={formik.values.nit_proveedor}
            onChange={formik.handleChange}
            error={formik.touched.nit_proveedor && Boolean(formik.errors.nit_proveedor)}
            helperText={formik.touched.nit_proveedor && formik.errors.nit_proveedor}
          />
        </Grid>
        
        <Grid item xs={12} sm={3}>
          <FormControlLabel
            control={
              <Checkbox
                checked={formik.values.Estado}
                onChange={formik.handleChange}
                id="Estado"
                name="Estado"
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
    tipo_producto: data?.tipo_producto || "",
    cod_producto: data?.cod_producto || "",
    referencia_fabrica: data?.referencia_fabrica || "",
    nom_producto: data?.nom_producto || "",
    descripcion_producto: data?.descripcion_producto || "",
    unidad_medida: data?.unidad_medida || "",
    impuesto: data?.impuesto || "",
    controlinventario: data?.controlinventario || false,
    clasificacion_tributaria: data?.clasificacion_tributaria || "",
    impuesto_retencion: data?.impuesto_retencion || "",
    nit_proveedor: data?.nit_proveedor || "",
    Estado: data?.Estado || true,
    // Add other fields here based on your model
  };
}

function newSchema() {
  const requiredMessage = "Este campo es requerido";

  return {
    tipo_producto: Yup.string().required(requiredMessage),
    cod_producto: Yup.string().required(requiredMessage),
    referencia_fabrica: Yup.string(),
    nom_producto: Yup.string().required(requiredMessage),
    descripcion_producto: Yup.string().required(requiredMessage),
    unidad_medida: Yup.string().required(requiredMessage),
    impuesto: Yup.number().required(requiredMessage),
    controlinventario: Yup.boolean(),
    clasificacion_tributaria: Yup.string(),
    impuesto_retencion: Yup.string(),
    nit_proveedor: Yup.string(),
    Estado: Yup.boolean().required(requiredMessage),
    // Add validation for other fields based on your model
  };
}

