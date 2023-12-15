import {
  Autocomplete,
  Button,
  Checkbox,
  FormControlLabel,
  Grid,
  TextField
} from "@mui/material";
import { useFormik } from "formik";
import { useEffect } from "react";

import { useBancosEdificio } from "src/hooks/BancosEdificioHooks/useBancosEdificio";
import { useBancos } from "src/hooks/BancosHooks/useBancos";
import { usePucEdificio} from "src/hooks/PucEdificioHooks/usePucEdificio";

import * as Yup from "yup";

export default function AddEditForm(props) {
  const { onClose, onRefetch, Data } = props;
  const { updateBancosEdificio, addBancosEdificio } = useBancosEdificio();
  const { getBancosDB, BancosDB } = useBancos();
  const { getPucEdificioDB, PucEdificioDB } = usePucEdificio();
  
  useEffect(() => {

    getBancosDB();
    getPucEdificioDB();
  }, []);

  const formik = useFormik({
    initialValues: initialValues(Data),
    validationSchema: Yup.object(newSchema()),
    validateOnChange: false,
    onSubmit: async (formValue) => {
      try {
        if (Data) await updateBancosEdificio(Data.id_bancoedificio, formValue);
        else await addBancosEdificio(formValue);

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
          <Autocomplete
            fullWidth
            id="codigo_banco"
            options={BancosDB}
            getOptionLabel={(option) => `${option.nom_banco} `}
            value={BancosDB?.find((user) => user.id_banco === formik.values?.codigo_banco) || null}
            onChange={(_, value) => formik.setFieldValue("codigo_banco", value?.id_banco || "")}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Código de Banco"
                variant="outlined"
                error={formik.touched.codigo_banco && Boolean(formik.errors.codigo_banco)}
                helperText={formik.touched.codigo_banco && formik.errors.codigo_banco}
                sx={{ background: "#fcfcfc" }}
              />
            )}
          />
        </Grid>
        
        <Grid item xs={12} md={6}>
          <Autocomplete
            fullWidth
            id="tipocuenta"
            options={[
              { value: 'CA', label: 'CUENTA DE AHORRO' },
              { value: 'CC', label: 'CUENTA CORRIENTE' },
              { value: 'CDT', label: 'CUENTA DE DEPOSITO' },
            ]}
            getOptionLabel={(option) => option.label}
            value={formik.values.tipocuenta ? { value: formik.values.tipocuenta, label: formik.values.tipocuenta } : null}
            onChange={(_, value) => formik.setFieldValue("tipocuenta", value?.value || "")}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Tipo de Cuenta"
                variant="outlined"
                error={formik.touched.tipocuenta && Boolean(formik.errors.tipocuenta)}
                helperText={formik.touched.tipocuenta && formik.errors.tipocuenta}
                sx={{ background: "#fcfcfc" }}
              />
            )}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            fullWidth
            id="numerocuenta"
            name="numerocuenta"
            label="Número de Cuenta"
            variant="outlined"
            value={formik.values.numerocuenta}
            onChange={formik.handleChange}
            error={formik.touched.numerocuenta && Boolean(formik.errors.numerocuenta)}
            helperText={formik.touched.numerocuenta && formik.errors.numerocuenta}
            sx={{ background: "#fcfcfc" }}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <Autocomplete
            fullWidth
            id="cuentapuc"
            options={PucEdificioDB}
            getOptionLabel={(option) => `${option.nom_cuenta} `}
            value={PucEdificioDB?.find((user) => user.id_cuenta === formik.values?.cuentapuc) || null}
            onChange={(_, value) => formik.setFieldValue("cuentapuc", value?.id_cuenta || "")}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Cuenta PUC"
                variant="outlined"
                error={formik.touched.cuentapuc && Boolean(formik.errors.cuentapuc)}
                helperText={formik.touched.cuentapuc && formik.errors.cuentapuc}
                sx={{ background: "#fcfcfc" }}
              />
            )}
          />
        </Grid>
        
        <Grid item xs={12}>
          <TextField
            fullWidth
            id="descripcion"
            name="descripcion"
            label="Descripción"
            variant="outlined"
            multiline
            rows={4}
            value={formik.values.descripcion}
            onChange={formik.handleChange}
            error={formik.touched.descripcion && Boolean(formik.errors.descripcion)}
            helperText={formik.touched.descripcion && formik.errors.descripcion}
            sx={{ background: "#fcfcfc" }}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <FormControlLabel
            control={
              <Checkbox
                checked={formik.values.estado}
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
          <Button type="submit" variant="contained" color="primary" fullWidth sx={{ background: "#d53d0c" }}>
            {Data ? "Actualizar" : "Crear"}
          </Button>
        </Grid>
      </Grid>
    </form>
  );
}

// Funciones initialValues y newSchema actualizadas
function initialValues(data) {
  return {

    codigo_banco: data?.codigo_banco || "",
    tipocuenta: data?.tipocuenta || "",
    numerocuenta: data?.numerocuenta || "",
    cuentapuc: data?.cuentapuc || "",
    descripcion: data?.descripcion || "",
    estado: data?.estado || true,
    // Agrega otros campos aquí basándote en tu modelo
  };
}

function newSchema() {
  const requiredMessage = "Este campo es requerido";

  return {

    codigo_banco: Yup.string().required(requiredMessage),
    tipocuenta: Yup.string().required(requiredMessage),
    numerocuenta: Yup.string().required(requiredMessage),
    cuentapuc: Yup.string().required(requiredMessage),
    descripcion: Yup.string(),
    estado: Yup.boolean().required(requiredMessage),
    // Agrega validaciones para otros campos según tu modelo
  };
}
