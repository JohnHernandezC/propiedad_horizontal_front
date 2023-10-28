import { useFormik } from "formik";
import { usePropiedades } from "../../../hooks/PropiedadesHooks/usePropiedades";
import * as Yup from "yup";
import {
  Button,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from "@mui/material";

export default function AddEditForm(props) {
  const { onClose, onRefetch, Data } = props;
  const { updatePropiedades, addPropiedades } = usePropiedades();
  const tipo = ["Apartamento"];
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
        if (Data) await updatePropiedades(Data.id_propiedad, formValue);
        else await addPropiedades(formValue);

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
      <FormControl fullWidth variant="outlined" margin="normal">
        <InputLabel>Tipo de propiedad</InputLabel>
        <Select
          id="tipo_propiedad"
          name="tipo_propiedad"
          value={formik.values.tipo_propiedad}
          onChange={formik.handleChange}
        >
          {tipo.map((tipo, index) => (
            <MenuItem key={index} value={index}>
              {tipo}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <TextField
        fullWidth
        label="Número de Propiedad"
        variant="outlined"
        id="num_propiedad"
        name="num_propiedad"
        value={formik.values.num_propiedad}
        onChange={formik.handleChange}
      />

      <TextField
        fullWidth
        label="Torre"
        variant="outlined"
        id="torre"
        name="torre"
        value={formik.values.torre}
        onChange={formik.handleChange}
      />

      <TextField
        fullWidth
        label="Coeficiente"
        variant="outlined"
        id="coeficiente"
        name="coeficiente"
        value={formik.values.coeficiente}
        onChange={formik.handleChange}
      />

      <TextField
        fullWidth
        label="Cantidad de Parqueaderos"
        variant="outlined"
        id="cant_parqueadero"
        name="cant_parqueadero"
        value={formik.values.cant_parqueadero}
        onChange={formik.handleChange}
      />

      <FormControl fullWidth variant="outlined" margin="normal">
        <InputLabel>Estado</InputLabel>
        <Select
          id="estado"
          name="estado"
          value={formik.values.estado}
          onChange={formik.handleChange}
        >
          <MenuItem value={true}>Activo</MenuItem>
          <MenuItem value={false}>Inactivo</MenuItem>
        </Select>
      </FormControl>

      {/* Añade el campo para 'privado' (puedes utilizar un Checkbox) */}

      <Button type="submit" variant="contained" color="primary" fullWidth>
        {Data ? "Actualizar" : "Crear"}
      </Button>
    </form>
  );
}

function initialValues(data) {
  return {
    tipo_propiedad: data?.tipo_propiedad || "",
    num_propiedad: data?.num_propiedad || "", // Agrega el campo 'num_propiedad'
    torre: data?.torre || "", // Agrega el campo 'torre'
    coeficiente: data?.coeficiente || "", // Agrega el campo 'coeficiente'
    cant_parqueadero: data?.cant_parqueadero || "", // Agrega el campo 'cant_parqueadero
    estado: data?.estado || false, // Agrega el campo 'estado'
  };
}

function newSchema() {
  return {
    tipo_propiedad: Yup.string().required(
      "El campo tipo propiedad es requerido"
    ), // Cambia el tipo a string
    num_propiedad: Yup.string().required(
      "El campo número de propiedad es requerido"
    ),
    torre: Yup.string().nullable(),
    coeficiente: Yup.number().nullable(),
    cant_parqueadero: Yup.number().nullable(),
    fecha_resgistro: Yup.date().nullable(),
    estado: Yup.boolean().required("El campo estado es requerido"),
  };
}
