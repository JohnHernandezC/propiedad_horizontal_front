import {
  Button,
  Checkbox,
  FormControlLabel,
  Grid,
  TextField
} from "@mui/material";
import { useFormik } from "formik";
import { useProveedores } from "src/hooks/ProveedoresHooks/useProveedores";
import * as Yup from "yup";

export default function AddEditForm(props) {
  const { onClose, onRefetch, Data } = props;
  const { updateProveedores, addProveedores } = useProveedores();




  const formik = useFormik({
    initialValues: initialValues(Data),
    validationSchema: Yup.object(newSchema()),
    validateOnChange: false,
    onSubmit: async (formValue) => {
      try {
        if (Data) await updateProveedores(Data.id_proveedor, formValue);
        else await addProveedores(formValue);

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
        <Grid item xs={4}>
          <TextField
            fullWidth
            id="nit_proveedor"
            name="nit_proveedor"
            label="NIT Proveedor"
            variant="outlined"
            value={formik.values.nit_proveedor}
            onChange={formik.handleChange}
            error={formik.touched.nit_proveedor && Boolean(formik.errors.nit_proveedor)}
            helperText={formik.touched.nit_proveedor && formik.errors.nit_proveedor}
          />
        </Grid>
        <Grid item xs={4}>
          <TextField
            fullWidth
            id="nom_proveedor"
            name="nom_proveedor"
            label="Nombre Proveedor"
            variant="outlined"
            value={formik.values.nom_proveedor}
            onChange={formik.handleChange}
            error={formik.touched.nom_proveedor && Boolean(formik.errors.nom_proveedor)}
            helperText={formik.touched.nom_proveedor && formik.errors.nom_proveedor}
          />
        </Grid>
       
        <Grid item xs={4}>
          <TextField
            fullWidth
            id="servicio"
            name="servicio"
            label="Servicio"
            variant="outlined"
            value={formik.values.servicio}
            onChange={formik.handleChange}
            error={formik.touched.servicio && Boolean(formik.errors.servicio)}
            helperText={formik.touched.servicio && formik.errors.servicio}
          />
        </Grid>
        <Grid item xs={3}>
          <TextField
            fullWidth
            id="nom_contacto"
            name="nom_contacto"
            label="Nombre de Contacto"
            variant="outlined"
            value={formik.values.nom_contacto}
            onChange={formik.handleChange}
            error={formik.touched.nom_contacto && Boolean(formik.errors.nom_contacto)}
            helperText={formik.touched.nom_contacto && formik.errors.nom_contacto}
          />
        </Grid>
        <Grid item xs={3}>
          <TextField
            fullWidth
            id="Telefono"
            name="Telefono"
            label="Teléfono"
            variant="outlined"
            value={formik.values.Telefono}
            onChange={formik.handleChange}
            error={formik.touched.Telefono && Boolean(formik.errors.Telefono)}
            helperText={formik.touched.Telefono && formik.errors.Telefono}
          />
        </Grid>
        <Grid item xs={3}>
          <TextField
            fullWidth
            id="email_proveedor"
            name="email_proveedor"
            label="Email Proveedor"
            variant="outlined"
            value={formik.values.email_proveedor}
            onChange={formik.handleChange}
            error={formik.touched.email_proveedor && Boolean(formik.errors.email_proveedor)}
            helperText={formik.touched.email_proveedor && formik.errors.email_proveedor}
          />
        </Grid>
        <Grid item xs={3}>
          <TextField
            fullWidth
            id="direccion"
            name="direccion"
            label="Dirección"
            variant="outlined"
            value={formik.values.direccion}
            onChange={formik.handleChange}
            error={formik.touched.direccion && Boolean(formik.errors.direccion)}
            helperText={formik.touched.direccion && formik.errors.direccion}
          />
        </Grid>
        <Grid item xs={12}>
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

// initialValues
function initialValues(data) {
  return {
    nit_proveedor: data?.nit_proveedor || "",
    nom_proveedor: data?.nom_proveedor || "",
   
    servicio: data?.servicio || "",
    nom_contacto: data?.nom_contacto || "",
    Telefono: data?.Telefono || "",
    email_proveedor: data?.email_proveedor || "",
    direccion: data?.direccion || "",
    Estado: data?.Estado || true,
    // Agrega otros campos aquí basándote en tu modelo
  };
}

// newSchema
function newSchema() {
  const requiredMessage = "Este campo es requerido";

  return {
    nit_proveedor: Yup.string().required(requiredMessage),
    nom_proveedor: Yup.string().required(requiredMessage),
    servicio: Yup.string().required(requiredMessage),
    nom_contacto: Yup.string().required(requiredMessage),
    Telefono: Yup.string().required(requiredMessage),
    email_proveedor: Yup.string().email("Formato de email inválido").required(requiredMessage),
    direccion: Yup.string().required(requiredMessage),
    Estado: Yup.boolean().required(requiredMessage),
    // Agrega validaciones para otros campos según tu modelo
  };
}

