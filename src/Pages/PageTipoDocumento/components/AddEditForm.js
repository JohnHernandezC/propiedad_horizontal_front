import {
  Button,
  Checkbox,
  FormControlLabel,
  Grid,
  TextField
} from "@mui/material";
import { useFormik } from "formik";
import { useEffect } from "react";
import { useUser } from "src/hooks";
import { useTipoDocumento } from "src/hooks/GestionDocumentalHooks/useTipoDocumento";
import { usePropiedades } from "src/hooks/PropiedadesHooks/usePropiedades";
import * as Yup from "yup";

export default function AddEditForm(props) {
  const { onClose, onRefetch, Data } = props;
  const { updateTipoDocumento, addTipoDocumento } = useTipoDocumento();
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
        if (Data) await updateTipoDocumento(Data.id_TipoDocumento, formValue);
        else await addTipoDocumento(formValue);

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
        <Grid item xs={12} md={6}>
          <TextField
            fullWidth
            id="nom_doc"
            name="nom_doc"
            label="Nombre del Documento"
            variant="outlined"
            value={formik.values.nom_doc}
            onChange={formik.handleChange}
            error={formik.touched.nom_doc && Boolean(formik.errors.nom_doc)}
            helperText={formik.touched.nom_doc && formik.errors.nom_doc}
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

function initialValues(data) {
  return {
    pais: data?.pais || "",
    nom_doc: data?.nom_doc || "",
    estado: data?.estado || true,
  };
}

function newSchema() {
  const requiredMessage = "Este campo es requerido";
  return {
    pais: Yup.string().required(requiredMessage),
    nom_doc: Yup.string().required(requiredMessage),
    estado: Yup.boolean().required(requiredMessage),
  };
}
