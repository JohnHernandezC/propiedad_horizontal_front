import React, { useEffect } from "react";
import {
  Button,
  FormControlLabel,
  Grid,
  Checkbox,
  TextField,
  Autocomplete
} from "@mui/material";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useConfiCuentas } from "../../../hooks/ConfiCuentasHooks/useConfiCuentas";
import { useCuotas } from "src/hooks/CuotasHooks/useCuotas";
import { usePucEdificio} from "src/hooks/PucEdificioHooks/usePucEdificio";
export default function AddEditForm(props) {
  const { onClose, onRefetch, Data } = props;
  const {  getTiposCuotasDB, TipoCuotas } = useCuotas();
  const { updateConfiCuentas, addConfiCuentas } = useConfiCuentas();
  const { getPucEdificioDB, PucEdificioDB } = usePucEdificio();
  useEffect(() => {
    getPucEdificioDB();
    getTiposCuotasDB();
  }, []);
  const formik = useFormik({
    initialValues: initialValues(Data),
    validationSchema: Yup.object(newSchema()),
    validateOnChange: false,
    onSubmit: async (formValue) => {
      try {
        if (Data) await updateConfiCuentas(Data.id, formValue);
        else await addConfiCuentas(formValue);

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
          <Autocomplete
            fullWidth
            id="tipo_movimiento"
            options={TipoCuotas}
            getOptionLabel={(option) => option.tipo_movimiento}
            value={
              TipoCuotas?.find(
                (tipo) => tipo.tipo_movimiento === formik.values?.tipo_movimiento
              ) || null
            }
            onChange={(_, value) =>
              formik.setFieldValue("tipo_movimiento", value?.tipo_movimiento || "")
            }
            renderInput={(params) => (
              <TextField
                {...params}
                label="Tipo Movimiento"
                variant="outlined"
                error={
                  formik.touched.tipo_movimiento && Boolean(formik.errors.tipo_movimiento)
                }
                helperText={
                  formik.touched.tipo_movimiento && formik.errors.tipo_movimiento
                }
                sx={{ background: "#fcfcfc" }}
              />
            )}
          />
        </Grid>
        
        <Grid item xs={12} md={6}>
          <Autocomplete
            fullWidth
            id="cuenta_debe"
            options={PucEdificioDB}
            getOptionLabel={(option) => `${option.nom_cuenta} `}
            value={PucEdificioDB?.find((user) => user.id_cuenta === formik.values?.cuenta_debe) || null}
            onChange={(_, value) => formik.setFieldValue("cuenta_debe", value?.id_cuenta || "")}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Cuenta Debe"
                variant="outlined"
                error={formik.touched.cuenta_debe && Boolean(formik.errors.cuenta_debe)}
                helperText={formik.touched.cuenta_debe && formik.errors.cuenta_debe}
                sx={{ background: "#fcfcfc" }}
              />
            )}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <Autocomplete
            fullWidth
            id="cuenta_haber"
            options={PucEdificioDB}
            getOptionLabel={(option) => `${option.nom_cuenta} `}
            value={PucEdificioDB?.find((user) => user.id_cuenta === formik.values?.cuenta_haber) || null}
            onChange={(_, value) => formik.setFieldValue("cuenta_haber", value?.id_cuenta || "")}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Cuenta Haber"
                variant="outlined"
                error={formik.touched.cuenta_haber && Boolean(formik.errors.cuenta_haber)}
                helperText={formik.touched.cuenta_haber && formik.errors.cuenta_haber}
                sx={{ background: "#fcfcfc" }}
              />
            )}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            fullWidth
            id="dia_aplicacion"
            name="dia_aplicacion"
            label="Día de Aplicación"
            variant="outlined"
            value={formik.values.dia_aplicacion}
            onChange={formik.handleChange}
            error={
              formik.touched.dia_aplicacion &&
              Boolean(formik.errors.dia_aplicacion)
            }
            helperText={
              formik.touched.dia_aplicacion && formik.errors.dia_aplicacion
            }
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            fullWidth
            id="iva_aplicable"
            name="iva_aplicable"
            label="IVA Aplicable"
            variant="outlined"
            value={formik.values.iva_aplicable}
            onChange={formik.handleChange}
            error={
              formik.touched.iva_aplicable &&
              Boolean(formik.errors.iva_aplicable)
            }
            helperText={
              formik.touched.iva_aplicable && formik.errors.iva_aplicable
            }
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
    tipo_movimiento: data?.tipo_movimiento || "",
    dia_aplicacion: data?.dia_aplicacion || "",
    cuenta_debe: data?.cuenta_debe || "",
    cuenta_haber: data?.cuenta_haber || "",
    iva_aplicable: data?.iva_aplicable || "",
    estado: data?.estado || true,
  };
}

function newSchema() {
  const requiredMessage = "Este campo es requerido";

  return {
    tipo_movimiento: Yup.string().required(requiredMessage),
    dia_aplicacion: Yup.number().required(requiredMessage),
    cuenta_debe: Yup.number().required(requiredMessage),
    cuenta_haber: Yup.number().required(requiredMessage),
    iva_aplicable: Yup.number(),
    estado: Yup.boolean().required(requiredMessage),
  };
}
