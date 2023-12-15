import {
  Button,
  Grid,
  TextField,
  Autocomplete,
  Input,
  Typography,
  InputLabel
} from "@mui/material";
import { useFormik } from "formik";
import { useEffect } from "react";
import { useGestionDocumental } from "src/hooks/GestionDocumentalHooks/useGestionDocumental";
import * as Yup from "yup";
import { useDropzone } from "react-dropzone";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { useTipoDocumento } from "src/hooks/GestionDocumentalHooks/useTipoDocumento";
import dayjs from 'dayjs';

export default function AddEditForm(props) {
  const { onClose, onRefetch, Data } = props;
  const { updateGestionDocumental, addGestionDocumental } = useGestionDocumental();
  const { TipoDocumentoDB, getTipoDocumentoDB} = useTipoDocumento();
  useEffect(() => {
    getTipoDocumentoDB();
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
        if (Data) await updateGestionDocumental(Data.id_archivo, formValue);
        else await addGestionDocumental(formValue);
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

   // Maneja los archivos soltados en el área de Dropzone
   const onDrop = (acceptedFiles) => {
    formik.setFieldValue("archivo", acceptedFiles[0]);
  };

  // Configuración de Dropzone
  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: "image/*,application/pdf", // Tipos de archivo permitidos
    multiple: false, // Solo permitir un archivo
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <Grid container spacing={2}>
        <Grid item xs={12} md={6}>
          <Autocomplete
            fullWidth
            id="tipo_doc"
            options={TipoDocumentoDB}
            getOptionLabel={(option) => `${option.nom_doc} `}
            value={TipoDocumentoDB?.find(
              (tipo) => tipo.id_tipodoc === formik.values?.tipo_doc
            )}
            onChange={(_, value) =>
              formik.setFieldValue("tipo_doc", value?.id_tipodoc || "")
            }
            renderInput={(params) => (
              <TextField
                {...params}
                label="Tipo de Documento"
                variant="outlined"
                error={formik.touched.tipo_doc && Boolean(formik.errors.tipo_doc)}
                helperText={formik.touched.tipo_doc && formik.errors.tipo_doc}
                sx={{ background: "#fcfcfc" }}
              />
            )}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            fullWidth
            id="num_doc"
            name="num_doc"
            label="Número de Documento"
            variant="outlined"
            value={formik.values.num_doc}
            onChange={formik.handleChange}
            error={formik.touched.num_doc && Boolean(formik.errors.num_doc)}
            helperText={formik.touched.num_doc && formik.errors.num_doc}
            sx={{ background: "#fcfcfc" }}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            fullWidth
            id="Descripcion"
            name="Descripcion"
            label="Descripción"
            variant="outlined"
            multiline
            rows={4}
            value={formik.values.Descripcion}
            onChange={formik.handleChange}
            error={
              formik.touched.Descripcion &&
              Boolean(formik.errors.Descripcion)
            }
            helperText={
              formik.touched.Descripcion && formik.errors.Descripcion
            }
            sx={{ background: "#fcfcfc" }}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            fullWidth
            id="Observacion"
            name="Observacion"
            label="Observación"
            variant="outlined"
            multiline
            rows={2}
            value={formik.values.Observacion}
            onChange={formik.handleChange}
            error={
              formik.touched.Observacion &&
              Boolean(formik.errors.Observacion)
            }
            helperText={
              formik.touched.Observacion && formik.errors.Observacion
            }
            sx={{ background: "#fcfcfc" }}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <LocalizationProvider dateAdapter={AdapterDayjs} locale="es">
            <DatePicker
              label="Fecha del Documento"
              value={formik.values.fecha_documento}
              onChange={(value) =>
                formik.setFieldValue("fecha_documento", value)
              }
              renderInput={(params) => (
                <TextField
                  {...params}
                  variant="outlined"
                  fullWidth
                  sx={{ background: "#fcfcfc" }}
                />
              )}
            />
          </LocalizationProvider>
        </Grid>
        <Grid item xs={12}>
          <div {...getRootProps()} style={dropzoneStyles}>
            <input {...getInputProps()} />
            <Typography variant="body1">
              Arrastra y suelta el archivo aquí, o haz clic para seleccionar
              uno.
            </Typography>
          </div>
          <Typography variant="caption">
            Acepta imágenes y archivos PDF.
          </Typography>
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
const dropzoneStyles = {
  border: "2px dashed #d53d0c",
  borderRadius: "4px",
  padding: "20px",
  textAlign: "center",
  cursor: "pointer",
};


function initialValues(data) {
  return {
    tipo_doc: data?.tipo_doc || "",
    num_doc: data?.num_doc || "",
    Descripcion: data?.Descripcion || "",
    Observacion: data?.Observacion || "",
    fecha_documento:  data?.fecha_documento ? dayjs(data.fecha_documento) : null,
    archivo: data?.archivo || null, // Assuming the file field will be handled differently
    Estado: data?.Estado || true,
    // Add other fields here based on your model
  };
}

function newSchema() {
  const requiredMessage = "Este campo es requerido";

  return {
    tipo_doc: Yup.number().required(requiredMessage),
    num_doc: Yup.string().max(50, "El número de documento debe tener como máximo 50 caracteres").required(requiredMessage),
    Descripcion: Yup.string().max(150, "La descripción debe tener como máximo 150 caracteres").required(requiredMessage),
    Observacion: Yup.string(),

    fecha_documento: Yup.date(),
    archivo: Yup.mixed(), // Handle file validation accordingly
    Estado: Yup.boolean().required(requiredMessage),
    // Add validation for other fields based on your model
  };
}

