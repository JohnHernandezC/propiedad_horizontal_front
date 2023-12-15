import { useFormik } from "formik";
import { useUsers } from "../../hooks/UsersHooks/useUsers";
import * as Yup from "yup";
import { useEffect } from "react";
import {
  Button,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from "@mui/material";
import { usePropiedades } from "../../hooks/PropiedadesHooks/usePropiedades";


export default function AddEditUsers(props) {
  const { onClose, onRefetch, Data } = props;
  const { updateUsers, addUsers } = useUsers();
  const {  PropiedadesDB, getPropiedadesDB } = usePropiedades();
  const tipo = ["Funcionario", "Arrendatario", "Propietario"];
 
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
      <TextField
        id="usuario_email"
        name="usuario_email"
        label="Email"
        variant="outlined"
        fullWidth
        margin="normal"
        value={formik.values.usuario_email}
        onChange={formik.handleChange}
        error={
          formik.touched.usuario_email && Boolean(formik.errors.usuario_email)
        }
        helperText={formik.touched.usuario_email && formik.errors.usuario_email}
      />
      <FormControl fullWidth variant="outlined" margin="normal">
        <InputLabel>Tipo de registro</InputLabel>
        <Select
          id="tipo_registro"
          name="tipo_registro"
          value={formik.values.tipo_registro}
          onChange={formik.handleChange}
        >
          {tipo.map((tipo, index) => (
            <MenuItem key={index} value={index}>
              {tipo}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      
      <FormControl fullWidth variant="outlined" margin="normal">
  <InputLabel>ID Propiedad</InputLabel>
  <Select
    id="id_propiedad"
    name="id_propiedad"
    value={formik.values.id_propiedad}
    onChange={formik.handleChange}
  >
    {PropiedadesDB?.map((propiedad, index) => (
      <MenuItem key={index} value={propiedad?.id_propiedad}>
        {propiedad?.num_propiedad}
      </MenuItem>
    ))}
  </Select>
</FormControl>


      <Button type="submit" variant="contained" color="primary" fullWidth>
        {Data ? "Actualizar" : "Crear"}
      </Button>
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
