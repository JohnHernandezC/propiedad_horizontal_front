import {
  Button,
  Grid,
  TextField
} from "@mui/material";
import { useFormik } from "formik";
import { useTipoPropiedad } from "src/hooks/TipoPropiedadHooks/useTipoPropiedad";
import * as Yup from "yup";

export default function AddEditForm(props) {
  const { onClose, onRefetch, Data } = props;
  const { updateTipoPropiedad, addTipoPropiedad } = useTipoPropiedad();
  


  const formik = useFormik({
    initialValues: initialValues(Data),
    validationSchema: Yup.object(newSchema()),
    validateOnChange: false,
    onSubmit: async (formValue) => {
      try {
        if (Data) await updateTipoPropiedad(Data.id_TipoPropiedad, formValue);
        else await addTipoPropiedad(formValue);

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
      <Grid item xs={24} md={12}>
          <TextField
            fullWidth
            id="tipo_propiedad"
            name="tipo_propiedad"
            label="Tipo de propiedad"
            variant="outlined"
            value={formik.values.tipo_propiedad}
            onChange={formik.handleChange}
            error={formik.touched.tipo_propiedad && Boolean(formik.errors.tipo_propiedad)}
            helperText={formik.touched.tipo_propiedad && formik.errors.tipo_propiedad}
            sx={{ background: "#fcfcfc" }}
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
    tipo_propiedad: data?.id_usuario || "",
    
  };
}

function newSchema() {
  const requiredMessage = "Este campo es requerido";

  return {
    tipo_propiedad: Yup.string().required(requiredMessage),
  };
}
