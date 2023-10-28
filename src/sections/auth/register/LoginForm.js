import { useState, useEffect } from "react";
import { LoadingButton } from "@mui/lab";
import {
  IconButton,
  InputAdornment,
  Stack,
  TextField,
  Checkbox,
  FormControl,
  Select,
  MenuItem,
  InputLabel,
} from "@mui/material";
import Iconify from "../../../components/iconify";

export default function LoginForm({ formik, edificio, email }) {

  const [showPassword, setShowPassword] = useState(false);
  const [showPassword2, setShowPassword2] = useState(false);
  useEffect(() => {
    if (edificio !=":edificio" && formik.values.nit_edificio !== edificio) {
      // Verifica si la variable edificio existe y si el valor es diferente
      formik.setFieldValue('nit_edificio', edificio);
      formik.setFieldTouched('nit_edificio', true);
      formik.setFieldError('nit_edificio', null);
    }
    if (email !=":email" && formik.values.email !== email) {
      formik.setFieldValue('email', email);
      formik.setFieldTouched('email', true);
      formik.setFieldError('email', null);
    }
  }, [edificio, email, formik]);
  return (
    <>
      <form onSubmit={formik.handleSubmit}>
        <Stack spacing={3}>
          <FormControl>
            <InputLabel id="tipo_id-label">Tipo de Identificación</InputLabel>
            <Select
              labelId="tipo_id-label"
              id="tipo_id"
              name="tipo_id"
              value={formik.values.tipo_id}
              onChange={formik.handleChange}
              label="Tipo de Identificación"
              error={formik.touched?.tipo_id && Boolean(formik.errors.tipo_id)}
            >
              <MenuItem value={null}>
                Seleccionar Tipo de Identificación
              </MenuItem>
              <MenuItem value="1">Cédula de Ciudadanía (CC)</MenuItem>
              <MenuItem value="2">Tarjeta de Identidad (TI)</MenuItem>
              <MenuItem value="3">Cédula de Extranjería (CE)</MenuItem>
              <MenuItem value="4">Número de Identificación Tributaria (NIT)</MenuItem>
              <MenuItem value="5">Pasaporte (PAS)</MenuItem>
              <MenuItem value="6">Registro Civil (RC)</MenuItem>
              <MenuItem value="7">Otro</MenuItem>
              {/* Puedes agregar más tipos de identificación si es necesario */}
            </Select>
          </FormControl>

          <TextField
            name="identificacion"
            value={formik.values.identificacion}
            onChange={formik.handleChange}
            label="Identificación"
            error={
              formik.touched?.identificacion &&
              Boolean(formik.errors.identificacion)
            }
            helperText={
              formik.touched?.identificacion && formik.errors.identificacion
            }
          />

          <TextField
            name="nombres"
            value={formik.values.nombres}
            onChange={formik.handleChange}
            label="Nombres"
            error={formik.touched?.nombres && Boolean(formik.errors.nombres)}
            helperText={formik.touched?.nombres && formik.errors.nombres}
          />

          <TextField
            name="apellidos"
            value={formik.values.apellidos}
            onChange={formik.handleChange}
            label="Apellidos"
            error={
              formik.touched?.apellidos && Boolean(formik.errors.apellidos)
            }
            helperText={formik.touched?.apellidos && formik.errors.apellidos}
          />

          <TextField
            name="email"
            value={formik.values.email}
            onChange={formik.handleChange}
            label="Correo Electrónico"
            error={formik.touched?.email && Boolean(formik.errors.email)}
            helperText={formik.touched?.email && formik.errors.email}
            disabled={Boolean(email !=":email")}
          />

          <TextField
            name="celular"
            value={formik.values.celular}
            onChange={formik.handleChange}
            label="Celular"
            error={formik.touched?.celular && Boolean(formik.errors.celular)}
            helperText={formik.touched?.celular && formik.errors.celular}
          />

          <TextField
            name="nit_edificio"
            value={formik.values.nit_edificio}
            onChange={formik.handleChange}
            label="NIT del Edificio"
            error={
              formik.touched?.nit_edificio &&
              Boolean(formik.errors.nit_edificio)
            }
            helperText={
              formik.touched?.nit_edificio && formik.errors.nit_edificio
            }
            disabled={Boolean(edificio !=":edificio")}
          />

          <TextField
            name="password"
            value={formik.values.password}
            onChange={formik.handleChange}
            label="Contraseña"
            type={showPassword ? "text" : "password"}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    onClick={() => setShowPassword(!showPassword)}
                    edge="end"
                  >
                    <Iconify
                      icon={showPassword ? "eva:eye-fill" : "eva:eye-off-fill"}
                    />
                  </IconButton>
                </InputAdornment>
              ),
            }}
            error={
              formik.touched?.password &&
              Boolean(formik.errors.password)
            }
            helperText={
              formik.touched?.password && formik.errors.password
            }
          />

          <TextField
            name="re_new_password"
            value={formik.values.re_new_password}
            onChange={formik.handleChange}
            label="Confirmar contraseña"
            type={showPassword2 ? "text" : "password"}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    onClick={() => setShowPassword2(!showPassword2)}
                    edge="end"
                  >
                    <Iconify
                      icon={showPassword2 ? "eva:eye-fill" : "eva:eye-off-fill"}
                    />
                  </IconButton>
                </InputAdornment>
              ),
            }}
            error={
              formik.touched?.re_new_password &&
              Boolean(formik.errors.re_new_password)
            }
            helperText={
              formik.touched?.re_new_password && formik.errors.re_new_password
            }
          />

          <div>
            <Checkbox
              name="acepta_tyc"
              checked={formik.values.acepta_tyc}
              onChange={formik.handleChange}
            />
            Acepta términos y condiciones
          </div>
        </Stack>

        <LoadingButton
          fullWidth
          size="large"
          type="submit"
          variant="contained"
          
        >
          Registrar
        </LoadingButton>
      </form>
    </>
  );
}
