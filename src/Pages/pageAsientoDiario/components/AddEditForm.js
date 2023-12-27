import {
  Autocomplete,
  Button,
  Checkbox,
  FormControlLabel,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import { useFormik } from "formik";
import { useEffect } from "react";
import { useUser } from "src/hooks";
import { useAsientoDiario } from "src/hooks/AsientoDiarioHooks/useAsientoDiario";
import { usePropiedades } from "src/hooks/PropiedadesHooks/usePropiedades";
import * as Yup from "yup";
import { useDropzone } from "react-dropzone";

export default function AddEditForm(props) {
  const { onClose, onRefetch, Data } = props;
  const { updateAsientoDiario, addAsientoDiario } = useAsientoDiario();
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
        if (Data) await updateAsientoDiario(Data.id_AsientoDiario, formValue);
        else await addAsientoDiario(formValue);

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

    // Maneja los archivos soltados en el área de Dropzone
    const onDrop = (acceptedFiles) => {
      formik.setFieldValue("soporte", acceptedFiles[0]);
    };
  
    // Configuración de Dropzone
    const { getRootProps, getInputProps } = useDropzone({
      onDrop,
      accept: "image/*,application/pdf", // Tipos de soporte permitidos
      multiple: false, // Solo permitir un soporte
    });

  return (
    <form onSubmit={formik.handleSubmit}>
      <Grid container spacing={2}>
        <Grid item xs={12} md={6}>
          <TextField
            fullWidth
            id="consecutivo"
            name="consecutivo"
            label="Consecutivo"
            variant="outlined"
            value={formik.values.consecutivo}
            onChange={formik.handleChange}
            error={formik.touched.consecutivo && Boolean(formik.errors.consecutivo)}
            helperText={formik.touched.consecutivo && formik.errors.consecutivo}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <Autocomplete
            fullWidth
            id="tipoasiento"
            name="tipoasiento"
            options={[
              "SALDOS INICIALES",
              "MOVIMIENTO CONTABLE",
              "AJUSTE CONTABLE",
            ]}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Tipo de Asiento"
                variant="outlined"
                error={
                  formik.touched.tipoasiento && Boolean(formik.errors.tipoasiento)
                }
                helperText={
                  formik.touched.tipoasiento && formik.errors.tipoasiento
                }
              />
            )}
            value={formik.values.tipoasiento}
            onChange={(_, value) =>
              formik.setFieldValue("tipoasiento", value || "")
            }
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            fullWidth
            id="fecha_comprobante"
            name="fecha_comprobante"
            label="Fecha del Comprobante"
            variant="outlined"
            type="date" // Ajusta el tipo según el formato de fecha que necesitas
            value={formik.values.fecha_comprobante}
            onChange={formik.handleChange}
            error={
              formik.touched.fecha_comprobante &&
              Boolean(formik.errors.fecha_comprobante)
            }
            helperText={
              formik.touched.fecha_comprobante &&
              formik.errors.fecha_comprobante
            }
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            fullWidth
            id="cuenta_contable"
            name="cuenta_contable"
            label="Cuenta Contable"
            variant="outlined"
            value={formik.values.cuenta_contable}
            onChange={formik.handleChange}
            error={
              formik.touched.cuenta_contable &&
              Boolean(formik.errors.cuenta_contable)
            }
            helperText={
              formik.touched.cuenta_contable && formik.errors.cuenta_contable
            }
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            fullWidth
            id="tercero"
            name="tercero"
            label="Tercero"
            variant="outlined"
            value={formik.values.tercero}
            onChange={formik.handleChange}
            error={formik.touched.tercero && Boolean(formik.errors.tercero)}
            helperText={formik.touched.tercero && formik.errors.tercero}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            fullWidth
            id="num_documento"
            name="num_documento"
            label="Número de Documento"
            variant="outlined"
            value={formik.values.num_documento}
            onChange={formik.handleChange}
            error={
              formik.touched.num_documento &&
              Boolean(formik.errors.num_documento)
            }
            helperText={formik.touched.num_documento && formik.errors.num_documento}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            fullWidth
            id="debito"
            name="debito"
            label="Débito"
            variant="outlined"
            value={formik.values.debito}
            onChange={formik.handleChange}
            error={formik.touched.debito && Boolean(formik.errors.debito)}
            helperText={formik.touched.debito && formik.errors.debito}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            fullWidth
            id="credito"
            name="credito"
            label="Crédito"
            variant="outlined"
            value={formik.values.credito}
            onChange={formik.handleChange}
            error={formik.touched.credito && Boolean(formik.errors.credito)}
            helperText={formik.touched.credito && formik.errors.credito}
          />
        </Grid>
        <Grid item xs={12} md={12}>
          <TextField
            fullWidth
            id="observacion"
            name="observacion"
            label="Observación"
            variant="outlined"
            multiline
            rows={4}
            value={formik.values.observacion}
            onChange={formik.handleChange}
            error={
              formik.touched.observacion &&
              Boolean(formik.errors.observacion)
            }
            helperText={formik.touched.observacion && formik.errors.observacion}
          />
        </Grid>
        

        <Grid item xs={12}>
          <div {...getRootProps()} style={dropzoneStyles}>
            <input {...getInputProps()} />
            <Typography variant="body1">
              Arrastra y suelta el soporte aquí, o haz clic para seleccionar
              uno.
            </Typography>
          </div>
          <Typography variant="caption">
            Acepta imágenes y archivos PDF.
          </Typography>
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
    consecutivo: data?.consecutivo || "",
    tipoasiento: data?.tipoasiento || "",
    fecha_comprobante: data?.fecha_comprobante || "",
    cuenta_contable: data?.cuenta_contable || "",
    tercero: data?.tercero || "",
    num_documento: data?.num_documento || "",
    debito: data?.debito || "",
    credito: data?.credito || "",
    observacion: data?.observacion || "",
    soporte: data?.soporte || null,
    estado: data?.estado || true,
  };
}

function newSchema() {
  const requiredMessage = "Este campo es requerido";

  return {
    consecutivo: Yup.number().required(requiredMessage),
    tipoasiento: Yup.string().required(requiredMessage),
    fecha_comprobante: Yup.date().required(requiredMessage),
    cuenta_contable: Yup.number().required(requiredMessage),
    tercero: Yup.string().required(requiredMessage),
    num_documento: Yup.string().required(requiredMessage),
    debito: Yup.number().required(requiredMessage),
    credito: Yup.number().required(requiredMessage),
    observacion: Yup.string().required(requiredMessage),
    soporte: Yup.mixed().required(requiredMessage),
    estado: Yup.boolean().required(requiredMessage),
  };
}
