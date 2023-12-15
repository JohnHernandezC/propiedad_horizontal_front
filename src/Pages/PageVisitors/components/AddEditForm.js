import { useFormik } from "formik";
import { useEffect } from "react";
import * as Yup from "yup";
import {
  Button,
  TextField,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
  Grid,
} from "@mui/material";
import { useVisitantes } from "src/hooks/VisitantesHooks/useVisitantes";
import { usePropiedades } from "../../../hooks/PropiedadesHooks/usePropiedades";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";
import dayjs from 'dayjs';

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
        <Grid item xs={4}>
          <FormControl fullWidth variant="outlined">
            <InputLabel>Propiedad</InputLabel>
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
        </Grid>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
        <Grid item xs={4}>
          <FormControl fullWidth variant="outlined">
            <InputLabel>Hora de entrada</InputLabel>
            <TimePicker
              ampm={false}
              inputFormat="HH:mm"
              value={dayjs(formik.values.hora_entrada).format('HH:mm')}
              onChange={(value) => formik.setFieldValue("hora_entrada", dayjs(value).format('HH:mm'))}
            />
          </FormControl>
        </Grid>
          
        </LocalizationProvider>
        <Grid item xs={4}>
          <TextField
            label="Fecha de registro"
            variant="outlined"
            fullWidth
            name="fecha_registro"
            type="date"
            value={formik.values.fecha_registro}
            onChange={formik.handleChange}
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            label="Nombre del visitante"
            variant="outlined"
            fullWidth
            name="nom_visitante"
            value={formik.values.nom_visitante}
            onChange={formik.handleChange}
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            label="Identificacion del visitante"
            variant="outlined"
            fullWidth
            name="id_visitante"
            value={formik.values.id_visitante}
            onChange={formik.handleChange}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            label="Asunto"
            variant="outlined"
            fullWidth
            name="asunto"
            value={formik.values.asunto}
            onChange={formik.handleChange}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            label="Observación"
            variant="outlined"
            fullWidth
            name="observacion"
            value={formik.values.observacion}
            onChange={formik.handleChange}
          />
        </Grid>
        <Grid item xs={12}>
          <Button type="submit" variant="contained" color="primary" fullWidth>
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
    hora_entrada: data?.hora_entrada || "",
    fecha_registro: data?.fecha_registro || "",
    nom_visitante: data?.nom_visitante || "",
    id_visitante: data?.id_visitante || "",
    asunto: data?.asunto || "",
    observacion: data?.observacion || "",
  };
}

function newSchema() {
  const requiredMessage = "Este campo es requerido";
  return {
    id_propiedad: Yup.number().required(requiredMessage),
    hora_entrada: Yup.string().required(requiredMessage),

    fecha_registro: Yup.string().required(requiredMessage),
    nom_visitante: Yup.string().required(requiredMessage),
    id_visitante: Yup.string().required(requiredMessage),
    asunto: Yup.string().required(requiredMessage),
    observacion: Yup.string(),
  };
}
