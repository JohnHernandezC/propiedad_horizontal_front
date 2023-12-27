import { useFormik } from "formik";
import { useUsers } from "../../hooks/UsersHooks/useUsers";
import * as Yup from "yup";
import { useEffect } from "react";
import {
  Autocomplete,
  Button,
  Checkbox,
  FormControlLabel,
  Grid,
  TextField,
} from "@mui/material";
import { usePropiedades } from "../../hooks/PropiedadesHooks/usePropiedades";

export default function AddEditUsers(props) {
  const { onClose, onRefetch, Data } = props;
  const { updateUsers, addUsers } = useUsers();
  const { PropiedadesDB, getPropiedadesDB } = usePropiedades();
  const tipoRegistroOptions = [
    { value: 1, label: "Funcionario" },
    { value: 2, label: "Arrendatario" },
    { value: 3, label: "Propietario" },
  ];

  useEffect(() => {
    getPropiedadesDB();
  }, []);
  const formik = useFormik({
    // Initializa los valores del formulario con los valores iniciales proporcionados por la función initialValues
    initialValues: initialValues(Data),
    // Establece la validación del esquema utilizando Yup, si se proporciona un objeto  se utiliza un esquema de actualización, de lo contrario se utiliza un esquema nuevo
    validationSchema: Yup.object(newSchema()),
    // Desactiva la validación al cambiar los valores del formulario
    validateOnChange: false,

    onSubmit: async (formValue) => {
      try {
        // Si se proporciona un objeto  se actualiza, de lo contrario se crea uno nuevo
        if (Data) await updateUsers(Data.id_registro, formValue);
        else await addUsers(formValue);

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
        <Grid item xs={12} sm={12}>
          <TextField
            fullWidth
            id="usuario_email"
            name="usuario_email"
            label="Email"
            variant="outlined"
            value={formik.values.usuario_email}
            onChange={formik.handleChange}
            error={
              formik.touched.usuario_email &&
              Boolean(formik.errors.usuario_email)
            }
            helperText={
              formik.touched.usuario_email && formik.errors.usuario_email
            }
          />
        </Grid>
        <Grid item xs={12} sm={6}>
  <Autocomplete
    fullWidth
    id="tipo_registro"
    name="tipo_registro"
    options={tipoRegistroOptions}
    getOptionLabel={(option) => option.label}
    renderInput={(params) => (
      <TextField
        {...params}
        label="Tipo de Producto"
        variant="outlined"
        error={
          formik.touched.tipo_registro &&
          Boolean(formik.errors.tipo_registro)
        }
        helperText={
          formik.touched.tipo_registro && formik.errors.tipo_registro
        }
      />
    )}
    value={tipoRegistroOptions.find((option) => option.value === formik.values.tipo_registro) || null}
    onChange={(_, value) =>
      formik.setFieldValue("tipo_registro", value?.value || "")
    }
  />
</Grid>

        <Grid item xs={12} md={6}>
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
    usuario_email: data?.usuario_email || "",
    id_propiedad: data?.id_propiedad || 0, // Cambia 0 al valor por defecto que desees
    estado: data?.estado || false,
    tipo_registro: data?.tipo_registro || "",
  };
}

function newSchema() {
  return {
    usuario_email: Yup.string()
      .email("El campo email debe ser una dirección de correo válida")
      .required("El campo email es requerido"),
    id_propiedad: Yup.number().required("El campo id propiedad es requerido"),
    estado: Yup.boolean(),
  };
}
